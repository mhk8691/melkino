
import {
    CircularProgress,
    IconButton,
    InputAdornment,
    Stack,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import {
    type Dispatch,
    type SetStateAction,
    useRef,
    useState,
} from 'react'
import axios from 'axios'

import {CustomTextField} from '../../Components/Input/CustomTextField'
import {CustomSelectField} from '../../Components/Input/CustomSelectField'
import {GridProducer} from '../../Components/Table/GridProducer'
import DatePickerFilter from '../../Components/Filter/DatePicker'
import ProfileUploader from './ProfileUploader'
import {formatDate} from '../../Core/FormatDate'

export interface UsersType {
    id: number
    phone: string
    email: string | null
    first_name: string
    last_name: string
    full_name: string
    national_code: string | null
    birth_date: string | null
    avatar: string | File | null
    province: string | null
    city: string | null
    postal_code: string | null
    address: string | null
    user_type: 'consumer' | 'investor'
    user_type_display: string
    role: 'superadmin' | 'user'
    role_display: string
    account_status: 'active' | 'inactive' | 'suspended'
    account_status_display: string
    verification_status:
        | 'not_started'
        | 'verified'
        | 'pending'
        | 'rejected'
        | 'unverified'
    verification_status_display: string
    phone_verified: boolean
    national_code_verified: boolean
    is_active: boolean
    is_staff: boolean
    is_superuser: boolean
    admin_level: string | number | null
    has_profile: boolean
    last_login: string | null
    date_joined: string
}

interface AddressType {
    province: string
    city: string
    address: string
}

interface UsersProps {
    users: UsersType
    setUsers: Dispatch<SetStateAction<UsersType>>
    resource: string
    editMode?: boolean
}

export function Users({
    users,
    setUsers,
    resource,
    editMode = true,
}: UsersProps) {
    const [postalLoading, setPostalLoading] = useState(false)
    const [postalError, setPostalError] = useState('')
    const lookupIdRef = useRef(0)
    const postalRef = useRef(users.postal_code ?? '')

    postalRef.current = users.postal_code ?? ''

    const postalLookup = async () => {
        const postal = postalRef.current.trim()

        if (!/^\d{10}$/.test(postal)) {
            setPostalError('کد پستی باید دقیقاً ۱۰ رقم باشد')
            return
        }

        const lookupId = ++lookupIdRef.current

        setPostalError('')
        setPostalLoading(true)

        try {
            const response = await axios.get<{
                data: AddressType
            }>(
                'https://api.mlkino.com/accounts/postal/lookup/',
                {
                    params: {
                        postal_code: postal,
                    },
                    withCredentials: true,
                },
            )

            if (
                lookupId !== lookupIdRef.current ||
                postalRef.current !== postal
            ) {
                return
            }

            const addressData = response.data.data

            if (!addressData) {
                setPostalError('اطلاعاتی برای این کد پستی یافت نشد')
                return
            }

            setUsers((prev) => {
                if (prev.postal_code !== postal) {
                    return prev
                }

                return {
                    ...prev,
                    province: addressData.province ?? '',
                    city: addressData.city ?? '',
                    address: addressData.address ?? '',
                }
            })
        } catch (error) {
            if (lookupId !== lookupIdRef.current) {
                return
            }

            let message = 'خطا در استعلام کد پستی'

            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data as
                    | {message?: string}
                    | undefined

                message = responseData?.message || message
            }

            setPostalError(message)
        } finally {
            if (lookupId === lookupIdRef.current) {
                setPostalLoading(false)
            }
        }
    }

    const handlePostalChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const postal = event.target.value
            .replace(/\D/g, '')
            .slice(0, 10)

        postalRef.current = postal
        lookupIdRef.current += 1

        setPostalLoading(false)
        setPostalError('')

        setUsers((prev) => ({
            ...prev,
            postal_code: postal,
            province: null,
            city: null,
            address: null,
        }))
    }

    return (
        <Stack>
            <Stack
                sx={{
                    width: '100%',
                    marginBottom: '16px',
                }}
            >
                <ProfileUploader
                    user={users}
                    setUser={setUsers}
                />
            </Stack>

            <GridProducer
                sx={{marginBottom: '16px'}}
                data={[
                    ...(editMode
                        ? [
                              <CustomTextField
                                  key="id"
                                  name="id"
                                  setData={setUsers}
                                  resource={resource}
                                  label="شناسه"
                                  value={users.id ?? ''}
                                  disabled
                              />,
                          ]
                        : []),

                    <CustomTextField
                        key="first_name"
                        name="first_name"
                        setData={setUsers}
                        resource={resource}
                        label="نام"
                        value={users.first_name ?? ''}
                    />,

                    <CustomTextField
                        key="last_name"
                        name="last_name"
                        setData={setUsers}
                        resource={resource}
                        label="نام خانوادگی"
                        value={users.last_name ?? ''}
                    />,

                    <CustomTextField
                        key="phone"
                        name="phone"
                        setData={setUsers}
                        resource={resource}
                        label="شماره تماس"
                        value={users.phone ?? ''}
                    />,

                    <CustomTextField
                        key="email"
                        name="email"
                        setData={setUsers}
                        resource={resource}
                        label="ایمیل"
                        value={users.email ?? ''}
                    />,

                    <CustomTextField
                        key="national_code"
                        name="national_code"
                        setData={setUsers}
                        resource={resource}
                        label="کد ملی"
                        value={users.national_code ?? ''}
                        disabled={editMode}
                    />,

                    <DatePickerFilter
                        key="birth_date"
                        mode="controlled"
                        item={{
                            field: 'birth_date',
                            label: 'تاریخ تولد',
                        }}
                        value={users.birth_date ?? ''}
                        onChange={(value) =>
                            setUsers((prev) => ({
                                ...prev,
                                birth_date: value || null,
                            }))
                        }
                    />,

                    <CustomTextField
                        key="postal_code"
                        name="postal_code"
                        setData={setUsers}
                        resource={resource}
                        label="کد پستی"
                        value={users.postal_code ?? ''}
                        inputMode="numeric"
                        error={Boolean(postalError)}
                        helperText={postalError}
                        onChange={handlePostalChange}
                        sx={{
                            '& input': {
                                direction: 'ltr',
                                textAlign: 'right',
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        color="primary"
                                        aria-label="استعلام کد پستی"
                                        onClick={postalLookup}
                                        disabled={
                                            postalLoading ||
                                            !/^\d{10}$/.test(
                                                users.postal_code ?? '',
                                            )
                                        }
                                    >
                                        {postalLoading ? (
                                            <CircularProgress size={20} />
                                        ) : (
                                            <SearchIcon fontSize="small" />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />,

                    <CustomTextField
                        key="province"
                        name="province"
                        setData={setUsers}
                        resource={resource}
                        label="استان"
                        value={users.province ?? ''}
                        disabled
                    />,

                    <CustomTextField
                        key="city"
                        name="city"
                        setData={setUsers}
                        resource={resource}
                        label="شهر"
                        value={users.city ?? ''}
                        disabled
                    />,

                    <CustomTextField
                        key="address"
                        name="address"
                        setData={setUsers}
                        resource={resource}
                        label="آدرس"
                        value={users.address ?? ''}
                        multiline
                        minRows={2}
                        disabled
                    />,

                    <CustomSelectField
                        key="user_type"
                        name="user_type"
                        setData={setUsers}
                        resource={resource}
                        label="نوع کاربر"
                        value={users.user_type ?? ''}
                        options={[
                            {
                                key: 'consumer',
                                label: 'مصرف‌کننده',
                            },
                            {
                                key: 'investor',
                                label: 'سرمایه‌گذار',
                            },
                        ]}
                    />,

                    <CustomSelectField
                        key="account_status"
                        name="account_status"
                        setData={setUsers}
                        resource={resource}
                        label="وضعیت حساب"
                        value={users.account_status ?? ''}
                        options={[
                            {
                                key: 'active',
                                label: 'فعال',
                            },
                            {
                                key: 'inactive',
                                label: 'غیرفعال',
                            },
                            {
                                key: 'suspended',
                                label: 'مسدود',
                            },
                        ]}
                    />,

                    <CustomSelectField
                        key="verification_status"
                        name="verification_status"
                        setData={setUsers}
                        resource={resource}
                        label="وضعیت احراز هویت"
                        value={users.verification_status ?? ''}
                        options={[
                            {
                                key: 'not_started',
                                label: 'شروع نشده',
                            },
                            {
                                key: 'verified',
                                label: 'تأیید شده',
                            },
                            {
                                key: 'pending',
                                label: 'در انتظار بررسی',
                            },
                            {
                                key: 'rejected',
                                label: 'رد شده',
                            },
                            {
                                key: 'unverified',
                                label: 'تأیید نشده',
                            },
                        ]}
                    />,

                    ...(editMode
                        ? [
                              <CustomTextField
                                  key="phone_verified"
                                  name="phone_verified"
                                  setData={setUsers}
                                  resource={resource}
                                  label="تأیید شماره تماس"
                                  value={
                                      users.phone_verified
                                          ? 'تأیید شده'
                                          : 'تأیید نشده'
                                  }
                                  disabled
                              />,

                              <CustomTextField
                                  key="national_code_verified"
                                  name="national_code_verified"
                                  setData={setUsers}
                                  resource={resource}
                                  label="تأیید کد ملی"
                                  value={
                                      users.national_code_verified
                                          ? 'تأیید شده'
                                          : 'تأیید نشده'
                                  }
                                  disabled
                              />,

                              <CustomTextField
                                  key="role_display"
                                  name="role_display"
                                  setData={setUsers}
                                  resource={resource}
                                  label="نقش کاربر"
                                  value={users.role_display ?? ''}
                                  disabled
                              />,

                              <CustomTextField
                                  key="last_login"
                                  name="last_login"
                                  setData={setUsers}
                                  resource={resource}
                                  label="آخرین ورود"
                                  value={
                                      users.last_login
                                          ? formatDate(users.last_login)
                                          : ''
                                  }
                                  disabled
                              />,

                              <CustomTextField
                                  key="date_joined"
                                  name="date_joined"
                                  setData={setUsers}
                                  resource={resource}
                                  label="تاریخ ثبت‌نام"
                                  value={
                                      users.date_joined
                                          ? formatDate(users.date_joined)
                                          : ''
                                  }
                                  disabled
                              />,
                          ]
                        : []),
                ]}
            />
        </Stack>
    )
}
