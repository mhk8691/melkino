import {buildUserRequestData} from '../../User/UserRequestData'
import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {Expert, ExpertType} from '../Expert'

const resource = 'users'

export function ExpertEdit({title}: {title: string}) {
    const state = useLocation().state as {row: ExpertType}
    const [expert, setExpert] = useState(state.row)

    return (
        <EditPage
            resource={resource}
            title={title}
            formDetails={expert}
            initialData={state.row}
            isFormData={true}
            buildRequestData={(values: Record<string, unknown>) => buildUserRequestData(values, 'expert')}
            redirect={'users/expert'}
        >
            <Expert expert={expert} setExpert={setExpert} resource={resource} />
        </EditPage>
    )
}
