import { Outfit} from 'next/font/google';

export const SITE_TITLE_DEFAULT = 'Diasporex | A Smart Solutions for covert money';
export const SITE_TITLE_TEMPLATE_DEFAULT = `%s - Diasporex`;
export const SITE_DESCRIPTION_DEFAULT = 'Diasporex Description';
export const SITE_VERIFICATION_GOOGLE_DEFAULT =
    'google-site-verification=adwdawdaw';

export const FONT_DEFAULT = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit-sans'
});