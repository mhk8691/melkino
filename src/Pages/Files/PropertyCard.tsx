import {Box, Stack, Typography} from '@mui/material'
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded'
import SquareFootRoundedIcon from '@mui/icons-material/SquareFootRounded'
import BedRoundedIcon from '@mui/icons-material/BedRounded'
import ImageNotSupportedRoundedIcon from '@mui/icons-material/ImageNotSupportedRounded'
import { PropertyType } from './Files'

/* ---------------------------------------------------------------------- */
/* وضعیت → رنگ برند                                                         */
/* ---------------------------------------------------------------------- */

const STATUS_COLOR: Record<string, string> = {
    فعال: 'primary.main',
    'فروخته شده': 'text.disabled',
    'منصرف شد': 'secondary.main',
    'کنسل شد': 'error.main',
}

const formatPrice = (value?: number) => (value ? value.toLocaleString('fa-IR') : '--')

/* ---------------------------------------------------------------------- */
/* یه سوراخ پانچ در لبه‌ی کارت                                                */
/* ---------------------------------------------------------------------- */

function Notch({side}: {side: 'insetInlineStart' | 'insetInlineEnd'}) {
    return (
        <Box
            sx={{
                position: 'absolute',
                [side]: -9,
                top: 0,
                width: 18,
                height: 18,
                borderRadius: '50%',
                bgcolor: 'background.default',
                border: '1px solid',
                borderColor: 'divider',
            }}
        />
    )
}

export type PropertyCardProps = {
    item: Partial<PropertyType>
    onClick?: () => void
}

export function PropertyCard({item, onClick}: PropertyCardProps) {
    const statusColor = STATUS_COLOR[item.status ?? ''] ?? 'text.disabled'

    const isRent = item.contractType === 'رهن و اجاره'
    const priceMain = isRent ? formatPrice(item.mortgagePrice) : formatPrice(item.totalPrice)
    const priceLabel = isRent ? 'رهن' : 'قیمت کل'
    const priceSecondary =
        isRent && item.monthlyRent ? `اجاره ماهانه ${formatPrice(item.monthlyRent)} تومان` : null

    const image = item.images?.[0]
    const imageUrl = image ? URL.createObjectURL(image) : undefined

    return (
        <Box
            role="button"
            tabIndex={0}
            onClick={onClick}
            sx={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2.5,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'box-shadow .15s ease, transform .1s ease',
                '&:hover': {
                    boxShadow: '0 10px 24px -10px rgba(30,97,205,0.28)',
                    transform: 'translateY(-2px)',
                },
                '&:focus-visible': {
                    outline: '2px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: 2,
                },
            }}
        >
            {/* بخش بالا: تصویر + موقعیت */}
            <Box sx={{display: 'flex', gap: 1.5, p: 2, pb: 1.75}}>
                <Box
                    sx={{
                        width: 60,
                        height: 60,
                        flexShrink: 0,
                        borderRadius: 1.5,
                        bgcolor: 'background.default',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {!imageUrl && (
                        <ImageNotSupportedRoundedIcon sx={{fontSize: 20, color: 'text.disabled'}} />
                    )}
                </Box>

                <Box sx={{minWidth: 0, flexGrow: 1}}>
                    <Stack direction="row" alignItems="center" spacing={0.75} sx={{mb: 0.5}}>
                        <Box
                            sx={{
                                width: 7,
                                height: 7,
                                borderRadius: '50%',
                                bgcolor: statusColor,
                                flexShrink: 0,
                            }}
                        />
                        <Typography variant="badge" sx={{color: statusColor, fontSize: '12px'}} noWrap>
                            {item.status || '--'}
                        </Typography>
                        <Typography variant="badge" sx={{color: 'text.disabled', fontSize: '12px'}}>
                            · #{item.id ?? '--'}
                        </Typography>
                    </Stack>

                    <Typography variant="titleMd" fontWeight={700} noWrap>
                        {item.propertyType || '--'}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{mt: 0.25}}>
                        <PlaceRoundedIcon sx={{fontSize: 14, color: 'text.disabled', flexShrink: 0}} />
                        <Typography variant="bodySm" color="text.secondary" noWrap>
                            {[item.city, item.district, item.neighborhood].filter(Boolean).join(' - ') ||
                                '--'}
                        </Typography>
                    </Stack>
                </Box>
            </Box>

            {/* خط پرفراژ */}
            <Box sx={{position: 'relative', mx: 0}}>
                <Notch side="insetInlineStart" />
                <Notch side="insetInlineEnd" />
                <Box
                    sx={{
                        borderTop: '1.5px dashed',
                        borderColor: 'divider',
                        mx: 2.5,
                    }}
                />
            </Box>

            {/* بخش پایین: متراژ/اتاق + قیمت */}
            <Box sx={{p: 2, pt: 1.75, display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                <Stack direction="row" spacing={2} sx={{mb: 1.5}}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <SquareFootRoundedIcon sx={{fontSize: 15, color: 'text.disabled'}} />
                        <Typography variant="labelSm" color="text.secondary">
                            {item.area ? `${item.area} متر` : '--'}
                        </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <BedRoundedIcon sx={{fontSize: 15, color: 'text.disabled'}} />
                        <Typography variant="labelSm" color="text.secondary">
                            {item.roomCount ? `${item.roomCount} خوابه` : '--'}
                        </Typography>
                    </Stack>

                    <Typography variant="labelSm" color="text.disabled">
                        {item.contractType || '--'}
                    </Typography>
                </Stack>

                <Box sx={{mt: 'auto'}}>
                    <Typography variant="labelSm" color="text.disabled">
                        {priceLabel}
                    </Typography>
                    <Typography
                        variant="titleLg"
                        fontWeight={800}
                        color="primary.main"
                        sx={{fontVariantNumeric: 'tabular-nums'}}
                    >
                        {priceMain}{' '}
                        <Typography component="span" variant="labelSm" color="text.disabled">
                            تومان
                        </Typography>
                    </Typography>
                    {priceSecondary && (
                        <Typography variant="labelSm" color="text.secondary">
                            {priceSecondary}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    )
}