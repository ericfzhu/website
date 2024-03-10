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
			<div className="absolute flex items-center px-4 py-3 z-0 w-full h-12">
				<div className="text-center m-auto text-[#EBEBEB] text-sm">{item.name}</div>
			</div>

			{/* Files */}
			<div id="files" className="bg-[#2A2C2D] border-t border-t-black border-b border-b-[#666868] grow flex overflow-hidden mt-12">
				<div id="files_column" className="w-1/4 max-w-xs border-r border-r-[#666868] flex flex-col text-white h-full overflow-auto">
					{filesArray.map((f, index) => (
						<div
							key={index}
							className={cn(
								'flex items-center pl-2 mx-2 my-0.5 h-6 rounded-md',
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
							<h1 className={`text-[#DFDFDF] truncate`}>{f.name}</h1>
						</div>
					))}
					<div className="grow" onClick={handleContainerClick} />
				</div>
				<div id="file_display" className="grow h-full overflow-hidden relative">
					{filesArray.map((file, index) => (
						<div className={cn('absolute inset-0 flex flex-col mx-4 my-2', index === filePos ? 'flex' : 'hidden')}>
							<div className="object-contain overflow-hidden w-full justify-center flex">
								<Image
									src={file.path}
									alt="file content"
									className="rounded-lg object-contain h-full grow"
									width={500}
									height={500}
									priority
								/>
							</div>
							<div className="text-white pt-4 min-h-[20%] flex flex-col space-y-3">
								{file.href !== undefined ? (
									<Link href={file.href} target="_blank" className="flex items-center space-x-1 cursor-alias">
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
			<div id="path" className="bg-[#2A2C2D] h-2 p-4 overflow-hidden rounded-b-lg flex-row flex items-center">
				<div className="flex-row flex " onClick={handleContainerClick}>
					<img src="/assets/icons/folder.png" alt={item.name} className="h-4 mr-1" />
					<span className="text-[#9D9D9E] text-xs mr-2 mt-0.5">{item.name}</span>
				</div>
				{filePos !== null && (
					<>
						<span className="text-[#9D9D9E] text-[8px] mr-2">{' > '}</span>
						{/* <img
                            src={file.path ? file.path : ''}
                            alt={`${file.name} icon`}
                            className="h-4 mr-1"
                        /> */}
						<span className={`text-[#9D9D9E] text-xs mt-0.5`}>{filesArray[filePos].name || 'N/A'}</span>
					</>
				)}
			</div>
		</AbstractWindow>
	);
}
