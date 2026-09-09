import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'

import {Agency, AgencyType} from '../Agency'
const resource = 'agencies'

export function AgencyEdit() {
    const state = useLocation().state as {row: AgencyType}
    const [agency, setAgency] = useState(state.row)

    return (
        <EditPage
            resource={resource}
            title="جزئیات املاک "
            formDetails={agency}
            initialData={state.row}
            isFormData={true}
        >
            <Agency agency={agency} setAgency={setAgency} resource={resource} editMode />
        </EditPage>
    )
}
