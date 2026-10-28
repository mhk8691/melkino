import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import { Expert } from '../Expert'

const resource = 'users/?group=expert'

export function ExpertCreate({
    data,
    setData,
    title,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
    title:string
}) {
    return (
        <CreatePage
            title={title}
            resource={resource + '/'}
            isFormData={true}
            redirect={resource}
            formDetails={data}
        >
            <Expert expert={data} setExpert={setData} resource={resource} />
        </CreatePage>
    )
}
