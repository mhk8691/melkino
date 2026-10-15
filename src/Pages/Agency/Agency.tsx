import {Stack} from '@mui/material'
import type {Dispatch, SetStateAction} from 'react'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {CustomSelectField} from '../../Components/Input/CustomSelectField'
import {GridProducer} from '../../Components/Table/GridProducer'
import DatePickerFilter from '../../Components/Filter/DatePicker'
import ProfileUploader from '../User/ProfileUploader'
import {toSelectOptions} from '../../Components/PropertyRecordForm/utils'

export interface AgencyType {
    id: string
    firstName: string
    lastName: string
    phoneNumber: string
    profileImage?: string | null
    createdAt?: string
    updatedAt?: string
    role: string
    agencyName: string
    city: string
    province: string
    officeAddress: string
    licenseStatus: 'active' | 'inactive'
    activeExpertCount: number
    maritalStatus: 'married' | 'single'
    officePropertyStatus: 'owner' | 'tenant'
    leaseEndDate?: string | null
    logo?: string | null
    managerImage?: string | null
    registrationData: Record<string, unknown>
}

export function Agency({
    agency,
    setAgency,
    resource,
    editMode = false,
}: {
    agency: AgencyType
    setAgency: Dispatch<SetStateAction<AgencyType>>
    resource: string
    editMode?: boolean
}) {
    return (
        <Stack>
            {agency && (
                <>
                    <Stack
                        sx={{
                            width: '100%',
                            marginBottom: '16px',
                        }}
                    >
                        <ProfileUploader user={agency} setUser={setAgency} />
                    </Stack>

                    <GridProducer
                        sx={{marginBottom: '16px'}}
                        data={[
                            <CustomTextField
                                name="id"
                                setData={setAgency}
                                resource={resource}
                                label="شناسه"
                                defaultValue={agency.id}
                                disabled
                            />,
                            <CustomTextField
                                name="agencyName"
                                setData={setAgency}
                                resource={resource}
                                label="نام املاکی"
                                defaultValue={agency.agencyName}
                            />,
                            <CustomTextField
                                name="firstName"
                                setData={setAgency}
                                resource={resource}
                                label="نام مدیر"
                                defaultValue={agency.firstName}
                            />,
                            <CustomTextField
                                name="lastName"
                                setData={setAgency}
                                resource={resource}
                                label="نام خانوادگی مدیر"
                                defaultValue={agency.lastName}
                            />,
                            <CustomTextField
                                name="phoneNumber"
                                setData={setAgency}
                                resource={resource}
                                label="شماره تلفن"
                                defaultValue={agency.phoneNumber}
                            />,
                            <CustomTextField
                                name="province"
                                setData={setAgency}
                                resource={resource}
                                label="استان"
                                defaultValue={agency.province || ''}
                            />,
                            <CustomTextField
                                name="city"
                                setData={setAgency}
                                resource={resource}
                                label="شهر"
                                defaultValue={agency.city || ''}
                            />,
                            <CustomTextField
                                name="officeAddress"
                                setData={setAgency}
                                resource={resource}
                                label="آدرس"
                                defaultValue={agency.officeAddress || ''}
                            />,
                            <CustomSelectField
                                key="licenseStatus"
                                name="licenseStatus"
                                setData={setAgency}
                                resource={resource}
                                label="وضعیت پروانه"
                                defaultValue={agency.licenseStatus}
                                options={toSelectOptions(['فعال', 'غیرفعال'])}
                            />,
                            <CustomTextField
                                name="activeExpertCount"
                                setData={setAgency}
                                resource={resource}
                                label="تعداد کارشناسان فعال"
                                defaultValue={String(agency.activeExpertCount ?? 0)}
                                disabled
                            />,
                            <DatePickerFilter
                                key="leaseEndDate"
                                mode="controlled"
                                item={{
                                    label: 'تاریخ پایان اجاره',
                                }}
                                value={agency.leaseEndDate || ''}
                                onChange={(value) =>
                                    setAgency((prev) => ({
                                        ...prev,
                                        leaseEndDate: value ?? '',
                                    }))
                                }
                            />,
                            <CustomTextField
                                name="createdAt"
                                setData={setAgency}
                                resource={resource}
                                label="تاریخ ایجاد"
                                defaultValue={agency.createdAt || ''}
                                disabled
                            />,
                            <CustomTextField
                                name="updatedAt"
                                setData={setAgency}
                                resource={resource}
                                label="آخرین بروزرسانی"
                                defaultValue={agency.updatedAt || ''}
                                disabled
                            />,
                            <CustomTextField
                                name="role"
                                setData={setAgency}
                                resource={resource}
                                label="نقش"
                                defaultValue={agency.role}
                                disabled
                            />,
                        ]}
                    />
                </>
            )}
        </Stack>
    )
}
