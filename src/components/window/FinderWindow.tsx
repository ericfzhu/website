import { useCallback, useEffect } from 'react';
import Image from 'next/image';
import AbstractWindow from '@/components/window/AbstractWindow';
import { FinderWindowProps, File } from '@/components/types';
import Link from 'next/link';
import { IconArrowUpRight } from '@tabler/icons-react';
import Tooltip from '@mui/material/Tooltip';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function FinderWindow({ item, position, files, moveItemToLast }: FinderWindowProps) {
	const searchParams = useSearchParams();
	const router = useRouter();
	function setFilePos(pos: number | null) {
		const newParams = new URLSearchParams(searchParams.toString());
		if (pos !== null) {
			newParams.set(item.var, pos.toString());
		} else {
			newParams.delete(item.var);
		}
		router.push('?' + newParams.toString());
	}
	const filePos = searchParams.get(item.var) !== null ? Number(searchParams.get(item.var)) : null;

	useEffect(() => {
		const fileDisplayElement = document.getElementById('text_document');
		if (fileDisplayElement) {
			fileDisplayElement.scrollTop = 0;
		}
	}, [filePos]);

	const handleContainerClick = useCallback(() => {
		setFilePos(null);
	}, []);

	const filesArray: File[] = Object.keys(files).map((key) => ({
		name: key,
		path: files[key].path,
		href: files[key].href ? files[key].href : undefined,
	}));

	return (
		<AbstractWindow position={position} item={item} moveItemToLast={moveItemToLast} className="bg-[#282827]/80" windowScale={0.7}>
			{/* Window title */}
			<div className="absolute z-0 flex h-12 w-full items-center px-4 py-3">
				<div className="m-auto text-center text-sm text-[#EBEBEB]">{item.name}</div>
			</div>

			{/* Files */}
			<div id="files" className="mt-12 flex grow overflow-hidden border-b border-t border-b-[#666868] border-t-black bg-[#2A2C2D]">
				<div id="files_column" className="flex h-full w-1/4 max-w-xs flex-col overflow-auto border-r border-r-[#666868] text-white">
					{filesArray.map((f, index) => (
						<div
							key={index}
							className={cn(
								'mx-2 my-0.5 flex h-6 items-center rounded-md pl-2',
								filePos !== null && filePos === index ? 'bg-[#4149CD]' : '',
							)}
							onClick={() => setFilePos(index)}>
							{/* <Image
                                priority
                                width="16"
                                height="16"
                                src={f.path}
                                alt={`${f.name} icon`}
                                className="h-4 mr-1"
                            /> */}
							<h1 className={`truncate text-[#DFDFDF]`}>{f.name}</h1>
						</div>
					))}
					<div className="grow" onClick={handleContainerClick} />
				</div>
				<div id="file_display" className="relative h-full grow overflow-hidden">
					{filesArray.map((file, index) => (
						<div className={cn('absolute inset-0 mx-4 my-2 flex flex-col', index === filePos ? 'flex' : 'hidden')}>
							<div className="flex w-full justify-center overflow-hidden object-contain">
								<Image
									src={file.path}
									alt="file content"
									className="h-full grow rounded-lg object-contain"
									width={500}
									height={500}
									priority
								/>
							</div>
							<div className="flex min-h-[20%] flex-col space-y-3 pt-4 text-white">
								{file.href !== undefined ? (
									<Link href={file.href} target="_blank" className="flex cursor-alias items-center space-x-1">
										<span className="text-[#DFDFDF]">{file.name || 'N/A'}</span>
										<IconArrowUpRight className="h-4 w-4" />
									</Link>
								) : (
									<span className="text-[#DFDFDF]">{file.name || 'N/A'}</span>
								)}
								<span className="text-[#9FA0A0]">JPEG image</span>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Path */}
			<div id="path" className="flex h-2 flex-row items-center overflow-hidden rounded-b-lg bg-[#2A2C2D] p-4">
				<div className="flex flex-row " onClick={handleContainerClick}>
					<img src="/assets/icons/folder.png" alt={item.name} className="mr-1 h-4" />
					<span className="mr-2 mt-0.5 text-xs text-[#9D9D9E]">{item.name}</span>
				</div>
				{filePos !== null && (
					<>
						<span className="mr-2 text-[8px] text-[#9D9D9E]">{' > '}</span>
						{/* <img
                            src={file.path ? file.path : ''}
                            alt={`${file.name} icon`}
                            className="h-4 mr-1"
                        /> */}
						<span className={`mt-0.5 text-xs text-[#9D9D9E]`}>{filesArray[filePos].name || 'N/A'}</span>
					</>
				)}
			</div>
		</AbstractWindow>
	);
}
