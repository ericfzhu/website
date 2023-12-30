import library from '@/components/data/library.json'
import { useState } from 'react'
import BookComponent from '@/components/BookComponent'
import movies from '@/components/data/movies.json'
import Image from 'next/image'
import Masonry from '@mui/lab/Masonry'
import { IconMenu2, IconShoppingBag } from '@tabler/icons-react'

interface Book {
    title: string
    status: string
    author: string
    date_finished: string | null
    delay?: number
    key: string
}

interface Movie {
    title: string
    date_finished: string
}

const convertStringToTwoDigitNumber = (input: string): number => {
    let num = 0
    for (let i = 0; i < input.length; i++) {
        num = (num + input.charCodeAt(i)) % 61
    }
    return num + 10
}

export default function LibraryComponent({
    darkMode = false,
}: {
    darkMode?: boolean
}) {
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
    const [showTab, setShowTab] = useState<'books' | 'movies' | 'bag'>('books')

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

    const moviesArray: Movie[] = Object.entries(movies).map(([key, movie]) => ({
        key,
        ...movie,
    }))

    const sortedMovies = moviesArray.sort(
        (a, b) =>
            new Date(b.date_finished || '').getTime() -
            new Date(a.date_finished || '').getTime()
    )

    return (
        <div
            className={`flex min-h-screen flex-col items-center justify-between overflow-hidden space-y-8 @container ${
                darkMode ? '' : 'bg-white'
            }`}
        >
            <header className="w-10/12 xl:w-2/3 flex justify-between items-center fixed h-16 pointer-events-none pt-10 xl:pt-0 z-10">
                <div className="flex items-center text-xs hidden @xl:flex">
                    <button
                        className={`mr-4 uppercase hover:underline pointer-events-auto ${showTab === 'books' ? 'underline' : ''}`}
                        onClick={() => {
                            setShowTab('books')
                            setDropAll(false)
                        }}
                    >
                        Books
                    </button>
                    <button
                        className={`mr-4 uppercase hover:underline pointer-events-auto ${showTab === 'movies' ? 'underline' : ''}`}
                        onClick={() => setShowTab('movies')}
                    >
                        Movies
                    </button>
                </div>
                <div className="flex items-center text-xs @xl:hidden pointer-events-auto">
                    <IconMenu2 className='stroke-1'/>
                </div>
                <span
                    className={`absolute w-full text-4xl select-none flex flex-row items-center justify-center ${
                        darkMode ? 'text-white' : ''
                    } pointer-events-none`}
                >
                    <div className={`absolute flex`}>
                        ES
                        <button
                            className="transition-all pointer-events-auto text-accent hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 cursor-pointer"
                            onClick={() => {
                                if (showTab === 'books') setDropAll(true)
                            }}
                        >
                            S
                        </button>
                        ENCE
                    </div>
                    ES<div className="text-slate-500">S</div>ENCE
                </span>
                <div className="flex items-center text-xs hidden @xl:flex">
                    <button className="mr-4 uppercase hover:underline pointer-events-auto">
                        English
                    </button>
                    <button className="uppercase hover:underline pointer-events-auto" onClick={() => setShowTab('bag')}>
                        Bag (0)
                    </button>
                </div>
                <button className="flex items-center text-xs @xl:hidden pointer-events-auto" onClick={() => setShowTab('bag')}>
                    <IconShoppingBag className='stroke-1' />
                </button>
            </header>

            {showTab === 'books' ? (
                <>
                    <div className="mb-12 px-8 flex items-center flex-col w-full">
                        <div className="grid grid-cols-4 gap-5 items-end flex mt-20 max-w-5xl w-full">
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
                                        <span className="text-slate-500 flex flex-row">
                                            <p className="line-through">
                                                {'$' +
                                                    convertStringToTwoDigitNumber(
                                                        book.title
                                                    )}
                                            </p>
                                            <p className="ml-1">SOLD OUT</p>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {Object.entries(booksByYear)
                        .sort((a, b) => Number(b[0]) - Number(a[0]))
                        .map(([year, booksForYear]) => (
                            <div
                                className="mb-12 px-8 w-full items-center flex flex-col"
                                key={year}
                            >
                                <h2
                                    className={`text-4xl text-center select-none ${
                                        darkMode ? 'text-white' : ''
                                    }`}
                                >
                                    {year}
                                </h2>
                                <div className="grid grid-cols-4 gap-5 items-end flex mt-20 max-w-5xl w-full">
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
                                                <span className="text-slate-500 flex flex-row">
                                                    <p className="line-through">
                                                        {'$' +
                                                            convertStringToTwoDigitNumber(
                                                                book.title
                                                            )}
                                                    </p>
                                                    <p className="ml-1">
                                                        SOLD OUT
                                                    </p>
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                </>
            ) : showTab === 'movies' ? (
                <div className="pt-20 mb-12 px-8 flex items-center flex-col w-full max-w-6xl">
                    <Masonry
                        columns={4}
                        spacing={2}
                        className="flex items-center pointer-events-none"
                    >
                        {sortedMovies.map((movie) => (
                            <Image
                                key={movie.title}
                                className="shadow-lg ring-1 ring-secondary"
                                height="300"
                                width="200"
                                src={`assets/movies/${movie.title}_300px.jpg`}
                                alt={movie.title}
                            />
                        ))}
                    </Masonry>
                </div>
            ) : (
                <div className="pt-20 mb-12 px-8 flex items-center flex-col w-full max-w-6xl">
                    <div className="text-left w-full">
                        <h2 className="text-2xl">BAG</h2>
                        <p>Your bag is empty.</p>
                    </div>
                </div>
            )}
        </div>
    )
}
