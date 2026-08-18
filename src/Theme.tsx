import { createTheme } from '@mui/material/styles'

const xs = 0
const sm = 600
const md = 900
const mdl = 1000
const lg = 1200
const xl = 1540

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: true
        sm: true
        md: true
        mdl: true 
        lg: true
        xl: true
    }
}

declare module '@mui/material/styles' {
    interface TypeBackground {
        main: string
        light: string
    }

    interface PaletteOptions {
        background?: Partial<TypeBackground>
    }

    interface TypographyVariants {
        badge: React.CSSProperties
        label: React.CSSProperties
        xSmall: React.CSSProperties
        copenLabel: React.CSSProperties
        displayMd: React.CSSProperties
        displaySm: React.CSSProperties
        headLineLg: React.CSSProperties
        headLineMd: React.CSSProperties
        headLineSm: React.CSSProperties
        titleLg: React.CSSProperties
        titleMd: React.CSSProperties
        titleSm: React.CSSProperties
        labelLg: React.CSSProperties
        labelMd: React.CSSProperties
        labelSm: React.CSSProperties
        bodyLg: React.CSSProperties
        bodyMd: React.CSSProperties
        bodySm: React.CSSProperties
    }

    interface TypographyVariantsOptions {
        badge?: React.CSSProperties
        label?: React.CSSProperties
        xSmall?: React.CSSProperties
        copenLabel?: React.CSSProperties
        displayMd?: React.CSSProperties
        displaySm?: React.CSSProperties
        headLineLg?: React.CSSProperties
        headLineMd?: React.CSSProperties
        headLineSm?: React.CSSProperties
        titleLg?: React.CSSProperties
        titleMd?: React.CSSProperties
        titleSm?: React.CSSProperties
        labelLg?: React.CSSProperties
        labelMd?: React.CSSProperties
        labelSm?: React.CSSProperties
        bodyLg?: React.CSSProperties
        bodyMd?: React.CSSProperties
        bodySm?: React.CSSProperties
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        badge: true
        label: true
        xSmall: true
        copenLabel: true
        displayMd: true
        displaySm: true
        headLineLg: true
        headLineMd: true
        headLineSm: true
        titleLg: true
        titleMd: true
        titleSm: true
        labelLg: true
        labelMd: true
        labelSm: true
        bodyLg: true
        bodyMd: true
        bodySm: true
    }
}

function getFontSize(fontSize: number): {
    fontSize: string
    lineHeight: string
} {
    return {
        fontSize: `${fontSize}px`,
        lineHeight: `${fontSize * 1.5}px`,
    }
}

export let AppTheme = createTheme()

