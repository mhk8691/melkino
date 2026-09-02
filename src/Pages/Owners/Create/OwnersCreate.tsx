import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import { Owners} from '../Owners'

const resource = 'owners'

export function OwnersCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage
            title={'افزودن مالک'}
            resource={resource + '/'}
            isFormData={true}
            redirect={resource}
            formDetails={data}
        >
            <Owners owners={data} setOwners={setData} resource={resource} />
        </CreatePage>
    )
}
