export type IconProps = {
    name: string
    zPosition: string[]
    src: string
    onDoubleClick?: () => void
    moveItemToLast: (itemname: string) => void
    className?: string
    showName: boolean
    rounded?: boolean
}