import Link from 'next/link'

interface Props {
    title: string
    description: string
    tags: readonly string[]
    link?: string
}

export function ProjectCard({ title, description, tags, link }: Props) {
    return (
        <div className="flex flex-col overflow-hidden border border-accent/50 p-3">
            <div className="flex flex-col space-y-1.5">
                <div className="space-y-1">
                    <div className="text-base text-2xl leading-none">
                        {link ? (
                            <Link
                                href={link}
                                target="_blank"
                                className="inline-flex items-center gap-2 hover:text-accent duration-300"
                            >
                                {title}
                                <span className="mr-2 h-1 w-1 rounded-full bg-accent"></span>
                            </Link>
                        ) : (
                            title
                        )}
                    </div>
                    <div className="hidden font-mono text-xs underline print:visible">
                        {link
                            ?.replace('https://', '')
                            .replace('www.', '')
                            .replace('/', '')}
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
