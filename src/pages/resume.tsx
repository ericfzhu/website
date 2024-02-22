import { RESUME_DATA } from '@/components/data/resume'
import { WORKS } from '@/components/data/works'
import Link from 'next/link'
import { IconCircleFilled, IconCode } from '@tabler/icons-react'
import Head from 'next/head'
import { courierPrime } from '@/components/Fonts'
import { useState, useEffect } from 'react'
import { HoverImageComponent } from '@/components'
import Tooltip from '@mui/material/Tooltip'
import Image from 'next/image'

export default function ResumePage() {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
    const [selectedTag, setSelectedTag] = useState('')

    useEffect(() => {
        const updateCursorPosition = (e: MouseEvent) => {
            setCursorPosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener('mousemove', updateCursorPosition)

        return () => {
            window.removeEventListener('mousemove', updateCursorPosition)
        }
    }, [])

    const calculateMonths = (start: string, end: string) => {
        const startDate = new Date(start)
        let endDate
        if (end.toLowerCase() === 'present') {
            endDate = new Date()
        } else {
            endDate = new Date(end)
        }
        const totalMonths =
            (endDate.getFullYear() - startDate.getFullYear()) * 12 +
            (endDate.getMonth() - startDate.getMonth())
        const years = Math.floor(totalMonths / 12)
        const months = totalMonths % 12
        return years >= 1
            ? `${years} years ${months} months`
            : `${months} months`
    }

    return (
        <main className={`mx-auto p-4 md:p-10 ${courierPrime.className}`}>
            <Head>
                <title>Eric Zhu Resume</title>
                <meta
                    property={'og:title'}
                    content={'Eric Zhu Resume'}
                    key="title"
                />
                <meta
                    name="viewport"
                    content="width=device-width"
                    key="title"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className="mx-auto w-full max-w-6xl space-y-16 h-full relative">
                <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-1.5">
                        <div className="w-full justify-between flex items-start">
                            <h1 className="text-5xl lg:text-7xl font-bold text-accent">
                                {RESUME_DATA.name}
                            </h1>
                            <span className="flex items-center text-secondary">
                                MOUSEOVER
                                <IconCircleFilled className="text-accent h-2 w-2 ml-2" />
                            </span>
                        </div>
                        <p className="max-w-md text-base lg:text-xl text-secondary">
                            {RESUME_DATA.description}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1 sticky top-10 h-min">
                        <h2 className="lg:text-3xl font-bold text-accent">
                            About me
                        </h2>
                    </div>
                    <p className="text-sm lg:text-base text-secondary col-span-3">
                        {RESUME_DATA.about}
                    </p>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1 sticky top-10 h-min">
                        <h2 className="lg:text-3xl font-bold text-accent">
                            Experience
                        </h2>
                    </div>
                    <div className="col-span-3 space-y-8">
                        {RESUME_DATA.work.map((work) => {
                            return (
                                <div key={work.company} className="flex gap-3">
                                    <Image
                                        src={work.logo}
                                        alt=""
                                        width={50}
                                        height={50}
                                        className="align-top h-fit"
                                    />
                                    <div className="flex gap-3 flex-col w-full">
                                        <div className="flex flex-col gap-y-1.5">
                                            <div className="flex max-md:flex-col lg:flex-row justify-between gap-x-2 text-base flex-wrap">
                                                <h3 className="inline-flex max-md:flex-col lg:flex-row items-start lg:items-center lg:flex-row justify-start gap-1 font-semibold leading-none">
                                                    <div className="text-lg lg:text-2xl leading-none mr-2">
                                                        {'link' in work ? (
                                                            <div className="flex items-center space-x-2">
                                                                <HoverImageComponent
                                                                    cursorPosition={
                                                                        cursorPosition
                                                                    }
                                                                    paths={
                                                                        work
                                                                            .link
                                                                            .preview
                                                                    }
                                                                    imageClassName="h-[20%] w-auto"
                                                                    className="hover:text-accent duration-300"
                                                                >
                                                                    <Link
                                                                        href={
                                                                            work
                                                                                .link
                                                                                .href
                                                                        }
                                                                        target="_blank"
                                                                    >
                                                                        {
                                                                            work.company
                                                                        }
                                                                    </Link>
                                                                </HoverImageComponent>
                                                                <IconCircleFilled className="text-accent h-2 w-2" />
                                                            </div>
                                                        ) : (
                                                            work.company
                                                        )}
                                                    </div>
                                                </h3>
                                                <div className="text-sm lg:text-base tabular-nums text-secondary">
                                                    <Tooltip
                                                        title={calculateMonths(
                                                            work.start,
                                                            work.end
                                                        )}
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <span>
                                                            {work.start} -{' '}
                                                            {work.end}
                                                        </span>
                                                    </Tooltip>
                                                </div>
                                            </div>

                                            {/* <div className="align-middle text-sm inline-flex items-center py-0.5 text-nowrap duration-300">
                                                {work.location}
                                            </div> */}
                                            <h4 className="text-sm lg:text-base leading-none">
                                                {work.title}
                                            </h4>
                                        </div>
                                        <ul className="text-sm lg:text-base text-secondary whitespace-pre-wrap">
                                            {work.description}
                                        </ul>
                                        <span className="inline-flex flex-wrap gap-2">
                                            {work.techStack.map((tag) => (
                                                <div
                                                    className={`align-middle text-sm inline-flex items-center px-2 py-0.5 text-nowrap ${selectedTag === tag ? 'bg-accent text-white' : 'bg-accent1 hover:bg-accent hover:text-white text-accent'} duration-300 rounded-full cursor-pointer`}
                                                    onClick={() => {
                                                        tag === selectedTag
                                                            ? setSelectedTag('')
                                                            : setSelectedTag(
                                                                  tag
                                                              )
                                                    }}
                                                    key={tag}
                                                >
                                                    {tag}
                                                </div>
                                            ))}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1 sticky top-10 h-min">
                        <h2 className="lg:text-3xl font-bold text-accent">
                            Education
                        </h2>
                    </div>
                    <div className="col-span-3 space-y-5">
                        {RESUME_DATA.education.map((education) => {
                            return (
                                <div
                                    key={education.school}
                                    className="flex gap-3"
                                >
                                    <Image
                                        src={education.logo}
                                        alt=""
                                        width={50}
                                        height={50}
                                        className="align-top h-fit"
                                    />
                                    <div className="w-full">
                                        <div className="flex flex-col space-y-1.5">
                                            <div className="flex items-center justify-between gap-x-2 text-lg lg:text-2xl">
                                                <h3 className="font-semibold leading-none">
                                                    {education.school}
                                                </h3>
                                                <div className="text-sm tabular-nums text-gray-500">
                                                    {education.end}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-2 text-secondary text-sm lg:text-base">
                                            {education.degree}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1 sticky top-10 h-min">
                        <h2 className="lg:text-3xl font-bold text-accent">
                            Skills
                        </h2>
                    </div>
                    <div className="col-span-3 flex flex-wrap gap-2">
                        {Object.entries(RESUME_DATA.skills).map(
                            ([category, skills]) => {
                                return (
                                    <div
                                        key={category}
                                        className="flex flex-col lg:flex-row items-start"
                                    >
                                        <h3 className="lg:text-xl lg:w-32 shrink-0">
                                            {category}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map((tag) => {
                                                return (
                                                    <div
                                                        className={`align-middle inline-flex items-center px-2 py-0.5 text-sm text-nowrap duration-300 ${selectedTag === tag ? 'bg-accent text-white' : 'bg-accent1 hover:bg-accent hover:text-white text-accent'} rounded-full cursor-pointer`}
                                                        onClick={() => {
                                                            tag === selectedTag
                                                                ? setSelectedTag(
                                                                      ''
                                                                  )
                                                                : setSelectedTag(
                                                                      tag
                                                                  )
                                                        }}
                                                        key={tag}
                                                    >
                                                        {tag}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1 sticky top-10 h-min">
                        <h2 className="lg:text-3xl font-bold text-accent">
                            Works
                        </h2>
                    </div>
                    <div className="col-span-3 grid grid-cols-1 gap-10 md:grid-cols-1 lg:grid-cols-2">
                        {WORKS.filter((work) => 'description' in work).map(
                            (work) => {
                                return (
                                    <div
                                        className="flex flex-col overflow-hidden gap-3"
                                        key={work.title}
                                    >
                                        <div className="text-lg lg:text-2xl leading-none flex justify-between items-center">
                                            {'link' in work &&
                                            work.link?.preview ? (
                                                <div className="flex items-center space-x-2">
                                                    <HoverImageComponent
                                                        cursorPosition={
                                                            cursorPosition
                                                        }
                                                        paths={
                                                            work.link.preview
                                                        }
                                                        imageClassName="h-[20%] w-auto"
                                                        className="hover:text-accent"
                                                    >
                                                        <Link
                                                            href={
                                                                work.link.href
                                                            }
                                                            target="_blank"
                                                            className="truncate"
                                                        >
                                                            {work.title}
                                                        </Link>
                                                    </HoverImageComponent>
                                                    <IconCircleFilled className="text-accent h-2 w-2" />
                                                </div>
                                            ) : (
                                                <span className="">
                                                    {work.title}
                                                </span>
                                            )}
                                            {work.github && (
                                                <Link
                                                    href={work.github}
                                                    target="_blank"
                                                    className="text-secondary hover:text-accent duration-300"
                                                >
                                                    <IconCode className="h-4 w-4" />
                                                </Link>
                                            )}
                                        </div>
                                        <div className="font-mono text-sm lg:text-base text-secondary">
                                            {work.description}
                                        </div>
                                        <div className="mt-auto flex text-sm">
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {work.techStack?.map((tag) => (
                                                    <div
                                                        className={`align-middle inline-flex items-center px-2 py-0.5 text-sm text-nowrap duration-300 ${selectedTag === tag ? 'bg-accent text-white' : 'bg-accent1 hover:bg-accent hover:text-white text-accent'} rounded-full cursor-pointer`}
                                                        onClick={() => {
                                                            tag === selectedTag
                                                                ? setSelectedTag(
                                                                      ''
                                                                  )
                                                                : setSelectedTag(
                                                                      tag
                                                                  )
                                                        }}
                                                        key={tag}
                                                    >
                                                        {tag}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1 sticky top-10 h-min">
                        <h2 className="lg:text-3xl font-bold text-accent">
                            Volunteer
                        </h2>
                    </div>
                    <div className="col-span-3 space-y-8">
                        {RESUME_DATA.volunteer.map((work) => {
                            return (
                                <div key={work.company} className="flex gap-3">
                                    <Image
                                        src={work.logo}
                                        alt=""
                                        width={50}
                                        height={50}
                                        className="align-top h-fit"
                                    />
                                    <div className="flex gap-3 flex-col w-full">
                                        <div className="flex flex-col gap-y-1.5">
                                            <div className="flex max-md:flex-col lg:flex-row justify-between gap-x-2 text-base flex-wrap">
                                                <h3 className="inline-flex max-md:flex-col lg:flex-row items-start lg:items-center lg:flex-row justify-start gap-1 font-semibold leading-none">
                                                    <div className="text-lg lg:text-2xl leading-none mr-2">
                                                        {work.company}
                                                    </div>
                                                </h3>
                                                <div className="text-sm lg:text-base tabular-nums text-secondary">
                                                    <Tooltip
                                                        title={calculateMonths(
                                                            work.start,
                                                            work.end
                                                        )}
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <span>
                                                            {work.start} -{' '}
                                                            {work.end}
                                                        </span>
                                                    </Tooltip>
                                                </div>
                                            </div>

                                            {/* <div className="align-middle text-sm inline-flex items-center py-0.5 text-nowrap duration-300">
                                                {work.location}
                                            </div> */}
                                            <h4 className="text-sm lg:text-base leading-none">
                                                {work.title}
                                            </h4>
                                        </div>
                                        <ul className="text-sm lg:text-base text-secondary whitespace-pre-wrap">
                                            {work.description}
                                        </ul>
                                        <span className="inline-flex flex-wrap gap-2">
                                            {work.techStack.map((tag) => (
                                                <div
                                                    className={`align-middle text-sm inline-flex items-center px-2 py-0.5 text-nowrap ${selectedTag === tag ? 'bg-accent text-white' : 'bg-accent1 hover:bg-accent hover:text-white text-accent'} duration-300 rounded-full cursor-pointer`}
                                                    onClick={() => {
                                                        tag === selectedTag
                                                            ? setSelectedTag('')
                                                            : setSelectedTag(
                                                                  tag
                                                              )
                                                    }}
                                                    key={tag}
                                                >
                                                    {tag}
                                                </div>
                                            ))}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1 sticky top-10 h-min">
                        <h2 className="lg:text-3xl font-bold text-accent">
                            Certifications
                        </h2>
                    </div>
                    <div className="flex text-sm justify-start gap-10 col-span-3">
                        {RESUME_DATA.certifications.map((certification) =>
                            'link' in certification ? (
                                <Link
                                    href={certification.link.href}
                                    key={certification.name}
                                    target="_blank"
                                    className="flex hover:text-accent duration-300 items-center text-secondary"
                                >
                                    <Image
                                        src={certification.logo}
                                        alt={certification.name}
                                        width={100}
                                        height={100}
                                    />
                                </Link>
                            ) : (
                                <div
                                    key={certification.name}
                                    className="flex items-center text-secondary"
                                >
                                    <Image
                                        src={certification.logo}
                                        alt={certification.name}
                                        width={100}
                                        height={100}
                                        className="filter grayscale"
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-16 text-secondary">
                    <div className="flex flex-col gap-10 col-span-3">
                        <p className="lg:text-3xl">
                            Thanks for checking out my resume. You can reach me
                            at{' '}
                            <Link
                                href={`mailto:${RESUME_DATA.contact.email.url}`}
                                className={`${RESUME_DATA.contact.email.highlight} duration-300 underline text-secondary4 items-center inline-flex align-baseline`}
                            >
                                <Image
                                    src={RESUME_DATA.contact.email.logo}
                                    alt={RESUME_DATA.contact.email.name}
                                    width={24}
                                    height={24}
                                    className="h-6 w-auto absolute"
                                />
                                <span className="ml-7">
                                    {RESUME_DATA.contact.email.name}
                                </span>
                            </Link>
                            . You can also find me on{' '}
                            {RESUME_DATA.contact.social.map(
                                (social, index, array) => (
                                    <span key={social.name}>
                                        <Link
                                            href={social.url}
                                            target="_blank"
                                            className={`${social.highlight} duration-300 underline text-secondary4 items-center inline-flex align-baseline`}
                                        >
                                            <Image
                                                src={social.logo}
                                                alt=""
                                                width={300}
                                                height={300}
                                                className="h-6 w-auto absolute"
                                            />
                                            <span className="ml-8">
                                                {social.name}
                                            </span>
                                        </Link>
                                        {index < array.length - 2
                                            ? ', '
                                            : index === array.length - 2
                                              ? ', and '
                                              : '.'}
                                    </span>
                                )
                            )}
                        </p>

                        <p className="text-secondary lg:text-3xl max-w-3xl">
                            <Link
                                href="/resume.pdf"
                                className={`hover:text-[#FD564B] duration-300 underline text-secondary4 items-center inline-flex align-baseline`}
                            >
                                <Image
                                    src={'/assets/logos/pdf.webp'}
                                    alt=""
                                    width={24}
                                    height={24}
                                    className="w-6 absolute"
                                />
                                <span className="ml-8">
                                    Download a simplified resume
                                </span>
                            </Link>
                        </p>
                    </div>
                    <div className="text-lg flex flex-col">
                        <Link
                            href={'/'}
                            className="hover:text-accent duration-300"
                        >
                            Home
                        </Link>
                        <Link
                            href={'/library'}
                            className="hover:text-accent duration-300"
                        >
                            Reading List
                        </Link>
                        <Link
                            href={'/?windows=blog&fs=blog'}
                            className="hover:text-accent duration-300"
                        >
                            Blog
                        </Link>
                        <Link
                            href={'/?windows=works&fs=works'}
                            className="hover:text-accent duration-300"
                        >
                            Works
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
