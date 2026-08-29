import {Box, Chip, Dialog, DialogContent, IconButton, Stack, Typography} from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ImageNotSupportedRoundedIcon from '@mui/icons-material/ImageNotSupportedRounded'
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded'
import {ImageGallery} from './ImageGallery'
import {DetailSection} from './DetailSection'
import {STATUS_COLOR, isFilled, useDerivedPropertyInfo} from './propertyCardUtils'
import { PropertyType } from '../../../Components/PropertyRecordForm'

export function PropertyDetailDialog({
    open,
    onClose,
    item,
}: {
    open: boolean
    onClose: () => void
    item: Partial<PropertyType>
}) {
    const statusColor = STATUS_COLOR[item.status ?? ''] ?? 'text.disabled'
    const images = item.images ?? []
    const {
        location,
        priceMain,
        priceLabel,
        priceSecondary,
        amenities,
        specFields,
        financialFields,
        ownerFields,
        requesterFields,
        hasNotes,
    } = useDerivedPropertyInfo(item)

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth scroll="paper">
            <Box sx={{position: 'relative'}}>
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 8,
                        insetInlineEnd: 8,
                        zIndex: 2,
                        bgcolor: 'rgba(0,0,0,0.35)',
                        color: '#fff',
                        '&:hover': {bgcolor: 'rgba(0,0,0,0.55)'},
                    }}
                >
                    <CloseRoundedIcon fontSize="small" />
                </IconButton>

                {images.length > 0 ? (
                    <ImageGallery images={images} height={260} />
                ) : (
                    <Box
                        sx={{
                            height: 140,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'background.default',
                            color: 'text.disabled',
                        }}
                    >
                        <ImageNotSupportedRoundedIcon sx={{fontSize: 28}} />
                    </Box>
                )}
            </Box>

            <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: 2.5}}>
                <Box>
                    <Stack direction="row" alignItems="center" spacing={0.75} sx={{mb: 0.5}}>
                        {item.status && (
                            <>
                                <Box sx={{width: 7, height: 7, borderRadius: '50%', bgcolor: statusColor}} />
                                <Typography variant="badge" sx={{color: statusColor, fontSize: '12px'}}>
                                    {item.status}
                                </Typography>
                            </>
                        )}
                        {isFilled(item.id) && (
                            <Typography variant="badge" sx={{color: 'text.disabled', fontSize: '12px'}}>
                                · #{item.id}
                            </Typography>
                        )}
                    </Stack>

                    <Typography variant="titleLg" fontWeight={800}>
                        {item.propertyType || '--'}
                    </Typography>

                    {location && (
                        <Stack direction="row" alignItems="center" spacing={0.5} sx={{mt: 0.5}}>
                            <PlaceRoundedIcon sx={{fontSize: 15, color: 'text.disabled'}} />
                            <Typography variant="bodySm" color="text.secondary">
                                {location}
                            </Typography>
                        </Stack>
                    )}

                    {item.contractType && (
                        <Typography variant="labelSm" color="text.disabled" sx={{mt: 0.25}}>
                            {item.contractType}
                        </Typography>
                    )}
                </Box>

                {priceMain && (
                    <Box sx={{p: 1.5, borderRadius: 2, bgcolor: 'background.default'}}>
                        <Typography variant="labelSm" color="text.disabled">
                            {priceLabel}
                        </Typography>
                        <Typography variant="titleLg" fontWeight={800} color="primary.main" sx={{fontVariantNumeric: 'tabular-nums'}}>
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
                )}

                <DetailSection title="مشخصات ملک" fields={specFields} />

                {amenities.length > 0 && (
                    <Box>
                        <Typography variant="labelSm" fontWeight={700} color="text.disabled" sx={{mb: 1}}>
                            امکانات
                        </Typography>
                        <Stack direction="row" flexWrap="wrap" gap={0.75}>
                            {amenities.map((amenity) => (
                                <Chip key={amenity} label={amenity} size="small" variant="outlined" />
                            ))}
                        </Stack>
                    </Box>
                )}

                <DetailSection title="جزئیات مالی" fields={financialFields} />
                <DetailSection title="مالک" fields={ownerFields} />
                <DetailSection title="درخواست‌کننده" fields={requesterFields} />

                {hasNotes && (
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 1.5}}>
                        {isFilled(item.description) && (
                            <Box>
                                <Typography variant="labelSm" fontWeight={700} color="text.disabled" sx={{mb: 0.5}}>
                                    توضیحات
                                </Typography>
                                <Typography variant="bodySm" color="text.secondary">
                                    {item.description}
                                </Typography>
                            </Box>
                        )}
                        {isFilled(item.internalNote) && (
                            <Box>
                                <Typography variant="labelSm" fontWeight={700} color="text.disabled" sx={{mb: 0.5}}>
                                    یادداشت داخلی
                                </Typography>
                                <Typography variant="bodySm" color="text.secondary" fontStyle="italic">
                                    {item.internalNote}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    )
}