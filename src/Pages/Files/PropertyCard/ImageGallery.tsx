import {useEffect, useMemo, useRef, useState} from 'react'
import type {Swiper as SwiperClass} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import './swiper.css'
import {Box, IconButton, Stack, Typography} from '@mui/material'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'

export function ImageGallery({images, height}: {images: (string | File)[]; height: number}) {
    const [activeIndex, setActiveIndex] = useState(0)
    const swiperRef = useRef<SwiperClass | null>(null)

    // اگر آیتم از قبل رشته (مسیر import شده یا URL) است همون رو استفاده کن،
    // اگر File بود با createObjectURL تبدیلش کن
    const urls = useMemo(() => images.map((img) => (typeof img === 'string' ? img : URL.createObjectURL(img))), [images])

    useEffect(() => {
        // فقط URLهایی که از File ساخته شدن (blob:) باید revoke بشن، نه رشته‌های معمولی
        return () => {
            urls.forEach((url) => {
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url)
                }
            })
        }
    }, [urls])

    if (urls.length === 0) return null

    return (
        <Box sx={{position: 'relative', width: '100%', height, overflow: 'hidden', bgcolor: 'background.default'}}>
            <Swiper
                dir="rtl"
                onSwiper={(s) => (swiperRef.current = s)}
                onSlideChange={(s) => setActiveIndex(s.activeIndex)}
                style={{width: '100%', height: '100%'}}
            >
                {urls.map((url, i) => (
                    <SwiperSlide key={i}>
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                backgroundImage: `url(${url})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {urls.length > 1 && (
                <>
                    <IconButton
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation()
                            swiperRef.current?.slidePrev()
                        }}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            insetInlineStart: 6,
                            transform: 'translateY(-50%)',
                            bgcolor: 'rgba(0,0,0,0.4)',
                            color: '#fff',
                            '&:hover': {bgcolor: 'rgba(0,0,0,0.6)'},
                        }}
                    >
                        <ChevronRightRoundedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation()
                            swiperRef.current?.slideNext()
                        }}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            insetInlineEnd: 6,
                            transform: 'translateY(-50%)',
                            bgcolor: 'rgba(0,0,0,0.4)',
                            color: '#fff',
                            '&:hover': {bgcolor: 'rgba(0,0,0,0.6)'},
                        }}
                    >
                        <ChevronLeftRoundedIcon fontSize="small" />
                    </IconButton>

                    <Stack
                        direction="row"
                        spacing={0.5}
                        sx={{position: 'absolute', bottom: 8, insetInlineStart: 0, insetInlineEnd: 0, justifyContent: 'center'}}
                    >
                        {urls.map((_, i) => (
                            <Box
                                key={i}
                                sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: i === activeIndex ? '#fff' : 'rgba(255,255,255,0.5)',
                                }}
                            />
                        ))}
                    </Stack>

                    <Typography
                        variant="badge"
                        sx={{
                            position: 'absolute',
                            top: 8,
                            insetInlineStart: 8,
                            bgcolor: 'rgba(0,0,0,0.45)',
                            color: '#fff',
                            px: 0.75,
                            py: 0.15,
                            borderRadius: 1,
                            fontSize: '11px',
                        }}
                    >
                        {activeIndex + 1}/{urls.length}
                    </Typography>
                </>
            )}
        </Box>
    )
}