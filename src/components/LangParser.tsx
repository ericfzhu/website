export default function LangParser(
    lang: 'en' | 'cn' | 'jp',
    en: string,
    cn: string,
    jp: string
) {
    switch (lang) {
        case 'en':
            return en
        case 'cn':
            return cn
        case 'jp':
            return jp
    }
}
