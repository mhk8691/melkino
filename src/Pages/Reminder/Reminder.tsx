import {Stack} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import {DateFilter} from '../../Components/Input/DateFilter'

export type ReminderType = {
    id: number
    title: string
    description: string
    date: string
}

export function Reminder({
    reminders,
    setReminders,
    resource,
}: {
    reminders: ReminderType
    setReminders: React.Dispatch<React.SetStateAction<ReminderType>>
    resource: string
}) {
    return (
        <Stack>
            {reminders && (
                <GridProducer
                    sx={{marginBottom: '16px'}}
                    data={[
                        <CustomTextField
                            name="id"
                            setData={setReminders}
                            resource={resource}
                            label="شناسه"
                            defaultValue={reminders.id}
                            disabled
                        />,

                        <CustomTextField
                            name="title"
                            setData={setReminders}
                            resource={resource}
                            label="عنوان"
                            defaultValue={reminders.title}
                        />,

                        <CustomTextField
                            name="description"
                            setData={setReminders}
                            resource={resource}
                            label="توضیحات"
                            defaultValue={reminders.description}
                            multiline
                            minRows={4}
                        />,

                        <DateFilter
                            mode="controlled"
                            value={reminders.date}
                            onChange={(value) =>
                                setReminders((prev) => ({
                                    ...prev,
                                    date: value,
                                }))
                            }
                            label="تاریخ"
                        />,
                    ]}
                />
            )}
        </Stack>
    )
}