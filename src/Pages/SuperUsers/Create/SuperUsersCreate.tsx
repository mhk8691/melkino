import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import { Users } from '../../User/Users'

const resource = 'users/?group=superadmin'

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
            
            redirect={'/users/super-users'}
            formDetails={data}
        >
            <Users users={data} setUsers={setData} resource={resource} editMode={false} />
        </CreatePage>
    )
}
