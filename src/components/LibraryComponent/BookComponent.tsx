import FallingImageComponent from './FallingImageComponent';
import { Book } from '@/components/types';

export default function BookComponent({
	book,
	setAuthorFilter,
	dropAll,
	language,
	setBook,
}: {
	book: Book;
	setAuthorFilter: (author: string) => void;
	dropAll: boolean;
	language: string;
	setBook: (book: Book) => void;
}) {
	return (
		<div className="flex flex-col">
			<FallingImageComponent
				image={{
					src: `assets/covers/${book.cover}_md.jpg`,
					title: book.title,
				}}
				triggerDrop={dropAll}
				delay={1.5 * Math.random()}
				onClick={book.has_page ? () => setBook(book) : undefined}
			/>
			<div className={`mt-2 text-left text-xs`}>
				<div className="pointer-events-auto flex flex-row space-x-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
					{book.author.split(',').map((author, index, array) => (
						<button key={index} className="uppercase hover:underline" onClick={() => setAuthorFilter(author.trim())}>
							{author}
							{index < array.length - 1 ? ',' : ''}
						</button>
					))}
				</div>
				{book.has_page ? (
					<button
						className="w-full overflow-hidden whitespace-nowrap text-left"
						onClick={() => {
							setBook(book);
						}}>
						<span className="block overflow-hidden overflow-ellipsis">{book.title}</span>
						<span className="flex flex-row">
							<p className="">{`$${book.price}`}</p>
						</span>
					</button>
				) : (
					<>
						<p className="overflow-hidden overflow-ellipsis whitespace-nowrap">{book.title}</p>
						<span className="flex flex-row text-[#8E8E8E]">
							<p className="line-through">{`$${book.price}`}</p>
							<p className="ml-1 text-[#FF2B00]">
								{language === 'en' ? 'SOLD OUT' : language === 'jp' ? '在庫切れ' : language === 'cn' ? '售完' : 'SOLD OUT'}
							</p>
						</span>
					</>
				)}
			</div>
		</div>
	);
}
