import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Head from 'next/head';
import { Orbitron } from '@next/font/google';
import DraggableFolder from '@/components/DraggableItem';
import Finder from '@/components/Finder';

const orbitron = Orbitron({
  weight: '700',
  display: 'swap',
  subsets: ['latin']
})

export default function HomePage(){
  const [time, setTime] = useState<dayjs.Dayjs | null>(null);
  const [showTimeDate, setShowTimeDate] = useState(true);
  const [show106, setShow106] = useState(false);
  const currentYear = dayjs().year();

  const [time106, setTime106] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const origin = dayjs('2020-10-06');

  const updateClock = () => {
    const currentTime = dayjs();
    const timeSinceOrigin = Math.floor((currentTime.valueOf() - origin.valueOf()) / 1000);
    const days = Math.floor(timeSinceOrigin / (3600 * 24));
    const hours = Math.floor((timeSinceOrigin % (3600 * 24)) / 3600);
    const minutes = Math.floor((timeSinceOrigin % 3600) / 60);
    const seconds = timeSinceOrigin % 60;

    setTime106({ days, hours, minutes, seconds });
  };
  useEffect(() => {

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setTime(dayjs());

    const timerId = setInterval(() => {
      setTime(dayjs());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  
  useEffect(() => {
    const handleClick = () => {
      setShowTimeDate(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setShowTimeDate(false);
      }
    };

    if (showTimeDate) {
      window.addEventListener('click', handleClick);
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showTimeDate]);

  return (
    <main className="relative w-screen h-screen overflow-hidden select-none">
      <Head>
        <title>"WEBSITE"</title>
        <meta property={'og:title'} content={'"WEBSITE"'} key="title" />
        <meta name="viewport" content="width=device-width" key="title" />
      </Head>
      <video autoPlay loop muted className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover min-h-screen max-w-screen -z-20">
        <source src="/assets/background.mp4" type="video/mp4" />
      </video>
      <div className={`absolute top-24 left-1/2 transform -translate-x-1/2 text-center z-10 text-slate-100 duration-500 ${showTimeDate ? 'opacity-100' : 'opacity-0 invisible'} -z-10`}>
        <h1 className="lg:text-2xl md:text-xl sm:text-base text-sm">{time ? time.format('dddd, DD MMMM') : ""}</h1>
        <h2 className="lg:text-9xl md:text-8xl sm:text-7xl text-6xl">{time ? time.format('h:mm') : ""}</h2>
      </div>

      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center -z-10 transition-opacity delay-500 ${showTimeDate ? 'opacity-0' : 'opacity-100'}`}>
        <h1 className="text-5xl text-white m-5">Eric Zhu</h1>
        <p className="text-md font-light p-3 text-white/80">
          &copy; {currentYear}. All rights reserved.
        </p>
      </div>


      <div className={`absolute mt-9 ml-9 ${orbitron.className} bg-black text-white font-mono text-6xl p-2 rounded delay-500 ${showTimeDate || show106 ? 'opacity-0' : 'opacity-100'}`}>
        {time ? time.format("HH:mm:ss") : 'Loading...'}
      </div>
      <div className={`absolute mt-9 ml-9 ${orbitron.className} bg-black text-white font-mono text-6xl p-2 rounded delay-500 ${showTimeDate || !show106 ? 'opacity-0' : 'opacity-100'}`}>
        {`${time106.days.toString().padStart(2, '0')}:${time106.hours.toString().padStart(2, '0')}:${time106.minutes.toString().padStart(2, '0')}:${time106.seconds.toString().padStart(2, '0')}`}
      </div>
      <div className={`delay-500 ${showTimeDate ? 'opacity-0' : 'opacity-100'} z-20`}>
        <DraggableFolder name="" x={0.88} y={0.1} src="/assets/white.png" onDoubleClick={() => window.open('https://notescast.com/', '_blank')}/>
        <DraggableFolder name="emotion" x={0.9} y={0.24} src="/assets/folder.png"/>
      </div>
        <Finder/>
      <h1 className={`absolute lg:text-xl text-sm bottom-1/4 left-1/2 transform -translate-x-1/2 text-left space-x-3 px-4 text-slate-100/50 duration-500 ${showTimeDate ? 'opacity-100' : 'opacity-0 invisible'}`}>
        Click anywhere or press enter to continue
      </h1>
    </main>
  );
};