import {
	Orbitron,
	Source_Code_Pro,
	Pixelify_Sans,
	Glass_Antiqua,
	Shadows_Into_Light,
	Sacramento,
	Indie_Flower,
	La_Belle_Aurore,
	Satisfy,
	Zeyada,
	Noto_Serif_SC,
	Noto_Sans_SC,
	Noto_Sans,
	Noto_Serif_Display,
	Courier_Prime,
	Rosarivo,
	Roboto_Mono,
} from 'next/font/google';

export const rosarivo = Rosarivo({
	subsets: ['latin'],
	weight: '400',
	style: 'italic',
});

export const courierPrime = Courier_Prime({
	subsets: ['latin'],
	weight: '400',
	preload: true,
});

export const robotoMono = Roboto_Mono({
	subsets: ['latin'],
	preload: true,
});

export const notoSerifDisplay = Noto_Serif_Display({
	subsets: ['latin'],
});

export const notoSans = Noto_Sans({
	subsets: ['latin'],
});

export const notoSerifSC = Noto_Serif_SC({
	weight: '400',
	subsets: ['latin'],
	preload: true,
});

export const notoSansSC = Noto_Sans_SC({
	subsets: ['latin'],
});

export const sourceCodePro = Source_Code_Pro({
	subsets: ['latin'],
});
const pixelifySans = Pixelify_Sans({
	subsets: ['latin'],
	adjustFontFallback: false,
});
export const orbitron = Orbitron({
	subsets: ['latin'],
});
export const glassAntiqua = Glass_Antiqua({
	weight: '400',
	subsets: ['latin'],
});
const shadowsIntoLight = Shadows_Into_Light({
	weight: '400',
	subsets: ['latin'],
});
const sacramento = Sacramento({
	weight: '400',
	subsets: ['latin'],
});
export const indieFlower = Indie_Flower({
	weight: '400',
	subsets: ['latin'],
});
export const laBelleAurore = La_Belle_Aurore({
	weight: '400',
	subsets: ['latin'],
});
export const satisfy = Satisfy({
	weight: '400',
	subsets: ['latin'],
});
const zeyada = Zeyada({
	weight: '400',
	subsets: ['latin'],
});

export const fontClassNames = [
	courierPrime.className,
	sourceCodePro.className,
	orbitron.className,
	zeyada.className,
	pixelifySans.className,
	glassAntiqua.className,
	satisfy.className,
	shadowsIntoLight.className,
	sacramento.className,
	indieFlower.className,
	laBelleAurore.className,
];
