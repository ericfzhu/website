import { FallingImageComponent } from '@/components';
import { Book } from '@/components/types';

export default function BookComponent({
	book,
	setAuthorFilter,
	dropAll,
	darkMode,
	language,
	setBook,
}: {
	book: Book;
	setAuthorFilter: (author: string) => void;
	dropAll: boolean;
	darkMode: boolean;
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
			<div className={`text-left text-xs ${darkMode ? 'text-white' : ''} mt-2`}>
				<div className="overflow-hidden whitespace-nowrap overflow-ellipsis pointer-events-auto space-x-1 flex flex-row">
					{book.author.split(',').map((author, index, array) => (
						<button key={index} className="hover:underline uppercase" onClick={() => setAuthorFilter(author.trim())}>
							{author}
							{index < array.length - 1 ? ',' : ''}
						</button>
					))}
				</div>
				{book.has_page ? (
						<button
							className="overflow-hidden whitespace-nowrap w-full text-left" 
							onClick={() => {
									setBook(book)
							}}>
							<span className="overflow-ellipsis block overflow-hidden">{book.title}</span>
							<span className="flex flex-row">
								<p className="">{`$${book.price}`}</p>
							</span>
						</button>
				) : (
					<>
						<p
							className="overflow-hidden whitespace-nowrap overflow-ellipsis">
							{book.title}
						</p>
						<span className="text-slate-500 flex flex-row">
							<p className="line-through">{`$${book.price}`}</p>
							<p className="ml-1">
								{language === 'en' ? 'SOLD OUT' : language === 'jp' ? '在庫切れ' : language === 'cn' ? '售完' : 'SOLD OUT'}
							</p>
						</span>
					</>
				)}
			</div>
		</div>
	);
}
