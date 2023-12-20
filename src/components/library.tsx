import library from '@/components/data/library.json'
import { useEffect, useState } from 'react'
import BookComponent from '@/components/BookComponent'

interface Book {
    title: string
    status: string
    author: string
    date_finished: string | null
    delay?: number
    key: string
}

export default function Library({ darkMode = false }: { darkMode?: boolean }) {
    const [dropAll, setDropAll] = useState(false)
    const booksByYear: { [key: string]: Book[] } = {}
    const booksArray: Book[] = Object.entries(library).map(([key, book]) => ({
        key,
        ...book,
    }))
    let audio: HTMLAudioElement
    if (typeof window !== 'undefined') {
        audio = new Audio('/elevator.mp3')
    }
    const currentBooks = booksArray.filter((book) => book.status === 'Reading')

    currentBooks.forEach((book, index) => {
        book.delay = 1.5 * Math.random()
    })

    booksArray.forEach((book) => {
        if (book.date_finished) {
            const bookYear = book.date_finished.split('-')[0]
            if (!booksByYear[bookYear]) {
                booksByYear[bookYear] = []
            }
            booksByYear[bookYear].push(book)
        }
    })

    const sortedYears = Object.keys(booksByYear).sort(
        (a, b) => Number(b) - Number(a)
    )

    sortedYears.forEach((year) => {
        booksByYear[year].forEach((book) => {
            book.delay = 1.5 * Math.random()
        })
    })

    for (let bookYear in booksByYear) {
        booksByYear[bookYear].sort(
            (a, b) =>
                new Date(b.date_finished || '').getTime() -
                new Date(a.date_finished || '').getTime()
        )
    }

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between overflow-hidden space-y-8`}
        >
            <div className="mb-12 px-8 flex items-center flex-col">
                <span
                    className={`text-4xl md:text-5xl lg:text-6xl py-4 text-center select-none flex ${
                        darkMode ? 'text-white' : ''
                    }`}
                >
                    <div className={`absolute`}>
                        Rea
                        <button
                            className="transition-all text-accent hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0"
                            onClick={() => setDropAll(true)}
                        >
                            d
                        </button>
                        ing
                    </div>
                    Rea
                    <div className="text-slate-500">d</div>
                    ing
                </span>
                <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-4 pb-8">
                    {currentBooks.map((book) => (
                        <BookComponent
                            key={book.key}
                            book={book}
                            triggerDrop={dropAll}
                            delay={book.delay!}
                            darkMode={darkMode}
                        />
                    ))}
                </div>
            </div>

            {Object.entries(booksByYear)
                .sort((a, b) => Number(b[0]) - Number(a[0]))
                .map(([year, booksForYear]) => (
                    <div className="mb-12 px-8" key={year}>
                        <h2
                            className={`text-4xl md:text-5xl lg:text-6xl pb-4 text-center select-none ${
                                darkMode ? 'text-white' : ''
                            }`}
                        >
                            {year}
                        </h2>
                        <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-4 pb-8">
                            {booksForYear.map((book) => (
                                <BookComponent
                                    key={book.key}
                                    book={book}
                                    triggerDrop={dropAll}
                                    delay={book.delay!}
                                    darkMode={darkMode}
                                />
                            ))}
                        </div>
                    </div>
                ))}
        </main>
    )
}
