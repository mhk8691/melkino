import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {Announcement} from '../Announcement'

const resource = 'announcements'

export function AnnouncementCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage
            title={'افزودن اطلاعیه'}
            resource={resource + '/'}
            isFormData={false}
            redirect="announcements"
            formDetails={data}
        >
            <Announcement
                announcement={data}
                setAnnouncement={setData}
                resource={resource}
                editMode={false}
            />
        </CreatePage>
    )
}