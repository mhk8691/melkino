
import { Stack } from '@mui/material'
import { CustomTextField } from '../../Components/Input/CustomTextField'
import { CustomSelectField } from '../../Components/Input/CustomSelectField'
import { GridProducer } from '../../Components/Table/GridProducer'
import type { Dispatch, SetStateAction } from 'react'
import DatePickerFilter from '../../Components/Filter/DatePicker'
import ProfileUploader from './ProfileUploader'

export interface UsersType {
    id: string

    phone: string
    email: string | null

    first_name: string
    last_name: string
    full_name: string

    national_code: string | null
    birth_date: string | null
    avatar: string | null

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

interface UsersProps {
    users: UsersType
    setUsers: Dispatch<SetStateAction<UsersType>>
    resource: string
}

export function Users({
    users,
    setUsers,
    resource,
}: UsersProps) {
    return (
        <Stack>
            {users && (
                <>
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
                        sx={{ marginBottom: '16px' }}
                        data={[
                            <CustomTextField
                                key="id"
                                name="id"
                                setData={setUsers}
                                resource={resource}
                                label="شناسه"
                                defaultValue={users.id}
                                disabled
                            />,

                            <CustomTextField
                                key="first_name"
                                name="first_name"
                                setData={setUsers}
                                resource={resource}
                                label="نام"
                                defaultValue={users.first_name}
                            />,

                            <CustomTextField
                                key="last_name"
                                name="last_name"
                                setData={setUsers}
                                resource={resource}
                                label="نام خانوادگی"
                                defaultValue={users.last_name}
                            />,

                            <CustomTextField
                                key="full_name"
                                name="full_name"
                                setData={setUsers}
                                resource={resource}
                                label="نام کامل"
                                defaultValue={users.full_name}
                                disabled
                            />,

                            <CustomTextField
                                key="phone"
                                name="phone"
                                setData={setUsers}
                                resource={resource}
                                label="شماره تماس"
                                defaultValue={users.phone}
                            />,

                            <CustomTextField
                                key="email"
                                name="email"
                                setData={setUsers}
                                resource={resource}
                                label="ایمیل"
                                defaultValue={users.email ?? ''}
                            />,

                            <CustomTextField
                                key="national_code"
                                name="national_code"
                                setData={setUsers}
                                resource={resource}
                                label="کد ملی"
                                defaultValue={users.national_code ?? ''}
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
                                key="province"
                                name="province"
                                setData={setUsers}
                                resource={resource}
                                label="استان"
                                defaultValue={users.province ?? ''}
                            />,

                            <CustomTextField
                                key="city"
                                name="city"
                                setData={setUsers}
                                resource={resource}
                                label="شهر"
                                defaultValue={users.city ?? ''}
                            />,

                            <CustomTextField
                                key="postal_code"
                                name="postal_code"
                                setData={setUsers}
                                resource={resource}
                                label="کد پستی"
                                defaultValue={users.postal_code ?? ''}
                            />,

                            <CustomTextField
                                key="address"
                                name="address"
                                setData={setUsers}
                                resource={resource}
                                label="آدرس"
                                defaultValue={users.address ?? ''}
                            />,

                            <CustomSelectField
                                key="user_type"
                                name="user_type"
                                setData={setUsers}
                                resource={resource}
                                label="نوع کاربر"
                                defaultValue={users.user_type}
                                options={[
                                    {
                                        label: 'مصرف‌کننده',
                                        value: 'consumer',
                                    },
                                    {
                                        label: 'سرمایه‌گذار',
                                        value: 'investor',
                                    },
                                ]}
                            />,

                            <CustomSelectField
                                key="role"
                                name="role"
                                setData={setUsers}
                                resource={resource}
                                label="نقش کاربر"
                                defaultValue={users.role}
                                options={[
                                    {
                                        label: 'سوپر ادمین',
                                        value: 'superadmin',
                                    },
                                    {
                                        label: 'کاربر عادی',
                                        value: 'user',
                                    },
                                ]}
                            />,

                            <CustomSelectField
                                key="account_status"
                                name="account_status"
                                setData={setUsers}
                                resource={resource}
                                label="وضعیت حساب"
                                defaultValue={users.account_status}
                                options={[
                                    {
                                        label: 'فعال',
                                        value: 'active',
                                    },
                                    {
                                        label: 'غیرفعال',
                                        value: 'inactive',
                                    },
                                    {
                                        label: 'مسدود',
                                        value: 'suspended',
                                    },
                                ]}
                            />,

                            <CustomSelectField
                                key="verification_status"
                                name="verification_status"
                                setData={setUsers}
                                resource={resource}
                                label="وضعیت احراز هویت"
                                defaultValue={users.verification_status}
                                options={[
                                    {
                                        label: 'تأیید شده',
                                        value: 'verified',
                                    },
                                    {
                                        label: 'در انتظار بررسی',
                                        value: 'pending',
                                    },
                                    {
                                        label: 'رد شده',
                                        value: 'rejected',
                                    },
                                    {
                                        label: 'تأیید نشده',
                                        value: 'unverified',
                                    },
                                ]}
                            />,

                            <CustomTextField
                                key="phone_verified"
                                name="phone_verified"
                                setData={setUsers}
                                resource={resource}
                                label="تأیید شماره تماس"
                                defaultValue={
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
                                defaultValue={
                                    users.national_code_verified
                                        ? 'تأیید شده'
                                        : 'تأیید نشده'
                                }
                                disabled
                            />,

                            <CustomTextField
                                key="admin_level"
                                name="admin_level"
                                setData={setUsers}
                                resource={resource}
                                label="سطح مدیریت"
                                defaultValue={users.admin_level ?? ''}
                                disabled
                            />,

                            <CustomTextField
                                key="last_login"
                                name="last_login"
                                setData={setUsers}
                                resource={resource}
                                label="آخرین ورود"
                                defaultValue={users.last_login ?? ''}
                                disabled
                            />,

                            <CustomTextField
                                key="date_joined"
                                name="date_joined"
                                setData={setUsers}
                                resource={resource}
                                label="تاریخ ثبت‌نام"
                                defaultValue={users.date_joined}
                                disabled
                            />,
                        ]}
                    />
                </>
            )}
        </Stack>
    )
}
