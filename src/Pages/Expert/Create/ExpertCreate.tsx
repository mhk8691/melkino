import {expertDefaults} from '../Expert'
import {buildUserRequestData} from '../../User/UserRequestData'
import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import { Expert } from '../Expert'

const resource = 'users'

export function ExpertCreate({
    data,
    setData,
    title,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
    title:string
}) {
    const formValues = {...expertDefaults, ...data, role: expertDefaults.role}
    return (
        <CreatePage
            title={title}
            resource={resource + '/'}
            isFormData={true}
            buildRequestData={(values: Record<string, unknown>) => buildUserRequestData(values, 'expert')}
            redirect={'users/expert'}
            formDetails={formValues}
        >
            <Expert expert={formValues} setExpert={setData} resource={resource} editMode={false} />
        </CreatePage>
    )
}
