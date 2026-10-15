import {Stack} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import type {Dispatch, SetStateAction} from 'react'
import DatePickerFilter from '../../Components/Filter/DatePicker'
import ProfileUploader from './ProfileUploader'

export interface UsersType {
    id: string

    firstName: string
    lastName: string
    phoneNumber: string

    nationalId: string
    birthDate?: string | null

    city: string
    address: string

    profileImage?: string | null

    createdAt?: string
    updatedAt?: string
    role: string
}

export function Users({
    users,
    setUsers,
    resource,
}: {
    users: UsersType
    setUsers: Dispatch<SetStateAction<UsersType>>
    resource: string
}) {
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
                        <ProfileUploader user={users} setUser={setUsers} />
                    </Stack>

                    <GridProducer
                        sx={{marginBottom: '16px'}}
                        data={[
                            <CustomTextField
                                name="id"
                                setData={setUsers}
                                resource={resource}
                                label="شناسه"
                                defaultValue={users.id}
                                disabled
                            />,

                            <CustomTextField
                                name="firstName"
                                setData={setUsers}
                                resource={resource}
                                label="نام"
                                defaultValue={users.firstName}
                            />,

                            <CustomTextField
                                name="lastName"
                                setData={setUsers}
                                resource={resource}
                                label="نام خانوادگی"
                                defaultValue={users.lastName}
                            />,

                            <CustomTextField
                                name="phoneNumber"
                                setData={setUsers}
                                resource={resource}
                                label="شماره تماس"
                                defaultValue={users.phoneNumber}
                            />,

                            <CustomTextField
                                name="nationalId"
                                setData={setUsers}
                                resource={resource}
                                label="کد ملی"
                                defaultValue={users.nationalId}
                            />,

                            <DatePickerFilter
                                key="birthDate"
                                mode="controlled"
                                item={{
                                    label: 'تاریخ تولد',
                                }}
                                value={users.birthDate || ''}
                                onChange={(value) =>
                                    setUsers((prev) => ({
                                        ...prev,
                                        birthDate: value ?? '',
                                    }))
                                }
                            />,

                            <CustomTextField
                                name="city"
                                setData={setUsers}
                                resource={resource}
                                label="شهر"
                                defaultValue={users.city}
                            />,

                            <CustomTextField
                                name="address"
                                setData={setUsers}
                                resource={resource}
                                label="آدرس"
                                defaultValue={users.address}
                            />,

                            <CustomTextField
                                name="createdAt"
                                setData={setUsers}
                                resource={resource}
                                label="تاریخ ثبت نام"
                                defaultValue={users.createdAt || ''}
                                disabled
                            />,

                            <CustomTextField
                                name="updatedAt"
                                setData={setUsers}
                                resource={resource}
                                label="آخرین بروزرسانی"
                                defaultValue={users.updatedAt || ''}
                                disabled
                            />,

                            <CustomTextField
                                name="role"
                                setData={setUsers}
                                resource={resource}
                                label="نقش"
                                defaultValue={users.role}
                                disabled
                            />,
                        ]}
                    />
                </>
            )}
        </Stack>
    )
}
