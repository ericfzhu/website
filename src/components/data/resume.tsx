import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandX,
} from '@tabler/icons-react'

export const RESUME_DATA = {
    name: 'Eric Zhu',
    location: 'Sydney, Australia',
    locationLink: 'https://www.google.com/maps/place/Sydney',
    about: 'Experienced software engineer focused on backend systems and machine learning',
    avatarUrl: 'https://avatars.githubusercontent.com/u/73148494',
    personalWebsiteUrl: 'https://ericfzhu.com',
    contact: {
        email: 'ericfzhu909@gmail.com',
        tel: '+61412137895',
        social: [
            {
                name: 'GitHub',
                url: 'https://github.com/ericfzhu',
                icon: IconBrandGithub,
            },
            {
                name: 'LinkedIn',
                url: 'https://www.linkedin.com/in/ericfzhu/',
                icon: IconBrandLinkedin,
            },
            {
                name: 'X',
                url: 'https://x.com/ericfzhu909',
                icon: IconBrandX,
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
            link: 'https://notescast.com',
            title: 'Founder / Software Engineer',
            start: 'Jul 2023',
            end: 'Present',
            description:
                'Built NotesCast, an application that creates notes for podcast episodes from generated transcripts using Auto Speech Recognition\nArchitected and deployed Alexandria, a RAG feature that uses notes and transcript data with GPT-4 for podcast Q&A\nNotesCast extracts key insights using GPT-3.5 and Mixtral with Chain of Density prompting and prompt compression\nAll relevant data are embedded in sliding windows using AdaV2 and SPLADE for hybrid vector search',
            badges: ['Python', 'Next.js', 'Pinecone', 'LLMs', 'LangChain', 'Firebase', 'ECR', 'Lambda'],
        },
        {
            company: 'National Australia Bank',
            link: 'https://notescast.com',
            title: 'Software Engineer Intern',
            start: 'Jan 2022',
            end: 'Feb 2023',
            description:
                'Delivered robust production features for the New Payments Platform using Java, Spring and Jenkins on AWS\nEngineered and shipped the feature that enabled businesses to process inbound transactions using PayID\nTriaged and fixed a backpressure bug in Kafka where payment transactions would disappear during high traffic\nAutomated deployment and testing procedures using Python and HashiCorp, resulting in an 8% improvement in QA efficiency',
            badges: ['Java', 'Jenkins', 'Spring', 'AWS', 'Kafka', 'HashiCorp', 'Python'],
        },
        {
            company: 'University of Sydney',
            link: 'https://www.sydney.edu.au/',
            title: 'Research Engineer',
            start: 'Nov 2021',
            end: 'Apr 2022',
            description:
                'Contributed to the design of a semantic segmentation algorithm for detecting anomalous contextual changes in streaming sensor data\nDesigned and implemented a website using Gatsby and Contentful CMS for the demo of research results',
            badges: ['FLOSS', 'Gatsby', 'Contentful', 'React', 'JavaScript'],
        },
        {
            company: 'MAPFRE Insurance',
            link: 'https://www.mapfreinsurance.com/',
            title: 'Software Engineer Intern',
            start: 'Nov 2019',
            end: 'Feb 2020',
            description:
                'Collaborated with a senior engineer to create a new mobile app using React and Vue.js, which resulted in a 18% reduction in incident response time using an optimised routing algorithm',
            badges: ['Vue.js', 'PostgreSQL', 'Node.js'],
        },
        {
            company: 'Montblanc',
            link: 'https://www.montblanc.com/en-au',
            title: 'Supply Chain Management',
            start: 'Nov 2018',
            end: 'Feb 2019',
            description:
                'Managed supply chain data using SAP Business One and NSI, and handled product sales for internal sales events',
            badges: ['Microsoft Power BI', 'SAP Business One', 'NSI', 'Excel'],
        },
    ],
    skills: [
        'Python',
        'Java',
        'JavaScript',
        'TypeScript',
        'C',
        'C++',
        'PyTorch',
        'React',
        'Next.js',
        'Gatsby',
        'Spring',
        'LangChain',
        'Docker',
        'Firebase',
        'PostgreSQL',
        'Pinecone',
        'MySQL',
        'MongoDB',
        'SQLite'
    ],
    projects: [
        {
            title: 'NotesCast',
            techStack: ['Python', 'Next.js', 'VectorDB', 'LLMs', 'LangChain', 'Firebase', 'ECR', 'Lambda'
            ],
            description: 'Unlock the wisdom of podcasts in minutes.',
            link: {
                href: 'https://notescast.com/',
            },
        },
        {
            title: '\"WEBSITE\"',
            techStack: ['Next.js', 'Framer Motion', 'p5.js', 'Figma'
            ],
            description: '"Every portrait that is painted with feeling is a portrait of the artist... It is rather the painter who, on the coloured canvas, reveals himself."',
            link: {
                href: 'https://ericfzhu.com/',
            },
        },
        {
            title: 'INDUSTRIAL GALLERY',
            techStack: ['Next.js', 'Gaussian Splat', 'NeRF', 'Photography'
            ],
            description: 'Photography of industrial designs with radiance fields',
            link: {
                href: 'https://industrial---gallery.com/',
            },
        },
        {
            title: 'Advent 2023',
            techStack: ['LLMs'],
            description: 'Advent of Code with 1-shot prompting using LLMs',
        },
        {
            title: 'DSLR ResNeXt',
            techStack: ['PyTorch', 'GANs', 'Neural Networks'
            ],
            description: 'Image enhancement with ResNeXt',
        },
    ],
} as const
