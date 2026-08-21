import React, {useEffect, useState} from 'react'
import {Box, FormControl, InputLabel, MenuItem, Select, Stack, TextField} from '@mui/material'

import {SettingsSection} from './SettingsSection'
import type {PanelSettingsState, SettingsSetter} from './types'

interface ThemeSettingsProps {
    settings: PanelSettingsState
    setSettings: SettingsSetter
}

const colorFields: Array<{
    key: keyof PanelSettingsState['theme']
    label: string
}> = [
    {key: 'primary', label: 'Primary'},
    {key: 'secondary', label: 'Secondary'},
    {key: 'success', label: 'Success'},
    {key: 'warning', label: 'Warning'},
    {key: 'error', label: 'Error'},
    {key: 'background', label: 'Background'},
    {key: 'text', label: 'Text'},
]

interface ColorPickerFieldProps {
    label: string
    value: string
    onChange: (value: string) => void
}

const ColorPickerField = React.memo(function ColorPickerField({
    label,
    value,
    onChange,
}: ColorPickerFieldProps) {
    const [localColor, setLocalColor] = useState(value)

    useEffect(() => {
        setLocalColor(value)
    }, [value])

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // فقط state محلی تغییر می‌کند
        // بنابراین parent در هر حرکت دوباره render نمی‌شود
        setLocalColor(event.target.value)
    }

    const handleColorBlur = () => {
        // فقط بعد از تمام شدن انتخاب رنگ
        if (localColor !== value) {
            onChange(localColor)
        }
    }

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalColor(event.target.value)
    }

    const handleTextBlur = () => {
        if (localColor !== value) {
            onChange(localColor)
        }
    }

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <Box
                component="input"
                type="color"
                value={localColor}
                onChange={handleColorChange}
                onBlur={handleColorBlur}
                sx={{
                    width: 42,
                    height: 42,
                    flexShrink: 0,
                    padding: 0,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    cursor: 'pointer',
                    backgroundColor: 'transparent',

                    '&::-webkit-color-swatch-wrapper': {
                        padding: 0,
                    },

                    '&::-webkit-color-swatch': {
                        border: 'none',
                        borderRadius: 1.5,
                    },

                    '&::-moz-color-swatch': {
                        border: 'none',
                        borderRadius: 1.5,
                    },
                }}
            />

            <TextField
                fullWidth
                size="small"
                label={label}
                value={localColor}
                onChange={handleTextChange}
                onBlur={handleTextBlur}
            />
        </Stack>
    )
})

export function ThemeSettings({settings, setSettings}: ThemeSettingsProps) {
    const update = (key: keyof PanelSettingsState['theme'], value: string) => {
        setSettings((prev) => ({
            ...prev,
            theme: {
                ...prev.theme,
                [key]: value,
            },
        }))
    }

    return (
        <SettingsSection
            title="تنظیمات تم"
            description="حالت نمایش و رنگ‌های اصلی پنل را تعیین کنید."
        >
            <Stack spacing={3}>
                {/* Display Mode */}
                <FormControl fullWidth>
                    <InputLabel>حالت نمایش</InputLabel>

                    <Select
                        label="حالت نمایش"
                        value={settings.theme.mode}
                        onChange={(event) => update('mode', event.target.value)}
                    >
                        <MenuItem value="light">روشن</MenuItem>

                        <MenuItem value="dark">تاریک</MenuItem>

                    </Select>
                </FormControl>

                {/* Colors */}
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
                    {colorFields.map((field) => (
                        <ColorPickerField
                            key={field.key}
                            label={field.label}
                            value={settings.theme[field.key]}
                            onChange={(value) => update(field.key, value)}
                        />
                    ))}
                </Box>
            </Stack>
        </SettingsSection>
    )
}
