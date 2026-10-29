import {buildUserRequestData} from '../../User/UserRequestData'
import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import type {SuperUserType as UsersType} from '../SuperUsers'
import { SuperUser } from '../SuperUsers'

const resource = 'users'

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
            buildRequestData={(values: Record<string, unknown>) => buildUserRequestData(values, 'superadmin')}
            redirect={'users/super-users'}
        >
            <SuperUser
                users={superUsers}
                setUsers={setSuperUsers}
                resource={resource}
            />
        </EditPage>
    )
}
