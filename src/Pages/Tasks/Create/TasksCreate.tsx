import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import { Tasks } from '../Tasks'

const resource = 'tasks'

export function TasksCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage
            title={'افزودن تسک'}
            resource={resource + '/'}
            isFormData={true}
            redirect={resource}
            formDetails={data}
        >
            <Tasks tasks={data} setTasks={setData} resource={resource} />
        </CreatePage>
    )
}
