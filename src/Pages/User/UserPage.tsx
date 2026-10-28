
import React from 'react'
import {
    Box,
    Card,
    CardActionArea,
    Container,
    Typography,
    Stack,
} from '@mui/material'

import {
    AdminPanelSettingsRounded,
    DomainRounded,
    ManageAccountsRounded,
    PersonRounded,
} from '@mui/icons-material'

import { keyframes } from '@mui/system'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectRole, UserRole } from '../../redux/RoleSlice'


const slideUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(70px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
`

interface RoleItem {
    title: string
    icon: React.ReactNode
    href: string
    iconBg: string
    iconColor: string
    visibleTo: UserRole[]
}

const roles: RoleItem[] = [
    {
        title: 'سوپر ادمین',
        icon: <AdminPanelSettingsRounded />,
        href: '/super-users',
        iconBg: 'rgba(30, 97, 205, 0.10)',
        iconColor: '#1E61CD',
        visibleTo: [UserRole.SUPERADMIN],
    },
    {
        title: 'املاکی',
        icon: <DomainRounded />,
        href: '/agencies',
        iconBg: 'rgba(250, 174, 58, 0.13)',
        iconColor: '#AF7A28',
        visibleTo: [UserRole.SUPERADMIN],
    },
    {
        title: 'کارشناس',
        icon: <ManageAccountsRounded />,
        href: '/expert',
        iconBg: 'rgba(75, 131, 220, 0.12)',
        iconColor: '#144493',
        visibleTo: [
            UserRole.SUPERADMIN,
            UserRole.AGENCY,
        ],
    },
    {
        title: 'کاربر عادی',
        icon: <PersonRounded />,
        href: '/user',
        iconBg: 'rgba(91, 91, 91, 0.09)',
        iconColor: '#5B5B5B',
        visibleTo: [UserRole.SUPERADMIN],
    },
]

export default function UserPage() {
    const currentRole = useSelector(selectRole)

    const visibleRoles = roles.filter(
        (role) =>
            currentRole !== null &&
            role.visibleTo.includes(currentRole)
    )

    return (
        <Box
            sx={{
                minHeight: '90vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: { xs: 5, md: 8 },
                direction: 'rtl',
            }}
        >
            <Container maxWidth="lg">
                <Stack
                    spacing={1}
                    alignItems="center"
                    mb={5}
                >
                    <Typography
                        variant="h4"
                        fontWeight={800}
                        color="text.primary"
                        sx={{
                            fontSize: {
                                xs: '1.7rem',
                                sm: '2rem',
                                md: '2.25rem',
                            },
                        }}
                    >
                        مدیریت کاربران
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        textAlign="center"
                        sx={{
                            fontSize: {
                                xs: '0.9rem',
                                sm: '1rem',
                            },
                        }}
                    >
                        {currentRole === UserRole.SUPERADMIN
                            ? 'برای مشاهده و مدیریت کاربران، دسته‌بندی موردنظر را انتخاب کنید'
                            : currentRole === UserRole.AGENCY
                            ? 'برای مشاهده و مدیریت کارشناسان، وارد بخش کارشناسان شوید'
                            : 'شما به بخش مدیریت کاربران دسترسی ندارید'}
                    </Typography>
                </Stack>

                {visibleRoles.length > 0 ? (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(3, 1fr)',
                            },
                            gap: 3,
                            maxWidth: 1000,
                            mx: 'auto',
                        }}
                    >
                        {visibleRoles.map((role, index) => (
                            <Card
                                key={role.title}
                                elevation={0}
                                sx={{
                                    opacity: 0,
                                    borderRadius: '20px',
                                    backgroundColor: 'background.paper',
                                    border: '1px solid',
                                    borderColor: 'rgba(30, 30, 30, 0.07)',
                                    overflow: 'hidden',

                                    animation: `${slideUp} 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
                                    animationDelay: `${index * 0.1}s`,

                                    transition:
                                        'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease',

                                    '&:hover': {
                                        transform: 'translateY(-6px)',
                                        borderColor: 'primary.main',
                                        boxShadow:
                                            '0 10px 28px rgba(30, 97, 205, 0.10)',
                                    },
                                }}
                            >
                                <CardActionArea
                                    component={Link}
                                    to={`/users${role.href}`}
                                    sx={{
                                        minHeight: 190,
                                        p: 3.5,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: 2,

                                        transition:
                                            'background-color 0.3s ease',

                                        '&:hover': {
                                            backgroundColor:
                                                'rgba(244, 245, 247, 0.45)',
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 68,
                                            height: 68,
                                            borderRadius: '18px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: role.iconBg,
                                            color: role.iconColor,
                                            transition: 'transform 0.3s ease',

                                            '& svg': {
                                                fontSize: 36,
                                            },

                                            'a:hover &': {
                                                transform: 'scale(1.06)',
                                            },
                                        }}
                                    >
                                        {role.icon}
                                    </Box>

                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                        color="text.primary"
                                        sx={{
                                            fontSize: '1.05rem',
                                        }}
                                    >
                                        {role.title}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        textAlign="center"
                                        sx={{
                                            fontSize: '0.8rem',
                                        }}
                                    >
                                        مشاهده و مدیریت {role.title}
                                    </Typography>
                                </CardActionArea>
                            </Card>
                        ))}
                    </Box>
                ) : (
                    <Box
                        sx={{
                            maxWidth: 480,
                            mx: 'auto',
                            p: 4,
                            textAlign: 'center',
                            borderRadius: '20px',
                            backgroundColor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Typography
                            variant="h6"
                            fontWeight={700}
                            gutterBottom
                        >
                            عدم دسترسی
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            شما مجوز مشاهده و مدیریت کاربران
                            را ندارید.
                        </Typography>
                    </Box>
                )}
            </Container>
        </Box>
    )
}
