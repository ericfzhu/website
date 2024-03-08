import library from '@/components/data/library.json';
import { useEffect, useMemo, useRef, useState } from 'react';
import movies from '@/components/data/movies.json';
import quotes from '@/components/data/quotes.json';
import Masonry from '@mui/lab/Masonry';
import { IconChevronLeft, IconCircleFilled, IconMenu2, IconShoppingBag } from '@tabler/icons-react';
import { notoSans } from '@/components/Fonts';
import { useSearchParams, useRouter } from 'next/navigation';
import { Book, Movie } from '@/components/types';
import Markdown from 'react-markdown';
import Image from 'next/image';
import * as React from 'react';
import FallingImageComponent from './FallingImageComponent';
import DropdownComponent from './DropdownComponent';
import BookComponent from './BookComponent';
import LangParser from './LangParser';

import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const convertStringToTwoDigitNumber = (input: string): number => {
	let num = 0;
	for (let i = 0; i < input.length; i++) {
		num = (num + input.charCodeAt(i)) % 100;
	}
	if (num < 70) {
		return (num % 16) + 5;
	} else if (num < 90) {
		return (num % 10) + 16;
	} else {
		return (num % 10) + 26;
	}
};

const isPrime = (num: number) => {
	for (let i = 2; i < num; i++) {
		if (num % i === 0) return false;
	}
	return num > 1;
};

const booksArray: Book[] = Object.entries(library).map(([key, book]) => ({
	key,
	price: convertStringToTwoDigitNumber(book.title),
	...book,
}));

const authorsList: string[] = Array.from(
	new Set(
		booksArray
			.filter((book) => book.status === 'Reading' || book.status === 'Finished')
			.flatMap((book) => book.author.split(',').map((author) => author.trim())),
	),
).sort();

const booksByAuthor: { [author: string]: Book[] } = authorsList.reduce((acc: { [author: string]: Book[] }, author) => {
	acc[author] = booksArray.filter((book) =>
		book.author
			.split(',')
			.map((authorName) => authorName.trim())
			.includes(author),
	);
	return acc;
}, {});

const filterBooksByAuthor = (author: string | null) => (author ? booksByAuthor[author] : booksArray);

// let toReadBooks = booksArray.filter((book) => book.status === 'To Read');

const moviesArray: Movie[] = Object.entries(movies).map(([key, movie]) => ({
	key,
	...movie,
}));
const sortedMovies = moviesArray.sort((a, b) => new Date(b.date_finished || '').getTime() - new Date(a.date_finished || '').getTime());

