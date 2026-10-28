import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {Expert, ExpertType} from '../Expert'

const resource = 'users/?group=expert'

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
        >
            <Expert expert={expert} setExpert={setExpert} resource={resource} />
        </EditPage>
    )
}
