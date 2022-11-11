import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const OneZeroSix: NextPage = () => {
    const origin = dayjs('2020-10-06')
    const [date, setDate] = useState(dayjs())

    function refreshDate() {
        setDate(dayjs())
    }

    useEffect(() => {
        const timer = setInterval(refreshDate, 1000)
        return () => clearInterval(timer)
    })

    function toDaysMinutesSeconds(totalSeconds: number) {
        const seconds = Math.floor(totalSeconds % 60)
        const minutes = Math.floor((totalSeconds % 3600) / 60)
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
        const days = Math.floor(totalSeconds / (3600 * 24))

        const secondsStr = makeHumanReadable(seconds, 'second')
        const minutesStr = makeHumanReadable(minutes, 'minute')
        const hoursStr = makeHumanReadable(hours, 'hour')
        const daysStr = makeHumanReadable(days, 'day')

        return `${daysStr}${hoursStr}${minutesStr}${secondsStr}`.replace(
            /,\s*$/,
            ''
        )
    }

    function makeHumanReadable(num: number, singular: string) {
        return num > 0
            ? num + (num === 1 ? ` ${singular}, ` : ` ${singular}s, `)
            : ''
    }

    return (
        <div className="flex h-screen">
            <Head>
                <title>106</title>
                <meta property={'og:title'} content={'106'} key="title" />

                <link rel="icon" href="/pink.ico" />
            </Head>
            <div className="m-auto text-5xl">
                {toDaysMinutesSeconds(date.diff(origin, 's'))}
            </div>
        </div>
    )
}

export default OneZeroSix
