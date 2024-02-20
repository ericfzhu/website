import { windowProps } from '@/components/types'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { PLAYER } from '@/components/data/player'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { robotoMono } from '@/components/Fonts'
import {
    IconX,
    IconMinus,
    IconCode,
    IconPlayerPlay,
    IconPlayerPause,
    IconPlayerPauseFilled,
    IconPlayerPlayFilled,
    IconPlayerTrackNextFilled,
    IconPlayerTrackPrevFilled,
} from '@tabler/icons-react'

export type Track = {
    name: string
    src: string
}

export default function PlayerWindow({
    item,
    position,
    moveItemToLast,
}: windowProps) {
    const [windowPosition, setWindowPosition] = useState<{
        x: number
        y: number
    }>({
        x:
            window.innerWidth *
            (window.innerWidth < 798 ? position.x / 3 : position.x),
        y: window.innerHeight * position.y,
    })
    const [lightsHovered, setLightsHovered] = useState(false)
    const [currentTrack, setCurrentTrack] = useState<Track>(PLAYER[0])
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    const targetProperties = {
        x: windowPosition.x,
        y: windowPosition.y,
        height: Math.max(463.5352286774, (window.innerWidth * 0.6) / 1.618),
        width: Math.max(300, window.innerWidth * 0.3),
    }

    function playPause() {
        if (!audioRef.current) return
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    function nextTrack() {
        const index = PLAYER.indexOf(currentTrack)
        const nextIndex = (index + 1) % PLAYER.length
        setCurrentTrack(PLAYER[nextIndex])
    }

    function prevTrack() {
        const index = PLAYER.indexOf(currentTrack)
        const prevIndex = (index - 1 + PLAYER.length) % PLAYER.length
        setCurrentTrack(PLAYER[prevIndex])
    }

    useEffect(() => {
        if (!audioRef.current) return
        audioRef.current.onended = () => {
            nextTrack()
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play()
                    setIsPlaying(true)
                }
            }, 50)
        }
        if (isPlaying) {
            audioRef.current.play()
        }
    }, [currentTrack])

    function formatTime(time: number) {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    return (
        <div
            className={`absolute h-full w-full pointer-events-none ${robotoMono.className} scroll-smooth`}
            style={{ zIndex: position.z.indexOf(item.var) + 10 }}
        >
            <motion.div
                initial={targetProperties}
                animate={targetProperties}
                drag
                onTapStart={() => moveItemToLast(item.var)}
                onDragEnd={(e, info) =>
                    setWindowPosition({
                        x: info.offset.x + windowPosition.x,
                        y: info.offset.y + windowPosition.y,
                    })
                }
                dragMomentum={false}
                transition={{ stiffness: 100, transition: 0.5 }}
                className={`pointer-events-auto flex flex-col overflow-hidden @container relative flex justify-center items-center mx-4 my-8`}
            >
                <div className="relative z-20 w-full flex justify-center items-center">
                    {PLAYER.map((track, i) => (
                        <Image
                            key={currentTrack.src}
                            src={`/assets/player/${track.src}.jpg`}
                            alt={track.name}
                            width={300}
                            height={300}
                            className={`object-cover rounded-full aspect-square pointer-events-none h-auto w-[90%] mx-auto z-10 border-2 ring-2 ring-black absolute ${track.src == currentTrack.src ? 'visible' : 'invisible'}`}
                            style={{
                                animation: 'spin 20s linear infinite',
                                animationPlayState: isPlaying ? 'running' : 'paused',
                            }}
                        />
                    ))}
                    <div className="absolute inset-0 flex justify-center items-center z-10">
                        <div className="bg-white rounded-full h-16 w-16 ring-4 ring-white border border-black"></div>
                    </div>
                </div>
                <div className="flex flex-col items-center p-4 bg-white border border-black shadow-lg w-[70%] h-full max-w-xl mx-auto absolute"> 
                    {/* Traffic lights */}
                    <div
                        className="absolute flex items-center my-[18px] z-20 top-0 left-5"
                        onMouseEnter={() => setLightsHovered(true)}
                        onMouseLeave={() => setLightsHovered(false)}
                    >
                        {/* Red */}
                        <div
                            className={`${
                                position.z.indexOf(item.var) ==
                                    position.z.length - 1 || lightsHovered
                                    ? 'bg-[#FE5F57]'
                                    : ''
                            } w-3 h-3 flex justify-center items-center active:bg-[#F59689] border border-black`}
                            onClick={() => item.closeWindow!()}
                        >
                            {lightsHovered && <IconX className="stroke-black/50" />}
                        </div>
                    </div>
                    <h2 className="text-xl font-bold">{currentTrack.name}</h2>
                    <div className="relative flex justify-center items-center">
                        <span className="mr-2">
                            {audioRef.current && !isNaN(audioRef.current.currentTime) ? formatTime(audioRef.current.currentTime) : '00:00'}{' / '}
                            {audioRef.current && !isNaN(audioRef.current.duration) ? formatTime(audioRef.current.duration) : '00:00'}
                        </span>
                    </div>
                    <audio
                        ref={audioRef}
                        src={`/assets/player/${currentTrack.src}.mp3`}
                        onEnded={() => setIsPlaying(false)}
                    />
                    <div className="absolute bottom-5 w-fit border text-black border-black rounded-md divide-x divide-black">
                        <button onClick={prevTrack} className="px-4 py-2">
                            <IconPlayerTrackPrevFilled className='w-5'/>
                        </button>
                        <button onClick={playPause} className="px-4 py-2">
                            {isPlaying ? (
                                <IconPlayerPauseFilled className='w-5'/>
                            ) : (
                                <IconPlayerPlayFilled className='w-5'/>
                            )}
                        </button>
                        <button onClick={nextTrack} className="px-4 py-2">
                            <IconPlayerTrackNextFilled className='w-5'/>
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
