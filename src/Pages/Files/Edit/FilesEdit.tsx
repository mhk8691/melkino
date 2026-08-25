import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import { Files, PropertyType } from '../Files'

const resource = 'files'

export function FilesEdit() {
    const state = useLocation().state as {row: PropertyType}
    const [property, setProperty] = useState(state.row)

    return (
        <EditPage
            resource={resource}
            title="جزئیات فایل"
            formDetails={property}
            initialData={state.row}
            isFormData={true}
        >
            <Files property={property} setProperty={setProperty} resource={resource}  />
        </EditPage>
    )
}
