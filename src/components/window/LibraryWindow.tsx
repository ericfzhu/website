import LibraryComponent from '@/components/LibraryComponent'
import { AbstractWindow, OpenNewWindowComponent } from '@/components/window'
import { LibraryWindowProps } from '@/components/types'

export default function LibraryWindow({
    item,
    position,
    onClose,
    moveItemToLast,
}: LibraryWindowProps) {
    return (
        <AbstractWindow
            position={position}
            name={item.var}
            moveItemToLast={moveItemToLast}
            onClose={onClose}
            windowClassName="bg-[#FFFFFF]"
        >
            <OpenNewWindowComponent href="/library" />

            <div className="overflow-auto relative">
                <LibraryComponent darkMode={false} />
            </div>
        </AbstractWindow>
    )
}
