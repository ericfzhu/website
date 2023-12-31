import LibraryComponent from '@/components/LibraryComponent'
import { AbstractWindow, OpenNewWindowComponent } from '@/components/window'

interface LibraryWindowProps {
    name: string
    position: { x: number; y: number; z: string[] }
    onClose: () => void
    moveItemToLast: (itemname: string) => void
}

export default function LibraryWindow({
    name,
    position,
    onClose,
    moveItemToLast,
}: LibraryWindowProps) {
    return (
        <AbstractWindow
            position={position}
            name={name}
            moveItemToLast={moveItemToLast}
            onClose={onClose}
            windowClassName='bg-[#FFFFFF]'
        >
            <OpenNewWindowComponent href="/library" />
            
            <div className="overflow-auto relative">
                <LibraryComponent darkMode={false} />
            </div>
        </AbstractWindow>
    )
}
