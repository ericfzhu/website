import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandX,
} from '@tabler/icons-react'

import IconHuggingFace from '../svg/IconHuggingFace'

export const RESUME_DATA = {
    name: 'Eric Zhu',
    description: 'Software Engineer, Artist',
    about: 'Experienced software engineer focused on building backends and machine learning systems in Python and Java. I am currently working on NotesCast, a site that provides condensed notes of the top podcasts in business, technology, and health, allowing users to learn from the best in the world in minutes.',
    avatarUrl: 'https://avatars.githubusercontent.com/u/73148494',
    personalWebsiteUrl: 'https://www.ericfzhu.com',
    contact: {
        email: {
            name: 'Gmail',
            url: 'mailto:ericfzhu909@gmail.com',
            highlight: 'hover:text-[#D85140]',
            logo: '/assets/logos/gmail.webp',
        },
        social: [
            {
                name: 'Github',
                url: 'https://github.com/ericfzhu',
                highlight: 'hover:text-[#000000]',
                logo: '/assets/logos/github.webp',
                icon: IconBrandGithub,
            },
            {
                name: 'Linkedin',
                url: 'https://www.linkedin.com/in/ericfzhu/',
                highlight: 'hover:text-[#377DB5]',
                logo: '/assets/logos/linkedin.webp',
                icon: IconBrandLinkedin,
            },
            {
                name: '"Formerly Twitter"',
                url: 'https://x.com/ericfzhu909',
                highlight: 'hover:text-[#000000]',
                logo: '/assets/logos/x.webp',
                icon: IconBrandX,
            },
            {
                name: 'Hugging Face',
                url: 'https://huggingface.co/ericfzhu',
                highlight: 'hover:text-[#F8D34D]',
                logo: '/assets/logos/hf.webp',
                icon: IconHuggingFace,
            },
        ],
    },
    education: [
        {
            school: 'University of New South Wales',
            logo: '/assets/logos/unsw.webp',
            degree: 'Bachelor of Science, Computer Science (Artificial Intelligence)',
            end: '2022',
        },
    ],
    work: [
        {
            company: 'NotesCast',
            logo: '/assets/logos/notescast.webp',
            link: {
                href: 'https://www.notescast.com',
                preview: [
                    '/assets/files/projects/notescast/1.jpg',
                    '/assets/files/projects/notescast/2.jpg',
                    '/assets/files/projects/notescast/3.jpg',
                ],
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
                'ASR',
            ],
        },
        {
            company: 'National Australia Bank',
            logo: '/assets/logos/nab.webp',
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
            logo: '/assets/logos/usyd.webp',
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
            logo: '/assets/logos/mapfre.webp',
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
            logo: '/assets/logos/montblanc.webp',
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
                preview: [
                    '/assets/files/projects/website/1.jpg',
                    '/assets/files/projects/website/2.jpg',
                    '/assets/files/projects/website/3.jpg',
                    '/assets/files/projects/website/4.jpg',
                ],
            },
            github: 'https://github.com/ericfzhu/website/',
            year: '2022',
        },
        {
            title: 'NotesCast',
            techStack: [
                'Python',
                'TypeScript',
                'Next.js',
                'PineconeDB',
                'LLM',
                'ASR',
            ],
            description:
                'Best podcast summaries in business, technology, and health',
            link: {
                href: 'https://notescast.com/',
                preview: [
                    '/assets/files/projects/notescast/1.jpg',
                    '/assets/files/projects/notescast/2.jpg',
                    '/assets/files/projects/notescast/3.jpg',
                ],
            },
            year: '2023',
        },
        {
            title: 'Imitator',
            techStack: ['Python', 'GAN'],
            description: 'Image-to-image translation using a ResNeXt-based GAN',
            github: 'https://github.com/ericfzhu/imitator',
            year: '2022',
        },
        {
            title: 'Industrial Gallery',
            techStack: ['Next.js'],
            description: 'Keyboard photography',
            link: {
                href: 'https://industrial---gallery.com/',
                preview: [
                    '/assets/files/projects/industrial---gallery/1.jpg',
                    '/assets/files/projects/industrial---gallery/2.jpg',
                    '/assets/files/projects/industrial---gallery/3.jpg',
                ],
            },
            github: 'https://github.com/ericfzhu/industrial---gallery',
            year: '2023',
        },
        {
            title: 'Codex',
            techStack: ['Next.js', 'PineconeDB', 'DynamoDB'],
            description: 'A book of quote memetics',
            github: 'https://github.com/ericfzhu/codex',
            year: '2024',
        },
        {
            title: 'Palette',
            description: 'Color generator using Stable Diffusion',
            techStack: ['Python', 'Stable Diffusion'],
            year: '2024',
        },
        {
            title: '"Formerly Facebook"',
            // link: {
            //     href: 'https://formerlyfacebook.com/',
            //     preview: ['']
            // }
            description: 'Work in progress',
            year: '2024',
        },
        // {
        //     title: 'Furigana',
        //     techStack: ['React'],
        //     description: 'Chrome plugin for learning Japanese',
        //     year: '2024'
        // }
    ],
    certifications: [
        {
            name: 'AWS: Certified Cloud Practitioner',
            logo: '/assets/logos/awscloudpractitioner.webp',
            link: {
                href: 'https://www.credly.com/badges/68e5bff7-acfe-4c29-a722-a2772f8ddc9d/',
            },
        },
        {
            name: 'Microsoft Certified: Azure AI Fundamentals',
            logo: '/assets/logos/azureaifundamentals.webp',
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
