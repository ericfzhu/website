import library from '@/components/data/library.json'
import { Fragment, useRef, useState } from 'react'
import { FallingImageComponent, BookComponent } from '@/components'
import movies from '@/components/data/movies.json'
import Masonry from '@mui/lab/Masonry'
import { IconMenu2, IconShoppingBag } from '@tabler/icons-react'
import { Menu, Transition } from '@headlessui/react'
import { notoSans } from '@/components/Fonts'

interface Book {
    title: string
    status: string
    author: string
    date_finished: string | null
    delay?: number
    key: string
    price: number
}

interface Movie {
    title: string
    date_finished: string
}

const convertStringToTwoDigitNumber = (input: string): number => {
    let num = 0
    for (let i = 0; i < input.length; i++) {
        num = (num + input.charCodeAt(i)) % 100
    }
    if (num < 70) {
        return (num % 16) + 5
    } else if (num < 90) {
        return (num % 10) + 16
    } else {
        return (num % 10) + 26
    }
}

const isPrime = (num: number) => {
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false
    }
    return num > 1
}

export default function LibraryComponent({
    darkMode = false,
}: {
    darkMode?: boolean
}) {
    const [authorFilter, setAuthorFilter] = useState<string | null>(null)
    const [showTab, setShowTab] = useState<'books' | 'movies' | 'bag'>('books')
    const [language, setLanguage] = useState<'cn' | 'jp' | 'en'>('en')
    const [dropAll, setDropAll] = useState(false)
    const pageRef = useRef<HTMLDivElement>(null)

    const booksArray: Book[] = Object.entries(library).map(([key, book]) => ({
        key,
        price: convertStringToTwoDigitNumber(book.title),
        ...book,
    }))

    const authorsList: string[] = Array.from(
        new Set(
            booksArray
                .filter(
                    (book) =>
                        book.status === 'Reading' || book.status === 'Finished'
                )
                .flatMap((book) =>
                    book.author.split(',').map((author) => author.trim())
                )
        )
    ).sort()

    const booksByAuthor: { [author: string]: Book[] } = authorsList.reduce(
        (acc: { [author: string]: Book[] }, author) => {
            acc[author] = booksArray.filter((book) =>
                book.author
                    .split(',')
                    .map((authorName) => authorName.trim())
                    .includes(author)
            )
            return acc
        },
        {}
    )

    const filterBooksByAuthor = (author: string | null) =>
        author ? booksByAuthor[author] : booksArray

    const currentBooks = filterBooksByAuthor(authorFilter).filter(
        (book) => book.status === 'Reading'
    )
    const toReadBooks = booksArray.filter((book) => book.status === 'To Read')

    const booksByYear: { [key: string]: Book[] } = filterBooksByAuthor(
        authorFilter
    ).reduce((acc: { [key: string]: Book[] }, book) => {
        if (book.date_finished) {
            const bookYear = book.date_finished.split('-')[0]
            if (!acc[bookYear]) {
                acc[bookYear] = []
            }
            acc[bookYear].push(book)
        }
        return acc
    }, {})

    // Sort the books by year
    Object.keys(booksByYear).forEach(year => {
        booksByYear[year].sort((a, b) => new Date(b.date_finished!).getTime() - new Date(a.date_finished!).getTime())
    })

    const moviesArray: Movie[] = Object.entries(movies).map(([key, movie]) => ({
        key,
        ...movie,
    }))
    const sortedMovies = moviesArray.sort(
        (a, b) =>
            new Date(b.date_finished || '').getTime() -
            new Date(a.date_finished || '').getTime()
    )

    function filterByAuthor(author: string | null) {
        setAuthorFilter(author)
        if (pageRef.current)
        pageRef.current.scrollIntoView(false)
    }

    return (
        <div
            className={`flex flex-grow flex-col items-center space-y-8 @container overflow-auto ${
                darkMode ? '' : 'bg-white'
            } ${notoSans.className}`}
        >
            <header className="w-2/3 mx-8 flex justify-between items-center h-16 pointer-events-none pt-10 @xl:pt-0 top-0 sticky" ref={pageRef}>
                <div className="flex items-center justify-between text-xs hidden @xl:flex w-24">
                    <button
                        className={`mr-4 uppercase hover:underline pointer-events-auto ${
                            showTab === 'books' ? 'underline' : ''
                        } w-10  `}
                        onClick={() => {
                            setShowTab('books')
                            setDropAll(false)
                        }}
                    >
                        {language === 'en'
                            ? 'Books'
                            : language === 'jp'
                              ? '図書'
                              : language === 'cn'
                                ? '图书'
                                : 'Books'}
                    </button>
                    <button
                        className={`mr-4 uppercase hover:underline pointer-events-auto ${
                            showTab === 'movies' ? 'underline' : ''
                        } w-10`}
                        onClick={() => {
                            setShowTab('movies')
                            setDropAll(false)
                        }}
                    >
                        {language === 'en'
                            ? 'Movies'
                            : language === 'jp'
                              ? '映画'
                              : language === 'cn'
                                ? '电影'
                                : 'Movies'}
                    </button>
                </div>
                <div className="flex items-center text-xs @xl:hidden pointer-events-auto">
                    <IconMenu2 className="stroke-1" />
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
                            onClick={() => setDropAll(true)}
                        >
                            S
                        </button>
                        ENCE
                    </div>
                    ES<div className="text-slate-500">S</div>ENCE
                </span>
                <div className="flex items-center justify-between text-xs hidden @xl:flex w-28">
                    <Menu as="div" className="relative items-center">
                        <Menu.Button className="mr-4 uppercase hover:underline pointer-events-auto w-10 text-center">
                            {language === 'en'
                                ? 'English'
                                : language === 'jp'
                                  ? '日本語'
                                  : language === 'cn'
                                    ? '中文'
                                    : 'English'}
                        </Menu.Button>

                        <Transition
                            as={Fragment}
                            enter="transition duration-300 ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition duration-300 ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute z-10 bg-white bg-white border-[1px] border-black pointer-events-auto flex flex-col w-20 space-y-2 -translate-x-3.5">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className="hover:underline pt-1"
                                            onClick={() =>
                                                setLanguage(
                                                    language === 'en'
                                                        ? 'jp'
                                                        : language === 'jp'
                                                          ? 'cn'
                                                          : language === 'cn'
                                                            ? 'en'
                                                            : 'jp'
                                                )
                                            }
                                        >
                                            {language === 'en'
                                                ? '日本語'
                                                : language === 'jp'
                                                  ? '中文'
                                                  : language === 'cn'
                                                    ? 'English'
                                                    : '日本語'}
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className="hover:underline py-1"
                                            onClick={() =>
                                                setLanguage(
                                                    language === 'en'
                                                        ? 'cn'
                                                        : language === 'jp'
                                                          ? 'en'
                                                          : language === 'cn'
                                                            ? 'jp'
                                                            : 'cn'
                                                )
                                            }
                                        >
                                            {language === 'en'
                                                ? '中文'
                                                : language === 'jp'
                                                  ? 'English'
                                                  : language === 'cn'
                                                    ? '日本語'
                                                    : '中文'}
                                        </button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    <button
                        className="uppercase hover:underline pointer-events-auto whitespace-nowrap"
                        onClick={() => setShowTab('bag')}
                    >
                        {language === 'en'
                            ? `Bag (${toReadBooks.length})`
                            : language === 'jp'
                              ? `カート (${toReadBooks.length})`
                              : language === 'cn'
                                ? `购物袋 (${toReadBooks.length})`
                                : `Bag (${toReadBooks.length})`}
                    </button>
                </div>
                <button
                    className="flex items-center text-xs @xl:hidden pointer-events-auto"
                    onClick={() => setShowTab('bag')}
                >
                    <IconShoppingBag className="stroke-1" />
                </button>
            </header>

            {showTab === 'books' ? (
                <>
                    <div className="mb-12 flex flex-row w-full px-8 @3xl:px-0">
                        <span className="@3xl:flex w-[15%] hidden text-xs space-y-1 flex flex-col mb-12 px-4 @6xl:px-8">
                            <div
                                className={`font-bold mb-4 hover:underline cursor-pointer ${authorFilter === null ? 'underline' : ''}`}
                                onClick={() => filterByAuthor(null)}
                            >
                                {'ALL AUTHORS'}
                            </div>
                            {authorsList.map((author, index) => (
                                <div
                                    className={`text-left ${
                                        darkMode ? 'text-white' : ''
                                    } hover:underline cursor-pointer ${authorFilter === author ? 'underline' : ''}`}
                                    key={index}
                                    onClick={() => {
                                        filterByAuthor(author)
                                    }}
                                >
                                    {author}
                                </div>
                            ))}
                        </span>
                        <div className="flex flex-col @3xl:w-[70%]">
                            {authorFilter && (
                                <div className="text-left text-xl uppercase pb-8">
                                    {authorFilter}
                                </div>
                            )}
                            <div className="grid grid-cols-3 @3xl:px-0 @2xl:grid-cols-4 @7xl:grid-cols-5 gap-2 @xl:gap-5 items-end self-center flex w-full mb-12">
                                {currentBooks.map((book) => (
                                    <BookComponent
                                        book={book}
                                        setAuthorFilter={filterByAuthor}
                                        dropAll={dropAll}
                                        darkMode={darkMode}
                                        language={language}
                                    />
                                ))}
                            </div>

                            {Object.entries(booksByYear)
                                .sort((a, b) => Number(b[0]) - Number(a[0]))
                                .map(([year, booksForYear]) => (
                                    <div className="mb-12" key={year}>
                                        <h2
                                            className={`text-4xl text-center select-none ${
                                                darkMode ? 'text-white' : ''
                                            }`}
                                        >
                                            {year}
                                        </h2>
                                        <div className="grid grid-cols-3 @3xl:px-0 @2xl:grid-cols-4 @7xl:grid-cols-5 gap-2 @xl:gap-5 items-end self-center flex w-full mt-5 @5xl:mt-20">
                                            {booksForYear.map((book) => (
                                                <BookComponent
                                                    book={book}
                                                    setAuthorFilter={
                                                        filterByAuthor
                                                    }
                                                    dropAll={dropAll}
                                                    darkMode={darkMode}
                                                    language={language}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </>
            ) : showTab === 'movies' ? (
                <Masonry
                    columns={4}
                    spacing={2}
                    className="flex items-center mb-12 px-8 @6xl:px-0 flex-col w-full max-w-6xl"
                >
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
            ) : (
                <div className="mb-12 @6xl:px-0 px-8 flex items-center justify-center flex-col w-full max-w-6xl flex-grow">
                    <h2
                        className="text-2xl px-8 text-left w-full max-w-4xl
                        "
                    >
                        {language === 'en'
                            ? 'SHOPPING BAG'
                            : language === 'jp'
                              ? 'ショッピング カート'
                              : language === 'cn'
                                ? '购物袋'
                                : 'SHOPPING BAG'}
                    </h2>
                    <div className="divide-y flex flex-col max-w-4xl w-full">
                        {toReadBooks.map((book) => (
                            <div className="flex flex-row h-30 md:h-44 px-8">
                                <div className="w-16 md:w-24 mr-2 my-2 shrink-0">
                                    <FallingImageComponent
                                        key={book.key}
                                        image={{
                                            src: `assets/covers/${book.key}_300px.jpg`,
                                            title: book.title,
                                        }}
                                        triggerDrop={dropAll}
                                        delay={1.5 * Math.random()}
                                    />
                                </div>
                                <div
                                    className={`text-left text-xs flex flex-grow flex-col space-y-1 ${
                                        darkMode ? 'text-white' : ''
                                    } mt-2`}
                                >
                                    <p className="overflow-hidden whitespace-nowrap overflow-ellipsis uppercase">
                                        {book.author}
                                    </p>
                                    <p className="overflow-hidden whitespace-wrap overflow-ellipsis">
                                        {book.title}
                                    </p>
                                    {isPrime(book.price) && (
                                        <div className="text-[#FF2B00] pt-1">
                                            {language === 'en'
                                                ? 'This item is on final sale. It cannot be exchanged or returned.'
                                                : language === 'jp'
                                                  ? '本商品は返品交換不可です。お客様都合による返品や交換は承れません。'
                                                  : language === 'cn'
                                                    ? '这款产品已是最终折扣，不支持退换。'
                                                    : 'This item is on final sale. It cannot be exchanged or returned.'}
                                        </div>
                                    )}
                                </div>
                                <span className="text-xs flex flex-row mt-2 shrink-0">
                                    <p className="">{`$${book.price}.00`}</p>
                                </span>
                            </div>
                        ))}
                        <div className="flex flex-row h-30 md:h-44 px-8">
                            <div className="w-16 md:w-24 mr-2 my-2 shrink-0"></div>
                            <div
                                className={`text-left text-xs flex flex-grow flex-col ${
                                    darkMode ? 'text-white' : ''
                                } mt-2`}
                            >
                                <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                                    {language === 'en'
                                        ? 'Total'
                                        : language === 'jp'
                                          ? '合計'
                                          : language === 'cn'
                                            ? '总金额'
                                            : 'Total'}
                                </p>
                                <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                                    {language === 'en'
                                        ? 'Shipping estimate'
                                        : language === 'jp'
                                          ? '送料（推定）'
                                          : language === 'cn'
                                            ? '预计运费'
                                            : 'Shipping estimate'}
                                </p>
                                <p className="overflow-hidden whitespace-nowrap overflow-ellipsis font-bold pt-1">
                                    {language === 'en'
                                        ? 'Order Total'
                                        : language === 'jp'
                                          ? 'ご注文合計'
                                          : language === 'cn'
                                            ? '订单总计'
                                            : 'Order Total'}
                                </p>
                            </div>
                            <span className="text-xs flex flex-col mt-2 items-end">
                                <p>{`$${toReadBooks.reduce(
                                    (total, book) => total + book.price,
                                    0
                                )}.00`}</p>
                                <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                                    {language === 'en'
                                        ? 'Calculated at Checkout'
                                        : language === 'jp'
                                          ? 'チェックアウト時に計算'
                                          : language === 'cn'
                                            ? '待确定'
                                            : 'Calculated at Checkout'}
                                </p>
                                <p className="font-bold pt-1">{`$${toReadBooks.reduce(
                                    (total, book) => total + book.price,
                                    0
                                )}.00`}</p>
                            </span>
                        </div>
                    </div>
                    {toReadBooks.length === 0 && (
                        <p className="mt-12">
                            {language === 'en'
                                ? 'Your bag is empty.'
                                : language === 'jp'
                                  ? 'カートは空です。'
                                  : language === 'cn'
                                    ? '您的购物袋已空。'
                                    : 'Your bag is empty.'}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}