export default function LibraryComponent({ darkMode = false }: { darkMode?: boolean }) {
	const [loading, setLoading] = useState(true);
	const searchParams = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 50);
		return () => clearTimeout(timer);
	}, []);

	function setBook(book: Book | null) {
		const newParams = new URLSearchParams(searchParams.toString());
		if (book) {
			newParams.set('book', book.key);
		} else {
			setPost('');
			setSelectedOption('Select a quantity');
			newParams.delete('book');
		}
		router.push('?' + newParams.toString());
	}

	function setTab(tab: string) {
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.set('tab', tab);
		router.push('?' + newParams.toString());
	}

	function setLanguage(language: string) {
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.set('lang', language);
		router.push('?' + newParams.toString());
	}

	function setAuthorFilter(filter: string | null) {
		const newParams = new URLSearchParams(searchParams.toString());
		if (filter) {
			newParams.set('author', filter);
		} else {
			newParams.delete('author');
		}
		router.push('?' + newParams.toString());
	}

	function setShowReflections(show: boolean) {
		const newParams = new URLSearchParams(searchParams.toString());
		if (show) {
			newParams.set('reflections', 'true');
		} else {
			newParams.delete('reflections');
		}
		router.push('?' + newParams.toString());
	}

	const showReflections = searchParams?.get('reflections') === 'true';

	const authorFilter = searchParams?.get('author') || null;
	const tab = searchParams?.get('tab') || 'books';
	const bookKey = searchParams?.get('book') || null;
	const selectedBook = booksArray.find((book) => book.key === bookKey);
	const language = (searchParams?.get('lang') as 'cn' | 'jp' | 'en') || 'en';
	const [dropAll, setDropAll] = useState(false);
	const [post, setPost] = useState('');
	const [languageHover, setLanguageHover] = useState(false);
	const pageRef = useRef<HTMLDivElement>(null);
	const [selectedOption, setSelectedOption] = useState('Select a quantity');
	const [toReadBooks, setToReadBooks] = useState(booksArray.filter((book) => book.status === 'To Read'));

	function filterBooks() {
		return filterBooksByAuthor(authorFilter).filter((book) => {
			const readingStatusMatch = book.status === 'Reading';
			const hasPageMatch = !showReflections || (showReflections && book.has_page === true);
			return readingStatusMatch && hasPageMatch;
		});
	}

	const currentBooks = useMemo(() => filterBooks(), [authorFilter, showReflections]);

	function groupBooksByYearWithConditionalPageMatch(books: Book[]) {
		return books.reduce((acc: { [key: string]: Book[] }, book) => {
			if (book.date_finished && (!showReflections || (showReflections && book.has_page))) {
				const bookYear = book.date_finished.split('-')[0];
				if (!acc[bookYear]) {
					acc[bookYear] = [];
				}
				acc[bookYear].push(book);
			}
			return acc;
		}, {});
	}

	const booksByYear = useMemo(() => groupBooksByYearWithConditionalPageMatch(filterBooksByAuthor(authorFilter)), [authorFilter, showReflections]);

	// Sort the books by year
	Object.keys(booksByYear).forEach((year) => {
		booksByYear[year].sort((a, b) => new Date(b.date_finished!).getTime() - new Date(a.date_finished!).getTime());
	});

	function filterByAuthor(author: string | null) {
		setAuthorFilter(author);
		if (pageRef.current) pageRef.current.scrollIntoView(false);
	}

	useEffect(() => {
		if (bookKey !== null) {
			if (pageRef.current) pageRef.current.scrollIntoView(false);
			const url = `/assets/book_posts/${bookKey}/response.md`;
			fetch(url)
				.then((res) => res.text())
				.then((res) => setPost(res))
				.catch((error) => console.error('Error fetching the markdown file:', error));
		} else {
			setPost('');
		}
	}, [bookKey]);

	return (
		<div className={`flex flex-grow flex-col items-center space-y-8 @container ${darkMode ? '' : 'bg-white'} ${notoSans.className} relative`}>
			<header className="@lg:w-3/4 @5xl:w-2/3 w-full flex justify-between items-center flex-row h-16 pointer-events-none top-0 sticky @xl:pt-0 pt-10 whitespace-nowrap z-10">
				<div className="flex items-center justify-between text-xs hidden @xl:flex w-24">
					<button
						className={`mr-4 uppercase hover:underline pointer-events-auto ${tab === 'books' && !loading ? 'underline' : ''} w-10  `}
						onClick={() => {
							setTab('books');
							setDropAll(false);
						}}>
						{LangParser(language, 'Books', '图书', '図書')}
					</button>
					<button
						className={`mr-4 uppercase hover:underline pointer-events-auto ${tab === 'films' && !loading ? 'underline' : ''} w-10`}
						onClick={() => {
							setTab('films');
							setDropAll(false);
						}}>
						{LangParser(language, 'Films', '电影', '映画')}
					</button>
					<button
						className={`mr-4 uppercase hover:underline pointer-events-auto ${tab === 'meditations' && !loading ? 'underline' : ''} w-10`}
						onClick={() => {
							setTab('meditations');
							setDropAll(false);
						}}>
						{LangParser(language, 'Meditations', '沉思录', '瞑想')}
					</button>
				</div>
				<div className="flex items-center text-xs @xl:hidden pointer-events-auto pl-8">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<IconMenu2 className="stroke-1" />
						</DropdownMenuTrigger>
						<DropdownMenuContent className="absolute -left-3">
							<DropdownMenuItem>
								<button
									className={`mr-4 uppercase hover:underline pointer-events-auto ${tab === 'books' && !loading ? 'underline' : ''} w-10  `}
									onClick={() => {
										setTab('books');
										setDropAll(false);
									}}>
									{LangParser(language, 'Books', '图书', '図書')}
								</button>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<button
									className={`mr-4 uppercase hover:underline pointer-events-auto ${tab === 'films' && !loading ? 'underline' : ''} w-10`}
									onClick={() => {
										setTab('films');
										setDropAll(false);
									}}>
									{LangParser(language, 'Films', '电影', '映画')}
								</button>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<button
									className={`mr-4 uppercase hover:underline pointer-events-auto ${tab === 'meditations' && !loading ? 'underline' : ''} w-10`}
									onClick={() => {
										setTab('meditations');
										setDropAll(false);
									}}>
									{LangParser(language, 'Meditations', '沉思录', '瞑想')}
								</button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<span
					className={`absolute w-full text-4xl select-none flex flex-row items-center justify-center ${
						darkMode ? 'text-white' : ''
					} pointer-events-none`}>
					<div className={`absolute flex`}>
						ES
						<button
							className="transition-all pointer-events-auto text-accent hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 cursor-pointer"
							onClick={() => setDropAll(true)}>
							S
						</button>
						ENCE
					</div>
					ES<div className="text-zinc-500">S</div>ENCE
				</span>
				<div className="flex items-center justify-between text-xs hidden @xl:flex">
					<div
						className="mr-4 uppercase hover:underline pointer-events-auto text-center w-fit flex justify-center relative"
						onMouseOver={() => setLanguageHover(true)}
						onMouseLeave={() => setLanguageHover(false)}>
						{LangParser(language, 'English', '中文', '日本語')}
						<div
							className={`absolute top-4 z-10 bg-white bg-white border-[1px] border-black pointer-events-auto flex flex-col w-20 space-y-2 ${languageHover ? '' : 'invisible'}`}>
							<button
								className="hover:underline pt-1"
								onClick={() => setLanguage(language === 'en' ? 'jp' : language === 'jp' ? 'cn' : language === 'cn' ? 'en' : 'jp')}>
								{LangParser(language, '日本語', 'English', '中文')}
							</button>
							<button
								className="hover:underline py-1"
								onClick={() => setLanguage(language === 'en' ? 'cn' : language === 'jp' ? 'en' : language === 'cn' ? 'jp' : 'cn')}>
								{LangParser(language, '中文', '日本語', 'English')}
							</button>
						</div>
					</div>

					<button
						// key={toReadBooks.length}
						className="uppercase hover:underline pointer-events-auto whitespace-nowrap"
						onClick={() => {
							setTab('bag');
							setDropAll(false);
						}}>
						{LangParser(language, `Bag (${toReadBooks.length})`, `购物袋 (${toReadBooks.length})`, `カート（${toReadBooks.length}）`)}
					</button>
				</div>
				<button className="flex items-center text-xs @xl:hidden pointer-events-auto pr-8" onClick={() => setTab('bag')}>
					<IconShoppingBag className="stroke-1" />
				</button>
			</header>

			<div ref={pageRef} />

			{tab === 'books' && !loading && (
				<>
					<div className={`${!bookKey ? '' : 'hidden'} mb-12 flex flex-row w-full px-8 @3xl:px-0 max-w-[1400px]`}>
						<span className="@3xl:flex w-[15%] hidden text-xs space-y-1 flex flex-col mb-12 px-4 @6xl:px-8">
							<button
								className={`font-bold text-left hover:underline ${showReflections && 'underline text-accent'} w-fit flex items-center`}
								onClick={() => setShowReflections(!showReflections)}>
								Show reflections
								<IconCircleFilled className="text-accent h-2 w-2 ml-1" />
							</button>
							<div
								className={`font-bold mb-4 hover:underline cursor-pointer ${authorFilter === null ? 'underline' : ''} w-fit`}
								onClick={() => filterByAuthor(null)}>
								{'ALL AUTHORS'}
							</div>
							{authorsList.map((author, index) => (
								<button
									className={`text-left ${darkMode ? 'text-white' : ''} hover:underline cursor-pointer ${
										authorFilter === author ? 'underline' : ''
									} w-fit`}
									key={index}
									onClick={() => {
										filterByAuthor(author);
									}}>
									{author}
								</button>
							))}
						</span>
						<div className={`flex flex-col @3xl:w-[70%] relative`}>
							<div className="absolute right-0 text-sm"></div>
							{authorFilter && <div className="text-left text-xl uppercase pb-8">{authorFilter}</div>}
							<div className={`mb-12 @5xl:mb-40  ${currentBooks.length === 0 && 'hidden'}`}>
								<h2 className={`text-4xl text-center select-none ${darkMode ? 'text-white' : ''}`}>
									{currentBooks.length > 0 && 'Current'}
								</h2>
								<div className="grid grid-cols-3 @3xl:px-0 @2xl:grid-cols-4 @7xl:grid-cols-5 gap-2 @xl:gap-5 items-end self-center flex w-full mt-5 @5xl:mt-20">
									{currentBooks.map((book) => (
										<BookComponent
											book={book}
											setAuthorFilter={filterByAuthor}
											dropAll={dropAll}
											darkMode={darkMode}
											language={language}
											setBook={setBook}
											key={book.key}
										/>
									))}
								</div>
							</div>

							{Object.entries(booksByYear)
								.sort((a, b) => Number(b[0]) - Number(a[0]))
								.map(([year, booksForYear]) => (
									<div className="mb-12 @5xl:mb-40" key={year}>
										<h2 className={`text-4xl text-center select-none ${darkMode ? 'text-white' : ''}`}>{year}</h2>
										<div className="grid grid-cols-3 @3xl:px-0 @2xl:grid-cols-4 @7xl:grid-cols-5 gap-2 @xl:gap-5 items-end self-center flex w-full mt-5 @5xl:mt-20">
											{booksForYear.map((book) => (
												<BookComponent
													book={book}
													setAuthorFilter={filterByAuthor}
													dropAll={dropAll}
													darkMode={darkMode}
													language={language}
													setBook={setBook}
													key={book.key}
												/>
											))}
										</div>
									</div>
								))}
						</div>
					</div>
					<div className={`${bookKey ? '' : 'hidden'} flex flex-col @md:flex-row max-w-5xl px-8 justify-center w-full`}>
						<div className="flex flex-col justify-start h-min @md:w-[30%] gap-y-5 h-full text-xs uppercase mb-12 @7xl:sticky @7xl:top-32 shrink-0">
							<button onClick={() => setBook(null)} className="w-fit">
								<IconChevronLeft className="stroke-1" />
							</button>
							<Image
								src={`assets/covers/${selectedBook?.cover}_md.jpg`}
								alt=""
								width="200"
								height="300"
								className="object-contain border-[1px] border-[#8E8E8E] w-[60%] h-auto self-center"
							/>
							<div className="overflow-hidden whitespace-nowrap w-full text-left">
								<span className="flex flex-row">{`$${selectedBook?.price} AUD`}</span>
								<span className="normal-case text-[#8E8E8E]">Taxes and duties included.</span>
							</div>
							<DropdownComponent
								className="border-[1px] border-[#8E8E8E]"
								selectedOption={selectedOption}
								setSelectedOption={setSelectedOption}
							/>
							<div className="w-full flex items-center">
								<button
									className="bg-black text-white p-3 w-[55%] text-center uppercase"
									onClick={() => {
										if (selectedOption !== 'Select a quantity') {
											for (let i = 0; i < parseInt(selectedOption); i++) {
												if (selectedBook) {
													setToReadBooks((prev) => [...prev, selectedBook]);
												}
											}
										}
									}}>
									Add to bag
								</button>
								<button className="text-center w-[45%] uppercase text-[#8E8E8E] cursor-default">Add to wishlist</button>
							</div>
							<div className="normal-case flex flex-col">
								<span>Made in Shanghai, China.</span>
								<span>Designed in Sydney, Australia.</span>
								<br />
								<span>Date read: {selectedBook?.date_finished}</span>
								<span>Last edited: {selectedBook?.last_edited.slice(0, 10)}</span>
							</div>
							<span>B00{selectedBook?.key}</span>
							<span className="text-[#8E8E8E] normal-case">Free shipping on orders over $100 AUD.</span>
						</div>
						<div
							className="flex flex-col @md:w-[70%] px-5 overflow-auto text-xs mb-12 shrink-0 select-text"
							onPointerDownCapture={(e) => e.stopPropagation()}>
							<span className="uppercase text-sm">{selectedBook?.author}</span>
							<span className="mb-5 text-lg">{selectedBook?.title}</span>
							<Markdown
								className={`text-left prose prose-sm prose-zinc prose-quoteless prose-blockquote:border-l-[1px] prose-blockquote:border-[#8E8E8E] prose-blockquote:m-0 prose-blockquote:pl-3`}>
								{post}
							</Markdown>
						</div>
					</div>
				</>
			)}

			{tab === 'films' && !loading && (
				<div className="w-full max-w-6xl mb-12 px-8 @6xl:px-0">
					<Masonry columns={window.innerWidth > 1200 ? 5 : 4} spacing={2} className="flex items-center flex-col ">
						{sortedMovies.map((movie) => (
							<FallingImageComponent
								image={{
									src: `assets/movies/${movie.title}_300px.jpg`,
									title: movie.title,
								}}
								triggerDrop={dropAll}
								delay={1.5 * Math.random()}
							/>
						))}
					</Masonry>
				</div>
			)}

			{tab === 'meditations' && !loading && (
				<div className="flex items-center pb-12 px-8 @6xl:px-0 flex-col w-full max-w-6xl divide-y-2 divide-secondary/20 text-sm">
					{quotes.map((quote) => (
						<div className="w-full py-5 space-y-5" key={quote.quote}>
							<p className={`text-left whitespace-pre-line ${quote.name ? '' : 'italic'}`}>{quote.quote}</p>
							{quote.name && <p className="text-right">{'― ' + quote.name}</p>}
						</div>
					))}
				</div>
			)}

			{tab === 'data' && !loading && <div className="flex justify-center items-center text-2xl">"UNDER CONSTRUCTION"</div>}

			{tab === 'bag' && !loading && (
				<div className="mb-12 @6xl:px-0 px-8 flex items-center justify-center flex-col w-full max-w-6xl flex-grow">
					<h2
						className="text-2xl px-8 text-left w-full max-w-4xl
                        ">
						{LangParser(language, 'SHOPPING BAG', '购物袋', 'ショッピング カート')}
					</h2>
					<div className="divide-y flex flex-col max-w-4xl w-full">
						{toReadBooks.map((book, i) => (
							<div className="flex flex-row h-30 md:h-44 px-8 relative">
								<div className="w-16 md:w-24 mr-2 my-2 shrink-0">
									<FallingImageComponent
										key={book.key}
										image={{
											src: `assets/covers/${book.cover}_md.jpg`,
											title: book.title,
										}}
										triggerDrop={dropAll}
										delay={1.5 * Math.random()}
									/>
								</div>
								<div className={`text-left text-xs flex flex-grow flex-col space-y-1 ${darkMode ? 'text-white' : ''} mt-2`}>
									<p className="overflow-hidden whitespace-nowrap overflow-ellipsis uppercase">{book.author}</p>
									<p className="overflow-hidden whitespace-wrap overflow-ellipsis">{book.title}</p>
									{isPrime(book.price) && (
										<div className="text-[#FF2B00] pt-1">
											{LangParser(
												language,
												'This item is on final sale. It cannot be exchanged or returned.',
												'这款产品已是最终折扣，不支持退换。',
												'本商品は返品交換不可です。お客様都合による返品や交換は承れません。',
											)}
										</div>
									)}
								</div>
								<div className="flex flex-col items-end my-2 shrink-0 justify-between">
									<p className="text-xs">{`$${book.price}.00 AUD`}</p>
									<button
										className="text-xs underline"
										onClick={() => setToReadBooks(toReadBooks.filter((_, index) => index !== i))}>
										Remove
									</button>
								</div>
							</div>
						))}
						{toReadBooks.length !== 0 && (
							<div className="flex flex-row h-30 md:h-44 px-8">
								<div className="w-16 md:w-24 mr-2 my-2 shrink-0"></div>
								<div className={`text-left text-xs flex flex-grow flex-col ${darkMode ? 'text-white' : ''} mt-2`}>
									<p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
										{LangParser(language, 'Total', '总金额', '合計')}
									</p>
									<p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
										{LangParser(language, 'Shipping estimate', '预计运费', '送料（推定）')}
									</p>
									<p className="overflow-hidden whitespace-nowrap overflow-ellipsis font-bold pt-1">
										{LangParser(language, 'Order Total', '订单总计', 'ご注文合計')}
									</p>
								</div>
								<span className="text-xs flex flex-col mt-2 items-end">
									<p>{`$${toReadBooks.reduce((total, book) => total + book.price, 0)}.00 AUD`}</p>
									<p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
										{LangParser(language, 'Calculated at Checkout', '待确定', 'チェックアウト時に計算')}
									</p>
									<p className="font-bold pt-1">{`$${toReadBooks.reduce((total, book) => total + book.price, 0)}.00 AUD`}</p>
								</span>
							</div>
						)}
					</div>
					{toReadBooks.length === 0 && (
						<p className="mt-12">{LangParser(language, 'Your bag is empty.', '您的购物袋已空。', 'カートは空です。')}</p>
					)}
				</div>
			)}
		</div>
	);
}
