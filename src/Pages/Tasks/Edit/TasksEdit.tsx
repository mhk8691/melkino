import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'

import {Tasks, TasksType} from '../Tasks'
const resource = 'tasks'

export function TasksEdit() {
    const state = useLocation().state as {row: TasksType}
    const [tasks, setTasks] = useState(state.row)

    return (
        <EditPage
            resource={resource}
            title="جزئیات تسک"
            formDetails={tasks}
            initialData={state.row}
            isFormData={true}
        >
            <Tasks
                tasks={tasks}
                setTasks={setTasks}
                resource={resource}
                editMode
            />
        </EditPage>
    )
}
