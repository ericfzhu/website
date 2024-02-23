import { ReactNode } from 'react'

export interface IconProps {
    item: itemProps
    zPosition: string[]
    moveItemToLast: (itemname: string) => void
    rounded?: boolean
}

export interface MultiIconProps extends IconProps {
    src: { open: string; closed: string }
}

export interface itemsConfigProps {
    [key: string]: itemProps
}

type itemProps = {
    name: string
    hoverName?: string
    var: string
    icon: {
        src: string
        className: string
        showName?: boolean
        column?: number
        handleDoubleClick?: () => void
    }
    hasWindow?: boolean
    closeWindow?: () => void
}

export interface Music {
    content: string
    artist?: string
    color: string
    link?: string
    type: string
}

interface Action {
    name: string
    iconPath: string
    onClick: () => void
    index: string
}

type position = {
    x: number
    y: number
    z: string[]
}

export interface File {
    name: string
    path: string
    href: string | undefined
}

export interface windowProps {
    item: itemProps
    position: position
    moveItemToLast: (itemname: string) => void
}
export interface AbstractWindowProps extends windowProps {
    windowClassName?: string
    children?: ReactNode
}

export interface FinderWindowProps extends windowProps {
    files: {
        [name: string]: {
            path: string
            href?: string
        }
    }
}

export interface MusicWindowProps extends windowProps {
    actions: Action[]
    cursorPosition: { x: number; y: number }
}

export interface Book {
    title: string
    status: string
    author: string
    date_finished: string | null
    delay?: number
    key: string
    cover: string
    price: number
}

export interface Movie {
    title: string
    date_finished: string
}
