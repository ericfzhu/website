import type { NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

const Home: NextPage = () => {
  let currentYear = new Date().getFullYear();
  const socials = [
    {
      name: 'Github',
      link: 'https://github.com/ericfzhu',
    },
    {
      name: 'Hugging Face',
      link: 'https://huggingface.co/ericzhu',
    },
    {
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/in/ericfzhu/',
    },
    {
      name: 'Twitter',
      link: 'https://twitter.com/ericfzhu1',
    },
    {
      name: 'Email',
      link: 'mailto:eric@ericfzhu.com',
    },
  ];
  return (
    <div className="px-8">
      <Head>
        <title>Eric Zhu</title>
        <meta property={'og:title'} content={'Eric Zhu'} key="title" />
        <meta name="viewport" content="width=device-width" key="title" />
        <link rel="icon" href="/favicon.ico" />
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');
        </style>
      </Head>

      <div className="select-none flex items-center justify-center h-screen flex-col font-sans text-gray-800">
        <div>
          <h1 className="text-5xl font-light m-5">Eric Zhu</h1>
        </div>
        <div className="align-middle max-w-screen-md justify-between">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="text-lg font-light text-gray-600 p-1 hover:bg-gray-200 focus:outline-none">
                Socials
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  {socials.map((social, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <a
                          href={social.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <button
                            className={`${
                              active ? 'bg-gray-200' : 'text-gray-600'
                            } group flex w-full items-center px-2 py-2 text-lg`}
                          >
                            {social.name}
                          </button>
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <span className="my-2">/</span>
          <a
            href="https://notescast.com"
            target="_blank"
            rel="noreferrer"
          >
            <button className="text-lg font-light text-gray-600 hover:text-gray-800 p-1 focus:outline-none hover:bg-gray-200">
              NotesCast
            </button>
          </a>
        </div>
        <p className="text-md font-light p-3 text-gray-600">
          &copy; {currentYear}. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Home;