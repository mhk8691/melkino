import {Stack} from '@mui/material'
import {SettingsSection} from './SettingsSection'
import type {PanelSettingsState, SettingsSetter} from './types'
import { CustomTextField } from '../../Components/Input/CustomTextField'

interface GeneralSettingsProps {
    settings: PanelSettingsState
    setSettings: SettingsSetter
}

export function GeneralSettings({settings, setSettings}: GeneralSettingsProps) {
    return (
        <SettingsSection
            title="تنظیمات عمومی"
            description="اطلاعات پایه و رفتار عمومی پنل را مشخص کنید."
        >
            <Stack spacing={2.5}>
                <CustomTextField
                    key="panelName"
                    name="panelName"
                    label="نام پنل"
                    resource=""
                    setData={(data) => {
                        setSettings((prev) => ({
                            ...prev,
                            general: {
                                ...prev.general,
                                panelName: data.panelName,
                            },
                        }))
                    }}
                    defaultValue={settings.general.panelName}
                />

                <CustomTextField
                    key="description"
                    name="description"
                    label="توضیحات پنل"
                    resource=""
                    setData={(data) => {
                        setSettings((prev) => ({
                            ...prev,
                            general: {
                                ...prev.general,
                                description: data.description,
                            },
                        }))
                    }}
                    defaultValue={settings.general.description}
                    multiline
                    minRows={3}
                />
            </Stack>
        </SettingsSection>
    )
}
