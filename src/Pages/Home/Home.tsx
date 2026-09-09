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
import {FilesCreate} from '../Files/Create/FilesCreate'
import {FilesList} from '../Files/List/FilesList'
import {FilesEdit} from '../Files/Edit/FilesEdit'
import {RequestCreate} from '../Request/Create/RequestCreate'
import {RequestEdit} from '../Request/Edit/RequestEdit'
import {RequestList} from '../Request/List/RequestList'
import {ReminderCreate} from '../Reminder/Create/ReminderCreate'
import {ReminderList} from '../Reminder/List/ReminderList'
import {ReminderEdit} from '../Reminder/Edit/ReminderEdit'
import {CustomersCreate} from '../Customers/Create/CustomersCreate'
import {CustomersList} from '../Customers/List/CustomersList'
import {CustomersEdit} from '../Customers/Edit/CustomersEdit'
import {AdvertisementsCreate} from '../Advertisements/Create/AdvertisementsCreate'
import {AdvertisementsList} from '../Advertisements/List/AdvertisementsList'
import {AdvertisementsEdit} from '../Advertisements/Edit/AdvertisementsEdit'
import {OwnersCreate} from '../Owners/Create/OwnersCreate'
import {OwnersList} from '../Owners/List/OwnersList'
import {OwnersEdit} from '../Owners/Edit/OwnersEdit'
import { PartnersList } from '../Partners/List/PartnersList'
import { PartnersEdit } from '../Partners/Edit/PartnersEdit'
import { SuperUsersList } from '../SuperUsers/List/SuperUsersList'
import { SuperUsersCreate } from '../SuperUsers/Create/SuperUsersCreate'
import { SuperUsersEdit } from '../SuperUsers/Edit/SuperUsersEdit'
import { AgencyCreate } from '../Agency/Create/AgencyCreate'
import { AgencyList } from '../Agency/List/AgencyList'
import { AgencyEdit } from '../Agency/Edit/AgencyEdit'

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
                        {/* ...........super users.......... */}
                        <Route
                            path="users/super-users/create"
                            element={<SuperUsersCreate data={data} setData={setData} />}
                        />
                        <Route
                            path="users/super-users"
                            element={<SuperUsersList  />}
                        />
                        <Route path="users/super-users/:id" element={<SuperUsersEdit />} />
                          {/* ...........agencies.......... */}
                        <Route
                            path="users/agencies/create"
                            element={<AgencyCreate data={data} setData={setData} />}
                        />
                        <Route
                            path="users/agencies"
                            element={<AgencyList  />}
                        />
                        <Route path="users/agencies/:id" element={<AgencyEdit />} />

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
                        {/* ...........files.......... */}
                        <Route
                            path="files/create"
                            element={<FilesCreate data={data} setData={setData} />}
                        />
                        <Route path="files" element={<FilesList />} />
                        <Route path="files/:id" element={<FilesEdit />} />
                        {/* ...........requests.......... */}
                        <Route
                            path="requests/create"
                            element={<RequestCreate data={data} setData={setData} />}
                        />
                        <Route path="requests" element={<RequestList />} />
                        <Route path="requests/:id" element={<RequestEdit />} />
                        {/* ...........Reminders.......... */}
                        <Route
                            path="reminders/create"
                            element={<ReminderCreate data={data} setData={setData} />}
                        />
                        <Route path="reminders" element={<ReminderList />} />
                        <Route path="reminders/:id" element={<ReminderEdit />} />
                        {/* ...........Customers.......... */}
                        <Route
                            path="customers/create"
                            element={<CustomersCreate data={data} setData={setData} />}
                        />
                        <Route path="customers" element={<CustomersList />} />
                        <Route path="customers/:id" element={<CustomersEdit />} />
                        {/* ...........Owners.......... */}
                        <Route
                            path="owners/create"
                            element={<OwnersCreate data={data} setData={setData} />}
                        />
                        <Route path="owners" element={<OwnersList />} />
                        <Route path="owners/:id" element={<OwnersEdit />} />
                        {/* ...........advertisements.......... */}
                        <Route
                            path="advertisements/create"
                            element={<AdvertisementsCreate data={data} setData={setData} />}
                        />
                        <Route path="advertisements" element={<AdvertisementsList />} />
                        <Route path="advertisements/:id" element={<AdvertisementsEdit />} />
                          {/* ...........Partners.......... */}
                      
                        <Route path="partners" element={<PartnersList />} />
                        <Route path="partners/:id" element={<PartnersEdit />} />
                    </Routes>
                </Box>
            </Box>
        </MainLayout>
    )
}
