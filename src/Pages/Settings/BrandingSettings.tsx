import React, {useRef} from 'react'
import {Box, Button, Stack, TextField, Typography} from '@mui/material'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'

import {SettingsSection} from './SettingsSection'
import type {PanelSettingsState, SettingsSetter} from './types'

interface BrandingSettingsProps {
    settings: PanelSettingsState
    setSettings: SettingsSetter
}

interface ImageUploadFieldProps {
    label: string
    value: string
    placeholder: string
    onChange: (value: string) => void
    previewHeight?: number
}

function ImageUploadField({
    label,
    value,
    placeholder,
    onChange,
    previewHeight = 140,
}: ImageUploadFieldProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (!file) return

        if (!file.type.startsWith('image/')) {
            return
        }

        const reader = new FileReader()

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                onChange(reader.result)
            }
        }

        reader.readAsDataURL(file)

        event.target.value = ''
    }

    const handleUploadClick = () => {
        inputRef.current?.click()
    }

    const handleRemove = () => {
        onChange('')
    }

    return (
        <Stack spacing={1.5}>
            <Typography variant="body2" fontWeight={600}>
                {label}
            </Typography>

            {/* Preview */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    minHeight: previewHeight,
                    border: '1px dashed',
                    borderColor: 'divider',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    backgroundColor: 'action.hover',
                }}
            >
                {value ? (
                    <Box
                        component="img"
                        src={value}
                        alt={label}
                        onError={(event) => {
                            event.currentTarget.style.display = 'none'
                        }}
                        sx={{
                            maxWidth: '100%',
                            maxHeight: previewHeight,
                            objectFit: 'contain',
                            display: 'block',
                        }}
                    />
                ) : (
                    <Stack alignItems="center" spacing={1} color="text.secondary">
                        <ImageOutlinedIcon sx={{fontSize: 42}} />

                        <Typography variant="body2">تصویری انتخاب نشده است</Typography>
                    </Stack>
                )}

                {value && (
                    <Button
                        size="small"
                        color="error"
                        variant="contained"
                        startIcon={<DeleteOutlineOutlinedIcon />}
                        onClick={handleRemove}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                        }}
                    >
                        حذف
                    </Button>
                )}
            </Box>

            {/* URL */}
            <TextField
                fullWidth
                size="small"
                label={`${label} - آدرس`}
                placeholder={placeholder}
                value={value.startsWith('data:') ? '' : value}
                onChange={(e) => onChange(e.target.value)}
            />

            {/* Upload */}
            <Stack direction="row" spacing={1}>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                />

                <Button
                    variant="outlined"
                    startIcon={<CloudUploadOutlinedIcon />}
                    onClick={handleUploadClick}
                >
                    انتخاب تصویر
                </Button>

                {value && (
                    <Button
                        variant="text"
                        color="error"
                        startIcon={<DeleteOutlineOutlinedIcon />}
                        onClick={handleRemove}
                    >
                        حذف تصویر
                    </Button>
                )}
            </Stack>
        </Stack>
    )
}

export function BrandingSettings({settings, setSettings}: BrandingSettingsProps) {
    const update = (key: keyof PanelSettingsState['branding'], value: string) => {
        setSettings((prev) => ({
            ...prev,
            branding: {
                ...prev.branding,
                [key]: value,
            },
        }))
    }

    return (
        <SettingsSection title="برندینگ" description="لوگوها و هویت بصری پنل را مدیریت کنید.">
            <Stack spacing={3}>
                <ImageUploadField
                    label="Logo اصلی"
                    placeholder="https://example.com/logo.png"
                    value={settings.branding.logo}
                    onChange={(value) => update('logo', value)}
                    previewHeight={160}
                />

                <ImageUploadField
                    label="Logo موبایل"
                    placeholder="https://example.com/mobile-logo.png"
                    value={settings.branding.mobileLogo}
                    onChange={(value) => update('mobileLogo', value)}
                    previewHeight={160}
                />

                <ImageUploadField
                    label="Favicon"
                    placeholder="https://example.com/favicon.png"
                    value={settings.branding.favicon}
                    onChange={(value) => update('favicon', value)}
                    previewHeight={120}
                />

                <Typography variant="labelMd" color="text.secondary">
                    می‌توانید تصویر را مستقیماً آپلود کنید یا آدرس تصویر را وارد کنید.
                </Typography>
            </Stack>
        </SettingsSection>
    )
}
