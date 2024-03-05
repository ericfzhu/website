import Tooltip from '@mui/material/Tooltip';
import { IconArrowUpRight } from '@tabler/icons-react';
import Link from 'next/link';
export default function OpenNewWindowComponent({ href }: { href: string }) {
	return (
		<Tooltip
			title="Open in new window"
			placement="top"
			arrow
			className="absolute right-3 top-3 z-10 rounded-full flex h-5 w-5 justify-center items-center hover:text-black duration-300 ml-2 text-secondary">
			<Link href={href} target="_blank">
				<IconArrowUpRight />
			</Link>
		</Tooltip>
	);
}
