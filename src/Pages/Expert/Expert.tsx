import {Stack} from '@mui/material'
import type {Dispatch, SetStateAction} from 'react'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import DatePickerFilter from '../../Components/Filter/DatePicker'
import ProfileUploader from '../User/ProfileUploader'

export interface ExpertType {
    id: string
    firstName: string
    lastName: string
    phoneNumber: string
    profileImage?: string | null
    createdAt?: string
    updatedAt?: string
    role: 'real_estate_expert' | 'accountant' | 'secretary'
    agencyId: string
    agencyName: string
    homeAddress: string
    workAddress: string
    registrationData: Record<string, unknown>
}

export function Expert({
    expert,
    setExpert,
    resource,
}: {
    expert: ExpertType
    setExpert: Dispatch<SetStateAction<ExpertType>>
    resource: string
}) {
    return (
        <Stack>
            {expert && (
                <>
                    {/* <Stack
                        sx={{
                            width: '100%',
                            marginBottom: '16px',
                        }}
                    >
                        <ProfileUploader user={expert} setUser={setExpert} />
                    </Stack> */}

                    <GridProducer
                        sx={{marginBottom: '16px'}}
                        data={[
                            <CustomTextField
                                name="id"
                                setData={setExpert}
                                resource={resource}
                                label="شناسه"
                                defaultValue={expert.id}
                                disabled
                            />,
                            <CustomTextField
                                name="agencyId"
                                setData={setExpert}
                                resource={resource}
                                label="شناسه املاکی"
                                defaultValue={expert.agencyId}
                                disabled
                            />,
                            <CustomTextField
                                name="agencyName"
                                setData={setExpert}
                                resource={resource}
                                label="نام املاکی"
                                defaultValue={expert.agencyName}
                                disabled
                            />,
                            <CustomTextField
                                name="firstName"
                                setData={setExpert}
                                resource={resource}
                                label="نام"
                                defaultValue={expert.firstName}
                            />,
                            <CustomTextField
                                name="lastName"
                                setData={setExpert}
                                resource={resource}
                                label="نام خانوادگی"
                                defaultValue={expert.lastName}
                            />,
                            <CustomTextField
                                name="phoneNumber"
                                setData={setExpert}
                                resource={resource}
                                label="شماره تلفن"
                                defaultValue={expert.phoneNumber}
                            />,
                            <CustomTextField
                                name="homeAddress"
                                setData={setExpert}
                                resource={resource}
                                label="آدرس منزل"
                                defaultValue={expert.homeAddress}
                            />,
                            <CustomTextField
                                name="workAddress"
                                setData={setExpert}
                                resource={resource}
                                label="آدرس محل کار"
                                defaultValue={expert.workAddress}
                            />,
                            <CustomTextField
                                name="createdAt"
                                setData={setExpert}
                                resource={resource}
                                label="تاریخ ایجاد"
                                defaultValue={expert.createdAt || ''}
                                disabled
                            />,
                            <CustomTextField
                                name="updatedAt"
                                setData={setExpert}
                                resource={resource}
                                label="آخرین بروزرسانی"
                                defaultValue={expert.updatedAt || ''}
                                disabled
                            />,
                            <CustomTextField
                                name="role"
                                setData={setExpert}
                                resource={resource}
                                label="نقش"
                                defaultValue={expert.role}
                                disabled
                            />,
                            <DatePickerFilter
                                key="createdAt"
                                mode="controlled"
                                item={{
                                    label: 'تاریخ ایجاد',
                                }}
                                value={expert.createdAt || ''}
                                onChange={() => {}}
                            />,
                        ]}
                    />
                </>
            )}
        </Stack>
    )
}
