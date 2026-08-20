import { Stack} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import { GridProducer } from '../../Components/Table/GridProducer'

export type AnnouncementType = {
    id: number
    title: string
    description: string
    link:string
}

export function Announcement({
    announcement,
    setAnnouncement,
    resource,
}: {
    announcement: AnnouncementType
    setAnnouncement: React.Dispatch<React.SetStateAction<AnnouncementType>>
    resource:string
}) {


   
    return (
        <Stack>
            {announcement && (
                <GridProducer
                    sx={{marginBottom: '16px'}}
                    data={[

                        <CustomTextField
                            name="title"
                            setData={setAnnouncement}
                            resource={resource}
                            label={'عنوان'}
                            defaultValue={announcement.title}
                        />,
<CustomTextField
                            name="description"
                            setData={setAnnouncement}
                            resource={resource}
                            label={'توضیحات'}
                            defaultValue={announcement.description}
                        />,
                        <CustomTextField
                            name="link"
                            setData={setAnnouncement}
                            resource={resource}
                            label={'لینک'}
                            defaultValue={announcement.link}
                        />,
                   
                       
                    ]}
                />
            )}
          
        </Stack>
    )
}
