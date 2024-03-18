import Tooltip from '@mui/material/Tooltip';
import { IconArrowUpRight } from '@tabler/icons-react';
import Link from 'next/link';
export default function OpenNewWindowComponent({ href }: { href: string }) {
	return (
		<Tooltip
			title="Open in new window"
			placement="top"
			arrow
			className="absolute right-3 top-3 z-10 ml-2 flex h-5 w-5 cursor-alias items-center justify-center rounded-full text-secondary duration-300 hover:text-black">
			<Link href={href} target="_blank">
				<IconArrowUpRight />
			</Link>
		</Tooltip>
	);
}
