import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {SuperUsers} from '../SuperUsers'

const resource = 'super-users'

export function SuperUsersCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage
            title={'افزودن سوپر ادمین'}
            resource={resource + '/'}
            isFormData={true}
            redirect={resource}
            formDetails={data}
        >
            <SuperUsers superUsers={data} setSuperUsers={setData} resource={resource} />
        </CreatePage>
    )
}
