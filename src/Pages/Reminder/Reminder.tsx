import { Stack } from '@mui/material'
import { CustomTextField } from '../../Components/Input/CustomTextField'
import { GridProducer } from '../../Components/Table/GridProducer'
import { DateFilter } from '../../Components/Input/DateFilter'
import DatePickerFilter from '../../Components/Filter/DatePicker'

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
    editMode = false,
}: {
    reminders: ReminderType
    setReminders: React.Dispatch<React.SetStateAction<ReminderType>>
    resource: string
    editMode?: boolean
}) {
    return (
        <Stack>
            {reminders && (
                <GridProducer
                    sx={{ marginBottom: '16px' }}
                    data={[
                        ...(editMode
                            ? [
                                  <CustomTextField
                                      key="id"
                                      name="id"
                                      setData={setReminders}
                                      resource={resource}
                                      label="شناسه"
                                      defaultValue={reminders.id}
                                      disabled
                                  />,
                              ]
                            : []),

                        <CustomTextField
                            key="title"
                            name="title"
                            setData={setReminders}
                            resource={resource}
                            label="عنوان"
                            defaultValue={reminders.title}
                        />,

                        <CustomTextField
                            key="description"
                            name="description"
                            setData={setReminders}
                            resource={resource}
                            label="توضیحات"
                            defaultValue={reminders.description}
                            multiline
                            minRows={4}
                        />,

                        <DatePickerFilter
                            key="date"
                            mode="controlled"
                            item={{ label: 'تاریخ' }}
                            value={reminders.date}
                            onChange={(value) =>
                                setReminders((prev) => ({
                                    ...prev,
                                    date: value ?? '',
                                }))
                            }
                            withTime
                        />,
                    ]}
                />
            )}
        </Stack>
    )
}