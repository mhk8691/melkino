// Widgets.tsx

import { Grid, Stack, Typography, Skeleton, Box, keyframes } from '@mui/material'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type WidgetColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'

const fadeInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(12px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`

interface Props {
    title: string
    value?: string | number
    icon: ReactNode
    loading?: boolean
    link?: string
    color?: WidgetColor
}

export default function Widgets({
    title,
    value,
    icon,
    loading,
    link,
    color = 'primary',
}: Props) {
    const stringValue = value === undefined || value === null ? '' : String(value)
    const isDataInvalid =
        !stringValue || stringValue.includes('NaN') || stringValue.includes('undefined')
    const isLoading = loading || isDataInvalid

    return (
        <Grid
            component={link ? Link : 'div'}
            to={link}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{ textDecoration: 'none' }}
        >
            <Stack
                spacing={1.5}
                alignItems="center"
                textAlign="center"
                sx={{
                    height: '100%',
                    minHeight: 168,
                    p: 3,
                    py: 4.5,
                    borderRadius: '15px',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: (theme) => `${theme.palette[color].main}55`,
                    boxShadow: '0 2px 10px rgba(17,24,39,0.06)',
                    cursor: link ? 'pointer' : 'default',
                    animation: `${fadeInUp} 0.4s ease-out`,
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    '&:hover': link
                        ? {
                              transform: 'translateY(-4px)',
                              borderColor: (theme) => theme.palette[color].main,
                              boxShadow: (theme) =>
                                  `0 16px 32px ${theme.palette[color].main}26`,
                          }
                        : undefined,
                    // نوار رنگی بالای کارت برای تفکیک بصری هر ویجت
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: 4,
                        bgcolor: (theme) => theme.palette[color].main,
                    },
                }}
            >
                {/* آیکون بدون بک‌گراند */}
                {isLoading ? (
                    <Skeleton variant="circular" width={40} height={40} />
                ) : (
                    <Box
                        sx={{
                            fontSize: 34,
                            lineHeight: 1,
                            color: (theme) => theme.palette[color].main,
                            filter: (theme) =>
                                `drop-shadow(0 4px 10px ${theme.palette[color].main}40)`,
                            '& svg': { fontSize: 34 },
                        }}
                    >
                        {icon}
                    </Box>
                )}

                {/* عنوان و مقدار */}
                <Stack spacing={0.5} alignItems="center">
                    {isLoading ? (
                        <Skeleton width={100} height={18} />
                    ) : (
                        <Typography
                            variant="labelMd"
                            sx={{ color: 'text.secondary', fontWeight: 500 }}
                        >
                            {title}
                        </Typography>
                    )}

                    {isLoading ? (
                        <Skeleton width={90} height={38} />
                    ) : (
                        <Typography
                            variant="headLineMd"
                            sx={{ color: 'text.primary', fontWeight: 800, lineHeight: 1.15 }}
                        >
                            {stringValue}
                        </Typography>
                    )}
                </Stack>
            </Stack>
        </Grid>
    )
}