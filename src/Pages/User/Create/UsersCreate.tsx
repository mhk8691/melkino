import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import { Users } from '../Users'

const resource = 'users/?group=user'

export function UsersCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage
            title={'افزودن کاربر عادی'}
            resource={resource + '/'}
            isFormData={true}
            redirect={'/users/user'}
            formDetails={data}
            
        >
            <Users users={data} setUsers={setData} resource={resource} editMode={false} />
        </CreatePage>
    )
}
