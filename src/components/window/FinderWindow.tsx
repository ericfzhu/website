import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { IconX, IconMinus } from '@tabler/icons-react'

interface File {
    name: string
    iconPath: string
    type: string
    size: string
    onClick?: () => void
}

interface Props {
    name: string
    position: { x: number; y: number; z: string[] }
    onClose: () => void
    files: { metadata: Record<string, string>; data: File[] }
    moveItemToLast: (itemname: string) => void
}

export default function Finder({
    name,
    position,
    onClose,
    files,
    moveItemToLast,
}: Props) {
    const [windowPosition, setWindowPosition] = useState<{
        x: number
        y: number
    }>({
        x:
            window.innerWidth *
            (window.innerWidth < 798 ? position.x / 3 : position.x),
        y: window.innerHeight * position.y,
    })
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
        <div
            className={`absolute pointer-events-none ${
                isFullscreen
                    ? 'fixed inset-0 z-50 backdrop-blur-md'
                    : 'h-full w-full'
            }`}
            style={{ zIndex: position.z.indexOf(name) + 10 }}
        >
            <motion.div
                initial={windowPosition}
                animate={{
                    x: isFullscreen
                        ? (window.innerWidth * 1) / 20
                        : windowPosition.x,
                    y: isFullscreen
                        ? (window.innerHeight * 1) / 20
                        : windowPosition.y,
                    height: isFullscreen
                        ? window.innerHeight * 0.9
                        : Math.min(550, window.innerHeight * 0.6),
                    width: isFullscreen
                        ? window.innerWidth * 0.9
                        : window.innerWidth < 768
                          ? window.innerWidth * 0.8
                          : Math.min(750, window.innerWidth * 0.5),
                }}
                drag={!isFullscreen}
                onTapStart={() => moveItemToLast(name)}
                onDragEnd={(e, info) =>
                    setWindowPosition({
                        x: info.offset.x + windowPosition.x,
                        y: info.offset.y + windowPosition.y,
                    })
                }
                dragMomentum={false}
                transition={{ stiffness: 100, transition: 0.5 }}
                className={`bg-[#282827]/80 pointer-events-auto backdrop-blur-md rounded-lg ring-1 ring-black shadow-2xl shadow-black border-[#666868] border flex flex-col m-10}`}
            >
                {/* Traffic lights */}
                <div
                    className="absolute flex items-center mx-4 z-10 my-[18px] rounded-full"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Red */}
                    <div
                        className="bg-[#FE5F57] rounded-full w-3 h-3 flex justify-center items-center active:bg-[#F59689]"
                        onClick={onClose}
                    >
                        {isHovered && <IconX className="stroke-black/50" />}
                    </div>
                    {/* Yellow */}
                    <div
                        className="bg-[#FCBA2B] rounded-full w-3 h-3 flex justify-center items-center active:bg-[#F6F069] ml-2"
                        onClick={onClose}
                    >
                        {isHovered && <IconMinus className="stroke-black/50" />}
                    </div>
                    {/* Green */}
                    <div
                        className="bg-[#61C555] rounded-full w-3 h-3 flex justify-center items-center active:bg-[#73F776] ml-2"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                    >
                        {isHovered && (
                            <svg
                                className="fill-black/50"
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
                                        {files.data[selectedFile]?.name ||
                                            'N/A'}
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
                            src="/assets/icons/folder.png"
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
                                alt={`${files.data[selectedFile]?.name} icon`}
                                className="h-4 mr-1"
                            />
                            <span className="text-[#9D9D9E] text-xs">
                                {files.data[selectedFile]?.name || 'N/A'}
                            </span>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    )
}