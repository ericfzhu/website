import { FallingImageComponent } from '@/components'

interface Book {
    title: string
    status: string
    author: string
    date_finished: string | null
    delay?: number
    key: string
    price: number
}

export default function BookComponent({
    book,
    setAuthorFilter,
    dropAll,
    darkMode,
    language,
}: {
    book: Book
    setAuthorFilter: (author: string) => void
    dropAll: boolean
    darkMode: boolean
    language: string
}) {
    return (
        <div className="flex flex-col">
            <FallingImageComponent
                key={book.key}
                image={{
                    src: `assets/covers/${book.key}_300px.jpg`,
                    title: book.title,
                }}
                triggerDrop={dropAll}
                delay={1.5 * Math.random()}
            />
            <div
                className={`text-left text-xs ${
                    darkMode ? 'text-white' : ''
                } mt-2`}
            >
                <div className="overflow-hidden whitespace-nowrap overflow-ellipsis uppercase pointer-events-auto space-x-1 flex flex-row">
                    {book.author.split(',').map((author, index, array) => (
                        <div
                            key={index}
                            className="cursor-pointer hover:underline"
                            onClick={() => setAuthorFilter(author.trim())}
                        >
                            {author}
                            {index < array.length - 1 ? ',' : ''}
                        </div>
                    ))}
                </div>
                <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {book.title}
                </p>
                <span className="text-slate-500 flex flex-row">
                    <p className="line-through">{`$${book.price}`}</p>
                    <p className="ml-1">
                        {language === 'en'
                            ? 'SOLD OUT'
                            : language === 'jp'
                              ? '売り切れ'
                              : language === 'cn'
                                ? '售完'
                                : 'SOLD OUT'}
                    </p>
                </span>
            </div>
        </div>
    )
}
