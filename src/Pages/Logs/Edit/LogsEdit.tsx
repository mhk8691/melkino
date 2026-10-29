import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import { Logs, LogsType } from '../Logs'

const resource = 'activity-logs'

export function LogsEdit() {
    const state = useLocation().state as {row: LogsType}
    const [logs, setLogs] = useState(state.row)

    return (
        <EditPage
            resource={resource}
            title="جزئیات تسک"
            formDetails={logs}
            initialData={state.row}
            isFormData={true}
            redirect={'logs'}
        >
            <Logs
                logs={logs}
                setLogs={setLogs}
                resource={resource}
                
            />
        </EditPage>
    )
}
