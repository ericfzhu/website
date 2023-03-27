import type { NextPage } from 'next';
import Head from 'next/head';
import dayjs from 'dayjs';
import FlipClock from '../components/FlipClock';
import Typewriter from 'typewriter-effect';
import { useState, useEffect } from 'react';

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const OneZeroSix: NextPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  return (
    <div className="px-8">
      <Head>
        <title>106</title>
        <meta property={'og:title'} content={'106'} key="title" />
        <link rel="icon" href="/pink.ico" />
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');
        </style>
      </Head>
      <div className="select-none flex items-center justify-center h-screen flex-col font-sans text-gray-800">
        <FlipClock origin={new Date('2020-10-06')} />

        <pre
          className="text-md font-light p-3 text-gray-600 cursor-pointer flex space-x-4"
        >
          Time since 
          {isMounted && (
            <Typewriter
              options={{
                strings: [' origin', ' nightmare'],
                cursor: '',
                autoStart: true,
                loop: true,
                delay: 75,
                deleteSpeed: 75,
                pauseFor: 10000
              }}
            />
          )}
        </pre>
      </div>
    </div>
  );
};

export default OneZeroSix;