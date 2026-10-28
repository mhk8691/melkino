import Box from '@mui/material/Box'
import {useEffect, useState} from 'react'
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import MainLayout from '../../Components/MainLayout'

import DashboardLayout from '../Dashboard/DashboardLayout'
import Profile from '../Profile/Profile'
import {LogsList} from '../Logs/List/LogsList'
import UserPage from '../User/UserPage'
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
import {CustomersList} from '../Customers/List/CustomersList'
import {CustomersEdit} from '../Customers/Edit/CustomersEdit'
import {AdvertisementsCreate} from '../Advertisements/Create/AdvertisementsCreate'
import {AdvertisementsList} from '../Advertisements/List/AdvertisementsList'
import {AdvertisementsEdit} from '../Advertisements/Edit/AdvertisementsEdit'
import {OwnersList} from '../Owners/List/OwnersList'
import {OwnersEdit} from '../Owners/Edit/OwnersEdit'
import {PartnersList} from '../Partners/List/PartnersList'
import {PartnersEdit} from '../Partners/Edit/PartnersEdit'
import {SuperUsersList} from '../SuperUsers/List/SuperUsersList'
import {SuperUsersCreate} from '../SuperUsers/Create/SuperUsersCreate'
import {SuperUsersEdit} from '../SuperUsers/Edit/SuperUsersEdit'
import {AgencyCreate} from '../Agency/Create/AgencyCreate'
import {AgencyList} from '../Agency/List/AgencyList'
import {AgencyEdit} from '../Agency/Edit/AgencyEdit'
import {UsersCreate} from '../User/Create/UsersCreate'
import {UsersList} from '../User/List/UsersList'
import {UsersEdit} from '../User/Edit/UsersEdit'
import {AgentsCreate} from '../Agent/Create/AgentsCreate'
import {AgentsList} from '../Agent/List/AgentsList'
import {AgentsEdit} from '../Agent/Edit/AgentsEdit'
import {UsersType} from '../User/Users'
import {LessorsList} from '../Lessors/List/LessorsList'
import {LessorsEdit} from '../Lessors/Edit/LessorsEdit'
import {TenantsList} from '../Tenants/List/TenantsList'
import {TenantsEdit} from '../Tenants/Edit/TenantsEdit'
import RoleSelectPage from '../Lessors/RoleCard'
import {TicketsList} from '../Tickets/List/TicketsList'
import {TicketsEdit} from '../Tickets/Edit/TicketsEdit'
import {TicketsCreate} from '../Tickets/Create/TicketsCreate'
import {Button} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {OwnersRequestCreate} from '../OwnersRequest/Create/OwnersRequestCreate'
import {OwnersRequestList} from '../OwnersRequest/List/OwnersRequestList'
import {OwnersRequestEdit} from '../OwnersRequest/Edit/OwnersRequestEdit'
import {CustomersRequestList} from '../CustomersRequest/List/CustomersRequestList'
import {CustomersRequestEdit} from '../CustomersRequest/Edit/CustomersRequestEdit'
import {ViewsList} from '../Views/List/ViewsList'
import {ViewsEdit} from '../Views/Edit/ViewsEdit'
import {FollowUpsList} from '../FollowUps/List/FollowUpsList'
import {FollowUpsEdit} from '../FollowUps/Edit/FollowUpsEdit'
import {ContractsList} from '../Contracts/List/ContractsList'
import {ContractsEdit} from '../Contracts/Edit/ContractsEdit'
import {ArchivesList} from '../Archives/List/ArchivesList'
import {ArchivesEdit} from '../Archives/Edit/ArchivesEdit'
import {TasksCreate} from '../Tasks/Create/TasksCreate'
import {TasksEdit} from '../Tasks/Edit/TasksEdit'
import {TasksList} from '../Tasks/List/TasksList'
import { clearRole, setRole, UserRole } from '../../redux/RoleSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

