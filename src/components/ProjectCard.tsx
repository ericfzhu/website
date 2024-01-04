import Link from 'next/link'

interface Props {
    title: string
    description: string
    tags: readonly string[]
    link?: string
}

export function ProjectCard({ title, description, tags, link }: Props) {
    return (
        <div className="flex flex-col overflow-hidden border border-accent p-3 rounded-lg bg-card text-card-foreground">
            <div className="flex flex-col space-y-1.5">
                <div className="space-y-1">
                    <div className="text-base text-2xl font-semibold leading-none tracking-tight">
                        {link ? (
                            <Link
                                href={link}
                                target="_blank"
                                className="inline-flex items-center gap-1 hover:text-accent duration-300"
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
                    <div className="font-mono text-xs text-sm text-muted-foreground">
                        {description}
                    </div>
                </div>
            </div>
            <div className="mt-auto flex text-pretty font-mono text-sm text-muted-foreground">
                <div className="mt-2 flex flex-wrap gap-1">
                    {tags.map((tag) => (
                        <div
                            className="px-1 py-0 text-[10px] inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold font-mono transition-colors text-nowrap border-transparent bg-accent/10 hover:bg-accent/20 duration-300"
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
