import {Stack} from '@mui/material'
import {SettingsSection} from './SettingsSection'
import type {
    PanelSettingsState,
    SettingsSetter,
} from './types'
import {CustomTextField} from '../../Components/Input/CustomTextField'

interface GeneralSettingsProps {
    settings: PanelSettingsState
    setSettings: SettingsSetter
}

export function GeneralSettings({
    settings,
    setSettings,
}: GeneralSettingsProps) {
    const handleChange = (
        field:
            | 'panelName'
            | 'description',
        value: string,
    ) => {
        setSettings((prev) => ({
            ...prev,
            general: {
                ...prev.general,
                [field]: value,
            },
        }))
    }

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
                    value={
                        settings.general.panelName
                    }
                    change={(event) => {
                        handleChange(
                            'panelName',
                            event.target.value,
                        )
                    }}
                />

                <CustomTextField
                    key="description"
                    name="description"
                    label="توضیحات پنل"
                    resource=""
                    value={
                        settings.general.description
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
