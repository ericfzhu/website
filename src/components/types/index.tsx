import { ReactNode } from 'react'

export interface IconProps {
    item: itemProps
    zPosition: string[]
    onDoubleClick?: () => void
    moveItemToLast: (itemname: string) => void
    rounded?: boolean
}

export interface MultiIconProps {
    item: itemProps
    zPosition: string[]
    src: { open: string; closed: string }
    onDoubleClick?: () => void
    moveItemToLast: (itemname: string) => void
    rounded?: boolean
}

export interface itemsConfigProps {
    [key: string]: itemProps
}

type itemProps = {
    name: string
    var: string
    icon: {
        src: string
        className: string
        showName?: boolean
        column?: number
    }
    hasWindow?: boolean
}

export interface MusicWindowProps {
    item: itemProps
    position: { x: number; y: number; z: string[] }
    onClose: () => void
    moveItemToLast: (itemname: string) => void
    actions: Action[]
}

export interface Music {
    lyrics: string
    artist: string
    color: string
}

interface Action {
    name: string
    iconPath: string
    onClick: () => void
    index: string
}

export interface P5WindowProps {
    item: itemProps
    position: { x: number; y: number; z: string[] }
    onClose: () => void
    moveItemToLast: (itemname: string) => void
}

export interface AbstractWindowProps {
    position: { x: number; y: number; z: string[] }
    name: string
    onClose: () => void
    moveItemToLast: (itemname: string) => void
    windowClassName?: string
    children?: ReactNode
}

interface File {
    name: string
    iconPath: string
    type: string
    size: string
    onClick?: () => void
}

export interface FinderWindowProps {
    item: itemProps
    position: { x: number; y: number; z: string[] }
    onClose: () => void
    files: { metadata: Record<string, string>; data: File[] }
    moveItemToLast: (itemname: string) => void
}

export interface LibraryWindowProps {
    item: itemProps
    position: { x: number; y: number; z: string[] }
    onClose: () => void
    moveItemToLast: (itemname: string) => void
}

export interface GalleryWindowProps {
    item: itemProps
    position: { x: number; y: number; z: string[] }
    onClose: () => void
    moveItemToLast: (itemname: string) => void
}
