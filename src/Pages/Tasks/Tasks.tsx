import { Stack } from '@mui/material'
import { CustomTextField } from '../../Components/Input/CustomTextField'
import { CustomSelectField } from '../../Components/Input/CustomSelectField'
import { GridProducer } from '../../Components/Table/GridProducer'

export type TasksType = {
    id: number
    title: string
    date: string
    isDone: boolean
    priority: 'high' | 'medium' | 'low'
}

export function Tasks({
    tasks,
    setTasks,
    resource,
    editMode=false
}: {
    tasks: TasksType
    setTasks: React.Dispatch<React.SetStateAction<TasksType>>
    resource: string
    editMode?:boolean
}) {
    return (
        <Stack>
            {tasks && (
                <GridProducer
                    sx={{ marginBottom: '16px' }}
                    data={[
                           ...(editMode
                            ? [
                                  <CustomTextField
                                      key="id"
                                      name="id"
                                      setData={setTasks}
                                      resource={resource}
                                      label="شناسه"
                                      defaultValue={tasks.id}
                                      disabled
                                  />,
                              ]
                            : []),

                        <CustomTextField
                            name="title"
                            setData={setTasks}
                            resource={resource}
                            label="عنوان"
                            defaultValue={tasks.title}
                        />,

                        <CustomTextField
                            name="date"
                            setData={setTasks}
                            resource={resource}
                            label="تاریخ"
                            defaultValue={tasks.date}
                        />,

                        <CustomSelectField
                            name="priority"
                            setData={setTasks}
                            resource={resource}
                            label="اولویت"
                            defaultValue={tasks.priority}
                            options={[
                                { label: 'بالا', value: 'high' },
                                { label: 'متوسط', value: 'medium' },
                                { label: 'پایین', value: 'low' },
                            ]}
                        />,

                        <CustomSelectField
                            name="isDone"
                            setData={setTasks}
                            resource={resource}
                            label="وضعیت انجام"
                            defaultValue={String(tasks.isDone)}
                            options={[
                                { label: 'انجام شده', value: 'true' },
                                { label: 'انجام نشده', value: 'false' },
                            ]}
                            onChange={(event) => {
                                const isDone = event.target.value === 'true'
                                setTasks((prev) => ({
                                    ...prev,
                                    isDone,
                                }))
                            }}
                        />,
                    ]}
                />
            )}
        </Stack>
    )
}