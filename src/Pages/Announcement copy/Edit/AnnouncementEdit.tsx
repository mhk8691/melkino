import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'

import { Announcement, AnnouncementType } from '../Announcement'
const resource = 'announcements'

export function AnnouncementEdit() {
    const state = useLocation().state as {row: AnnouncementType}
    const [announcement, setAnnouncement] = useState(state.row)

    return (
        <EditPage
            resource={resource}
            title="جزئیات اطلاعیه"
            formDetails={announcement}
            initialData={state.row}
            isFormData={true}
        >
            <Announcement announcement={announcement} setAnnouncement={setAnnouncement} resource={resource}  />
        </EditPage>
    )
}
