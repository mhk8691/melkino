import Box from '@mui/material/Box'
import {useState} from 'react'
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import MainLayout from '../../Components/MainLayout'

import DashboardLayout from '../Dashboard/DashboardLayout'
import Profile from '../Profile/Profile'
import {UserCreate} from '../Users/Create/UserCreate'
import {UserEdit} from '../Users/Edit/UserEdit'
import {UsersList} from '../Users/List/UsersList'
import {UsersType} from '../Users/Users'
import {LogsList} from '../Logs/List/LogsList'
import {UserRole} from '../Users/UsersType'
import {fakeUsers} from '../Users/usersData'
import UserPage from '../Users/UserPage'
import {AnnouncementCreate} from '../Announcement/Create/AnnouncementCreate'
import {AnnouncementList} from '../Announcement/List/AnnouncementList'
import {AnnouncementEdit} from '../Announcement/Edit/AnnouncementEdit'
import PanelSettings from '../Settings/PanelSettings'
import { FilesCreate } from '../Files/Create/FilesCreate'
import { FilesList } from '../Files/List/FilesList'
import { FilesEdit } from '../Files/Edit/FilesEdit'

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
                        <Route
                            path="users/super-admin"
                            element={<UsersList role={UserRole.SUPER_USER} data={fakeUsers} />}
                        />
                        <Route
                            path="users/real-estate"
                            element={
                                <UsersList role={UserRole.REAL_ESTATE_AGENCY} data={fakeUsers} />
                            }
                        />
                        <Route
                            path="users/agent"
                            element={
                                <UsersList role={UserRole.REAL_ESTATE_AGENT} data={fakeUsers} />
                            }
                        />
                        <Route
                            path="users/user"
                            element={<UsersList role={UserRole.REGULAR_USER} data={fakeUsers} />}
                        />
                        <Route
                            path="users/accountant"
                            element={<UsersList role={UserRole.ACCOUNTANT} data={fakeUsers} />}
                        />
                        <Route
                            path="users/secretary"
                            element={<UsersList role={UserRole.SECRETARY} data={fakeUsers} />}
                        />
                        <Route path="users" element={<UserPage />} />
                        <Route path="users/:id" element={<UserEdit />} />

                        {/* ...........logs.......... */}

                        <Route path="logs" element={<LogsList />} />
                        <Route path="logs" element={<DashboardLayout />} />
                        {/* ...........Announcemen.......... */}
                        <Route
                            path="announcements/create"
                            element={<AnnouncementCreate data={data} setData={setData} />}
                        />
                        <Route path="announcements" element={<AnnouncementList />} />
                        <Route path="announcements/:id" element={<AnnouncementEdit />} />
                        {/* ...........Settings.......... */}
                        <Route path="settings" element={<PanelSettings />} />
                           {/* ...........Announcemen.......... */}
                        <Route
                            path="files/create"
                            element={<FilesCreate data={data} setData={setData} />}
                        />
                        <Route path="files" element={<FilesList />} />
                        <Route path="files/:id" element={<FilesEdit />} />
                    </Routes>
                </Box>
            </Box>
        </MainLayout>
    )
}
