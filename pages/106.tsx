import type { NextPage } from 'next';
import Head from 'next/head';
import dayjs from 'dayjs';
import FlipClock from '../components/FlipClock';
import Typewriter from 'typewriter-effect';
import { useState, useEffect } from 'react';

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const OneZeroSix: NextPage = () => {
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
          className="text-md font-light p-3 text-gray-600 flex space-x-4"
        >
          来世があったら、帰らないし、みんなを忘れる。だから、私も忘れて、悲しまないで。いい処に行くから。いずれ会うけど、今生きて。私だけ先に行くね。
        </pre>
      </div>
    </div>
  );
};

export default OneZeroSix;