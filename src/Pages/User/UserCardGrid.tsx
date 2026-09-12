// Components/Table/UserCard.tsx
import {Avatar, Box, Chip, Divider, Grid, Paper, Stack, Typography} from '@mui/material'
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded'
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded'
import CakeRoundedIcon from '@mui/icons-material/CakeRounded'
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import MarkunreadMailboxRoundedIcon from '@mui/icons-material/MarkunreadMailboxRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded'
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded'
import profileImage from '../../Images/user.png'

export type BaseUserCardData = {
    id: string
    firstName?: string | null
    lastName?: string | null
    phoneNumber?: string | null
    profileImage?: string | null
    logo?: string | null
    role?: string | null
    agencyName?: string | null
    city?: string | null
    address?: string | null
    homeAddress?: string | null
    workAddress?: string | null
    nationalId?: string | null
    birthDate?: string | null
    postalCode?: string | null
    maritalStatus?: string | null
    officePropertyStatus?: string | null
}

const roleLabels: Record<string, string> = {
    regular_user: 'کاربر عادی',
    super_user: 'سوپر ادمین',
    real_estate_agency: 'املاک',
    real_estate_agent: 'مشاور املاک',
    accountant: 'حسابدار',
    secretary: 'منشی',
}

const roleColors: Record<string, string> = {
    regular_user: '#3B82F6',
    super_user: '#8B5CF6',
    real_estate_agency: '#F59E0B',
    real_estate_agent: '#10B981',
    accountant: '#EF4444',
    secretary: '#06B6D4',
}

const maritalStatusLabels: Record<string, string> = {
    married: 'متأهل',
    single: 'مجرد',
}

const officePropertyStatusLabels: Record<string, string> = {
    owner: 'مالک',
    tenant: 'مستأجر',
}

function InfoRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode
    label: string
    value?: string | null
}) {
    if (!value) return null
    return (
        <Stack direction="row" spacing={1.25} alignItems="center">
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 30,
                    height: 30,
                    borderRadius: '8px',
                    bgcolor: 'action.hover',
                    color: 'text.secondary',
                    flexShrink: 0,
                }}
            >
                {icon}
            </Box>
            <Box sx={{minWidth: 0}}>
                <Typography variant="caption" color="text.disabled" sx={{lineHeight: 1}}>
                    {label}
                </Typography>
                <Typography
                    variant="body2"
                    fontWeight={500}
                    noWrap
                    sx={{lineHeight: 1.4}}
                >
                    {value}
                </Typography>
            </Box>
        </Stack>
    )
}

