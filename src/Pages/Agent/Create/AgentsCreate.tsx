import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import { Agents } from '../Agents'

const resource = 'agents'

export function AgentsCreate({
    data,
    setData,
    title,
    resource
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
    title:string
    resource:string
}) {
    return (
        <CreatePage
            title={title}
            resource={resource + '/'}
            isFormData={true}
            redirect={resource}
            formDetails={data}
        >
            <Agents agents={data} setAgents={setData} resource={resource} />
        </CreatePage>
    )
}
