import {
    FormControl,
    FormControlLabel,
    MenuItem,
    Select,
    Switch,
    Stack,
    TextField,
} from '@mui/material'
import { SettingsSection } from './SettingsSection'
import type { PanelSettingsState, SettingsSetter } from './types'

interface GeneralSettingsProps {
    settings: PanelSettingsState
    setSettings: SettingsSetter
}

export function GeneralSettings({ settings, setSettings }: GeneralSettingsProps) {
    const update = (key: keyof PanelSettingsState['general'], value: string | boolean) => {
        setSettings(prev => ({
            ...prev,
            general: { ...prev.general, [key]: value },
        }))
    }

    return (
        <SettingsSection
            title="تنظیمات عمومی"
            description="اطلاعات پایه و رفتار عمومی پنل را مشخص کنید."
        >
            <Stack spacing={2.5}>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                >
                    <TextField
                        fullWidth
                        label="نام پنل"
                        value={settings.general.panelName}
                        onChange={e => update('panelName', e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="نام کوتاه"
                        value={settings.general.shortName}
                        onChange={e => update('shortName', e.target.value)}
                    />
                </Stack>

                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    label="توضیحات پنل"
                    value={settings.general.description}
                    onChange={e => update('description', e.target.value)}
                />

                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                >
                    <FormControl fullWidth>
                        <Select
                            value={settings.general.language}
                            onChange={e => update('language', e.target.value)}
                        >
                            <MenuItem value="fa-IR">فارسی</MenuItem>
                            <MenuItem value="en-US">English</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <Select
                            value={settings.general.timezone}
                            onChange={e => update('timezone', e.target.value)}
                        >
                            <MenuItem value="Asia/Tehran">تهران</MenuItem>
                            <MenuItem value="Europe/Berlin">برلین</MenuItem>
                            <MenuItem value="UTC">UTC</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <Select
                            value={settings.general.dateFormat}
                            onChange={e => update('dateFormat', e.target.value)}
                        >
                            <MenuItem value="YYYY/MM/DD">۱۴۰۵/۰۵/۲۹</MenuItem>
                            <MenuItem value="DD/MM/YYYY">۲۹/۰۵/۱۴۰۵</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <FormControlLabel
                    control={
                        <Switch
                            checked={settings.general.maintenanceMode}
                            onChange={e => update('maintenanceMode', e.target.checked)}
                        />
                    }
                    label="حالت تعمیر و نگهداری"
                />
            </Stack>
        </SettingsSection>
    )
}
