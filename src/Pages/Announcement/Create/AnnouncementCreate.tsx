import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import { Announcement } from '../Announcement'

const resource = 'announcement'

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
            isFormData={true}
            redirect={resource}
            formDetails={data}
        >
            <Announcement announcement={data} setAnnouncement={setData} resource={resource} />
        </CreatePage>
    )
}
