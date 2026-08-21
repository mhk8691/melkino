import { Stack, TextField } from '@mui/material'
import { SettingsSection } from './SettingsSection'
import { PanelSettingsState, SettingsSetter } from './types'

interface SeoSettingsProps {
    settings: PanelSettingsState
    setSettings: SettingsSetter
}

export function SeoSettings({ settings, setSettings }: SeoSettingsProps) {
    const update = (key: keyof PanelSettingsState['seo'], value: string) => {
        setSettings(prev => ({
            ...prev,
            seo: { ...prev.seo, [key]: value },
        }))
    }

    return (
        <SettingsSection
            title="تنظیمات SEO"
            description="اطلاعات پایه برای موتورهای جستجو و اشتراک‌گذاری صفحات."
        >
            <Stack spacing={2.5}>
                <TextField
                    fullWidth
                    label="عنوان سایت"
                    value={settings.seo.title}
                    onChange={e => update('title', e.target.value)}
                />

                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    label="توضیحات SEO"
                    value={settings.seo.description}
                    onChange={e => update('description', e.target.value)}
                />

                <TextField
                    fullWidth
                    label="کلمات کلیدی"
                    value={settings.seo.keywords}
                    onChange={e => update('keywords', e.target.value)}
                />

                <TextField
                    fullWidth
                    label="آدرس Open Graph Image"
                    value={settings.seo.ogImage}
                    onChange={e => update('ogImage', e.target.value)}
                />

                <TextField
                    fullWidth
                    label="Robots"
                    value={settings.seo.robots}
                    onChange={e => update('robots', e.target.value)}
                />
            </Stack>
        </SettingsSection>
    )
}
