import {Stack} from '@mui/material'
import {SettingsSection} from './SettingsSection'
import type {
    PanelSettingsState,
    SettingsSetter,
} from './types'
import {CustomTextField} from '../../Components/Input/CustomTextField'

interface SeoSettingsProps {
    settings: PanelSettingsState
    setSettings: SettingsSetter
}

export function SeoSettings({
    settings,
    setSettings,
}: SeoSettingsProps) {
    const handleChange = (
        field: 'title' | 'description',
        value: string,
    ) => {
        setSettings((prev) => ({
            ...prev,
            seo: {
                ...prev.seo,
                [field]: value,
            },
        }))
    }

    return (
        <SettingsSection
            title="تنظیمات SEO"
            description="اطلاعات پایه برای موتورهای جستجو و اشتراک‌گذاری صفحات."
        >
            <Stack spacing={2.5}>
                <CustomTextField
                    key="title"
                    name="title"
                    label="عنوان سایت"
                    resource=""
                    value={settings.seo.title}
                    change={(event) => {
                        handleChange(
                            'title',
                            event.target.value,
                        )
                    }}
                />

                <CustomTextField
                    key="description"
                    name="description"
                    label="توضیحات SEO"
                    resource=""
                    value={
                        settings.seo.description
                    }
                    change={(event) => {
                        handleChange(
                            'description',
                            event.target.value,
                        )
                    }}
                    multiline
                    minRows={3}
                />
            </Stack>
        </SettingsSection>
    )
}
