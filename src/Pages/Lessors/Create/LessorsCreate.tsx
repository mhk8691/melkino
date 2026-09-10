import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {Lessors} from '../Lessors'

const resource = 'lessors'

export function LessorsCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage
            title={'افزودن موجر'}
            resource={resource + '/'}
            isFormData={true}
            redirect={'landlord-tenant/lessors'}
            formDetails={data}
        >
            <Lessors lessors={data} setLessors={setData} resource={resource} />
        </CreatePage>
    )
}
