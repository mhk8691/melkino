import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from '@mui/material'
import { SettingsSection } from './SettingsSection'
import type { PanelSettingsState, SettingsSetter } from './types'

interface ThemeSettingsProps {
    settings: PanelSettingsState
    setSettings: SettingsSetter
}

const colorFields: Array<{
    key: keyof PanelSettingsState['theme']
    label: string
}> = [
    { key: 'primary', label: 'Primary' },
    { key: 'secondary', label: 'Secondary' },
    { key: 'success', label: 'Success' },
    { key: 'warning', label: 'Warning' },
    { key: 'error', label: 'Error' },
    { key: 'background', label: 'Background' },
    { key: 'text', label: 'Text' },
]

export function ThemeSettings({ settings, setSettings }: ThemeSettingsProps) {
    const update = (
        key: keyof PanelSettingsState['theme'],
        value: string,
    ) => {
        setSettings(prev => ({
            ...prev,
            theme: { ...prev.theme, [key]: value },
        }))
    }

    return (
        <SettingsSection
            title="تنظیمات تم"
            description="حالت نمایش و رنگ‌های اصلی پنل را تعیین کنید."
        >
            <Stack spacing={3}>
                <FormControl fullWidth>
                    <InputLabel>حالت نمایش</InputLabel>
                    <Select
                        label="حالت نمایش"
                        value={settings.theme.mode}
                        onChange={e => update('mode', e.target.value)}
                    >
                        <MenuItem value="light">روشن</MenuItem>
                        <MenuItem value="dark">تاریک</MenuItem>
                        <MenuItem value="system">مطابق سیستم</MenuItem>
                    </Select>
                </FormControl>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            lg: 'repeat(3, 1fr)',
                        },
                        gap: 2,
                    }}
                >
                    {colorFields.map(field => (
                        <Stack
                            key={field.key}
                            direction="row"
                            alignItems="center"
                            spacing={1}
                        >
                            <Box
                                sx={{
                                    width: 42,
                                    height: 42,
                                    flexShrink: 0,
                                    borderRadius: 2,
                                    backgroundColor: settings.theme[field.key],
                                    border: '1px solid',
                                    borderColor: 'divider',
                                }}
                            />
                            <TextField
                                fullWidth
                                label={field.label}
                                value={settings.theme[field.key]}
                                onChange={e => update(field.key, e.target.value)}
                            />
                        </Stack>
                    ))}
                </Box>
            </Stack>
        </SettingsSection>
    )
}
