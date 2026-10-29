import {useSelector} from 'react-redux'
import {selectIsSuperAdmin} from '../../../redux/RoleSlice'
import {buildUserRequestData, isAgencyValid} from '../../User/UserRequestData'
import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'

import {Agency, AgencyType} from '../Agency'
const resource = 'users'
export function AgencyEdit() {
    const isSuperAdmin = useSelector(selectIsSuperAdmin)
    const state = useLocation().state as {row: AgencyType}
    const [agency, setAgency] = useState(state.row)

    return (
        <EditPage
            resource={resource}
            title="جزئیات املاک "
            formDetails={agency}
            initialData={state.row}
            isFormData={true}
            buildRequestData={(values: Record<string, unknown>) => buildUserRequestData(values, 'agency', isSuperAdmin)}
            disabled={!isAgencyValid(agency)}
            redirect={'users/agencies'}
        >
            <Agency agency={agency} setAgency={setAgency} resource={resource} editMode />
        </EditPage>
    )
}
