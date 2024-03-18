import { RESUME_DATA } from '@/components/data/resume';
import { WORKS } from '@/components/data/works';
import Link from 'next/link';
import { IconCircleFilled, IconCode } from '@tabler/icons-react';
import Head from 'next/head';
import { courierPrime, jetBrainsMono } from '@/components/Fonts';
import { useState, useEffect } from 'react';
import { HoverMediaComponent } from '@/components';
import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function ResumePage() {
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [selectedTag, setSelectedTag] = useState('');

	useEffect(() => {
		const updateCursorPosition = (e: MouseEvent) => {
			setCursorPosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener('mousemove', updateCursorPosition);

		return () => {
			window.removeEventListener('mousemove', updateCursorPosition);
		};
	}, []);

	const calculateMonths = (start: string, end: string) => {
		const startDate = new Date(start);
		let endDate;
		if (end.toLowerCase() === 'present') {
			endDate = new Date();
		} else {
			endDate = new Date(end);
		}
		const totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
		const years = Math.floor(totalMonths / 12);
		const months = totalMonths % 12;
		return years >= 1 ? `${years} years ${months} months` : `${months} months`;
	};

	return (
		<main className={cn('mx-auto p-4 md:p-10', courierPrime.className)}>
			<Head>
				<title>Eric Zhu Resume</title>
				<meta property={'og:title'} content={'Eric Zhu Resume'} key="title" />
				<meta name="viewport" content="width=device-width" key="title" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<section className="relative mx-auto h-full w-full max-w-6xl space-y-16">
				<div className="flex items-center justify-between">
					<div className="flex-1 space-y-1.5">
						<div className="flex w-full items-start justify-between">
							<h1 className="text-5xl font-bold text-accent lg:text-7xl">{RESUME_DATA.name}</h1>
							<span className="flex items-center text-secondary">
								MOUSEOVER
								<IconCircleFilled className="ml-2 h-2 w-2 text-accent" />
							</span>
						</div>
						<p className="max-w-md text-base text-secondary lg:text-xl">{RESUME_DATA.description}</p>
					</div>
				</div>

				<div className="grid grid-cols-4 gap-4">
					<div className="sticky top-10 col-span-1 h-min">
						<h2 className="font-bold text-accent lg:text-3xl">About me</h2>
					</div>
					<p className="col-span-3 text-sm text-secondary lg:text-base">{RESUME_DATA.about}</p>
				</div>

				<div className="grid grid-cols-4 gap-4">
					<div className="sticky top-10 col-span-1 h-min">
						<h2 className="font-bold text-accent lg:text-3xl">Experience</h2>
					</div>
					<div className="col-span-3 space-y-8">
						{RESUME_DATA.work.map((work) => {
							const [isHovered, setIsHovered] = useState(false);

							return (
								<div key={work.company} className="flex gap-3">
									<Image src={work.logo} alt="" width={50} height={50} className="h-fit align-top" />
									<div className="flex w-full flex-col gap-3">
										<div className="flex flex-col gap-y-1.5">
											<div className="flex flex-wrap justify-between gap-x-2 text-base max-md:flex-col lg:flex-row">
												<h3 className="inline-flex items-start justify-start gap-1 font-semibold leading-none max-md:flex-col lg:flex-row lg:items-center">
													<div className="mr-2 text-lg leading-none lg:text-2xl">
														{'link' in work ? (
															<div className="flex items-center space-x-2 overflow-hidden">
																<HoverMediaComponent
																	cursorPosition={cursorPosition}
																	paths={work.link.preview}
																	onMouseEnter={() => {
																		setIsHovered(true);
																	}}
																	onMouseLeave={() => {
																		setIsHovered(false);
																	}}
																	className="h-[20%] w-auto shadow-lg">
																	<div>
																		<div
																			className={cn(
																				'transition-transform duration-300',
																				isHovered ? 'translate-y-[-120%]' : 'translate-y-0',
																			)}>
																			{work.company}
																		</div>
																		<Link
																			href={work.link.href}
																			target="_blank"
																			className={cn(
																				'absolute top-0 text-accent transition-transform duration-300',
																				isHovered ? 'translate-y-0' : 'translate-y-[120%]',
																			)}>
																			{work.company}
																		</Link>
																	</div>
																</HoverMediaComponent>
																<IconCircleFilled className="h-2 w-2 text-accent" />
															</div>
														) : (
															work.company
														)}
													</div>
												</h3>
												<div className="text-sm tabular-nums text-secondary lg:text-base">
													<Tooltip title={calculateMonths(work.start, work.end)} placement="top" arrow>
														<span>
															{work.start} - {work.end}
														</span>
													</Tooltip>
												</div>
											</div>

											{/* <div className="align-middle text-sm inline-flex items-center py-0.5 text-nowrap duration-300">
                                                {work.location}
                                            </div> */}
											<h4 className="text-sm leading-none lg:text-base">{work.title}</h4>
										</div>
										<ul className="whitespace-pre-wrap text-sm text-secondary lg:text-base">{work.description}</ul>
										<span className="inline-flex flex-wrap gap-2">
											{work.techStack.map((tag) => (
												<div
													className={cn(
														'inline-flex cursor-pointer items-center text-nowrap rounded-full px-2 py-0.5 align-middle text-sm duration-300',
														selectedTag === tag
															? 'bg-accent text-white'
															: 'bg-accent1 text-accent hover:bg-accent hover:text-white',
													)}
													onClick={() => {
														tag === selectedTag ? setSelectedTag('') : setSelectedTag(tag);
													}}
													key={tag}>
													{tag}
												</div>
											))}
										</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<div className="grid grid-cols-4 gap-4">
					<div className="sticky top-10 col-span-1 h-min">
						<h2 className="font-bold text-accent lg:text-3xl">Education</h2>
					</div>
					<div className="col-span-3 space-y-5">
						{RESUME_DATA.education.map((education) => {
							return (
								<div key={education.school} className="flex gap-3">
									<Image src={education.logo} alt="" width={50} height={50} className="h-fit align-top" />
									<div className="w-full">
										<div className="flex flex-col space-y-1.5">
											<div className="flex items-center justify-between gap-x-2 text-lg lg:text-2xl">
												<h3 className="font-semibold leading-none">{education.school}</h3>
												<div className="text-sm tabular-nums text-gray-500">{education.end}</div>
											</div>
										</div>
										<div className="mt-2 text-sm text-secondary lg:text-base">{education.degree}</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<div className="grid grid-cols-4 gap-4">
					<div className="sticky top-10 col-span-1 h-min">
						<h2 className="font-bold text-accent lg:text-3xl">Skills</h2>
					</div>
					<div className="col-span-3 flex flex-wrap gap-2">
						{Object.entries(RESUME_DATA.skills).map(([category, skills]) => {
							return (
								<div key={category} className="flex flex-col items-start lg:flex-row">
									<h3 className="shrink-0 lg:w-32 lg:text-xl">{category}</h3>
									<div className="flex flex-wrap gap-2">
										{skills.map((tag) => {
											return (
												<div
													className={cn(
														'inline-flex cursor-pointer items-center text-nowrap rounded-full px-2 py-0.5 align-middle text-sm duration-300',
														selectedTag === tag
															? 'bg-accent text-white'
															: 'bg-accent1 text-accent hover:bg-accent hover:text-white',
													)}
													onClick={() => {
														tag === selectedTag ? setSelectedTag('') : setSelectedTag(tag);
													}}
													key={tag}>
													{tag}
												</div>
											);
										})}
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<div className="grid grid-cols-4 gap-4">
					<div className="sticky top-10 col-span-1 h-min">
						<h2 className="font-bold text-accent lg:text-3xl">Works</h2>
					</div>
					<div className="col-span-3 grid grid-cols-1 gap-10 md:grid-cols-1 lg:grid-cols-2">
						{WORKS.filter((work) => 'description' in work).map((work) => {
							const [isHovered, setIsHovered] = useState(false);

							return (
								<div className="flex flex-col gap-3 overflow-hidden" key={work.title}>
									<div className="flex items-center justify-between text-lg leading-none lg:text-2xl">
										{'link' in work && work.link?.preview ? (
											<div className="flex items-center space-x-2 overflow-hidden">
												<HoverMediaComponent
													cursorPosition={cursorPosition}
													paths={work.link.preview}
													onMouseEnter={() => {
														setIsHovered(true);
													}}
													onMouseLeave={() => {
														setIsHovered(false);
													}}
													className="h-[20%] w-auto shadow-lg">
													<div className="truncate">
														<div
															className={cn(
																'transition-transform duration-300',
																isHovered ? 'translate-y-[-120%]' : 'translate-y-0',
															)}>
															{work.title}
														</div>
														<Link
															href={work.link.href}
															target="_blank"
															className={cn(
																'absolute top-0 text-accent transition-transform duration-300',
																isHovered ? 'translate-y-0' : 'translate-y-[120%]',
															)}>
															{work.title}
														</Link>
													</div>
												</HoverMediaComponent>
												<IconCircleFilled className="h-2 w-2 text-accent" />
											</div>
										) : (
											<span className="">{work.title}</span>
										)}
										{work.github && (
											<Link href={work.github} target="_blank" className="text-secondary duration-300 hover:text-accent">
												<IconCode className="h-4 w-4" />
											</Link>
										)}
									</div>
									<div className="font-mono text-sm text-secondary lg:text-base">{work.description}</div>
									<div className="mt-auto flex text-sm">
										<div className="mt-2 flex flex-wrap gap-2">
											{work.techStack?.map((tag) => (
												<div
													className={cn(
														'inline-flex cursor-pointer items-center text-nowrap rounded-full px-2 py-0.5 align-middle text-sm duration-300',
														selectedTag === tag
															? 'bg-accent text-white'
															: 'bg-accent1 text-accent hover:bg-accent hover:text-white',
													)}
													onClick={() => {
														tag === selectedTag ? setSelectedTag('') : setSelectedTag(tag);
													}}
													key={tag}>
													{tag}
												</div>
											))}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<div className="grid grid-cols-4 gap-4">
					<div className="sticky top-10 col-span-1 h-min">
						<h2 className="font-bold text-accent lg:text-3xl">Volunteer</h2>
					</div>
					<div className="col-span-3 space-y-8">
						{RESUME_DATA.volunteer.map((work) => {
							return (
								<div key={work.company} className="flex gap-3">
									<Image src={work.logo} alt="" width={50} height={50} className="h-fit align-top" />
									<div className="flex w-full flex-col gap-3">
										<div className="flex flex-col gap-y-1.5">
											<div className="flex flex-wrap justify-between gap-x-2 text-base max-md:flex-col lg:flex-row">
												<h3 className="inline-flex items-start justify-start gap-1 font-semibold leading-none max-md:flex-col lg:flex-row lg:items-center">
													<div className="mr-2 text-lg leading-none lg:text-2xl">{work.company}</div>
												</h3>
												<div className="text-sm tabular-nums text-secondary lg:text-base">
													<Tooltip title={calculateMonths(work.start, work.end)} placement="top" arrow>
														<span>
															{work.start} - {work.end}
														</span>
													</Tooltip>
												</div>
											</div>

											{/* <div className="align-middle text-sm inline-flex items-center py-0.5 text-nowrap duration-300">
                                                {work.location}
                                            </div> */}
											<h4 className="text-sm leading-none lg:text-base">{work.title}</h4>
										</div>
										<ul className="whitespace-pre-wrap text-sm text-secondary lg:text-base">{work.description}</ul>
										<span className="inline-flex flex-wrap gap-2">
											{work.techStack.map((tag) => (
												<div
													className={cn(
														'inline-flex cursor-pointer items-center text-nowrap rounded-full px-2 py-0.5 align-middle text-sm duration-300',
														selectedTag === tag
															? 'bg-accent text-white'
															: 'bg-accent1 text-accent hover:bg-accent hover:text-white',
													)}
													onClick={() => {
														tag === selectedTag ? setSelectedTag('') : setSelectedTag(tag);
													}}
													key={tag}>
													{tag}
												</div>
											))}
										</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<div className="grid grid-cols-4 gap-4">
					<div className="sticky top-10 col-span-1 h-min">
						<h2 className="font-bold text-accent lg:text-3xl">Certifications</h2>
					</div>
					<div className="col-span-3 flex justify-start gap-10 text-sm">
						{RESUME_DATA.certifications.map((certification) =>
							'link' in certification ? (
								<Link
									href={certification.link.href}
									key={certification.name}
									target="_blank"
									className="flex items-center text-secondary duration-300 hover:text-accent">
									<Image src={certification.logo} alt={certification.name} width={100} height={100} />
								</Link>
							) : (
								<div key={certification.name} className="flex items-center text-secondary">
									<Image src={certification.logo} alt={certification.name} width={100} height={100} className="grayscale filter" />
								</div>
							),
						)}
					</div>
				</div>

				<div className="grid grid-cols-4 gap-16 text-secondary">
					<div className="col-span-3 flex flex-col gap-10">
						<p className="lg:text-3xl">
							Thanks for checking out my resume. You can reach me at{' '}
							<Link
								href={`mailto:${RESUME_DATA.contact.email.url}`}
								className={cn(
									'inline-flex items-center align-baseline text-secondary4 underline duration-300',
									RESUME_DATA.contact.email.highlight,
								)}>
								<Image
									src={RESUME_DATA.contact.email.logo}
									alt={RESUME_DATA.contact.email.name}
									width={24}
									height={24}
									className="absolute h-6 w-auto"
								/>
								<span className="ml-7">{RESUME_DATA.contact.email.name}</span>
							</Link>
							. You can also find me on{' '}
							{RESUME_DATA.contact.social.map((social, index, array) => (
								<span key={social.name}>
									<Link
										href={social.url}
										target="_blank"
										className={cn(
											'inline-flex items-center align-baseline text-secondary4 underline duration-300',
											social.highlight,
										)}>
										<Image src={social.logo} alt="" width={300} height={300} className="absolute h-6 w-auto" />
										<span className="ml-8">{social.name}</span>
									</Link>
									{index < array.length - 2 ? ', ' : index === array.length - 2 ? ', and ' : '.'}
								</span>
							))}
						</p>

						<p className="max-w-3xl text-secondary lg:text-3xl">
							<Link
								href="/resume.pdf"
								className={`inline-flex items-center align-baseline text-secondary4 underline duration-300 hover:text-[#FD564B]`}>
								<Image src={'/assets/logos/pdf.webp'} alt="" width={24} height={24} className="absolute w-6" />
								<span className="ml-8">Download a simplified resume</span>
							</Link>
						</p>
					</div>
					<div className="flex flex-col text-lg">
						<Link href={'/'} className="duration-300 hover:text-accent">
							Home
						</Link>
						<Link href={'/works'} className="duration-300 hover:text-accent">
							Works
						</Link>
						<Link href={'/library'} className="duration-300 hover:text-accent">
							Literature
						</Link>
						<Link href={'/?windows=blog&fs=blog'} className="duration-300 hover:text-accent">
							Writing
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
