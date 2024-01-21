import Link from 'next/link'
import { HoverImageComponent } from '@/components'
import { IconCircleFilled } from '@tabler/icons-react'

interface Props {
    title: string
    description: string
    tags: readonly string[]
    link?: { href: string; preview: string }
    cursorPosition: { x: number; y: number }
}

export function ProjectCard({
    title,
    description,
    tags,
    link,
    cursorPosition,
}: Props) {
    return (
        <div className="flex flex-col overflow-hidden border border-accent/50 p-3">
            <div className="flex flex-col space-y-1.5">
                <div className="space-y-1">
                    <div className="text-base text-2xl leading-none">
                        {link ? (
                            <div className="flex items-center space-x-1">
                                <HoverImageComponent
                                    text={title}
                                    cursorPosition={cursorPosition}
                                    path={link.preview}
                                    href={link.href}
                                    imageClassName="h-[25%] w-auto"
                                />
                                <IconCircleFilled className="text-accent h-1.5 w-1.5" />
                            </div>
                        ) : (
                            title
                        )}
                    </div>
                    <div className="font-mono text-xs text-sm text-secondary">
                        {description}
                    </div>
                </div>
            </div>
            <div className="mt-auto flex text-pretty font-mono text-sm text-secondary">
                <div className="mt-2 flex flex-wrap gap-1">
                    {tags.map((tag) => (
                        <div
                            className="px-1 py-0 text-[10px] inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-mono transition-colors text-nowrap border-transparent bg-accent/20 hover:bg-accent/20 duration-300"
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
