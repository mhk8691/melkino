import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'

import {SuperUsers, SuperUsersType} from '../SuperUsers'
const resource = 'super-users'

export function SuperUsersEdit() {
    const state = useLocation().state as {row: SuperUsersType}
    const [superUsers, setSuperUsers] = useState(state.row)

    return (
        <EditPage
            resource={resource}
            title="جزئیات سوپر ادمین "
            formDetails={superUsers}
            initialData={state.row}
            isFormData={true}
        >
            <SuperUsers
                superUsers={superUsers}
                setSuperUsers={setSuperUsers}
                resource={resource}
            />
        </EditPage>
    )
}
