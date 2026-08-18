import {Avatar, Button, Popover, Stack, Typography} from '@mui/material'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ProfileType} from '../../Core/types'
import axios from 'axios'

const AppbarProfile = ({user}: {user: ProfileType}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const navigate = useNavigate()

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleLogout = async () => {
        try{
        await axios.post('https://api.darine.shop/accounts/logout/', null, {
  withCredentials: true,
})
                handleClose()
        // navigate('/login')
        }catch(error:unknown){
            console.log(error)
        }
        
    }

    const open = Boolean(anchorEl)

    return (
        <Stack>
            <Stack
                direction={{xs: 'row-reverse', mdl: 'row'}}
                alignItems="center"
                gap={1}
                sx={{cursor: 'pointer'}}
                onClick={handleOpen}
            >
                <Typography
                    variant="subtitle2"
                    noWrap
                    sx={{
                        fontSize: {
                            xs: '14px',
                            mdl: '15px',
                        },
                    }}
                >
                    {user.first_name}
                </Typography>
                <Avatar
                    alt="profile image"
                    src={user.profile_picture || ''}
                    sx={{
                        height: {
                            xs: 45,
                            mdl: 35,
                        },
                        width: {
                            xs: 45,
                            mdl: 35,
                        },
                    }}
                />
            </Stack>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                sx={{mt: '1rem'}}
            >
                <Stack p="15px" bgcolor="background.main" minWidth="200px" gap={1}>
                    <Stack direction="row" alignItems="center" gap={1.5}>
                        <Avatar sx={{width: 36, height: 36}} src={user?.profile_picture || ''}>
                            {user?.first_name?.slice(0, 1)}
                        </Avatar>
                        <Stack>
                            <Typography
                                variant="bodyLg"
                                fontWeight={700}
                                fontSize={{xs: '14px', mdl: '15px'}}
                            >
                                {user.first_name}
                            </Typography>
                            <Typography
                                variant="caption"
                                fontWeight={600}
                                fontSize={{xs: '12px', mdl: '14px'}}
                                sx={{
                                    mt: {
                                        xs: 0.5,
                                        mdl: 0,
                                    },
                                }}
                            >
                                {user.mobile}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="space-around">
                        <Button
                            variant="text"
                            size="small"
                            onClick={() => {
                                navigate('/profile')
                                handleClose()
                            }}
                        >
                            تنظیمات حساب
                        </Button>
                        <Button variant="text" size="small" onClick={handleLogout}>
                            خروج
                        </Button>
                    </Stack>
                </Stack>
            </Popover>
        </Stack>
    )
}

export default AppbarProfile