function UserCard({
    item,
    onClick,
}: {
    item: BaseUserCardData
    onClick?: () => void
}) {
    const fullName =
        [item.firstName, item.lastName].filter(Boolean).join(' ') || '--'
    const avatarSrc = item.logo || item.profileImage || profileImage
    const accentColor = (item.role && roleColors[item.role]) || '#6366F1'

    return (
        <Paper
            onClick={onClick}
            elevation={0}
            sx={{
                position: 'relative',
                borderRadius: 3,
                overflow: 'hidden',
                height: '100%',
                cursor: onClick ? 'pointer' : 'default',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all .25s ease',
                '&:hover': onClick
                    ? {
                          boxShadow: '0 12px 28px -8px rgba(0,0,0,0.18)',
                          transform: 'translateY(-4px)',
                          borderColor: accentColor,
                      }
                    : undefined,
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}99 100%)`,
                    pt: 3,
                    pb: 6,
                    px: 2,
                    position: 'relative',
                }}
            >
                {item.role && (
                    <Chip
                        label={roleLabels[item.role] || item.role}
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 12,
                            insetInlineStart: 12,
                            bgcolor: 'rgba(255,255,255,0.25)',
                            color: '#fff',
                            fontWeight: 600,
                            backdropFilter: 'blur(4px)',
                        }}
                    />
                )}
            </Box>

            {/* Avatar overlapping header */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: '-48px',
                }}
            >
                <Avatar
                    src={avatarSrc}
                    alt={fullName}
                    sx={{
                        width: 88,
                        height: 88,
                        border: '4px solid',
                        borderColor: 'background.paper',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                    }}
                />
            </Box>

            {/* Name */}
            <Stack alignItems="center" spacing={0.25} sx={{px: 2, mt: 1}}>
                <Typography variant="subtitle1" fontWeight={700} textAlign="center">
                    {item.agencyName || fullName}
                </Typography>
                {item.agencyName && (
                    <Typography variant="body2" color="text.secondary">
                        {fullName}
                    </Typography>
                )}
                {item.phoneNumber && (
                    <Stack
                        direction="row"
                        spacing={0.5}
                        alignItems="center"
                        sx={{color: 'text.secondary', mt: 0.5}}
                    >
                        <PhoneIphoneRoundedIcon sx={{fontSize: 15}} />
                        <Typography variant="caption" dir="ltr">
                            {item.phoneNumber}
                        </Typography>
                    </Stack>
                )}
            </Stack>

            <Divider sx={{my: 2}} />

            {/* Details grid */}
            <Stack spacing={1.5} sx={{px: 2.5, pb: 2.5}}>
                <InfoRow icon={<BadgeRoundedIcon sx={{fontSize: 17}} />} label="کد ملی" value={item.nationalId} />
                <InfoRow icon={<CakeRoundedIcon sx={{fontSize: 17}} />} label="تاریخ تولد" value={item.birthDate} />
                <InfoRow icon={<LocationCityRoundedIcon sx={{fontSize: 17}} />} label="شهر" value={item.city} />
                <InfoRow icon={<MarkunreadMailboxRoundedIcon sx={{fontSize: 17}} />} label="کد پستی" value={item.postalCode} />
                <InfoRow icon={<HomeRoundedIcon sx={{fontSize: 17}} />} label="آدرس منزل" value={item.homeAddress} />
                <InfoRow icon={<WorkRoundedIcon sx={{fontSize: 17}} />} label="آدرس محل کار" value={item.workAddress} />
                <InfoRow
                    icon={<FavoriteRoundedIcon sx={{fontSize: 17}} />}
                    label="وضعیت تأهل"
                    value={
                        item.maritalStatus
                            ? maritalStatusLabels[item.maritalStatus] || item.maritalStatus
                            : undefined
                    }
                />
                <InfoRow
                    icon={<ApartmentRoundedIcon sx={{fontSize: 17}} />}
                    label="وضعیت ملک دفتر"
                    value={
                        item.officePropertyStatus
                            ? officePropertyStatusLabels[item.officePropertyStatus] ||
                              item.officePropertyStatus
                            : undefined
                    }
                />
                {item.address && (
                    <Stack direction="row" spacing={1.25} alignItems="flex-start">
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 30,
                                height: 30,
                                borderRadius: '8px',
                                bgcolor: 'action.hover',
                                color: 'text.secondary',
                                flexShrink: 0,
                            }}
                        >
                            <PlaceRoundedIcon sx={{fontSize: 17}} />
                        </Box>
                        <Box sx={{minWidth: 0}}>
                            <Typography variant="caption" color="text.disabled" sx={{lineHeight: 1}}>
                                آدرس
                            </Typography>
                            <Typography
                                variant="body2"
                                fontWeight={500}
                                sx={{
                                    lineHeight: 1.4,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}
                            >
                                {item.address}
                            </Typography>
                        </Box>
                    </Stack>
                )}
            </Stack>
        </Paper>
    )
}

export function UserCardGrid<T extends BaseUserCardData>({
    rows,
    onItemClick,
}: {
    rows: T[]
    onItemClick?: (item: T) => void
}) {
    return (
        <Grid container spacing={2.5} px={1}>
            {rows.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <UserCard
                        item={item}
                        onClick={onItemClick ? () => onItemClick(item) : undefined}
                    />
                </Grid>
            ))}
        </Grid>
    )
}