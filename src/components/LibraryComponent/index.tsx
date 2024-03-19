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
import { cn } from '@/lib/utils';

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

export default function LibraryComponent() {
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

	useEffect(() => {
		if (pageRef.current) pageRef.current.scrollIntoView(false);
	}, [tab, authorFilter]);

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
		<div className={cn('relative flex flex-grow flex-col items-center space-y-8 @container', notoSans.className)}>
			<header className="pointer-events-none sticky top-0 z-10 flex h-16 w-full flex-row items-center justify-between whitespace-nowrap pt-10 @lg:w-3/4 @xl:pt-0 @5xl:w-2/3">
				<div className="hidden w-24 items-center justify-between text-xs @xl:flex">
					<button
						className={cn('pointer-events-auto mr-4 w-10 uppercase hover:underline', tab === 'books' && !loading ? 'underline' : '')}
						onClick={() => {
							setTab('books');
							setDropAll(false);
						}}>
						{LangParser(language, 'Books', '图书', '図書')}
					</button>
					<button
						className={cn('pointer-events-auto mr-4 w-10 uppercase hover:underline', tab === 'films' && !loading ? 'underline' : '')}
						onClick={() => {
							setTab('films');
							setDropAll(false);
						}}>
						{LangParser(language, 'Films', '电影', '映画')}
					</button>
					<button
						className={cn(
							'pointer-events-auto mr-4 w-10 uppercase hover:underline',
							tab === 'meditations' && !loading ? 'underline' : '',
						)}
						onClick={() => {
							setTab('meditations');
							setDropAll(false);
						}}>
						{LangParser(language, 'Meditations', '沉思录', '瞑想')}
					</button>
				</div>
				<div className="pointer-events-auto flex items-center pl-8 text-xs @xl:hidden">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<IconMenu2 className="stroke-1" />
						</DropdownMenuTrigger>
						<DropdownMenuContent className="absolute -left-3">
							<DropdownMenuItem>
								<button
									className={cn(
										'pointer-events-auto mr-4 w-10 uppercase hover:underline',
										tab === 'books' && !loading ? 'underline' : '',
									)}
									onClick={() => {
										setTab('books');
										setDropAll(false);
									}}>
									{LangParser(language, 'Books', '图书', '図書')}
								</button>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<button
									className={cn(
										'pointer-events-auto mr-4 w-10 uppercase hover:underline',
										tab === 'films' && !loading ? 'underline' : '',
									)}
									onClick={() => {
										setTab('films');
										setDropAll(false);
									}}>
									{LangParser(language, 'Films', '电影', '映画')}
								</button>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<button
									className={cn(
										'pointer-events-auto mr-4 w-10 uppercase hover:underline',
										tab === 'meditations' && !loading ? 'underline' : '',
									)}
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

				<span className={`pointer-events-none absolute flex w-full select-none flex-row items-center justify-center text-4xl`}>
					<div className={`absolute flex`}>
						ES
						<button
							className="pointer-events-auto cursor-pointer text-accent transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0"
							onClick={() => setDropAll(true)}>
							S
						</button>
						ENCE
					</div>
					ES<div className="text-zinc-500">S</div>ENCE
				</span>
				<div className=" hidden items-center justify-between text-xs @xl:flex">
					<div
						className="pointer-events-auto relative mr-4 flex w-fit justify-center text-center uppercase hover:underline"
						onMouseOver={() => setLanguageHover(true)}
						onMouseLeave={() => setLanguageHover(false)}>
						{LangParser(language, 'English', '中文', '日本語')}
						<div
							className={cn(
								'pointer-events-auto absolute top-4 z-10 flex w-20 flex-col space-y-2 border-[1px] border-black bg-white',
								languageHover ? '' : 'invisible',
							)}>
							<button
								className="pt-1 hover:underline"
								onClick={() => setLanguage(language === 'en' ? 'jp' : language === 'jp' ? 'cn' : language === 'cn' ? 'en' : 'jp')}>
								{LangParser(language, '日本語', 'English', '中文')}
							</button>
							<button
								className="py-1 hover:underline"
								onClick={() => setLanguage(language === 'en' ? 'cn' : language === 'jp' ? 'en' : language === 'cn' ? 'jp' : 'cn')}>
								{LangParser(language, '中文', '日本語', 'English')}
							</button>
						</div>
					</div>

					<button
						// key={toReadBooks.length}
						className="pointer-events-auto whitespace-nowrap uppercase hover:underline"
						onClick={() => {
							setTab('bag');
							setDropAll(false);
						}}>
						{LangParser(language, `Bag (${toReadBooks.length})`, `购物袋 (${toReadBooks.length})`, `カート（${toReadBooks.length}）`)}
					</button>
				</div>
				<button className="pointer-events-auto flex items-center pr-8 text-xs @xl:hidden" onClick={() => setTab('bag')}>
					<IconShoppingBag className="stroke-1" />
				</button>
			</header>

			<div ref={pageRef} />

			{tab === 'books' && !loading && (
				<>
					<div className={cn('mb-12 flex w-full max-w-[1400px] flex-row px-8 @3xl:px-0', !bookKey ? '' : 'hidden')}>
						<span className="mb-12 hidden w-[15%] flex-col space-y-1 px-4 text-xs @3xl:flex @6xl:px-8">
							<button
								className={cn(
									'flex w-fit items-center text-left font-bold hover:underline',
									showReflections && 'text-accent underline',
								)}
								onClick={() => setShowReflections(!showReflections)}>
								Show reflections
								<IconCircleFilled className="ml-1 h-2 w-2 text-accent" />
							</button>
							<div
								className={cn('mb-4 w-fit cursor-pointer font-bold hover:underline', authorFilter === null ? 'underline' : '')}
								onClick={() => setAuthorFilter(null)}>
								{'ALL AUTHORS'}
							</div>
							{authorsList.map((author, index) => (
								<button
									className={cn('w-fit cursor-pointer text-left hover:underline', authorFilter === author ? 'underline' : '')}
									key={index}
									onClick={() => {
										setAuthorFilter(author);
									}}>
									{author}
								</button>
							))}
						</span>
						<div className={`relative flex flex-col @3xl:w-[70%]`}>
							<div className="absolute right-0 text-sm"></div>
							{authorFilter && <div className="pb-8 text-left text-xl uppercase">{authorFilter}</div>}
							<div className={cn('mb-12 @5xl:mb-40', currentBooks.length === 0 && 'hidden')}>
								<h2 className={`select-none text-center text-4xl`}>{currentBooks.length > 0 && 'Current'}</h2>
								<div className="mt-5 grid w-full grid-cols-3 items-end gap-2 self-center @xl:gap-5 @2xl:grid-cols-4 @3xl:px-0 @5xl:mt-20 @7xl:grid-cols-5">
									{currentBooks.map((book) => (
										<BookComponent
											book={book}
											setAuthorFilter={setAuthorFilter}
											dropAll={dropAll}
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
										<h2 className={`select-none text-center text-4xl`}>{year}</h2>
										<div className="mt-5 grid w-full grid-cols-3 items-end gap-2 self-center @xl:gap-5 @2xl:grid-cols-4 @3xl:px-0 @5xl:mt-20 @7xl:grid-cols-5">
											{booksForYear.map((book) => (
												<BookComponent
													book={book}
													setAuthorFilter={setAuthorFilter}
													dropAll={dropAll}
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
					<div className={cn('flex w-full max-w-5xl flex-col justify-center px-8 @md:flex-row', bookKey ? '' : 'hidden')}>
						<div className="mb-12 flex h-full shrink-0 flex-col justify-start gap-y-5 text-xs uppercase @md:w-[30%] @7xl:sticky @7xl:top-32">
							<button onClick={() => setBook(null)} className="w-fit">
								<IconChevronLeft className="stroke-1" />
							</button>
							<Image
								src={`assets/covers/${selectedBook?.cover}_md.jpg`}
								alt=""
								width="200"
								height="300"
								className="h-auto w-[60%] self-center border-[1px] border-[#8E8E8E] object-contain"
							/>
							<div className="w-full overflow-hidden whitespace-nowrap text-left">
								<span className="flex flex-row">{`$${selectedBook?.price} AUD`}</span>
								<span className="normal-case text-[#8E8E8E]">Taxes and duties included.</span>
							</div>
							<DropdownComponent
								className="border-[1px] border-[#8E8E8E]"
								options={['Select a quantity', '1', '2', '3']}
								selectedOption={selectedOption}
								setSelectedOption={setSelectedOption}
							/>
							<div className="flex w-full items-center">
								<button
									className="w-[55%] bg-accent p-3 text-center uppercase text-white"
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
								<button className="w-[45%] cursor-default text-center uppercase text-[#8E8E8E]">Add to wishlist</button>
							</div>
							<div className="flex flex-col normal-case">
								<span>Made in Shanghai, China.</span>
								<span>Designed in Sydney, Australia.</span>
								<br />
								<span>{selectedBook?.date_finished}</span>
								{/* <span>Last edited: {selectedBook?.last_edited.slice(0, 10)}</span> */}
							</div>
							<span>B00{selectedBook?.key}</span>
							<span className="normal-case text-[#8E8E8E]">Free shipping on orders over $100 AUD.</span>
						</div>
						<div
							className="mx-auto mb-12 flex max-w-xl shrink-0 select-text flex-col overflow-auto px-5 text-xs @md:w-[70%]"
							onPointerDownCapture={(e) => e.stopPropagation()}>
							<span className="text-sm uppercase">{selectedBook?.author}</span>
							<span className="mb-5 text-lg">{selectedBook?.title}</span>
							<Markdown
								className={`prose prose-sm prose-zinc prose-quoteless text-left prose-blockquote:m-0 prose-blockquote:border-l-[1px] prose-blockquote:border-[#8E8E8E] prose-blockquote:pl-3`}>
								{post}
							</Markdown>
						</div>
					</div>
				</>
			)}

			{tab === 'films' && !loading && (
				<div className="mb-12 w-full max-w-6xl px-8 @6xl:px-0">
					<Masonry columns={window.innerWidth > 1200 ? 5 : 4} spacing={2} className="flex flex-col items-center ">
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
				<div className="flex w-full max-w-6xl flex-col items-center divide-y-2 divide-secondary/20 px-8 pb-12 text-sm @6xl:px-0">
					{quotes.map((quote) => (
						<div className="w-full space-y-5 py-5" key={quote.quote}>
							<p className={cn('whitespace-pre-line text-left', quote.name ? '' : 'italic')}>{quote.quote}</p>
							{quote.name && <p className="text-right">{'― ' + quote.name}</p>}
						</div>
					))}
				</div>
			)}

			{tab === 'data' && !loading && <div className="flex items-center justify-center text-2xl">"UNDER CONSTRUCTION"</div>}

			{tab === 'bag' && !loading && (
				<div className="mb-12 flex w-full max-w-6xl flex-grow flex-col items-center justify-center px-8 @6xl:px-0">
					<h2
						className="w-full max-w-4xl px-8 text-left text-2xl
                        ">
						{LangParser(language, 'SHOPPING BAG', '购物袋', 'ショッピング カート')}
					</h2>
					<div className="flex w-full max-w-4xl flex-col divide-y">
						{toReadBooks.map((book, i) => (
							<div className="h-30 relative flex flex-row px-8 md:h-44">
								<div className="my-2 mr-2 w-16 shrink-0 md:w-24">
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
								<div className={`mt-2 flex flex-grow flex-col space-y-1 text-left text-xs`}>
									<p className="overflow-hidden overflow-ellipsis whitespace-nowrap uppercase">{book.author}</p>
									<p className="whitespace-wrap overflow-hidden overflow-ellipsis">{book.title}</p>
									{isPrime(book.price) && (
										<div className="pt-1 text-[#FF2B00]">
											{LangParser(
												language,
												'This item is on final sale. It cannot be exchanged or returned.',
												'这款产品已是最终折扣，不支持退换。',
												'本商品は返品交換不可です。お客様都合による返品や交換は承れません。',
											)}
										</div>
									)}
								</div>
								<div className="my-2 flex shrink-0 flex-col items-end justify-between">
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
							<div className="h-30 mb-12 flex flex-row px-8 md:h-44">
								<div className="my-2 mr-2 w-16 shrink-0 md:w-24"></div>
								<div className={`mt-2 flex flex-grow flex-col text-left text-xs`}>
									<p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
										{LangParser(language, 'Total', '总金额', '合計')}
									</p>
									<p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
										{LangParser(language, 'Shipping estimate', '预计运费', '送料（推定）')}
									</p>
									<p className="overflow-hidden overflow-ellipsis whitespace-nowrap pt-1 font-bold">
										{LangParser(language, 'Order Total', '订单总计', 'ご注文合計')}
									</p>
								</div>
								<span className="mt-2 flex flex-col items-end text-xs">
									<p>{`$${toReadBooks.reduce((total, book) => total + book.price, 0)}.00 AUD`}</p>
									<p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
										{LangParser(language, 'Calculated at Checkout', '待确定', 'チェックアウト時に計算')}
									</p>
									<p className="pt-1 font-bold">{`$${toReadBooks.reduce((total, book) => total + book.price, 0)}.00 AUD`}</p>
									<button className="mt-10 bg-accent p-3 px-24 uppercase text-white">Proceed to checkout</button>
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
