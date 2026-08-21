import { Stack, TextField, Typography } from '@mui/material'
import { SettingsSection } from './SettingsSection'
import type { PanelSettingsState, SettingsSetter } from './types'

interface BrandingSettingsProps {
    settings: PanelSettingsState
    setSettings: SettingsSetter
}

export function BrandingSettings({ settings, setSettings }: BrandingSettingsProps) {
    const update = (key: keyof PanelSettingsState['branding'], value: string) => {
        setSettings(prev => ({
            ...prev,
            branding: { ...prev.branding, [key]: value },
        }))
    }

    return (
        <SettingsSection
            title="برندینگ"
            description="لوگوها و هویت بصری پنل را مدیریت کنید."
        >
            <Stack spacing={2.5}>
                <TextField
                    fullWidth
                    label="آدرس Logo اصلی"
                    placeholder="https://..."
                    value={settings.branding.logo}
                    onChange={e => update('logo', e.target.value)}
                />

                <TextField
                    fullWidth
                    label="آدرس Logo موبایل"
                    placeholder="https://..."
                    value={settings.branding.mobileLogo}
                    onChange={e => update('mobileLogo', e.target.value)}
                />

                <TextField
                    fullWidth
                    label="آدرس Favicon"
                    placeholder="https://..."
                    value={settings.branding.favicon}
                    onChange={e => update('favicon', e.target.value)}
                />

                <Typography variant="labelMd" color="text.secondary">
                    در این نسخه فقط آدرس فایل دریافت می‌شود و هیچ فایلی آپلود یا ذخیره نمی‌شود.
                </Typography>
            </Stack>
        </SettingsSection>
    )
}
