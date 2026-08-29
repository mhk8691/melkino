import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {Reminder} from '../Reminder'

const resource = 'reminders'

export function ReminderCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage
            title={'افزودن یادآوری'}
            resource={resource + '/'}
            isFormData={true}
            redirect={resource}
            formDetails={data}
        >
            <Reminder reminders={data} setReminders={setData} resource={resource} />
        </CreatePage>
    )
}
