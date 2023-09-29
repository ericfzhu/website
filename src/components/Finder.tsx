import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface File {
    name: string;
    iconPath: string;
    type: string;
    onClick?: () => void;
}
  
interface Props {
    name: string;
    x: number;
    y: number;
    onClose: () => void;
    files: File[];
    fileContents: Record<string, string>;
}

export default function Finder({
    name,
    x,
    y,
    onClose,
    files,
    fileContents,
    }: Props) {
    const initialPosition = {
        x: window.innerWidth * x,
        y: window.innerHeight * y,
    };
    const [position, setPosition] = useState<{ x: number; y: number }>(initialPosition);
    const [isHovered, setIsHovered] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<number | null>(null);
    const [currentFileContent, setCurrentFileContent] = useState<string | null>(null);
    const [currentFileType, setCurrentFileType] = useState<string | null>(null);
    const [selecctedIconPath, setSelecctedIconPath] = useState<string | null>(null);

    const handleFileClick = useCallback((index: number) => {
        const file = files[index];
        console.log(file)
        // Call the onClick function if it exists.
        if (file.onClick) {
            file.onClick();
        }
        else {
            setSelectedFile(index);
            setSelecctedIconPath(file.iconPath)
            setCurrentFileType(file.type);
            setCurrentFileContent(fileContents[file.name]);
            console.log(selectedFile)
            console.log(currentFileContent)
            console.log(currentFileType)
        }

    }, [files, fileContents]);

    
    const handleContainerClick = useCallback(() => {
        setSelectedFile(null);
        setCurrentFileContent(null);
        setCurrentFileType(null);
    }, []);
    
    return (
        <div className={`absolute pointer-events-none z-auto ${isFullscreen ? 'fixed inset-0 z-50 backdrop-blur-md' : 'h-full w-full'}`}>
            <motion.div
                initial={position}
                animate={{
                    x: isFullscreen ? window.innerWidth * 1/10 : position.x,
                    y: isFullscreen ? window.innerHeight * 1/10 : position.y,
                    height: isFullscreen ? '80%' : '40%',
                    width: isFullscreen ? '80%' : '40%',
                }}
                drag={!isFullscreen}
                onDragEnd={(e, info) => setPosition({ x: info.offset.x + position.x, y: info.offset.y + position.y })}
                dragMomentum={false}
                transition={{ stiffness:100, transition:0.5 }}
                className={`bg-[#282827]/80 pointer-events-auto backdrop-blur-md rounded-lg z-50 ring-1 ring-black shadow-2xl shadow-black border-[#666868] border flex flex-col m-10}`}
            >
                <div className="flex items-center p-5">
                    <div
                        className="bg-red-500 rounded-full w-3 h-3 flex justify-center items-center"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={onClose}
                    >
                        {isHovered && (
                            <svg
                                className="stroke-black/50"
                                xmlns="http://www.w3.org/2000/svg"
                                width="6.5"
                                height="6.5"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-width="1.2"
                                    d="M1.182 5.99 5.99 1.182m0 4.95L1.182 1.323"
                                />
                            </svg>
                        )}
                    </div>
                    <div
                        className="bg-yellow-500 rounded-full w-3 h-3 flex justify-center items-center ml-2"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={onClose}
                    >
                        {isHovered && (
                            <svg
                                className="stroke-black/50"
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
                        className="bg-green-500 rounded-full w-3 h-3 flex justify-center items-center ml-2"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => setIsFullscreen(!isFullscreen)}
                    >
                        {isHovered && (
                            <svg
                                className="fill-black/50"
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
                    <div className="m-auto  text-[#EBEBEB] text-sm ">{name}</div>
                </div>
                <div id="files" className="bg-[#2A2C2D] border-t border-t-black border-b border-b-[#666868] flex-grow flex">
                    <div id="files_column" className="h-full w-1/3 min-w-fit border-r border-r-[#666868] flex flex-col text-white">
                            {files.map((file, index) => (
                                <div key={index} className={`flex items-center pl-2 mx-2 my-0.5 h-6 rounded-md ${selectedFile === index ? 'bg-[#4149CD]' : ''}`} onClick={() => handleFileClick(index)}>
                                    <img src={file.iconPath} alt={`${file.name} icon`} className="h-4 mr-1"/>
                                    <h1 className="text-[#DFDFDF]">
                                        {file.name}
                                    </h1>
                                </div>
                            ))}
                        <div className="flex-grow" onClick={handleContainerClick}/>
                    </div>
                    <div id="file_display" className="flex-grow h-full overflow-hidden relative">
                        {selectedFile !== null && <div className="absolute inset-0 flex flex-col mx-4 my-2">
                            {currentFileType === 'image' && (
                                <img src={currentFileContent || ''} alt="file content" className="object-contain max-h-full max-w-full mx-auto" />
                            )}
                            {currentFileType === 'Plain Text Document' && (
                                <div className="flex-grow overflow-auto text-[#DFDFDF] bg-[#1E1E1E] whitespace-pre-wrap rounded-lg text-sm px-2">
                                    {currentFileContent}
                                </div>
                            )}
                            <div className="text-white pt-4">
                                <span className="text-[#DFDFDF]">{files[selectedFile]?.name || 'N/A'}</span><br />
                                <span className="text-[#9FA0A0]">{currentFileType || 'N/A'}</span>
                            </div>
                        </div>}
                    </div>
                </div>
                <div id="path" className="bg-[#2A2C2D] h-max p-4 h-2 overflow-hidden rounded-b-lg flex-row flex items-center">
                    <div className='flex-row flex' onClick={handleContainerClick}>
                        <img src="/assets/folder.png" alt={name} className="h-4 mr-1"/>
                        <span className="text-[#9D9D9E] text-xs mr-2">{name}</span>
                    </div>
                    {selectedFile !== null && (
                        <>
                            <span className="text-[#9D9D9E] text-[8px] mr-2">{' > '}</span>
                            <img src={selecctedIconPath ? selecctedIconPath : ''} alt={`${files[selectedFile]?.name} icon`} className="h-4 mr-1"/>
                            <span className="text-[#9D9D9E] text-xs">{files[selectedFile]?.name || 'N/A'}</span>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    )
}