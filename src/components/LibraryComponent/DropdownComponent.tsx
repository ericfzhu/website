import React, { useRef, useEffect, useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

export default function DropdownComponent({
	className,
	options,
	selectedOption,
	setSelectedOption,
}: {
	className?: string;
	options: string[];
	selectedOption: string;
	setSelectedOption: (option: string) => void;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const componentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [componentRef]);

	return (
		<div className="relative" ref={componentRef}>
			<button className={cn('flex w-full items-center justify-between p-2 uppercase', className)} onClick={() => setIsOpen(!isOpen)}>
				{selectedOption}
				<IconChevronDown className="stroke-1" />
			</button>
			{isOpen && (
				<div className={cn('absolute left-0 right-0 top-0 flex flex-col bg-white', className)}>
					{options.map((option, i) => (
						<button
							className={cn('h-[40px] p-2 text-left uppercase', i == 0 ? 'text-[#8E8E8E]' : 'hover:bg-accent hover:text-white')}
							onClick={() => {
								setSelectedOption(option);
								setIsOpen(false);
							}}>
							{option}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
