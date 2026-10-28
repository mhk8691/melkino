import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import { Users, UsersType } from '../../User/Users'

const resource = 'users/?group=superadmin'

export function SuperUsersEdit() {
    const state = useLocation().state as {row: UsersType}
    const [superUsers, setSuperUsers] = useState(state.row)

    return (
        <EditPage
            resource={resource}
            title="جزئیات سوپر ادمین "
            formDetails={superUsers}
            initialData={state.row}
            isFormData={true}
            redirect={'/users/super-users'}
        >
            <Users
                users={superUsers}
                setUsers={setSuperUsers}
                resource={resource}
            />
        </EditPage>
    )
}
