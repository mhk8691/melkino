import {useState} from 'react'
import {
    Checkbox,
    Chip,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material'

interface TaskItem {
    id: number
    title: string
    time?: string
    priority: 'بالا' | 'متوسط' | 'پایین'
    done: boolean
}

const initialTasks: TaskItem[] = [
    {
        id: 1,
        title: 'تماس با آقای رضایی برای پیگیری فایل آپارتمان سعادت‌آباد',
        time: '۱۰:۰۰',
        priority: 'بالا',
        done: false,
    },
    {
        id: 2,
        title: 'بازدید از ویلای گوهردشت با مشتری جدید',
        time: '۱۳:۳۰',
        priority: 'بالا',
        done: false,
    },
    {id: 3, title: 'تنظیم قرارداد اجاره فایل شمارهٔ ۲', priority: 'متوسط', done: false},
    {id: 4, title: 'پیگیری تسویه‌حساب فایل مشهد', priority: 'پایین', done: true},
]

const priorityColor: Record<TaskItem['priority'], 'error' | 'warning' | 'default'> = {
    بالا: 'error',
    متوسط: 'warning',
    پایین: 'default',
}

export default function TodayImportantTasks() {
    const [tasks, setTasks] = useState<TaskItem[]>(initialTasks)

    const toggleTask = (id: number) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? {...task, done: !task.done} : task)),
        )
    }

    return (
        <Paper
            elevation={0}
            sx={{p: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider'}}
        >
            <List disablePadding>
                {tasks.map((task) => (
                    <ListItem
                        key={task.id}
                        sx={{
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            '&:last-of-type': {borderBottom: 'none'},
                            opacity: task.done ? 0.5 : 1,
                        }}
                        secondaryAction={
                            <Chip
                                label={task.priority}
                                size="small"
                                color={priorityColor[task.priority]}
                                variant="outlined"
                            />
                        }
                    >
                        <ListItemIcon sx={{minWidth: 40}}>
                            <Checkbox
                                edge="start"
                                checked={task.done}
                                onChange={() => toggleTask(task.id)}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary={task.title}
                            secondary={task.time}
                            primaryTypographyProps={{
                                sx: {textDecoration: task.done ? 'line-through' : 'none'},
                            }}
                        />
                    </ListItem>
                ))}
                {tasks.length === 0 && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{p: 2, textAlign: 'center'}}
                    >
                        کار مهمی برای امروز ثبت نشده است.
                    </Typography>
                )}
            </List>
        </Paper>
    )
}
