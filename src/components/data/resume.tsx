import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandX,
} from '@tabler/icons-react'

import IconHuggingFace from '../svg/IconHuggingFace'

export const RESUME_DATA = {
    name: 'Eric Zhu',
    description: 'Software Engineer, Artist',
    about: "Focused on building beautiful backends and machine learning systems using Python and TypeScript. I'm currently working on NotesCast, a site that offers condensed summaries of the best podcasts in business, technology, and health, allowing users to discover and learn from the best in the world in minutes. I'm also a scholar of philosophy and design, where I explore how principles from other disciplines can inform and inspire my work.",
    contact: {
        email: {
            name: 'Gmail',
            url: 'mailto:ericfzhu909@gmail.com',
            highlight: 'hover:text-[#3DAC59]',
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
                'NotesCast is a site that distills knowledge from podcasts into its key insights. I use Automatic Speech Recognition and Large Language Models alongside various prompting techniques, such as Chain-of-Density, to transform podcast audio files into summaries. The data is embedded to power Alexandria, a Retrieval Augmented Generation agent that allows users to query for industry-specific knowledge, as well as a recommendation engine for users to discover related content.',
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
                "As a member of the Transaction Lifecycle Management team, I delivered robust production features for the New Payments Platform using Java, Spring, and Jenkins on AWS under an Agile software development model. My efforts were instrumental in delivering a business critical feature that enabled businesses to process inbound transactions using PayID, which had a projected revenue impact of 3-5 million per annum. Additionally, I triaged and fixed a backpressure performance bug in Kafka, where payment transactions would occasionally during high-traffic loads, helping the system achieve 5,000 transaction messages per second. Furthermore, I improved deployment and testing CI/CD pipelines using Python, Jenkins, and Terraform, resulting in an 8% increase in QA efficiency.",
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
                'Contributed to the design of a Fast Low-cost Online Semantic Segmentation model for detecting anomalous contextual changes in streaming sensor data. I was also responsible for designing and implementing a website using Gatsby and Contentful CMS for the research project.',
            techStack: [
                'Python',
                'JavaScript',
                'SciPy',
                'FLOSS',
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
            techStack: ['Microsoft Power BI', 'SAP', 'NSI', 'Excel'],
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
            'React Native',
        ],
        Libraries: [
            'PyTorch',
            'React',
            'Next.js',
            'Gatsby',
            'Vue.js',
            'Spring',
            'LangChain',
            'Scipy',
            'Terraform',
            'Kubernetes',
            'Framer Motion',
            'p5.js',
            'Three.js',
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
        Platforms: [
            'Notion',
            'Figma',
            'Canva',
            'Runway ML',
            'Excel',
            'SAP',
            'AWS',
            'Firebase',
        ],
    },
    volunteer: [
        {
            company: 'UNSW Computer Enthusiasts Society',
            logo: '/assets/logos/pcsoc.webp',
            title: 'Treasurer, Delegate, Community Manager',
            start: 'Jul 2021',
            end: 'Oct 2022',
            location: 'Sydney, Australia',
            description:
                "I managed the society's finances and was responsible for ensuring that the society was compliant with the university's policies and procedures, especially in regard to the affiliation and applying for grants. I was also responsible for hosting select events and workshops, as well as creating the related materials and resources.",
            techStack: ['Wordpress', 'Excel', 'Google Workspace'],
        },
        {
            company: 'Enactus',
            logo: '/assets/logos/enactus.webp',
            title: 'Software Engineer',
            start: 'Dec 2021',
            end: 'Apr 2022',
            location: 'Sydney, Australia',
            description:
                'Worked with the EnAccess Maps team to develop a mobile app using React Native and OpenStreeMap to help disadvantaged individuals find and review wheelchair accessible restaurants. The website for EnAccess Maps was constructed using Notion. I was also responsible for building the backend of the CirCex, a platform that enables charity op-shops to easily catalogue their items for an online database.',
            techStack: [
                'React Native',
                'Python',
                'Notion',
                'OpenStreetMap',
                'OpenCV',
            ],
        },
        {
            company: 'UNSW Redback Racing',
            logo: '/assets/logos/redback.webp',
            title: 'Data Scientist',
            start: 'Sep 2021',
            end: 'Apr 2022',
            location: 'Sydney, Australia',
            description:
                'Responsible for developing machine learning models to predict vehicle design parameters and optimise the performance of the next generation Formula SAE vehicle. I also architected a data pipeline to simulate custom vehicle designs using Assetto Corsa and analyse the results using Python on Jupyter Notebooks and Kedro.',
            techStack: ['Python', 'PyTorch', 'Scikit-learn'],
        },
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
        //     name: 'AWS: Certified Developer Associate',
        //     logo: '/assets/logos/awscertifieddeveloperassociate.webp',
        //     link: {
        //         href: '',
        //     },
        // },
    ],
} as const
