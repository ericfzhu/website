import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandX,
} from '@tabler/icons-react'

import IconHuggingFace from '../svg/IconHuggingFace'

export const RESUME_DATA = {
    name: 'Eric Zhu',
    location: 'Sydney, Australia',
    locationLink: 'https://www.google.com/maps/place/Sydney',
    description: 'Software Engineer, Artist',
    about: 'Experienced software engineer focused on building backends and machine learning systems in Python and Java. I am currently working on NotesCast, a site that provides condensed notes of the top podcasts in business, technology, and health, allowing users to learn from the best in the world in minutes.',
    avatarUrl: 'https://avatars.githubusercontent.com/u/73148494',
    personalWebsiteUrl: 'https://www.ericfzhu.com',
    contact: {
        email: 'ericfzhu909@gmail.com',
        tel: '+61412137895',
        social: [
            {
                name: 'Github',
                url: 'https://github.com/ericfzhu',
                icon: IconBrandGithub,
            },
            {
                name: 'Linkedin',
                url: 'https://www.linkedin.com/in/ericfzhu/',
                icon: IconBrandLinkedin,
            },
            {
                name: 'X',
                url: 'https://x.com/ericfzhu909',
                icon: IconBrandX,
            },
            // {
            //     name: 'Hugging Face',
            //     url: 'https://huggingface.co/ericfzhu',
            //     icon: IconHuggingFace,
            // },
        ],
    },
    education: [
        {
            school: 'University of New South Wales',
            degree: 'Bachelor of Science, Computer Science (Artificial Intelligence)',
            end: '2022',
        },
    ],
    work: [
        {
            company: 'NotesCast',
            link: {
                href: 'https://www.notescast.com',
                preview: '/assets/files/notescast.jpg',
            },
            title: 'Founder, Software Engineer',
            start: 'Jul 2023',
            end: 'Present',
            location: 'Sydney, Australia',
            description:
                'NotesCast is a site that distills knowledge from podcasts by transcribing audio using OpenAI Whisper, an Automatic Speech Recognition model. The transcriptions are then processed using LLMs with Chain-of-Density prompting, which is then embedded in sliding windows with dense and sparse models for hybrid vector search. The second feature, Alexandria, is a Retrieval Augmented Generation agent that allows users to query for industry-specific knowledge using podcast sources as a knowledge base. I am currently working on the development of Alexandria using various LLMs and PineconeDB, and the development of NotesCast using Next.js and Firebase.',
            badges: [
                'Python',
                'PineconeDB',
                'Next.js',
                'Firebase',
                'Transformers',
            ],
        },
        {
            company: 'National Australia Bank',
            title: 'Software Engineer Intern',
            start: 'Jan 2022',
            end: 'Feb 2023',
            location: 'Sydney, Australia',
            description:
                "At NAB, I delivered robust production features for the New Payments Platform using Java, Spring, and Jenkins on AWS. This work significantly enhanced the efficiency of the Transaction Lifecycle Management process by introducing improved capabilities. A notable achievement was implementing a feature that enabled businesses to process inbound transactions using PayID. I've also triaged and fixed a backpressure bug in Kafka where payment transactions would disappear during high-traffic loads. I've also improved deployment and testing scripts using Python and Terraform, resulting in an 8% increase in QA efficiency.",
            badges: [
                'Java',
                'Jenkins',
                'Spring',
                'Kafka',
                'AWS',
                'Python',
                'Vault by Hashicorp',
                'Terraform',
            ],
        },
        {
            company: 'The University of Sydney',
            title: 'Research Engineer',
            start: 'Nov 2021',
            end: 'Apr 2022',
            location: 'Sydney, Australia',
            description:
                'Contributed to the design of a semantic segmentation algorithm for detecting anomalous contextual changes in streaming sensor data. I was also responsible for designing and implementing a website using Gatsby and Contentful CMS for the research showcase.',
            badges: [
                'Python',
                'SciPy',
                'Fast Semantic Segmentation',
                'Gatsby',
                'Contentful',
            ],
        },
        {
            company: 'MAPFRE Insurance',
            title: 'Software Engineer Intern',
            start: 'Nov 2019',
            end: 'Feb 2020',
            location: 'Shanghai, China',
            description:
                'Collaborated with a senior engineer to create a new mobile app using React and Vue.js, which resulted in a 18% reduction in incident response time using an improved routing algorithm.',
            badges: ['Vue.js', 'Node.js', 'PostgreSQL'],
        },
        {
            company: 'Montblanc',
            title: 'Supply Chain Management Intern',
            start: 'Nov 2018',
            end: 'Feb 2019',
            location: 'Shanghai, China',
            description:
                'I forecasted demand and oversaw warehouse and storefront inventory stock levels using SAP Business One and NSI. During the annual internal sales event, I handled product sales and customer service, which contributed to 15% YoY increase in sales.',
            badges: ['Microsoft Power BI', 'SAP Business One', 'NSI', 'Excel'],
        },
        // {
        //     company: 'Runbow Logistics & Technology',
        //     title: 'Logistics Management Intern',
        //     start: 'Jun 2017',
        //     end: 'Jul 2017',
        //     location: 'Shanghai, China',
        //     description:
        //         'I oversaw the logistics for over 20 clients utilizing Excel and was responsible for long-term storage management. Additionally, I devised a more efficient client onboarding process, leading to a 20% decrease in the time required for onboarding.',
        //     badges: ['Excel'],
        // },
    ],
    skills: {
        Languages: ['Python', 'Java', 'TypeScript', 'HTML', 'CSS', 'C', 'SQL', 'Solidity'],
        Libraries: [
            'PyTorch',
            'React',
            'Next.js',
            'Gatsby',
            'Vue.js',
            'Spring',
            'LangChain',
            'Docker',
            'Firebase',
            'Scipy',
            'Terraform',
        ],
        Databases: [
            'PostgreSQL',
            'PineconeDB',
            'MySQL',
            'MongoDB',
            'SQLite',
            'DynamoDB',
            'Redis',
        ],
    },
    intersts: [
        'Reading',
        'Investing',
        'Machine Learning',
        'Fashion',
        'Philosophy',
    ],
    projects: [
        {
            title: '"WEBSITE"',
            techStack: ['Next.js', 'Framer Motion', 'p5.js'],
            description: 'A canvas where code is the paintbrush',
            link: {
                href: '/',
                preview: '/assets/files/website.jpg',
            },
            github: 'https://github.com/ericfzhu/website/',
        },
        {
            title: 'Imitator',
            techStack: ['PyTorch'],
            description: 'Image-to-image translation with a ResNeXt-based GAN',
            github: 'https://github.com/ericfzhu/imitator',
        },
        // {
        //     title: 'Advent 23',
        //     techStack: ['Python', 'Transformers'],
        //     description:
        //         'Tackling Advent of Code with 1-shot prompting using GPT',
        //     github: 'https://github.com/ericfzhu/advent-23',
        // },
        // {
        //     title: 'INDUSTRIAL GALLERY',
        //     techStack: ['Gaussian Splat', 'Radiance Fields', 'Python'],
        //     description:
        //         'Application of Gaussian Splats to industrial photography',
        //     link: {
        //         href: 'https://industrial---gallery.com/',
        //         preview: '/assets/files/industrial---gallery.jpg',
        //     },
        // },
    ],
    certifications: [
        {
            name: 'AWS: Certified Cloud Practitioner',
            link: {
                href: 'https://www.credly.com/badges/68e5bff7-acfe-4c29-a722-a2772f8ddc9d/',
            },
        },
        {
            name: 'Microsoft Certified: Azure AI Fundamentals',
            link: {
                href: 'https://www.credly.com/badges/d53e41ee-bb7b-4734-859d-239ea11274e9',
            },
        },
        {
            name: 'Stanford: Machine Learning',
            link: {
                href: 'https://coursera.org/share/40266ad114b2221a4744fb7bc9027238',
            },
        },
        {
            name: 'DeepLearning.AI: Machine Learning Engineering for Production (MLOps)',
            link: {
                href: 'https://coursera.org/share/762644b1719cae20da57f0907ce263d4',
            },
        },
    ],
} as const
