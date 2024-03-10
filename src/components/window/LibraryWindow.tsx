import LibraryComponent from '@/components/LibraryComponent';
import { AbstractWindow, OpenNewWindowComponent } from '@/components/window';
import { windowProps } from '@/components/types';
import { useSearchParams } from 'next/navigation';

export default function LibraryWindow({ item, position, moveItemToLast }: windowProps) {
	const searchParams = useSearchParams();
	let href = '/library?';
	const tab = searchParams.get('tab');
	if (tab) {
		href += `tab=${tab}&`;
	}
	const lang = searchParams.get('lang');
	if (lang) {
		href += `lang=${lang}&`;
	}
	const author = searchParams.get('author');
	if (author) {
		href += `author=${author}&`;
	}
	const book = searchParams.get('book');
	if (book) {
		href += `book=${book}&`;
	}
	const reflections = searchParams.get('reflections');
	if (reflections) {
		href += `reflections=${reflections}&`;
	}
	href = href.slice(0, -1); // Remove trailing '&'
	return (
		<AbstractWindow position={position} item={item} moveItemToLast={moveItemToLast} className="bg-[#FFFFFF]">
			<OpenNewWindowComponent href={href} />

			<div className="overflow-auto relative">
				<LibraryComponent />
			</div>
		</AbstractWindow>
	);
}
