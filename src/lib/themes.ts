export type Theme = 'guardian' | 'empower' | 'digital' | 'trust' | 'silent' | 'softBlush' | 'lavenderCalm' | 'roseGold' | 'skyBlush' | 'minimalNeutral';

export interface ThemeColors {
    primary: string;
    secondary: string;
    backgroundLight: string;
    backgroundDark: string;
    surfaceDark: string;
    textMain: string;
}

export interface ThemeFonts {
    heading: string;
    body: string;
}

export interface ThemeConfig {
    id: Theme;
    name: string;
    colors: ThemeColors;
    fonts: ThemeFonts;
}

export const themes: Record<Theme, ThemeConfig> = {
    guardian: {
        id: 'guardian',
        name: 'Guardian Calm',
        colors: {
            primary: '#2E3A87',
            secondary: '#2FBFBC',
            backgroundLight: '#E6E9FF',
            backgroundDark: '#101622',
            surfaceDark: '#2E3A87',
            textMain: '#2E3A87'
        },
        fonts: {
            heading: '"Poppins", sans-serif',
            body: '"Inter", sans-serif'
        }
    },
    empower: {
        id: 'empower',
        name: 'Empower Strength',
        colors: {
            primary: '#5B2A86',
            secondary: '#E8C1C5',
            backgroundLight: '#F7F3F0',
            backgroundDark: '#2D2D2D',
            surfaceDark: '#5B2A86',
            textMain: '#2D2D2D'
        },
        fonts: {
            heading: '"Playfair Display", serif',
            body: '"Lato", sans-serif'
        }
    },
    digital: {
        id: 'digital',
        name: 'Digital Shield',
        colors: {
            primary: '#00C2FF',
            secondary: '#5A6A85',
            backgroundLight: '#F4F7FA',
            backgroundDark: '#0A1F44',
            surfaceDark: '#112240',
            textMain: '#0A1F44'
        },
        fonts: {
            heading: '"Montserrat", sans-serif',
            body: '"Source Sans 3", sans-serif'
        }
    },
    trust: {
        id: 'trust',
        name: 'Trust & Transparency',
        colors: {
            primary: '#2E8B57',
            secondary: '#1B2A49',
            backgroundLight: '#F2F4F8',
            backgroundDark: '#1B2A49',
            surfaceDark: '#243456',
            textMain: '#1B2A49'
        },
        fonts: {
            heading: '"DM Sans", sans-serif',
            body: '"Roboto", sans-serif'
        }
    },
    silent: {
        id: 'silent',
        name: 'Silent Strength',
        colors: {
            primary: '#7A1F3D',
            secondary: '#C5A880',
            backgroundLight: '#FAF9F6',
            backgroundDark: '#4A4A4A',
            surfaceDark: '#555555',
            textMain: '#4A4A4A'
        },
        fonts: {
            heading: '"Cormorant Garamond", serif',
            body: '"Open Sans", sans-serif'
        }
    },
    softBlush: {
        id: 'softBlush',
        name: 'Soft Blush Safety',
        colors: {
            primary: '#C2185B', // Deep Rose
            secondary: '#1E2A38', // Navy
            backgroundLight: '#FFF6F8', // Very light blush
            backgroundDark: '#1E2A38', // Navy Base
            surfaceDark: '#2C3E50',
            textMain: '#1E2A38'
        },
        fonts: {
            heading: '"Poppins", sans-serif',
            body: '"Inter", sans-serif'
        }
    },
    lavenderCalm: {
        id: 'lavenderCalm',
        name: 'Lavender Calm',
        colors: {
            primary: '#5B4B8A',
            secondary: '#C9C3FF',
            backgroundLight: '#F4F2FF',
            backgroundDark: '#2D2D2D',
            surfaceDark: '#3D3D3D',
            textMain: '#2D2D2D'
        },
        fonts: {
            heading: '"DM Sans", sans-serif',
            body: '"Roboto", sans-serif'
        }
    },
    roseGold: {
        id: 'roseGold',
        name: 'White & Rose Gold',
        colors: {
            primary: '#B76E79', // Rose Gold
            secondary: '#EAD5D8',
            backgroundLight: '#FAFAFA',
            backgroundDark: '#333333',
            surfaceDark: '#444444',
            textMain: '#333333'
        },
        fonts: {
            heading: '"Montserrat", sans-serif',
            body: '"Open Sans", sans-serif'
        }
    },
    skyBlush: {
        id: 'skyBlush',
        name: 'Sky & Blush',
        colors: {
            primary: '#3A7CA5',
            secondary: '#F6C1D1',
            backgroundLight: '#F8FBFF',
            backgroundDark: '#1F2933',
            surfaceDark: '#2E3B48',
            textMain: '#1F2933'
        },
        fonts: {
            heading: '"Poppins", sans-serif',
            body: '"Lato", sans-serif'
        }
    },
    minimalNeutral: {
        id: 'minimalNeutral',
        name: 'Minimal Soft Neutral',
        colors: {
            primary: '#7A1F3D',
            secondary: '#F4C2C2',
            backgroundLight: '#F9F9F9',
            backgroundDark: '#2E2E2E',
            surfaceDark: '#3E3E3E',
            textMain: '#2E2E2E'
        },
        fonts: {
            heading: '"Playfair Display", serif',
            body: '"Inter", sans-serif'
        }
    }
};
