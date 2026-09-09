import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {Agents, AgentsType} from '../Agents'

const resource = 'agents'

export function AgentsEdit({title,resource}: {title: string,resource:string}) {
    const state = useLocation().state as {row: AgentsType}
    const [agents, setAgents] = useState(state.row)

    return (
        <EditPage
            resource={resource}
            title={title}
            formDetails={agents}
            initialData={state.row}
            isFormData={true}
        >
            <Agents agents={agents} setAgents={setAgents} resource={resource} />
        </EditPage>
    )
}
