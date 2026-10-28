import {Box, Button, Stack, Typography} from '@mui/material'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {setUtil} from '../../redux/UtilSlice'
import {Users, UsersType} from '../User/Users'

export default function Profile() {
    const [profile, setProfile] = useState<UsersType>({} as UsersType)
    const [initialData, setInitialData] = useState<UsersType>({} as UsersType)
    const dispatch = useDispatch()
    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get<{
                    data: UsersType
                }>(`https://api.mlkino.com/accounts/profile/`, {
                    withCredentials: true,
                })
                setProfile(response.data.data)
                setInitialData(response.data.data)
            } catch (error: any) {
                console.log(error)
            }
        }
        getProfile()
    }, [])

    async function saveChanges() {
        try {
            dispatch(setUtil({loading: true}))
            const formData = new FormData()
            const updatedFields = Object.keys(profile).reduce((acc, key) => {
                if (profile[key] !== initialData[key]) {
                    acc[key] = profile[key]
                }
                return acc
            }, {})
            if (Object.keys(updatedFields).length === 0) {
                dispatch(setUtil({open: true, message: 'تغییری اعمال نشده است', severity: 'error'}))
                dispatch(setUtil({loading: false}))
                return
            }
            Object.entries(updatedFields).forEach(([key, value]) => {
                if (value instanceof File) {
                    formData.append(key, value)
                } else {
                    formData.append(key, String(value))
                }
            })
            const res = await axios.put<{
                data: UsersType
                message: string
                status: boolean
            }>(`https://api.mlkino.com/accounts/profile/`, formData, {
                withCredentials: true,
            })
            dispatch(
                setUtil({
                    open: true,
                    message: res.data.message,
                    severity: 'success',
                }),
            )
            window.location.reload()
        } catch (error: any) {
            dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
        }

        dispatch(setUtil({loading: false}))
    }
    return (
        <Box p={2}>
            <Stack mb={4}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: {
                                xs: '15px !important',
                                sm: '18px !important',
                            },
                            '@media (max-width: 350px)': {
                                fontSize: '14px !important',
                            },
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        ویرایش حساب کاربری
                    </Typography>
                    <Stack>
                        <Button
                            variant="outlined"
                            onClick={saveChanges}
                            sx={{
                                fontSize: {
                                    xs: '14px !important',
                                    sm: '16px !important',
                                },
                                py: {
                                    xs: 0.7,
                                    sm: 1,
                                },
                                whiteSpace: 'nowrap',
                            }}
                        >
                            ذخیره تغییرات
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
            <Users resource="/profile" users={profile} setUsers={setProfile} />
        </Box>
    )
}
