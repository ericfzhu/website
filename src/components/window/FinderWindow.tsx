import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import AbstractWindow from '@/components/window/AbstractWindow'
import { FinderWindowProps, File } from '@/components/types'
import Link from 'next/link'
import { IconArrowUpRight } from '@tabler/icons-react'
import Tooltip from '@mui/material/Tooltip'

export default function FinderWindow({
    item,
    position,
    files,
    moveItemToLast,
}: FinderWindowProps) {
    const [file, setFile] = useState<File | null>(null)

    useEffect(() => {
        const fileDisplayElement = document.getElementById('text_document')
        if (fileDisplayElement) {
            fileDisplayElement.scrollTop = 0
        }
    }, [file])

    const handleContainerClick = useCallback(() => {
        setFile(null)
    }, [])

    const filesArray: File[] = Object.keys(files).map((key) => ({
        name: key,
        path: files[key].path,
        href: files[key].href ? files[key].href : undefined,
    }))

    return (
        <AbstractWindow
            position={position}
            item={item}
            moveItemToLast={moveItemToLast}
            windowClassName="bg-[#282827]/80"
        >
            {/* Window title */}
            <div className="absolute flex items-center px-4 py-3 z-0 w-full h-12">
                <div className="text-center m-auto text-[#EBEBEB] text-sm">
                    {item.name}
                </div>
            </div>

            {/* Files */}
            <div
                id="files"
                className="bg-[#2A2C2D] border-t border-t-black border-b border-b-[#666868] grow flex overflow-hidden mt-12"
            >
                <div
                    id="files_column"
                    className="w-1/4 max-w-xs border-r border-r-[#666868] flex flex-col text-white h-full overflow-auto"
                >
                    {filesArray.map((f, index) => (
                        <div
                            key={index}
                            className={`flex items-center pl-2 mx-2 my-0.5 h-6 rounded-md ${
                                file && file.name === f.name
                                    ? 'bg-[#4149CD]'
                                    : ''
                            }`}
                            onClick={() => setFile(f)}
                        >
                            {/* <Image
                                priority
                                width="16"
                                height="16"
                                src={f.path}
                                alt={`${f.name} icon`}
                                className="h-4 mr-1"
                            /> */}
                            <h1 className={`text-[#DFDFDF] truncate text-lg`}>
                                {f.name}
                            </h1>
                        </div>
                    ))}
                    <div className="grow" onClick={handleContainerClick} />
                </div>
                <div
                    id="file_display"
                    className="grow h-full overflow-hidden relative"
                >
                    {file !== null && (
                        <div className="absolute inset-0 flex flex-col mx-4 my-2">
                            <div className="object-contain overflow-hidden w-full">
                                <Image
                                    src={file.path}
                                    alt="file content"
                                    className="rounded-lg object-contain w-full"
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                            <div className="text-white pt-4 min-h-[20%] flex flex-col space-y-3">
                                {file.href ? (
                                    <Tooltip
                                        title="Open in new window"
                                        placement="top"
                                        arrow
                                        className="w-fit"
                                    >
                                        <Link
                                            href={file.href}
                                            target="_blank"
                                            className="flex"
                                        >
                                            <span className="text-[#DFDFDF]">
                                                {file.name || 'N/A'}
                                            </span>
                                            <IconArrowUpRight />
                                        </Link>
                                    </Tooltip>
                                ) : (
                                    <span className="text-[#DFDFDF]">
                                        {file.name || 'N/A'}
                                    </span>
                                )}
                                <span className="text-[#9FA0A0]">
                                    JPEG image
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Path */}
            <div
                id="path"
                className="bg-[#2A2C2D] h-2 p-4 overflow-hidden rounded-b-lg flex-row flex items-center"
            >
                <div className="flex-row flex " onClick={handleContainerClick}>
                    <img
                        src="/assets/icons/folder.png"
                        alt={item.name}
                        className="h-4 mr-1"
                    />
                    <span className="text-[#9D9D9E] text-xs mr-2 mt-0.5">
                        {item.name}
                    </span>
                </div>
                {file !== null && (
                    <>
                        <span className="text-[#9D9D9E] text-[8px] mr-2">
                            {' > '}
                        </span>
                        {/* <img
                            src={file.path ? file.path : ''}
                            alt={`${file.name} icon`}
                            className="h-4 mr-1"
                        /> */}
                        <span className={`text-[#9D9D9E] text-xs mt-0.5`}>
                            {file.name || 'N/A'}
                        </span>
                    </>
                )}
            </div>
        </AbstractWindow>
    )
}
