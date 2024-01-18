import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import AbstractWindow from '@/components/window/AbstractWindow'
import { satisfy } from '@/components/Fonts'
import { FinderWindowProps } from '@/components/types'

export default function FinderWindow({
    item,
    position,
    files,
    moveItemToLast,
}: FinderWindowProps) {
    const [selectedFile, setSelectedFile] = useState<number | null>(null)
    const [currentFileContent, setCurrentFileContent] = useState<string | null>(
        null
    )
    const [currentFileType, setCurrentFileType] = useState<string | null>(null)
    const [currentFileSize, setCurrentFileSize] = useState<string | null>(null)
    const [selecctedIconPath, setSelecctedIconPath] = useState<string | null>(
        null
    )
    const [fileDetails, setFileDetails] = useState<{
        content: string | null
        type: string | null
        size: string | null
        iconPath: string | null
    }>({
        content: null,
        type: null,
        size: null,
        iconPath: null,
    })

    useEffect(() => {
        const fileDisplayElement = document.getElementById('text_document')
        if (fileDisplayElement) {
            fileDisplayElement.scrollTop = 0
        }
    }, [selectedFile])

    const handleFileClick = useCallback(
        (index: number) => {
            const file = files.data[index]
            // Call the onClick function if it exists.
            if (file.onClick) {
                file.onClick()
            } else if (file.type === 'JPEG image') {
                setSelectedFile(index)
                setSelecctedIconPath(file.iconPath)
                setCurrentFileType(file.type)
                setCurrentFileSize(file.size)
                setCurrentFileContent(`/assets/files/${file.name}`)
            } else {
                setSelectedFile(index)
                setSelecctedIconPath(file.iconPath)
                setCurrentFileType(file.type)
                setCurrentFileSize(file.size)
                setCurrentFileContent(files.metadata[file.name])
            }
        },
        [files]
    )

    const handleContainerClick = useCallback(() => {
        setSelectedFile(null)
        setCurrentFileContent(null)
        setCurrentFileType(null)
        setCurrentFileSize(null)
    }, [])

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
                    className="w-1/3 max-w-xs border-r border-r-[#666868] flex flex-col text-white h-full overflow-auto"
                >
                    {files.data.map((file, index) => (
                        <div
                            key={index}
                            className={`flex items-center pl-2 mx-2 my-0.5 h-6 rounded-md ${
                                selectedFile === index ? 'bg-[#4149CD]' : ''
                            }`}
                            onClick={() => handleFileClick(index)}
                        >
                            <Image
                                priority
                                width="16"
                                height="16"
                                src={file.iconPath}
                                alt={`${file.name} icon`}
                                className="h-4 mr-1"
                            />
                            <h1
                                className={`text-[#DFDFDF] truncate text-lg ${
                                    file.name.startsWith('Q-')
                                        ? ''
                                        : `${satisfy.className} mt-1`
                                }`}
                            >
                                {file.name}
                            </h1>
                        </div>
                    ))}
                    <div className="grow" onClick={handleContainerClick} />
                </div>
                <div
                    id="file_display"
                    className="grow h-full overflow-hidden relative"
                >
                    {selectedFile !== null && (
                        <div className="absolute inset-0 flex flex-col mx-4 my-2">
                            {currentFileType === 'JPEG image' && (
                                <Image
                                    src={currentFileContent || ''}
                                    alt="file content"
                                    className="object-contain max-h-[80%] max-w-full mx-auto rounded-lg"
                                    width="1000"
                                    height="1000"
                                />
                            )}
                            {currentFileType === 'Plain Text Document' && (
                                <div
                                    id="text_document"
                                    className="grow overflow-auto text-[#DFDFDF] bg-[#1E1E1E] whitespace-pre-wrap rounded-lg text-lg px-2"
                                >
                                    {currentFileContent}
                                </div>
                            )}
                            <div className="text-white pt-4 min-h-[20%]">
                                <span className="text-[#DFDFDF]">
                                    {files.data[selectedFile]?.name || 'N/A'}
                                </span>
                                <br />
                                <span className="text-[#9FA0A0]">
                                    {currentFileType || 'N/A'} -{' '}
                                    {currentFileSize || 'N/A'}
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
                <div className="flex-row flex" onClick={handleContainerClick}>
                    <img
                        src="/assets/icons/folder.png"
                        alt={item.name}
                        className="h-4 mr-1"
                    />
                    <span className="text-[#9D9D9E] text-xs mr-2">
                        {item.name}
                    </span>
                </div>
                {selectedFile !== null && (
                    <>
                        <span className="text-[#9D9D9E] text-[8px] mr-2">
                            {' > '}
                        </span>
                        <img
                            src={selecctedIconPath ? selecctedIconPath : ''}
                            alt={`${files.data[selectedFile]?.name} icon`}
                            className="h-4 mr-1"
                        />
                        <span
                            className={`text-[#9D9D9E] text-xs ${
                                files.data[selectedFile]?.name.startsWith('Q-')
                                    ? ''
                                    : `${satisfy.className} mt-1`
                            }`}
                        >
                            {files.data[selectedFile]?.name || 'N/A'}
                        </span>
                    </>
                )}
            </div>
        </AbstractWindow>
    )
}
