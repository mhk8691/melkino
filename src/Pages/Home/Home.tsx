import Box from '@mui/material/Box'
import { useState} from 'react'
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import MainLayout from '../../Components/MainLayout'

import DashboardLayout from '../Dashboard/DashboardLayout'
import Profile from '../Profile/Profile'
import {UserCreate} from '../Users/Create/UserCreate'
import {UserEdit} from '../Users/Edit/UserEdit'
import {UsersList} from '../Users/List/UsersList'
import {UsersType} from '../Users/Users'
import {LogsList} from '../Logs/List/LogsList'

export function Home(props) {
    const [profile, setProfile] = useState<UsersType>({} as UsersType)
    const navigate = useNavigate()
    const location = useLocation()
    const [data, setData] = useState({})
    const [authStatus, setAuthStatus] = useState('loading')
    // useEffect(() => {
    //     const getProfile = async () => {
    //         try {
    //             const response = await axios.get(`https://api.darine.shop/accounts/profile/`, {
    //                 withCredentials: true,
    //             })

    //             setProfile(response.data.data)
    //             setAuthStatus('auth')
    //         } catch (error) {
    //             setAuthStatus('unauth')
    //         }
    //     }

    //     getProfile()
    // }, [])
    // useEffect(() => {
    //     // if (!profile) {
    //     //     navigate('/login')
    //     // }
    //     // if (profile.role === 'customer') {
    //     //     navigate('/login')
    //     // }
    //     // if (location.pathname === '/') {
    //     //     navigate('/dashboard')
    //     // }
    // }, [navigate, profile])
    // if (authStatus === 'loading') {
    //     return null // یا splash screen
    // }

    // if (authStatus === 'unauth') {
    //     // navigate('/login')
    //     return null
    // }
    return (
        <MainLayout>
            <Box
                flexGrow={1}
                mt="4.5rem"
                padding={
                    !location.pathname.includes('dashboard')
                        ? {
                              xs: '15px',
                              sm: '30px',
                          }
                        : 'unset'
                }
            >
                <Box
                    bgcolor={!location.pathname.includes('dashboard') ? 'background.main' : 'unset'}
                    borderRadius={'15px'}
                    style={{
                        boxShadow: !location.pathname.includes('dashboard')
                            ? `0px 2px 8px rgba(0, 0, 0, 0.04),
           0px 4px 16px rgba(0, 0, 0, 0.03)`
                            : 'unset',
                    }}
                >
                    <Routes>
                        <Route path="dashboard" element={<DashboardLayout />} />
                        <Route path="/profile" element={<Profile />} />
                        {/* ...........users.......... */}
                        <Route
                            path="users/create"
                            element={<UserCreate data={data} setData={setData} />}
                        />
                        <Route path="users" element={<UsersList />} />
                        <Route path="users/:id" element={<UserEdit />} />

                        {/* ...........logs.......... */}

                        <Route path="logs" element={<LogsList />} />
                        <Route path="logs" element={<DashboardLayout />} />
                    </Routes>
                </Box>
            </Box>
        </MainLayout>
    )
}
