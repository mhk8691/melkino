import {Stack} from '@mui/material'
import type {Dispatch, SetStateAction} from 'react'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import DatePickerFilter from '../../Components/Filter/DatePicker'
import ProfileUploader from '../User/ProfileUploader'

export interface AgentsType {
    id: string
    firstName: string
    lastName: string
    phoneNumber: string
    profileImage?: string | null
    createdAt?: string
    updatedAt?: string
    role: 'real_estate_agent' | 'accountant' | 'secretary'
    agencyId: string
    agencyName: string
    homeAddress: string
    workAddress: string
    registrationData: Record<string, unknown>
}

export function Agents({
    agents,
    setAgents,
    resource,
}: {
    agents: AgentsType
    setAgents: Dispatch<SetStateAction<AgentsType>>
    resource: string
}) {
    return (
        <Stack>
            {agents && (
                <>
                    <Stack
                        sx={{
                            width: '100%',
                            marginBottom: '16px',
                        }}
                    >
                        <ProfileUploader user={agents} setUser={setAgents} />
                    </Stack>

                    <GridProducer
                        sx={{marginBottom: '16px'}}
                        data={[
                            <CustomTextField
                                name="id"
                                setData={setAgents}
                                resource={resource}
                                label="شناسه"
                                defaultValue={agents.id}
                                disabled
                            />,
                            <CustomTextField
                                name="agencyId"
                                setData={setAgents}
                                resource={resource}
                                label="شناسه املاکی"
                                defaultValue={agents.agencyId}
                                disabled
                            />,
                            <CustomTextField
                                name="agencyName"
                                setData={setAgents}
                                resource={resource}
                                label="نام املاکی"
                                defaultValue={agents.agencyName}
                                disabled
                            />,
                            <CustomTextField
                                name="firstName"
                                setData={setAgents}
                                resource={resource}
                                label="نام"
                                defaultValue={agents.firstName}
                            />,
                            <CustomTextField
                                name="lastName"
                                setData={setAgents}
                                resource={resource}
                                label="نام خانوادگی"
                                defaultValue={agents.lastName}
                            />,
                            <CustomTextField
                                name="phoneNumber"
                                setData={setAgents}
                                resource={resource}
                                label="شماره تلفن"
                                defaultValue={agents.phoneNumber}
                            />,
                            <CustomTextField
                                name="homeAddress"
                                setData={setAgents}
                                resource={resource}
                                label="آدرس منزل"
                                defaultValue={agents.homeAddress}
                            />,
                            <CustomTextField
                                name="workAddress"
                                setData={setAgents}
                                resource={resource}
                                label="آدرس محل کار"
                                defaultValue={agents.workAddress}
                            />,
                            <CustomTextField
                                name="createdAt"
                                setData={setAgents}
                                resource={resource}
                                label="تاریخ ایجاد"
                                defaultValue={agents.createdAt || ''}
                                disabled
                            />,
                            <CustomTextField
                                name="updatedAt"
                                setData={setAgents}
                                resource={resource}
                                label="آخرین بروزرسانی"
                                defaultValue={agents.updatedAt || ''}
                                disabled
                            />,
                            <CustomTextField
                                name="role"
                                setData={setAgents}
                                resource={resource}
                                label="نقش"
                                defaultValue={agents.role}
                                disabled
                            />,
                            <DatePickerFilter
                                key="createdAt"
                                mode="controlled"
                                item={{
                                    label: 'تاریخ ایجاد',
                                }}
                                value={agents.createdAt || ''}
                                onChange={() => {}}
                            />,
                        ]}
                    />
                </>
            )}
        </Stack>
    )
}
