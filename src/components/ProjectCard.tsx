import Link from 'next/link'
import { HoverImageComponent } from '@/components'
import { IconCircleFilled, IconCode } from '@tabler/icons-react'

interface Props {
    project: Project
    cursorPosition: { x: number; y: number }
}

type Project = {
    title: string
    description: string
    techStack?: readonly string[]
    link?: { href: string; preview: readonly string[] }
    github?: string
}

export function ProjectCard({ project, cursorPosition }: Props) {
    return (
        <div className="flex flex-col overflow-hidden gap-3">
            <div className="text-lg lg:text-2xl leading-none flex justify-between items-center">
                {project.link ? (
                    <div className="flex items-center space-x-2">
                        <HoverImageComponent
                            cursorPosition={cursorPosition}
                            paths={project.link.preview}
                            imageClassName="h-[20%] w-auto"
                            className="hover:text-accent"
                        >
                            <Link
                                href={project.link.href}
                                target="_blank"
                                className="truncate"
                            >
                                {project.title}
                            </Link>
                        </HoverImageComponent>
                        <IconCircleFilled className="text-accent h-2 w-2" />
                    </div>
                ) : (
                    <span className="">{project.title}</span>
                )}
                {project.github && 
                    <Link
                        href={project.github}
                        target="_blank"
                        className="text-secondary hover:text-accent duration-300"
                    >
                        <IconCode className="h-4 w-4" />
                    </Link>
                }
            </div>
            <div className="font-mono text-sm lg:text-base text-secondary">
                {project.description}
            </div>
            <div className="mt-auto flex text-sm">
                <div className="mt-2 flex flex-wrap gap-1">
                    {project.techStack?.map((tag) => (
                        <div
                            className="px-1 py-0 inline-flex items-center border bg-accent1 hover:bg-accent2 duration-300 text-secondary"
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
