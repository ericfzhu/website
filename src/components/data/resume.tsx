import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandX,
} from '@tabler/icons-react'

export const RESUME_DATA = {
    name: 'Eric Zhu',
    location: 'Sydney, Australia',
    locationLink: 'https://www.google.com/maps/place/Sydney',
    description: 'Software Engineer, Artist, Investor',
    about: 'Experienced software engineer focused on building backends and machine learning systems in Python and Java. I am currently working on NotesCast, an automated podcast notes app.',
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
            title: 'Founder, Software Engineer',
            start: 'Jul 2023',
            end: 'Present',
            location: 'Sydney, Australia',
            description:
                'NotesCast is an application that extracts key insights and creates notes from podcasts in business, technology, and health using AI models. Its second product, Alexandria, is an RAG-based AI agent allows users to query for industry specific knowledge using select trusted podcast sources as a knowledge base. I am currently working on the development of Alexandria using various LLMs including Mixtral, GPT-4, and Pinecone, and the development of NotesCast using Next.js, TypeScript, and Firebase.',
            badges: [
                'Python',
                'Pinecone',
                'LLM',
                'TypeScript',
                'Next.js',
                'Firebase',
                'Lambda',
            ],
        },
        {
            company: 'National Australia Bank',
            title: 'Software Engineer Intern',
            start: 'Jan 2022',
            end: 'Feb 2023',
            location: 'Sydney, Australia',
            description:
                "At NAB, I delivered robust production features for the New Payments Platform using Java, Spring and Jenkins on AWS, most noteably a feature that enabled businesses to process inbound transactions using PayID. I've also triaged and fixed a backpressure bug in Kafka where payment transactions would disappear during high traffic loads. I've also improved deployment and testing scripts using Python, resulting in an 8% increase in QA efficiency.",
            badges: [
                'Java',
                'Jenkins',
                'Spring',
                'AWS',
                'Kafka',
                'Python',
                'HashiCorp Vault',
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
                'Scipy',
                'Fast Semantic Segmentation',
                'TypeScript',
                'Gatsby',
                'Contentful CMS',
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
            badges: ['Vue.js', 'PostgreSQL', 'Node.js'],
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
    ],
    skills: {
        Languages: ['Python', 'Java', 'TypeScript', 'C'],
        Libraries: [
            'PyTorch',
            'React',
            'Next.js',
            'Gatsby',
            'Spring',
            'LangChain',
            'Docker',
        ],
        Databases: [
            'PostgreSQL',
            'PineconeDB',
            'MySQL',
            'MongoDB',
            'SQLite',
            'Redis',
        ],
    },
    intersts: [
        'Machine Learning',
        'Investing',
        'Fashion',
        'Reading',
        'Philosophy',
    ],
    projects: [
        {
            title: '"WEBSITE"',
            techStack: ['TypeScript', 'Next.js'],
            description: 'Exploring the artistic potential of the web browser',
            link: {
                href: '/',
            },
        },
        {
            title: 'INDUSTRIAL GALLERY',
            techStack: ['Gaussian Splat', 'Radiance Fields', 'Python'],
            description:
                'Application of Gaussian Splats to industrial photography',
            link: {
                href: 'https://industrial---gallery.com/',
            },
        },
        {
            title: 'Advent of Prompts',
            techStack: ['Python', 'GPT4'],
            description:
                'Tackling Advent of Code with 1-shot prompting using LLMs',
        },
        {
            title: 'DSLR ResNeXt',
            techStack: ['PyTorch', 'GAN', 'Neural Network'],
            description: 'Image-to-image translation using ResNeXt-based GAN',
        },
        {
            title: "GAnki",
            techStack: ['Tesseract', 'Python', 'Tesseract', 'OpenCV'],
            description: 'Anki flashcards from げんき using OCR'
        }
    ],
} as const
