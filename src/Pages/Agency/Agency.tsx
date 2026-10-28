
import {Stack, FormControlLabel, Switch} from '@mui/material'
import type {Dispatch, SetStateAction} from 'react'

import {CustomTextField} from '../../Components/Input/CustomTextField'
import {CustomSelectField} from '../../Components/Input/CustomSelectField'
import {GridProducer} from '../../Components/Table/GridProducer'
import { formatDate } from '../../Core/FormatDate'

export interface AgencyType {
    id: number
    phone: string
    email: string | null
    first_name: string
    last_name: string
    full_name: string
    role: string
    role_display: string
    user_type: 'consumer' | 'investor'
    user_type_display: string
    account_status: 'active' | 'inactive' | 'suspended'
    account_status_display: string
    verification_status:
        | 'not_started'
        | 'verified'
        | 'pending'
        | 'rejected'
        | 'unverified'
    phone_verified: boolean
    national_code_verified: boolean
    is_active: boolean
    has_profile: boolean
    date_joined: string
    last_login: string 
}

interface AgencyProps {
    agency: AgencyType
    setAgency: Dispatch<SetStateAction<AgencyType>>
    resource: string
    editMode?: boolean
}

export function Agency({
    agency,
    setAgency,
    resource,
    editMode = false,
}: AgencyProps) {
    return (
        <Stack>
            <GridProducer
                sx={{marginBottom: '16px'}}
                data={[
                    <CustomTextField
                        key="id"
                        name="id"
                        setData={setAgency}
                        resource={resource}
                        label="شناسه"
                        value={agency.id ?? ''}
                        disabled
                    />,

                    <CustomTextField
                        key="first_name"
                        name="first_name"
                        setData={setAgency}
                        resource={resource}
                        label="نام"
                        value={agency.first_name ?? ''}
                        disabled={!editMode}
                    />,

                    <CustomTextField
                        key="last_name"
                        name="last_name"
                        setData={setAgency}
                        resource={resource}
                        label="نام خانوادگی"
                        value={agency.last_name ?? ''}
                        disabled={!editMode}
                    />,

                    <CustomTextField
                        key="full_name"
                        name="full_name"
                        setData={setAgency}
                        resource={resource}
                        label="نام کامل"
                        value={agency.full_name ?? ''}
                        disabled
                    />,

                    <CustomTextField
                        key="phone"
                        name="phone"
                        setData={setAgency}
                        resource={resource}
                        label="شماره تماس"
                        value={agency.phone ?? ''}
                        disabled={!editMode}
                    />,

                    <CustomTextField
                        key="email"
                        name="email"
                        setData={setAgency}
                        resource={resource}
                        label="ایمیل"
                        value={agency.email ?? ''}
                        disabled={!editMode}
                    />,

                    <CustomTextField
                        key="role"
                        name="role"
                        setData={setAgency}
                        resource={resource}
                        label="نقش"
                        value={agency.role_display ?? agency.role ?? ''}
                        disabled
                    />,

                    <CustomSelectField
                        key="user_type"
                        name="user_type"
                        setData={setAgency}
                        resource={resource}
                        label="نوع کاربر"
                        value={agency.user_type ?? ''}
                        disabled={!editMode}
                        options={[
                            {key: 'consumer', label: 'مصرف‌کننده'},
                            {key: 'investor', label: 'سرمایه‌گذار'},
                        ]}
                    />,

                    <CustomSelectField
                        key="account_status"
                        name="account_status"
                        setData={setAgency}
                        resource={resource}
                        label="وضعیت حساب"
                        value={agency.account_status ?? ''}
                        disabled={!editMode}
                        options={[
                            {key: 'active', label: 'فعال'},
                            {key: 'inactive', label: 'غیرفعال'},
                            {key: 'suspended', label: 'مسدود'},
                        ]}
                    />,

                    <CustomSelectField
                        key="verification_status"
                        name="verification_status"
                        setData={setAgency}
                        resource={resource}
                        label="وضعیت احراز هویت"
                        value={agency.verification_status ?? ''}
                        disabled={!editMode}
                        options={[
                            {key: 'not_started', label: 'شروع نشده'},
                            {key: 'pending', label: 'در انتظار بررسی'},
                            {key: 'verified', label: 'تأیید شده'},
                            {key: 'rejected', label: 'رد شده'},
                            {key: 'unverified', label: 'تأیید نشده'},
                        ]}
                    />,

                    <FormControlLabel
                        key="phone_verified"
                        label="شماره تماس تأیید شده"
                        control={
                            <Switch
                                checked={agency.phone_verified ?? false}
                                disabled
                            />
                        }
                    />,

                    <FormControlLabel
                        key="national_code_verified"
                        label="کد ملی تأیید شده"
                        control={
                            <Switch
                                checked={agency.national_code_verified ?? false}
                                disabled
                            />
                        }
                    />,

                    <FormControlLabel
                        key="is_active"
                        label="حساب فعال"
                        control={
                            <Switch
                                checked={agency.is_active ?? false}
                                disabled
                            />
                        }
                    />,

                    <FormControlLabel
                        key="has_profile"
                        label="پروفایل تکمیل شده"
                        control={
                            <Switch
                                checked={agency.has_profile ?? false}
                                disabled
                            />
                        }
                    />,

                    <CustomTextField
                        key="date_joined"
                        name="date_joined"
                        setData={setAgency}
                        resource={resource}
                        label="تاریخ ثبت‌نام"
                        value={formatDate(agency.date_joined) ?? ''}
                        disabled
                    />,

                    <CustomTextField
                        key="last_login"
                        name="last_login"
                        setData={setAgency}
                        resource={resource}
                        label="آخرین ورود"
                        value={formatDate(agency.last_login) ?? ''}
                        disabled
                    />,
                ]}
            />
        </Stack>
    )
}