AppTheme = createTheme({
    direction: 'rtl',

    components: {
        MuiInputBase: {
            defaultProps: {
                disableInjectingGlobalStyles: true,
            },
        },
        MuiIconButton: {
            defaultProps: {
                style: { padding: '0px' },
            },
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                },
            },
        },
    },
    breakpoints: {
        values: {
            xs,
            sm,
            md,
            mdl,
            lg,
            xl,
        },
    },
    typography: {
        fontFamily: 'Samim',
        displayMd: {
            fontSize: '45px',
            lineHeight: '52px',
        },
        displaySm: {
            fontSize: '36px',
            lineHeight: '44px',
        },
        headLineLg: {
            fontSize: '32px',
            lineHeight: '40px',
        },
        headLineMd: {
            fontSize: '28px',
            lineHeight: '36px',
        },
        headLineSm: {
            fontSize: '24px',
            lineHeight: '32px',
        },
        titleLg: {
            fontSize: '22px',
            lineHeight: '28px',
        },
        titleMd: {
            fontSize: '16px',
            lineHeight: '24px',
        },
        titleSm: {
            fontSize: '14px',
            lineHeight: '20px',
        },
        labelLg: {
            fontSize: '14px',
            lineHeight: '20px',
        },
        labelMd: {
            fontSize: '12px',
            lineHeight: '16px',
        },
        labelSm: {
            fontSize: '11px',
            lineHeight: '16px',
        },
        bodyLg: {
            fontSize: '16px',
            lineHeight: '24px',
        },
        bodyMd: {
            fontSize: '14px',
            lineHeight: '20px',
        },
        bodySm: {
            fontSize: '12px',
            lineHeight: '16px',
        },
        button: {
            textTransform: 'none',
        },
        h1: {
            fontSize: '28px',
            fontWeight: 'bold',
        },
        h2: {
            fontSize: '24px',
            fontWeight: 'bold',
        },
        h3: {
            fontSize: '20px',
            fontWeight: 'bold',
        },
        body1: {
            fontSize: '18px',
            fontWeight: 'bold',
        },
        body2: {
            fontSize: '18px',
            fontWeight: 'normal',
        },
        badge: {
            fontFamily: 'Vazirmatn',
            fontSize: '14px',
            fontWeight: 'normal',
        },
        label: {
            fontSize: '13px',
            fontWeight: 'normal',
        },
        xSmall: {
            fontSize: '10px',
            fontWeight: 'normal',
        },
        copenLabel: {
            fontSize: '13px',
            fontWeight: 'normal',
        },
        h4: {
            ...getFontSize(12),
            [AppTheme.breakpoints.up(sm)]: {
                ...getFontSize(20),
            },
            [AppTheme.breakpoints.up(md)]: {
                ...getFontSize(36),
            },
            [AppTheme.breakpoints.up(lg)]: {
                ...getFontSize(42),
            },
            [AppTheme.breakpoints.up(xl)]: {
                ...getFontSize(48),
            },
        },
        h5: {
            ...getFontSize(8),
            [AppTheme.breakpoints.up(sm)]: {
                ...getFontSize(16),
            },
            [AppTheme.breakpoints.up(md)]: {
                ...getFontSize(18),
            },
            [AppTheme.breakpoints.up(lg)]: {
                ...getFontSize(30),
            },
            [AppTheme.breakpoints.up(xl)]: {
                ...getFontSize(40),
            },
        },
        h6: {
            ...getFontSize(14),
            [AppTheme.breakpoints.up(sm)]: {
                ...getFontSize(16),
            },
            [AppTheme.breakpoints.up(md)]: {
                ...getFontSize(20),
            },
            [AppTheme.breakpoints.up(lg)]: {
                ...getFontSize(24),
            },
            [AppTheme.breakpoints.up(xl)]: {
                ...getFontSize(32),
            },
        },
        subtitle1: {
            ...getFontSize(12),
            [AppTheme.breakpoints.up(sm)]: {
                ...getFontSize(14),
            },
            [AppTheme.breakpoints.up(md)]: {
                ...getFontSize(16),
            },
            [AppTheme.breakpoints.up(lg)]: {
                ...getFontSize(20),
            },
            [AppTheme.breakpoints.up(xl)]: {
                ...getFontSize(30),
            },
        },
        subtitle2: {
            ...getFontSize(10),
            [AppTheme.breakpoints.up(sm)]: {
                ...getFontSize(12),
            },
            [AppTheme.breakpoints.up(md)]: {
                ...getFontSize(14),
            },
            [AppTheme.breakpoints.up(lg)]: {
                ...getFontSize(18),
            },
            [AppTheme.breakpoints.up(xl)]: {
                ...getFontSize(24),
            },
        },
        caption: {
            ...getFontSize(6),
            [AppTheme.breakpoints.up(sm)]: {
                ...getFontSize(10),
            },
            [AppTheme.breakpoints.up(md)]: {
                ...getFontSize(12),
            },
            [AppTheme.breakpoints.up(lg)]: {
                ...getFontSize(13),
            },
            [AppTheme.breakpoints.up(xl)]: {
                ...getFontSize(15),
            },
        },
    },
    palette: {
        mode: 'light',
        text: {
            primary: '#1E1E1E',
            secondary: '#5B5B5B',
            disabled: '#A0A0A0',
        },
        primary: {
            main: '#1E61CD',
            light: '#4B83DC',
            dark: '#144493',  
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#FAAE3A',
            light: '#FBC268', 
            dark: '#AF7A28',   
            contrastText: '#000000',
        },
        error: {
            main: '#B3261E',
            light: '#C2514B',
            dark: '#7D1A15',
        },
        background: {
            default: '#F4F5F7',
            paper: '#FFFFFF',
            main: '#FFFFFF',
            light: '#F5F5F5',
        },
    },
})