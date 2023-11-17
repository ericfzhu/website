import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface File {
    name: string
    iconPath: string
    type: string
    size: string
    onClick?: () => void
}

interface Props {
    name: string
    x: number
    y: number
    zPosition: string[]
    onClose: () => void
    files: File[]
    fileContents: Record<string, string>
    moveItemToLast: (itemname: string) => void
}

export default function Finder({
    name,
    x,
    y,
    zPosition,
    onClose,
    files,
    fileContents,
    moveItemToLast,
}: Props) {
    const initialPosition = {
        x:
            window.innerWidth < 798
                ? (window.innerWidth * x) / 3
                : window.innerWidth * x,
        y: window.innerHeight * y,
    }
    const [position, setPosition] = useState<{ x: number; y: number }>(
        initialPosition
    )
    const [isHovered, setIsHovered] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [selectedFile, setSelectedFile] = useState<number | null>(null)
    const [currentFileContent, setCurrentFileContent] = useState<string | null>(
        null
    )
    const [currentFileType, setCurrentFileType] = useState<string | null>(null)
    const [currentFileSize, setCurrentFileSize] = useState<string | null>(null)
    const [selecctedIconPath, setSelecctedIconPath] = useState<string | null>(
        null
    )

    useEffect(() => {
        const fileDisplayElement = document.getElementById('text_document')
        if (fileDisplayElement) {
            fileDisplayElement.scrollTop = 0
        }
    }, [selectedFile])

    const handleFileClick = useCallback(
        (index: number) => {
            const file = files[index]
            // Call the onClick function if it exists.
            if (file.onClick) {
                file.onClick()
            } else if (file.type === 'JPEG image') {
                setSelectedFile(index)
                setSelecctedIconPath(file.iconPath)
                setCurrentFileType(file.type)
                setCurrentFileSize(file.size)
                setCurrentFileContent(`/assets/${file.name}`)
            } else {
                setSelectedFile(index)
                setSelecctedIconPath(file.iconPath)
                setCurrentFileType(file.type)
                setCurrentFileSize(file.size)
                setCurrentFileContent(fileContents[file.name])
            }
        },
        [files, fileContents]
    )

    const handleContainerClick = useCallback(() => {
        setSelectedFile(null)
        setCurrentFileContent(null)
        setCurrentFileType(null)
        setCurrentFileSize(null)
    }, [])

    return (
        <div
            className={`absolute pointer-events-none ${
                isFullscreen
                    ? 'fixed inset-0 z-50 backdrop-blur-md'
                    : 'h-full w-full'
            }`}
            style={{ zIndex: zPosition.indexOf(name) + 10 }}
        >
            <motion.div
                initial={position}
                animate={{
                    x: isFullscreen ? (window.innerWidth * 1) / 20 : position.x,
                    y: isFullscreen
                        ? (window.innerHeight * 1) / 20
                        : position.y,
                    height: isFullscreen ? '90%' : '50%',
                    width: isFullscreen
                        ? '90%'
                        : window.innerWidth < 768
                        ? '80%'
                        : '40%',
                }}
                drag={!isFullscreen}
                onTapStart={() => moveItemToLast(name)}
                onDragEnd={(e, info) =>
                    setPosition({
                        x: info.offset.x + position.x,
                        y: info.offset.y + position.y,
                    })
                }
                dragMomentum={false}
                transition={{ stiffness: 100, transition: 0.5 }}
                className={`bg-[#282827]/80 pointer-events-auto backdrop-blur-md rounded-lg ring-1 ring-black shadow-2xl shadow-black border-[#666868] border flex flex-col m-10}`}
            >
                {/* Traffic lights */}
                <div
                    className="absolute flex items-center mx-4 z-10 my-[18px]"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div
                        className="bg-[#FE5F57] rounded-full w-3 h-3 flex justify-center items-center active:bg-[#F59689]"
                        onClick={onClose}
                    >
                        {isHovered && (
                            <svg
                                className="stroke-[#990000] h-2 w-2"
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="8"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-width="1"
                                    d="M1.182 5.99L5.99 1.182m0 4.95L1.182 1.323"
                                />
                            </svg>
                        )}
                    </div>
                    <div
                        className="bg-[#FCBA2B] rounded-full w-3 h-3 flex justify-center items-center active:bg-[#F6F069] ml-2"
                        onClick={onClose}
                    >
                        {isHovered && (
                            <svg
                                className="stroke-[#90591E]"
                                xmlns="http://www.w3.org/2000/svg"
                                width="6"
                                height="1"
                                fill="none"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-width="2"
                                    d="M.61.703h5.8"
                                />
                            </svg>
                        )}
                    </div>
                    <div
                        className="bg-[#61C555] rounded-full w-3 h-3 flex justify-center items-center active:bg-[#73F776] ml-2"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                    >
                        {isHovered && (
                            <svg
                                className="fill-[#296118]"
                                xmlns="http://www.w3.org/2000/svg"
                                fill-rule="evenodd"
                                stroke-linejoin="round"
                                stroke-miterlimit="2"
                                clip-rule="evenodd"
                                viewBox="0 0 13 13"
                            >
                                <path d="M4.871 3.553 9.37 8.098V3.553H4.871zm3.134 5.769L3.506 4.777v4.545h4.499z" />
                                <circle
                                    cx="6.438"
                                    cy="6.438"
                                    r="6.438"
                                    fill="none"
                                />
                            </svg>
                        )}
                    </div>
                </div>

                {/* Window title */}
                <div className="absolute flex items-center px-4 py-3 z-0 w-full h-12">
                    <div className="text-center m-auto text-[#EBEBEB] text-sm">
                        {name}
                    </div>
                </div>

                {/* Files */}
                <div
                    id="files"
                    className="bg-[#2A2C2D] border-t border-t-black border-b border-b-[#666868] flex-grow flex overflow-hidden mt-12"
                >
                    <div
                        id="files_column"
                        className="w-1/3 max-w-xs border-r border-r-[#666868] flex flex-col text-white h-full overflow-auto"
                    >
                        {files.map((file, index) => (
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
                                <h1 className="text-[#DFDFDF] truncate">
                                    {file.name}
                                </h1>
                            </div>
                        ))}
                        <div
                            className="flex-grow"
                            onClick={handleContainerClick}
                        />
                    </div>
                    <div
                        id="file_display"
                        className="flex-grow h-full overflow-hidden relative"
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
                                        className="flex-grow overflow-auto text-[#DFDFDF] bg-[#1E1E1E] whitespace-pre-wrap rounded-lg text-sm px-2"
                                    >
                                        {currentFileContent}
                                    </div>
                                )}
                                <div className="text-white pt-4 min-h-[20%]">
                                    <span className="text-[#DFDFDF]">
                                        {files[selectedFile]?.name || 'N/A'}
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
                    <div
                        className="flex-row flex"
                        onClick={handleContainerClick}
                    >
                        <img
                            src="/assets/folder.png"
                            alt={name}
                            className="h-4 mr-1"
                        />
                        <span className="text-[#9D9D9E] text-xs mr-2">
                            {name}
                        </span>
                    </div>
                    {selectedFile !== null && (
                        <>
                            <span className="text-[#9D9D9E] text-[8px] mr-2">
                                {' > '}
                            </span>
                            <img
                                src={selecctedIconPath ? selecctedIconPath : ''}
                                alt={`${files[selectedFile]?.name} icon`}
                                className="h-4 mr-1"
                            />
                            <span className="text-[#9D9D9E] text-xs">
                                {files[selectedFile]?.name || 'N/A'}
                            </span>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
