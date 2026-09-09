import {Stack} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import type {Dispatch, SetStateAction} from 'react'
import ProfileUploader from '../Users/ProfileUploader'

export interface SuperUsersType {
    id: string
    firstName: string
    lastName: string
    phoneNumber: string
    profileImage?: string | null
    createdAt?: string
    updatedAt?: string
    role: string
}

export function SuperUsers({
    superUsers,
    setSuperUsers,
    resource,
}: {
    superUsers: SuperUsersType
    setSuperUsers: Dispatch<SetStateAction<SuperUsersType>>
    resource: string
}) {
    return (
        <Stack>
            {superUsers && (
                <>
                    {/* سطر اول: تصویر پروفایل */}
                    <Stack
                        sx={{
                            width: '100%',
                            marginBottom: '16px',
                        }}
                    >
                        <ProfileUploader
                            user={superUsers}
                            setUser={setSuperUsers}
                        />
                    </Stack>

                    {/* سطر دوم به بعد: فیلدها */}
                    <GridProducer
                        sx={{marginBottom: '16px'}}
                        data={[
                            <CustomTextField
                                name="id"
                                setData={setSuperUsers}
                                resource={resource}
                                label="شناسه"
                                defaultValue={superUsers.id}
                                disabled
                            />,

                            <CustomTextField
                                name="firstName"
                                setData={setSuperUsers}
                                resource={resource}
                                label="نام"
                                defaultValue={superUsers.firstName}
                            />,

                            <CustomTextField
                                name="lastName"
                                setData={setSuperUsers}
                                resource={resource}
                                label="نام خانوادگی"
                                defaultValue={superUsers.lastName}
                            />,

                            <CustomTextField
                                name="phoneNumber"
                                setData={setSuperUsers}
                                resource={resource}
                                label="شماره تلفن"
                                defaultValue={superUsers.phoneNumber}
                            />,

                            <CustomTextField
                                name="createdAt"
                                setData={setSuperUsers}
                                resource={resource}
                                label="تاریخ ایجاد"
                                defaultValue={superUsers.createdAt || ''}
                                disabled
                            />,

                            <CustomTextField
                                name="updatedAt"
                                setData={setSuperUsers}
                                resource={resource}
                                label="آخرین بروزرسانی"
                                defaultValue={superUsers.updatedAt || ''}
                                disabled
                            />,

                            <CustomTextField
                                name="role"
                                setData={setSuperUsers}
                                resource={resource}
                                label="نقش"
                                defaultValue={superUsers.role}
                                disabled
                            />,
                        ]}
                    />
                </>
            )}
        </Stack>
    )
}
