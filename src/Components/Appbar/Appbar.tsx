import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

import {Box, IconButton, Stack, Typography, useMediaQuery, useTheme, Button} from '@mui/material'

import {useEffect, useState} from 'react'

import {drawerWidth} from '../Drawer/AppDrawer'

import AppbarProfile from './AppbarProfile'
import AppbarSearch from './AppbarSearch'
import NewActivity from './NewActivity'
import {Link} from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
import { UsersType } from '../../Pages/User/Users'
type AppbarProps = {
    selectedTitle: string
    drawerOpen: boolean
    setDrawerOpen: (open: boolean) => void
    user: UsersType
}

const Appbar = ({selectedTitle, drawerOpen, user, setDrawerOpen}: AppbarProps) => {
    const theme = useTheme()

    const isMobile = useMediaQuery(theme.breakpoints.down('mdl'))

    const [isScrolled, setIsScrolled] = useState(false)

    const [searchOpen, setSearchOpen] = useState(false)

    useEffect(() => {
        let ticking = false

        const handleScroll = () => {
            if (ticking) return

            ticking = true

            requestAnimationFrame(() => {
                setIsScrolled(window.scrollY > 8)

                ticking = false
            })
        }

        window.addEventListener('scroll', handleScroll, {
            passive: true,
        })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <Box
            component="header"
            sx={{
                position: 'fixed',

                top: 0,
                right: 0,

                left: {
                    xs: 0,
                    mdl: drawerWidth,
                },

                height: {
                    xs: 64,
                    mdl: 72,
                },

                zIndex: theme.zIndex.appBar,

                px: {
                    xs: 1.25,
                    sm: 2,
                    md: 2.5,
                    mdl: 3,
                },

                backgroundColor: 'background.paper',

                borderBottom: '1px solid',

                borderColor: 'divider',

                boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,.06)' : '0 1px 6px rgba(0,0,0,.025)',

                transition: 'box-shadow .2s ease',
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                height="100%"
                gap={1}
            >
                {/* LEFT */}

                <Stack direction="row" alignItems="center" gap={0.75} minWidth={0} flexShrink={1}>
                    {isMobile && (
                        <IconButton
                            onClick={() => setDrawerOpen(!drawerOpen)}
                            sx={{
                                width: 40,
                                height: 40,

                                flexShrink: 0,

                                borderRadius: '11px',

                                color: 'text.primary',

                                backgroundColor: 'action.hover',

                                '&:hover': {
                                    backgroundColor: 'action.selected',
                                },
                            }}
                        >
                            {drawerOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
                        </IconButton>
                    )}

                    <Typography
                        variant="titleMd"
                        fontWeight={700}
                        noWrap
                        sx={{
                            minWidth: 0,

                            color: 'text.primary',

                            fontSize: {
                                xs: '16px !important',
                                sm: '18px !important',
                                mdl: '20px !important',
                            },
                        }}
                    >
                        {selectedTitle}
                    </Typography>
                </Stack>

                {/* DESKTOP SEARCH */}

                {!isMobile && (
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: 0,

                            display: 'flex',

                            justifyContent: 'center',

                            px: {
                                sm: 2,
                                mdl: 4,
                            },
                        }}
                    >
                        <AppbarSearch placeholder="جستجو در پنل..." />
                    </Box>
                )}

                {/* ACTIONS */}

                <Stack direction="row" alignItems="center" gap={0.75} flexShrink={0}>
                    {isMobile && (
                        <IconButton
                            onClick={() => setSearchOpen(!searchOpen)}
                            sx={{
                                width: 40,
                                height: 40,

                                borderRadius: '11px',

                                color: 'text.primary',

                                backgroundColor: 'action.hover',

                                '&:hover': {
                                    backgroundColor: 'action.selected',
                                },
                            }}
                        >
                            {searchOpen ? <CloseRoundedIcon /> : <SearchRoundedIcon />}
                        </IconButton>
                    )}
                    <Button
                        variant="outlined"
                        color="secondary"
                        component={Link}
                        to="/test"
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<LoginIcon/>}
                    >
                        ورود به لندینگ
                    </Button>
                    <NewActivity />
                    {!isMobile && <AppbarProfile user={user} />}
                </Stack>
            </Stack>

            {/* MOBILE SEARCH */}

            {isMobile && searchOpen && (
                <Box
                    sx={{
                        position: 'absolute',

                        top: '100%',

                        left: 0,
                        right: 0,

                        px: 1.5,
                        py: 1.25,

                        backgroundColor: 'background.paper',

                        borderBottom: '1px solid',

                        borderColor: 'divider',

                        boxShadow: '0 10px 25px rgba(0,0,0,.08)',
                    }}
                >
                    <AppbarSearch placeholder="جستجو در پنل..." mobile />
                </Box>
            )}
        </Box>
    )
}

export default Appbar
