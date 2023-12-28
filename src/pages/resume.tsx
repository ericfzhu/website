import { RESUME_DATA } from '@/components/data/resume'
import { ProjectCard } from '@/components/ProjectCard'
import Image from 'next/image'
import Link from 'next/link'
import { IconGlobe, IconMail, IconPhone } from '@tabler/icons-react'

export default function ResumePage() {
    return (
        <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
            <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-1.5">
                        <h1 className="text-2xl font-bold text-accent">
                            {RESUME_DATA.name}
                        </h1>
                        <p className="max-w-md text-pretty font-mono text-sm text-muted-foreground">
                            {RESUME_DATA.about}
                        </p>
                        <p className="max-w-md items-center text-pretty font-mono text-xs text-muted-foreground">
                            <Link
                                className="inline-flex gap-x-1.5 align-baseline leading-none hover:text-accent duration-300"
                                href={RESUME_DATA.locationLink}
                                target="_blank"
                            >
                                <IconGlobe className="h-3 w-3" />
                                {RESUME_DATA.location}
                            </Link>
                        </p>
                        <div className="flex gap-x-1 pt-1 font-mono text-sm text-muted-foreground print:hidden">
                            {RESUME_DATA.contact.email ? (
                                <button className="h-8 w-8 inline-flex items-center hover:text-accent duration-300 px-2 py-0.5">
                                    <Link
                                        href={`mailto:${RESUME_DATA.contact.email}`}
                                    >
                                        <IconMail className="h-4 w-4" />
                                    </Link>
                                </button>
                            ) : null}
                            {RESUME_DATA.contact.tel ? (
                                <button className="h-8 w-8 inline-flex items-center hover:text-accent duration-300 px-2 py-0.5">
                                    <Link
                                        href={`tel:${RESUME_DATA.contact.tel}`}
                                    >
                                        <IconPhone className="h-4 w-4" />
                                    </Link>
                                </button>
                            ) : null}
                            {RESUME_DATA.contact.social.map((social) => (
                                <button
                                    key={social.name}
                                    className="h-8 w-8 inline-flex items-center hover:text-accent transition duration-300 px-2 py-0.5"
                                >
                                    <Link href={social.url} target="_blank">
                                        <social.icon className="h-4 w-4" />
                                    </Link>
                                </button>
                            ))}
                        </div>
                        <div className="hidden flex-col gap-x-1 font-mono text-sm text-muted-foreground print:flex">
                            {RESUME_DATA.contact.email ? (
                                <a href={`mailto:${RESUME_DATA.contact.email}`}>
                                    <span className="underline">
                                        {RESUME_DATA.contact.email}
                                    </span>
                                </a>
                            ) : null}
                            {RESUME_DATA.contact.tel ? (
                                <a href={`tel:${RESUME_DATA.contact.tel}`}>
                                    <span className="underline">
                                        {RESUME_DATA.contact.tel}
                                    </span>
                                </a>
                            ) : null}
                        </div>
                    </div>
                    <Image
                        width={300}
                        height={300}
                        className="h-28 w-28 relative flex shrink-0 overflow-hidden rounded-xl aspect-square pointer-events-none"
                        alt={RESUME_DATA.name}
                        src={RESUME_DATA.avatarUrl}
                    />
                </div>
                <div className="flex min-h-0 flex-col gap-y-3">
                    <h2 className="text-xl font-bold text-accent">
                        Work Experience
                    </h2>
                    {RESUME_DATA.work.map((work) => {
                        return (
                            <div
                                key={work.company}
                                className="rounded-lg"
                            >
                                <div className="flex flex-col space-y-1.5">
                                    <div className="flex items-center justify-between gap-x-2 text-base">
                                        <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                                            <Link
                                                className="hover:text-accent duration-300"
                                                href={work.link}
                                                target="_blank"
                                            >
                                                {work.company}
                                            </Link>
                                        </h3>
                                        <div className="text-sm tabular-nums text-gray-500">
                                            {work.start} - {work.end}
                                        </div>
                                    </div>

                                    <h4 className="font-mono text-sm leading-none">
                                        {work.title}
                                    </h4>
                                </div>
                                <div className="mt-2 text-xs text-pretty font-mono text-sm text-slate-500">
                                    {work.description}
                                </div>
                                <span className="inline-flex gap-x-1 mt-4">
                                    {work.badges.map((badge) => (
                                        <div
                                            className="align-middle text-xs inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold text-nowrap bg-accent/20 hover:bg-accent/40 duration-300"
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
                            <div key={education.school} className='rounded-lg bg-card text-card-foreground'>
                                <div className='flex flex-col space-y-1.5'>
                                    <div className="flex items-center justify-between gap-x-2 text-base">
                                        <h3 className="font-semibold leading-none">
                                            {education.school}
                                        </h3>
                                        <div className="text-sm tabular-nums text-gray-500">
                                            {education.end}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 font-mono text-sm">{education.degree}</div>
                            </div>
                        )
                    })}
                </div>
                <div className="flex min-h-0 flex-col gap-y-3">
                    <h2 className="text-xl font-bold text-accent">Skills</h2>
                    <div className="flex flex-wrap gap-1">
                        {RESUME_DATA.skills.map((skill) => {
                            return <div className="align-middle text-xs inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold text-nowrap bg-accent/20 hover:bg-accent/40 duration-300" key={skill}>{skill}</div>
                        })}
                    </div>
                </div>

                <div className="scroll-mb-16 flex min-h-0 flex-col gap-y-3">
                    <h2 className="text-xl font-bold text-accent">Projects</h2>
                    <div className="-mx-3 grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-2 md:grid-cols-2 lg:grid-cols-3">
                        {RESUME_DATA.projects.map((project) => {
                            return (
                                <ProjectCard
                                    key={project.title}
                                    title={project.title}
                                    description={project.description}
                                    tags={project.techStack}
                                    link={
                                        'link' in project
                                            ? project.link.href
                                            : undefined
                                    }
                                />
                            )
                        })}
                    </div>
                </div>
                <div className="flex justify-center">
                    <Link href="/resume.pdf" className='p-3'>Download as PDF</Link>
                </div>
            </section>
        </main>
    )
}
