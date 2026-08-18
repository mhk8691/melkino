import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import {IconButton, Stack, Typography, useMediaQuery, useTheme} from '@mui/material'
import {ProfileType} from '../../Core/types'
import {drawerWidth} from '../Drawer/AppDrawer'
import AppbarProfile from './AppbarProfile'
import NewActivity from './NewActivity'

const Appbar = ({
    selectedTitle,
    drawerOpen,
    user,
    setDrawerOpen,
}: {
    selectedTitle: string
    drawerOpen: boolean
    setDrawerOpen: (open: boolean) => void
    user: ProfileType
}) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('mdl'))

    return (
        <Stack
            sx={{
                zIndex: 1100,
                position: 'fixed',
                top: 0,
                right: 0,
                left: {xs: 0, mdl: drawerWidth},
                height: '4.5rem',
                px: {xs: 2, sm: 3},
            }}
        >
            <Stack direction="row" alignItems="center" justifyContent="space-between" height="100%">
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    {isMobile && (
                        <IconButton
                            onClick={() => setDrawerOpen(!drawerOpen)}
                            sx={{
                                color: 'white',
                                borderRadius: '8px',
                            }}
                        >
                            {drawerOpen ? (
                                <CloseIcon sx={{fontSize: '30px'}} />
                            ) : (
                                <MenuIcon sx={{fontSize: '30px'}} />
                            )}
                        </IconButton>
                    )}
                    <Typography
                        variant="titleMd"
                        fontWeight={700}
                        sx={{
                            fontSize: {
                                xs: '18px !important',
                                sm: '20px !important',
                            },
                        }}
                    >
                        {selectedTitle}
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={{xs: 1, mdl: 2}}>
                    {/* <Notification /> */}
                    <NewActivity />
                    {!isMobile && (
                        <>
                            <AppbarProfile user={user} />
                        </>
                    )}
                </Stack>
            </Stack>
        </Stack>
    )
}
export default Appbar
