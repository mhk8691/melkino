import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import { Reminder, ReminderType } from '../Reminder'

const resource = 'reminders'

export function ReminderEdit() {
    const state = useLocation().state as {row: ReminderType}
    const [reminders, setReminders] = useState(state.row)

    return (
        <EditPage
            resource={resource}
            title="جزئیات یادآوری"
            formDetails={reminders}
            initialData={state.row}
            isFormData={true}
        >
            <Reminder
            editMode
                reminders={reminders}
                setReminders={setReminders}
                resource={resource}
            />
        </EditPage>
    )
}
