import {useRef, useState} from 'react'
import {Box, Button, Stack, Typography} from '@mui/material'

import type {PanelSettingsState} from './types'

import {GeneralSettings} from './GeneralSettings'
import {BrandingSettings} from './BrandingSettings'
import {ThemeSettings} from './ThemeSettings'
import {SeoSettings} from './SeoSettings'
import {PanelPreview, type PanelPreviewRef} from './PanelPreview'
import { ContactSettings } from './ContactSettings'

const INITIAL_SETTINGS: PanelSettingsState = {
    general: {
        panelName: 'پنل مدیریت',
        shortName: 'مدیریت',
        description: 'سیستم مدیریت و کنترل پنل',
        language: 'fa-IR',
        timezone: 'Asia/Tehran',
        dateFormat: 'YYYY/MM/DD',
        maintenanceMode: false,
    },

    branding: {
        logo: '',
        mobileLogo: '',
        favicon: '',
    },

    theme: {
        mode: 'light',
        primary: '#1E61CD',
        secondary: '#FAAE3A',
        success: '#2E7D32',
        warning: '#ED6C02',
        error: '#B3261E',
        background: '#F4F5F7',
        text: '#1E1E1E',
    },

    seo: {
        title: 'پنل مدیریت',
        description: 'پنل مدیریت سیستم',
        keywords: 'admin, dashboard, panel',
        ogImage: '',
        robots: 'index, follow',
    },
    contact: {
        phone: '',
        email: '',
        address: '',
        instagram: '',
        telegram: '',
        linkedin: '',
        whatsapp: '',
    },
}

export default function PanelSettings() {
    const [settings, setSettings] = useState<PanelSettingsState>(INITIAL_SETTINGS)

    /*
     * مهم:
     *
     * Preview با ref کنترل می‌شود.
     *
     * بنابراین هنگام Drag کردن Color Picker
     * نیازی به setState در این کامپوننت نداریم.
     */
    const previewRef = useRef<PanelPreviewRef>(null)

    const resetSettings = () => {
        setSettings(INITIAL_SETTINGS)

        /*
         * Reset کردن Preview
         */
        previewRef.current?.reset(INITIAL_SETTINGS.theme)
    }

    return (
        <Box
            sx={{
                p: {
                    xs: 2,
                    md: 3,
                },
            }}
        >
            {/* ================================
                HEADER
            ================================= */}

            <Stack
                direction={{
                    xs: 'column',
                    sm: 'row',
                }}
                alignItems={{
                    xs: 'stretch',
                    sm: 'center',
                }}
                justifyContent="space-between"
                spacing={2}
                mb={3}
            >
                <Box>
                    <Typography variant="headLineSm" fontWeight={700}>
                        تنظیمات پنل
                    </Typography>

                    <Typography variant="bodyMd" color="text.secondary" display="block" mt={0.75}>
                        تنظیمات ظاهری، عمومی، برندینگ و SEO پنل
                    </Typography>
                </Box>

                <Button variant="outlined" color="inherit" onClick={resetSettings}>
                    بازنشانی
                </Button>
            </Stack>

            {/* ================================
                CONTENT
            ================================= */}

            <Box
                sx={{
                    display: 'grid',

                    gridTemplateColumns: {
                        xs: '1fr',
                        lg: 'minmax(0, 1fr) 340px',
                    },

                    gap: 3,

                    alignItems: 'start',
                }}
            >
                <Stack spacing={3}>
                    <GeneralSettings settings={settings} setSettings={setSettings} />

                    <BrandingSettings settings={settings} setSettings={setSettings} />

                    <ThemeSettings
                        settings={settings}
                        setSettings={setSettings}
                        previewRef={previewRef}
                    />

                    <SeoSettings settings={settings} setSettings={setSettings} />
                    <ContactSettings settings={settings} setSettings={setSettings} />
                </Stack>

                <PanelPreview ref={previewRef} settings={settings} />
            </Box>
        </Box>
    )
}
