import {
    Box,
    Button,
    Chip,
    Divider,
    Stack,
    Typography,
} from '@mui/material'
import type { PanelSettingsState } from './types'

interface PanelPreviewProps {
    settings: PanelSettingsState
}

export function PanelPreview({ settings }: PanelPreviewProps) {
    const { branding, general, theme } = settings

    return (
        <Box
            sx={{
                position: 'sticky',
                top: 24,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                backgroundColor: theme.background,
                color: theme.text,
            }}
        >
            <Box
                sx={{
                    px: 2,
                    py: 1.5,
                    borderBottom: '1px solid',
                    borderColor: 'rgba(128,128,128,.18)',
                    backgroundColor: theme.primary,
                    color: '#fff',
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    {branding.logo ? (
                        <Box
                            component="img"
                            src={branding.logo}
                            alt=""
                            sx={{ width: 30, height: 30, objectFit: 'contain' }}
                        />
                    ) : (
                        <Box
                            sx={{
                                width: 30,
                                height: 30,
                                borderRadius: 1.5,
                                backgroundColor: 'rgba(255,255,255,.2)',
                            }}
                        />
                    )}

                    <Typography fontWeight={700}>
                        {general.shortName || general.panelName || 'پنل مدیریت'}
                    </Typography>
                </Stack>
            </Box>

            <Stack spacing={2} p={2.5}>
                <Box>
                    <Typography variant="titleMd" fontWeight={700}>
                        {general.panelName || 'پنل مدیریت'}
                    </Typography>
                    <Typography
                        variant="bodySm"
                        sx={{ opacity: 0.7, display: 'block', mt: 0.5 }}
                    >
                        {general.description || 'پیش‌نمایش تنظیمات پنل'}
                    </Typography>
                </Box>

                <Divider />

                <Stack direction="row" spacing={1}>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            backgroundColor: theme.primary,
                            '&:hover': { backgroundColor: theme.primary },
                        }}
                    >
                        دکمه اصلی
                    </Button>

                    <Button
                        variant="outlined"
                        size="small"
                        sx={{
                            color: theme.secondary,
                            borderColor: theme.secondary,
                        }}
                    >
                        بیشتر
                    </Button>
                </Stack>

                <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Chip
                        size="small"
                        label="موفق"
                        sx={{ backgroundColor: theme.success, color: '#fff' }}
                    />
                    <Chip
                        size="small"
                        label="هشدار"
                        sx={{ backgroundColor: theme.warning, color: '#fff' }}
                    />
                    <Chip
                        size="small"
                        label="خطا"
                        sx={{ backgroundColor: theme.error, color: '#fff' }}
                    />
                </Stack>
            </Stack>
        </Box>
    )
}
