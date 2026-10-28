import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {Agency} from '../Agency'

const resource = 'users/?group=expert'

export function AgencyCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage
            title={'افزودن املاکی'}
            resource={resource + '/'}
            isFormData={true}
            redirect={resource}
            formDetails={data}
        >
            <Agency agency={data} setAgency={setData} resource={resource} editMode={false} />
        </CreatePage>
    )
}
