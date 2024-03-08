import React, { useRef, useEffect, useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

export default function DropdownComponent({ className }: { className?: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState('Select a quantity');
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
			<button
				className={cn('p-2 justify-between flex items-center uppercase w-full', className)}
				onClick={() => setIsOpen(!isOpen)}>
				{selectedOption}
				<IconChevronDown className="stroke-1" />
			</button>
			{isOpen && (
				<div className={cn('absolute left-0 right-0 mt-1 bg-white flex flex-col', className)}>
					<button
						className="p-2 text-[#8E8E8E] text-left uppercase"
						onClick={() => {
							setSelectedOption('Select a quantity');
							setIsOpen(false);
						}}>
						Select a quantity
					</button>
					<button
						className="p-2 hover:bg-[#68A0FF] text-left"
						onClick={() => {
							setSelectedOption('1');
							setIsOpen(false);
						}}>
						1
					</button>
					<button
						className="p-2 hover:bg-[#68A0FF] text-left"
						onClick={() => {
							setSelectedOption('2');
							setIsOpen(false);
						}}>
						2
					</button>
					<button
						className="p-2 hover:bg-[#68A0FF] text-left"
						onClick={() => {
							setSelectedOption('3');
							setIsOpen(false);
						}}>
						3
					</button>
				</div>
			)}
		</div>
	);
}
