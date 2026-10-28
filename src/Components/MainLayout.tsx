import {Box, Stack} from '@mui/material'
import axios from 'axios'
import {useEffect, useState} from 'react'
import Appbar from './Appbar/Appbar'
import {AppDrawer, drawerWidth} from './Drawer/AppDrawer'
import Cookies from 'universal-cookie'
import { UsersType } from '../Pages/User/Users'

const MainLayout = ({children}: {children: React.ReactNode}) => {
    const cookies = new Cookies()
    const [selectedTitle, setSelectedTitle] = useState<string>('')
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [user, setUser] = useState<UsersType>({} as UsersType)

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get<{
                    data: UsersType
                }>(`https://api.mlkino.com/accounts/profile/`, {
                    withCredentials: true,
                })
                setUser(response.data.data)
            } catch (error: any) {
                console.log(error)
            }
        }
        getUser()
    }, [])
    return (
        <Stack direction="row" minHeight="100vh" position={'relative'}>
            <AppDrawer
                user={user}
                setSelectedTitle={setSelectedTitle}
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
            />
            <Box
                component="main"
                flexGrow={1}
                sx={{
                    ml: {xs: 0, mdl: `${drawerWidth}px`},
                    width: {xs: '100%', mdl: `calc(100% - ${drawerWidth}px)`},
                }}
            >
                <Appbar
                    selectedTitle={selectedTitle}
                    drawerOpen={drawerOpen}
                    setDrawerOpen={setDrawerOpen}
                    user={user}
                />
                <Box sx={{p: 1}}>{children}</Box>
            </Box>
        </Stack>
    )
}

export default MainLayout
