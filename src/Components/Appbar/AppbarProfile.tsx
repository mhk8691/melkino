import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'

import {
    Avatar,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
    Typography,
} from '@mui/material'

import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

import {ProfileType} from '../../Core/types'

const AppbarProfile = ({user}: {user: ProfileType}) => {
    const [anchorEl, setAnchorEl] =
        useState<null | HTMLElement>(null)

    const navigate = useNavigate()

    const open = Boolean(anchorEl)

    const handleOpen = (
        event: React.MouseEvent<HTMLElement>,
    ) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleProfile = () => {
        navigate('/profile')
        handleClose()
    }

    const handleLogout = async () => {
        try {
            await axios.post(
                'https://api.darine.shop/accounts/logout/',
                null,
                {
                    withCredentials: true,
                },
            )

            handleClose()

            // navigate('/login')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                gap={1}
                onClick={handleOpen}
                sx={{
                    cursor: 'pointer',
                    px: 0.75,
                    py: 0.5,
                    borderRadius: '14px',

                    transition: 'background-color .2s ease',

                    '&:hover': {
                        backgroundColor: 'action.hover',
                    },
                }}
            >
                <Avatar
                    src={user.profile_picture || ''}
                    alt={user.first_name}
                    sx={{
                        width: 38,
                        height: 38,
                        fontSize: 15,
                        fontWeight: 700,
                    }}
                >
                    {user.first_name?.slice(0, 1)}
                </Avatar>

                <Stack
                    sx={{
                        display: {
                            xs: 'none',
                            mdl: 'flex',
                        },
                    }}
                >
                    <Typography
                        fontSize={14}
                        fontWeight={700}
                        lineHeight={1.3}
                        noWrap
                    >
                        {user.first_name}
                    </Typography>

                    <Typography
                        fontSize={11}
                        color="text.secondary"
                        lineHeight={1.3}
                    >
                        حساب کاربری
                    </Typography>
                </Stack>

                <KeyboardArrowDownRoundedIcon
                    sx={{
                        fontSize: 20,
                        color: 'text.secondary',
                        transition: 'transform .2s ease',
                        transform: open
                            ? 'rotate(180deg)'
                            : 'rotate(0)',
                    }}
                />
            </Stack>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            mt: 1,
                            minWidth: 250,
                            borderRadius: '16px',
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow:
                                '0 12px 35px rgba(0,0,0,.10)',
                            overflow: 'hidden',
                        },
                    },
                }}
            >
                {/* PROFILE HEADER */}
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={1.5}
                    px={2}
                    py={1.75}
                >
                    <Avatar
                        src={user.profile_picture || ''}
                        sx={{
                            width: 44,
                            height: 44,
                        }}
                    >
                        {user.first_name?.slice(0, 1)}
                    </Avatar>

                    <Stack minWidth={0}>
                        <Typography
                            fontSize={14}
                            fontWeight={700}
                            noWrap
                        >
                            {user.first_name}
                        </Typography>

                        <Typography
                            fontSize={12}
                            color="text.secondary"
                            noWrap
                        >
                            {user.mobile}
                        </Typography>
                    </Stack>
                </Stack>

                <Divider />

                <MenuItem
                    onClick={handleProfile}
                    sx={{
                        mx: 0.75,
                        my: 0.5,
                        borderRadius: '10px',
                        py: 1,
                    }}
                >
                    <ListItemIcon>
                        <AccountCircleRoundedIcon fontSize="small" />
                    </ListItemIcon>

                    <Typography fontSize={13}>
                        پروفایل
                    </Typography>
                </MenuItem>

                <MenuItem
                    onClick={handleProfile}
                    sx={{
                        mx: 0.75,
                        my: 0.5,
                        borderRadius: '10px',
                        py: 1,
                    }}
                >
                    <ListItemIcon>
                        <SettingsRoundedIcon fontSize="small" />
                    </ListItemIcon>

                    <Typography fontSize={13}>
                        تنظیمات حساب
                    </Typography>
                </MenuItem>

                <Divider sx={{my: 0.5}} />

                <MenuItem
                    onClick={handleLogout}
                    sx={{
                        mx: 0.75,
                        mb: 0.75,
                        borderRadius: '10px',
                        py: 1,
                        color: 'error.main',

                        '&:hover': {
                            backgroundColor: 'error.lighter',
                        },
                    }}
                >
                    <ListItemIcon
                        sx={{
                            color: 'error.main',
                        }}
                    >
                        <LogoutRoundedIcon fontSize="small" />
                    </ListItemIcon>

                    <Typography
                        fontSize={13}
                        fontWeight={600}
                    >
                        خروج از حساب
                    </Typography>
                </MenuItem>
            </Menu>
        </>
    )
}

export default AppbarProfile