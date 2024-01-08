import LibraryComponent from '@/components/LibraryComponent'
import { AbstractWindow, OpenNewWindowComponent } from '@/components/window'
import { windowProps } from '@/components/types'

export default function LibraryWindow({
    item,
    position,
    moveItemToLast,
}: windowProps) {
    return (
        <AbstractWindow
            position={position}
            item={item}
            moveItemToLast={moveItemToLast}
            windowClassName="bg-[#FFFFFF]"
        >
            <OpenNewWindowComponent href="/library" />

            <div className="overflow-auto relative">
                <LibraryComponent darkMode={false} />
            </div>
        </AbstractWindow>
    )
}
