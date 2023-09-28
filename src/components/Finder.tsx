import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Finder() {
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    })
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            initial={position}
            animate={position}
            drag
            dragMomentum={false}
            className="bg-[#3D3E3E] rounded-lg z-50 w-5/12"
        >
            <div className="flex p-5">
                <div
                    className="dot bg-red-500 rounded-full w-3 h-3 flex justify-center items-center"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {isHovered && (
                        <svg
                            className="stroke-black/50"
                            xmlns="http://www.w3.org/2000/svg"
                            width="7"
                            height="7"
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
                    className="dot bg-yellow-500 rounded-full w-3 h-3 flex justify-center items-center ml-2"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
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
                    className="dot bg-green-500 rounded-full w-3 h-3 flex justify-center items-center ml-2"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
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
            </div>
        </motion.div>
    )
}
