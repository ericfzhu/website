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

const convertStringToTwoDigitNumber = (input: string): number => {
    let num = 0
    for (let i = 0; i < input.length; i++) {
        num = (num + input.charCodeAt(i)) % 100
    }
    return num
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
        <div
            className={`flex min-h-screen flex-col items-center justify-between overflow-hidden space-y-8 ${
                darkMode ? '' : 'bg-white'
            }`}
        >
            <div className="mb-12 px-8 flex items-center flex-col">
                <span
                    className={`text-4xl py-4 select-none flex ${
                        darkMode ? 'text-white' : ''
                    } fixed top-0 pointer-events-none`}
                >
                    <div className={`absolute`}>
                        ES
                        <button
                            className="transition-all pointer-events-auto text-accent hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0"
                            onClick={() => setDropAll(true)}
                        >
                            S
                        </button>
                        ENSE
                    </div>
                    ES<div className="text-slate-500">S</div>
                    ENSE
                </span>
                <div className="grid grid-cols-4 gap-4 items-end flex mt-20 max-w-5xl">
                    {currentBooks.map((book) => (
                        <div className="flex flex-col pb-4">
                            <BookComponent
                                key={book.key}
                                book={book}
                                triggerDrop={dropAll}
                                delay={book.delay!}
                                darkMode={darkMode}
                            />
                            <div
                                className={`text-left text-xs ${
                                    darkMode ? 'text-white' : ''
                                } mt-2`}
                            >
                                <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                                    {book.author}
                                </p>
                                <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                                    {book.title}
                                </p>
                                <p>
                                    {'$' +
                                        convertStringToTwoDigitNumber(
                                            book.title
                                        )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {Object.entries(booksByYear)
                .sort((a, b) => Number(b[0]) - Number(a[0]))
                .map(([year, booksForYear]) => (
                    <div className="mb-12 px-8" key={year}>
                        <h2
                            className={`text-4xl text-center select-none ${
                                darkMode ? 'text-white' : ''
                            }`}
                        >
                            {year}
                        </h2>
                        <div className="grid grid-cols-4 gap-4 items-end flex mt-20 max-w-5xl">
                            {booksForYear.map((book) => (
                                <div className="flex flex-col pb-4">
                                    <BookComponent
                                        key={book.key}
                                        book={book}
                                        triggerDrop={dropAll}
                                        delay={book.delay!}
                                        darkMode={darkMode}
                                    />
                                    <div
                                        className={`text-left text-xs ${
                                            darkMode ? 'text-white' : ''
                                        } mt-2`}
                                    >
                                        <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                                            {book.author}
                                        </p>
                                        <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                                            {book.title}
                                        </p>
                                        <p>
                                            {'$' +
                                                convertStringToTwoDigitNumber(
                                                    book.title
                                                )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    )
}
