import { RESUME_DATA } from '@/components/data/resume'
import { ProjectCard } from '@/components/ProjectCard'
import Link from 'next/link'
import {
    IconArrowUpRight,
    IconCircleFilled,
    IconFileTypePdf,
    IconMail,
    IconPhone,
    IconWorld,
} from '@tabler/icons-react'
import Head from 'next/head'
import { courierPrime } from '@/components/Fonts'
import { useState, useEffect } from 'react'
import { HoverImageComponent } from '@/components'
import Tooltip from '@mui/material/Tooltip'

export default function ResumePage() {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const updateCursorPosition = (e: MouseEvent) => {
            setCursorPosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener('mousemove', updateCursorPosition)

        return () => {
            window.removeEventListener('mousemove', updateCursorPosition)
        }
    }, [])

    return (
        <main
            className={`mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16 select-none ${courierPrime.className}`}
        >
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
            <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-1.5">
                        <h1 className="text-2xl font-bold text-accent">
                            {RESUME_DATA.name}
                        </h1>
                        <p className="max-w-md text-md text-sm text-secondary">
                            {RESUME_DATA.description}
                        </p>
                        <p className="max-w-md items-center text-xs text-secondary">
                            <Link
                                className="inline-flex gap-x-1.5 align-baseline leading-none hover:text-accent duration-300 items-center"
                                href={RESUME_DATA.locationLink}
                                target="_blank"
                            >
                                <IconWorld className="h-4 w-4" />
                                {RESUME_DATA.location}
                            </Link>
                        </p>
                        <div className="flex pt-1 text-sm text-secondary space-x-1">
                            {RESUME_DATA.contact.email ? (
                                <Tooltip
                                    title="Email"
                                    placement="top"
                                    arrow
                                    className="h-8 w-8 inline-flex justify-center items-center hover:text-accent duration-300"
                                >
                                    <Link
                                        href={`mailto:${RESUME_DATA.contact.email}`}
                                    >
                                        <IconMail className="h-5 w-5" />
                                    </Link>
                                </Tooltip>
                            ) : null}
                            {RESUME_DATA.contact.tel ? (
                                <Tooltip
                                    title="Mobile"
                                    placement="top"
                                    arrow
                                    className="h-8 w-8 inline-flex justify-center items-center hover:text-accent duration-300"
                                >
                                    <Link
                                        href={`tel:${RESUME_DATA.contact.tel}`}
                                    >
                                        <IconPhone className="h-5 w-5" />
                                    </Link>
                                </Tooltip>
                            ) : null}
                            {RESUME_DATA.contact.social.map((social) => (
                                <Tooltip
                                    key={social.name}
                                    title={social.name}
                                    placement="top"
                                    arrow
                                    className="h-8 w-8 inline-flex justify-center items-center hover:text-accent duration-300"
                                >
                                    <Link href={social.url} target="_blank">
                                        <social.icon className="h-5 w-5" />
                                    </Link>
                                </Tooltip>
                            ))}
                            <Tooltip
                                title="Download as PDF"
                                placement="top"
                                arrow
                                className="h-8 w-8 inline-flex justify-center items-center hover:text-accent duration-300"
                            >
                                <Link href="/resume.pdf">
                                    <IconFileTypePdf className="h-5 w-5" />
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className="flex min-h-0 flex-col gap-y-3">
                    <h2 className="text-xl font-bold text-accent">About</h2>
                    <p className="text-xs text-sm text-secondary">
                        {RESUME_DATA.about}
                    </p>
                </div>
                <div className="flex min-h-0 flex-col gap-y-3">
                    <h2 className="text-xl font-bold text-accent">
                        Experience
                    </h2>
                    {RESUME_DATA.work.map((work) => {
                        return (
                            <div key={work.company} className="rounded-lg">
                                <div className="flex flex-col space-y-1.5">
                                    <div className="flex items-center justify-between gap-x-2 text-base">
                                        <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                                            <div className="text-base text-2xl leading-none">
                                                {'link' in work ? (
                                                    <div className="flex items-center space-x-1">
                                                        <HoverImageComponent
                                                            text={work.company}
                                                            cursorPosition={
                                                                cursorPosition
                                                            }
                                                            path={
                                                                work.link
                                                                    .preview
                                                            }
                                                            href={
                                                                work.link.href
                                                            }
                                                            imageClassName="h-[25%] w-auto"
                                                        />
                                                        <IconCircleFilled className="text-accent h-1.5 w-1.5" />
                                                    </div>
                                                ) : (
                                                    work.company
                                                )}
                                            </div>
                                            <div className="align-middle text-xs inline-flex items-center rounded-md px-2 py-0.5 text-xs text-nowrap bg-accent/20 hover:bg-accent/40 duration-300">
                                                {work.location}
                                            </div>
                                        </h3>
                                        <div className="text-sm tabular-nums text-gray-500">
                                            {work.start} - {work.end}
                                        </div>
                                    </div>

                                    <h4 className="text-xs leading-none">
                                        {work.title}
                                    </h4>
                                </div>
                                <ul className="mt-2 text-xs text-pretty text-sm text-secondary list-disc list-inside">
                                    {work.description}
                                </ul>
                                <span className="inline-flex gap-x-1 mt-4">
                                    {work.badges.map((badge) => (
                                        <div
                                            className="align-middle text-xs inline-flex items-center rounded-md px-2 py-0.5 text-xs text-nowrap bg-accent/20 hover:bg-accent/40 duration-300"
                                            key={badge}
                                        >
                                            {badge}
                                        </div>
                                    ))}
                                </span>
                            </div>
                        )
                    })}
                </div>
                <div className="flex min-h-0 flex-col gap-y-3">
                    <h2 className="text-xl font-bold text-accent">Education</h2>
                    {RESUME_DATA.education.map((education) => {
                        return (
                            <div key={education.school} className="rounded-lg">
                                <div className="flex flex-col space-y-1.5">
                                    <div className="flex items-center justify-between gap-x-2 text-base">
                                        <h3 className="font-semibold leading-none">
                                            {education.school}
                                        </h3>
                                        <div className="text-sm tabular-nums text-gray-500">
                                            {education.end}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 text-secondary text-sm">
                                    {education.degree}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="flex min-h-0 flex-col gap-y-3">
                    <h2 className="text-xl font-bold text-accent">Skills</h2>
                    <div className="flex flex-wrap gap-1">
                        {Object.entries(RESUME_DATA.skills).map(
                            ([category, skills]) => {
                                return (
                                    <div
                                        key={category}
                                        className="flex items-center gap-2"
                                    >
                                        <h3 className="secondary">
                                            {category}
                                        </h3>
                                        <div className="flex flex-wrap gap-1">
                                            {skills.map((skill) => {
                                                return (
                                                    <div
                                                        className="align-middle text-xs inline-flex items-center rounded-md px-2 py-0.5 text-xs text-nowrap bg-accent/20 hover:bg-accent/40 duration-300"
                                                        key={skill}
                                                    >
                                                        {skill}
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

                <div className="scroll-mb-16 flex min-h-0 flex-col gap-y-3">
                    <h2 className="text-xl font-semibold text-accent">
                        Projects
                    </h2>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {RESUME_DATA.projects.map((project) => {
                            return (
                                <ProjectCard
                                    key={project.title}
                                    title={project.title}
                                    description={project.description}
                                    tags={project.techStack}
                                    link={
                                        'link' in project
                                            ? project.link
                                            : undefined
                                    }
                                    cursorPosition={cursorPosition}
                                />
                            )
                        })}
                    </div>
                </div>

                <div className="scroll-mb-16 flex min-h-0 flex-col gap-y-3">
                    <h2 className="text-xl font-semibold text-accent">
                        Certifications
                    </h2>
                    <div className="flex flex-col text-sm justify-center space-y-2">
                        {RESUME_DATA.certifications.map((certification) => (
                            <Link
                                href={certification.link.href}
                                target="_blank"
                                className="flex hover:text-accent duration-300"
                            >
                                {certification.name}
                                <IconArrowUpRight className="stroke-1 h-5 w-5" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
