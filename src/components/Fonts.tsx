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
} from 'next/font/google'

export const notoSerif = Noto_Serif_SC({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
})

export const notoSans = Noto_Sans_SC({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
})

const sourceCodePro = Source_Code_Pro({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
})
const pixelifySans = Pixelify_Sans({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
})
export const orbitron = Orbitron({
    weight: '700',
    display: 'swap',
    subsets: ['latin'],
})
export const glassAntiqua = Glass_Antiqua({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
})
const shadowsIntoLight = Shadows_Into_Light({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
})
const sacramento = Sacramento({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
})
const indieFlower = Indie_Flower({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
})
export const laBelleAurore = La_Belle_Aurore({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
})
export const satisfy = Satisfy({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
})
const zeyada = Zeyada({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
})

export const fontClassNames = [
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
]
