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
            {
                name: 'Hugging Face',
                url: 'https://huggingface.co/ericfzhu',
                icon: IconHuggingFace,
            },
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
                'NotesCast is a site that distills knowledge from podcasts into its key insights. I use Automatic Speech Recognition and Large Language Models alongside various prompting techniques, such as Chain-of-Density, to convert the audio files of podcasts into notes. The data is also embedded to power Alexandria, a Retrieval Augmented Generation agent that allows users to query for industry-specific knowledge, as well as a recommendation engine.',
            techStack: [
                'Python',
                'TypeScript',
                'Next.js',
                'PineconeDB',
                'Firebase',
                'LLM',
                'ASR'
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
            techStack: [
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
            techStack: [
                'Python',
                'JavaScript',
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
                'Collaborated with a senior engineer to create a new mobile app using Vue.js and Node, which resulted in a 18% reduction in incident response time using an improved routing algorithm.',
            techStack: ['JavaScript', 'Vue.js', 'Node.js', 'PostgreSQL'],
        },
        {
            company: 'Montblanc',
            title: 'Supply Chain Management Intern',
            start: 'Nov 2018',
            end: 'Feb 2019',
            location: 'Shanghai, China',
            description:
                'I forecasted demand and oversaw warehouse and storefront inventory stock levels using SAP Business One and NSI. During the annual internal sales event, I handled product sales and customer service, which contributed to 15% YoY increase in sales.',
            techStack: [
                'Microsoft Power BI',
                'SAP Business One',
                'NSI',
                'Excel',
            ],
        },
    ],
    skills: {
        Languages: [
            'Python',
            'Java',
            'TypeScript',
            'JavaScript',
            'HTML',
            'CSS',
            'C',
            'SQL',
            'Solidity',
        ],
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
            'Kubernetes',
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
    projects: [
        {
            title: '"WEBSITE"',
            techStack: ['Next.js', 'Framer Motion', 'p5.js'],
            description: 'A canvas where code is the paintbrush',
            link: {
                href: '/',
                preview: '/assets/files/projects/website.jpg',
            },
            github: 'https://github.com/ericfzhu/website/',
            year: '22'
        },
        {
            title: 'NotesCast',
            techStack: ['Python', 'TypeScript', 'Next.js', 'PineconeDB', 'LLM', 'ASR'],
            description:
                'Best podcast summaries in business, technology, and health',
            link: {
                href: 'https://notescast.com/',
                preview: '/assets/files/projects/notescast.jpg',
            },
            year: '23'
        },
        {
            title: 'Imitator',
            techStack: ['Python', 'GAN'],
            description: 'Image-to-image translation using a ResNeXt-based GAN',
            github: 'https://github.com/ericfzhu/imitator',
            year: '22'
        },
        {
            title: 'Industrial Gallery',
            techStack: ['Next.js'],
            description: 'Keyboard photography',
            link: {
                href: 'https://industrial---gallery.com/',
                preview: '/assets/files/projects/industrial---gallery.jpg',
            },
            github: 'https://github.com/ericfzhu/industrial---gallery',
            year: '23'
        },
        {
            title: 'Codex',
            techStack: ['Next.js', 'PineconeDB', 'DynamoDB'],
            description: 'A book of quote memetics',
            year: '24'
        },
        {
            title: 'Palette',
            description: 'Color generator using Stable Diffusion',
            techStack: ['Python', 'Stable Diffusion'],
            year: '24'
        },
        {
            title: "Furigana",
            techStack: ['React'],
            description: 'Chrome plugin for learning Japanese',
            year: '24'
        },
        {
            title: "Freq-5",
            description: 'Text embedding model with Matroyshka Representation Learning',
            year: '24'
        }
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
        // {
        //     name: 'Stanford: Machine Learning',
        //     link: {
        //         href: 'https://coursera.org/share/40266ad114b2221a4744fb7bc9027238',
        //     },
        // },
        // {
        //     name: 'DeepLearning.AI: Machine Learning Engineering for Production (MLOps)',
        //     link: {
        //         href: 'https://coursera.org/share/762644b1719cae20da57f0907ce263d4',
        //     },
        // },
    ],
} as const
