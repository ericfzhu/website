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
        >
            <OpenNewWindowComponent href="/library" />

            {/* Window title */}
            {/* <div className="absolute flex items-center px-4 py-3 z-0 w-full h-12">
                    <div className="text-center m-auto text-[#EBEBEB] text-sm">
                        {"The Joy of Reading"}
                    </div>
                </div> */}
            <div className="overflow-auto bg-[#2A2C2D] relative">
                <LibraryComponent darkMode={false} />
                {/* <Theatre /> */}
            </div>
        </AbstractWindow>
    )
}
