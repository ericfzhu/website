import Link from 'next/link'
import { HoverImageComponent } from '@/components'
import { IconCircleFilled, IconCode } from '@tabler/icons-react'

interface Props {
    title: string
    description: string
    tags: readonly string[]
    link?: { href: string; preview: string }
    cursorPosition: { x: number; y: number }
    github?: string
}

export function ProjectCard({
    title,
    description,
    tags,
    link,
    cursorPosition,
    github,
}: Props) {
    return (
        <div className="flex flex-col overflow-hidden border border-accent3 p-3">
            <div className="flex flex-col space-y-1.5">
                <div className="space-y-1">
                    <div className="text-base text-2xl leading-none flex justify-between items-center">
                        {link ? (
                            <div className="flex items-center space-x-1">
                                <HoverImageComponent
                                    cursorPosition={cursorPosition}
                                    path={link.preview}
                                    imageClassName="h-[20%] w-auto"
                                    className="hover:text-black/50"
                                >
                                    <Link
                                        href={link.href}
                                        target="_blank"
                                        className="truncate"
                                    >
                                        {title}
                                    </Link>
                                </HoverImageComponent>
                                <IconCircleFilled className="text-accent h-1.5 w-1.5" />
                            </div>
                        ) : (
                            title
                        )}
                        {github && (
                            <Link href={github} target="_blank">
                                <IconCode className="h-4 w-4 text-secondary hover:text-accent duration-300" />
                            </Link>
                        )}
                    </div>
                    <div className="font-mono text-xs text-sm text-secondary">
                        {description}
                    </div>
                </div>
            </div>
            <div className="mt-auto flex text-sm">
                <div className="mt-2 flex flex-wrap gap-1">
                    {tags?.map((tag) => (
                        <div
                            className="px-1 py-0 text-[10px] inline-flex items-center rounded-md border px-2 py-0.5 text-xs bg-accent1 hover:bg-accent2 duration-300"
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