export function Home(props) {
    const [profile, setProfile] = useState<UsersType>({} as UsersType)
    const navigate = useNavigate()
    const location = useLocation()
    const [data, setData] = useState({})
    const dispatch = useDispatch()
    const [authStatus, setAuthStatus] = useState<'loading' | 'auth' | 'unauth'>('loading')

    useEffect(() => {
        let active = true

        const getProfile = async () => {
            try {
                const response = await axios.get('https://api.mlkino.com/accounts/profile/', {
                    withCredentials: true,
                    headers: {
                        'Accept-Language': 'fa',
                    },
                })

                if (!active) return

                const user = response.data.data

                if (!user || !Object.values(UserRole).includes(user.role)) {
                    throw new Error('Invalid user role')
                }

                setProfile(user)
                dispatch(setRole(user.role as UserRole))
                setAuthStatus('auth')
            } catch (error) {
                if (!active) return

                setProfile({} as UsersType)
                dispatch(clearRole())
                setAuthStatus('unauth')
            }
        }

        getProfile()

        return () => {
            active = false
        }
    }, [dispatch])

    useEffect(() => {
        if (authStatus === 'loading') return

        if (authStatus === 'unauth') {
            navigate('/login', {replace: true})
            return
        }

        if (profile?.role === UserRole.USER) {
            navigate('/login', {replace: true})
            return
        }

        if (location.pathname === '/') {
            navigate('/dashboard', {replace: true})
        }
    }, [authStatus, profile, navigate, location.pathname])

    if (authStatus === 'loading') {
        return null
    }

    if (authStatus === 'unauth') {
        return null
    }

    if (profile?.role === UserRole.USER) {
        return null
    }
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
                    {!location.pathname.includes('dashboard') && (
                        <Box sx={{p: 1.5, pb: 3, display: 'flex', justifyContent: 'flex-end'}}>
                            <Button
                                onClick={() => navigate(-1)}
                                endIcon={<ArrowBackIcon fontSize="small" />}
                                size="small"
                                sx={{
                                    gap: 0.5,
                                    px: 1.75,
                                    py: 0.6,
                                    borderRadius: '10px',
                                    color: 'text.secondary',
                                    bgcolor: 'background.paper',
                                    boxShadow:
                                        '0px 2px 8px rgba(0, 0, 0, 0.04), 0px 4px 16px rgba(0, 0, 0, 0.03)',
                                    textTransform: 'none',
                                    fontSize: '13px',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        bgcolor: 'action.hover',
                                        color: 'text.primary',
                                        boxShadow:
                                            '0px 2px 10px rgba(0, 0, 0, 0.06), 0px 4px 18px rgba(0, 0, 0, 0.05)',
                                    },
                                }}
                            >
                                بازگشت
                            </Button>
                        </Box>
                    )}

                    <Routes>
                        <Route path="dashboard" element={<DashboardLayout />} />
                        <Route path="/profile" element={<Profile />} />
                        {/* ...........super users.......... */}
                        <Route
                            path="users/super-users/create"
                            element={<SuperUsersCreate data={data} setData={setData} />}
                        />
                        <Route path="users/super-users" element={<SuperUsersList />} />
                        <Route path="users/super-users/:id" element={<SuperUsersEdit />} />
                        {/* ...........agencies.......... */}
                        <Route
                            path="users/agencies/create"
                            element={<AgencyCreate data={data} setData={setData} />}
                        />
                        <Route path="users/agencies" element={<AgencyList />} />
                        <Route path="users/agencies/:id" element={<AgencyEdit />} />
                        {/* ...........user.......... */}
                        <Route
                            path="users/user/create"
                            element={<UsersCreate data={data} setData={setData} />}
                        />
                        <Route path="users/user" element={<UsersList />} />
                        <Route path="users/user/:id" element={<UsersEdit />} />
                        {/* ...........agents.......... */}
                        <Route
                            path="users/agents/create"
                            element={
                                <AgentsCreate
                                    title="افزودن کارشناس"
                                    resource="agents"
                                    data={data}
                                    setData={setData}
                                />
                            }
                        />
                        <Route
                            path="users/agents"
                            element={<AgentsList title="لیست کارشناسان" resource="agents" />}
                        />
                        <Route
                            path="users/agents/:id"
                            element={<AgentsEdit title="ویرایش کارشناس" resource="agents" />}
                        />

                        {/* ...........accountant.......... */}
                        <Route
                            path="users/accountant/create"
                            element={
                                <AgentsCreate
                                    title="افزودن حسابدار"
                                    resource="accountant"
                                    data={data}
                                    setData={setData}
                                />
                            }
                        />
                        <Route
                            path="users/accountant"
                            element={<AgentsList title="لیست حسابداران" resource="accountant" />}
                        />
                        <Route
                            path="users/accountant/:id"
                            element={<AgentsEdit title="ویرایش حسابدار" resource="accountant" />}
                        />

                        {/* ...........secretary.......... */}
                        <Route
                            path="users/secretary/create"
                            element={
                                <AgentsCreate
                                    title="افزودن منشی"
                                    resource="secretary"
                                    data={data}
                                    setData={setData}
                                />
                            }
                        />
                        <Route
                            path="users/secretary"
                            element={<AgentsList title="لیست منشی ها" resource="secretary" />}
                        />
                        <Route
                            path="users/secretary/:id"
                            element={<AgentsEdit title="ویرایش منشی" resource="secretary" />}
                        />

                        <Route path="users" element={<UserPage />} />

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

                        <Route path="customers" element={<CustomersList />} />
                        <Route path="customers/:id" element={<CustomersEdit />} />
                        {/* ...........Owners.......... */}

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
                        {/* ...........lessors.......... */}

                        <Route path="landlord-tenant/lessors" element={<LessorsList />} />
                        <Route path="landlord-tenant/lessors/:id" element={<LessorsEdit />} />
                        {/* ...........tenants.......... */}

                        <Route path="landlord-tenant/tenants" element={<TenantsList />} />
                        <Route path="landlord-tenant/tenants/:id" element={<TenantsEdit />} />
                        <Route path="landlord-tenant" element={<RoleSelectPage />} />

                        {/* ...........tickets.......... */}

                        <Route path="tickets" element={<TicketsList />} />
                        <Route path="tickets/:id" element={<TicketsEdit />} />
                        <Route
                            path="tickets/create"
                            element={<TicketsCreate data={data} setData={setData} />}
                        />
                        {/* ...........owners-requests.......... */}
                        <Route
                            path="owners-requests/create"
                            element={<OwnersRequestCreate data={data} setData={setData} />}
                        />
                        <Route path="owners-requests" element={<OwnersRequestList />} />
                        <Route path="owners-requests/:id" element={<OwnersRequestEdit />} />
                        {/* ...........customers-requests.......... */}

                        <Route path="customers-requests" element={<CustomersRequestList />} />
                        <Route path="customers-requests/:id" element={<CustomersRequestEdit />} />

                        {/* ...........Views.......... */}

                        <Route path="views" element={<ViewsList />} />
                        <Route path="views/:id" element={<ViewsEdit />} />
                        {/* ...........follow-ups.......... */}

                        <Route path="follow-ups" element={<FollowUpsList />} />
                        <Route path="follow-ups/:id" element={<FollowUpsEdit />} />
                        {/* ...........Contracts.......... */}

                        <Route path="contracts" element={<ContractsList />} />
                        <Route path="contracts/:id" element={<ContractsEdit />} />
                        {/* ...........archives.......... */}

                        <Route path="archives" element={<ArchivesList />} />
                        <Route path="archives/:id" element={<ArchivesEdit />} />
                        {/* ...........Tasks.......... */}
                        <Route
                            path="tasks/create"
                            element={<TasksCreate data={data} setData={setData} />}
                        />
                        <Route path="tasks" element={<TasksList />} />
                        <Route path="tasks/:id" element={<TasksEdit />} />
                    </Routes>
                </Box>
            </Box>
        </MainLayout>
    )
}
