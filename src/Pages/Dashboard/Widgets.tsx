// Widgets.tsx

import {Grid, Stack, Typography, Skeleton, Box} from '@mui/material'
import {ReactNode} from 'react'
import { Link } from 'react-router-dom'

interface Props {
    title: string
    data?: string
    description: {title: string; status: 'increment' | 'decrement'}
    icon: ReactNode
    loading?: boolean
    link?: string
}   

export default function Widgets({
    title,
    data,
    description,
    icon,
    loading,
    link
}: Props) {
    // اگر loading اصلی true باشد یا data هنوز آماده/معتبر نباشد، اسکلتون نشان می‌دهد
    const isDataInvalid = !data || data.includes('NaN') || data.includes('undefined')
    const isLoading = loading || isDataInvalid

    return (
        <Grid component={link ? Link : 'div'} to={link} item xs={12} sm={6} md={4} lg={3}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="stretch"
                sx={{
                    height: '100%',
                    borderRadius: 3,
                    overflow: 'hidden',
                    position: 'relative',
                    bgcolor: '#0f0c08',
                    border: '1px solid rgba(212,175,55,0.25)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 20px 50px rgba(212,175,55,0.15)',
                        borderColor: 'rgba(212,175,55,0.5)',
                    },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '2px',
                        background:
                            'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                        opacity: 0.8,
                    },
                }}
            >
                {/* LEFT SIDE */}
                <Stack spacing={1.2} sx={{p: 2.5, flex: 1}}>
                    {isLoading ? (
                        <Skeleton width={120} height={22} />
                    ) : (
                        <Typography
                            sx={{
                                fontSize: 14,
                                color: 'rgba(212,175,55,0.8)',
                                fontWeight: 500,
                                letterSpacing: 0.3,
                            }}
                        >
                            {title}
                        </Typography>
                    )}

                    {isLoading ? (
                        <Skeleton width={90} height={40} />
                    ) : (
                        <Typography
                            sx={{
                                fontSize: 26,
                                fontWeight: 700,
                                color: '#F5E6C8',
                                letterSpacing: '-0.5px',
                            }}
                        >
                            {data}
                        </Typography>
                    )}

                    {isLoading ? (
                        <Skeleton width={140} height={18} />
                    ) : (
                        <Typography
                            sx={{
                                fontSize: 13,
                                color:
                                    description.status === 'increment'
                                        ? '#C9A227'
                                        : '#B91C1C',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                fontWeight: 500,
                            }}
                        >
                            {description.status === 'increment' ? '▲' : '▼'}
                            {description.title}
                        </Typography>
                    )}
                </Stack>

                {/* RIGHT ICON GOLD PANEL */}
                <Box
                    sx={{
                        width: 90,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background:
                            'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(255,215,0,0.05))',
                        borderLeft: '1px solid rgba(212,175,55,0.2)',
                    }}
                >
                    {isLoading ? (
                        <Skeleton variant="circular" width={40} height={40} />
                    ) : (
                        <Box
                            sx={{
                                color: '#D4AF37',
                                filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.3))',
                                transform: 'scale(1.2)',
                            }}
                        >
                            {icon}
                        </Box>
                    )}
                </Box>
            </Stack>
        </Grid>
    )
}