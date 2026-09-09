import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'

import {Users,UsersType} from '../Users'
const resource = 'user'

export function UsersEdit() {
    const state = useLocation().state as {row: UsersType}
    const [users, setUsers] = useState(state.row)

    return (
        <EditPage
            resource={resource}
            title="جزئیات کاربر "
            formDetails={users}
            initialData={state.row}
            isFormData={true}
        >
            <Users users={users} setUsers={setUsers} resource={resource} />
        </EditPage>
    )
}
