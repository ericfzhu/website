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
    link?: { href: string; preview: string }
    github?: string
}

export function ProjectCard({ project, cursorPosition }: Props) {
    return (
        <div className="flex flex-col overflow-hidden border border-accent1">
            <div className="text-base text-2xl leading-none flex justify-between items-center">
                {project.link ? (
                    <div className="flex items-center space-x-1 p-3">
                        <HoverImageComponent
                            cursorPosition={cursorPosition}
                            path={[project.link.preview]}
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
                        <IconCircleFilled className="text-accent h-1.5 w-1.5" />
                    </div>
                ) : (
                    <span className="p-3">{project.title}</span>
                )}
                {project.github && (
                    <Link
                        href={project.github}
                        target="_blank"
                        className="text-secondary hover:text-accent duration-300 m-3"
                    >
                        <IconCode className="h-4 w-4" />
                    </Link>
                )}
            </div>
            <div className="font-mono text-xs text-sm text-secondary px-3">
                {project.description}
            </div>
            <div className="mt-auto flex text-xs p-3">
                <div className="mt-2 flex flex-wrap gap-1">
                    {project.techStack?.map((tag) => (
                        <div
                            className="px-1 py-0 text-[10px] inline-flex items-center border bg-accent1 hover:bg-accent2 duration-300 text-secondary"
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
