import {Stack} from '@mui/material'
import {SettingsSection} from './SettingsSection'
import type {PanelSettingsState, SettingsSetter} from './types'
import { CustomTextField } from '../../Components/Input/CustomTextField'

interface SeoSettingsProps {
    settings: PanelSettingsState
    setSettings: SettingsSetter
}

export function SeoSettings({settings, setSettings}: SeoSettingsProps) {
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
                    setData={(data) => {
                        setSettings((prev) => ({
                            ...prev,
                            seo: {
                                ...prev.seo,
                                title: data.title,
                            },
                        }))
                    }}
                    defaultValue={settings.seo.title}
                />

                <CustomTextField
                    key="description"
                    name="description"
                    label="توضیحات SEO"
                    resource=""
                    setData={(data) => {
                        setSettings((prev) => ({
                            ...prev,
                            seo: {
                                ...prev.seo,
                                description: data.description,
                            },
                        }))
                    }}
                    defaultValue={settings.seo.description}
                    multiline
                    minRows={3}
                />
            </Stack>
        </SettingsSection>
    )
}
