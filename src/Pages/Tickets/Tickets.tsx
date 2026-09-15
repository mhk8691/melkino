import {
    Stack,
    Paper,
    Grid,
    MenuItem,
    Button,
    Typography,
    Box,
    Divider,
} from '@mui/material'
import {useState} from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFileOutlined'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import CloseIcon from '@mui/icons-material/Close'
import {CustomTextField} from '../../Components/Input/CustomTextField'

export type TicketsType = {
    title: string
    description: string
    file: File | string | null
    priority: 'low' | 'medium' | 'high'
    category: 'complaints' | 'technical' | 'other'
}

const priorityOptions = [
    {value: 'low', label: 'کم'},
    {value: 'medium', label: 'متوسط'},
    {value: 'high', label: 'زیاد'},
]

const categoryOptions = [
    {value: 'complaints', label: 'شکایت‌ها'},
    {value: 'technical', label: 'سوالات فنی درمورد ملکینو'},
    {value: 'other', label: 'متفرقه'},
]

export function Tickets({
    tickets,
    setTickets,
    resource,
}: {
    tickets: TicketsType
    setTickets: React.Dispatch<React.SetStateAction<TicketsType>>
    resource: string
}) {
    const [fileName, setFileName] = useState<string>(
        typeof tickets?.file === 'string' ? tickets.file : ''
    )

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFileName(file.name)
            setTickets((prev) => ({...prev, file}))
        }
    }

    const handleRemoveFile = () => {
        setFileName('')
        setTickets((prev) => ({...prev, file: null}))
    }

    if (!tickets) return null

    return (
        <Paper
            variant="outlined"
            sx={{
                p: {xs: 2, sm: 3},
                borderRadius: 2,
            }}
        >
            <Stack spacing={0.5} sx={{mb: 3}}>
                <Typography variant="subtitle1" fontWeight={600}>
                    ثبت تیکت
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    موضوع تیکت را با جزئیات کامل شرح دهید تا سریع‌تر بررسی شود.
                </Typography>
            </Stack>

            <Divider sx={{mb: 3}} />

            <Grid container spacing={2.5}>
                <Grid item xs={12}>
                    <CustomTextField
                        name="title"
                        setData={setTickets}
                        resource={resource}
                        label="عنوان"
                        defaultValue={tickets.title}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <CustomTextField
                        name="description"
                        setData={setTickets}
                        resource={resource}
                        label="توضیحات"
                        defaultValue={tickets.description}
                        multiline
                        minRows={5}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <CustomTextField
                        name="priority"
                        setData={setTickets}
                        resource={resource}
                        label="میزان اهمیت"
                        defaultValue={tickets.priority}
                        select
                        fullWidth
                    >
                        {priorityOptions.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </CustomTextField>
                </Grid>

                <Grid item xs={12} sm={8}>
                    <CustomTextField
                        name="category"
                        setData={setTickets}
                        resource={resource}
                        label="دسته‌بندی"
                        defaultValue={tickets.category}
                        select
                        fullWidth
                    >
                        {categoryOptions.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </CustomTextField>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="body2" sx={{mb: 1, color: 'text.secondary'}}>
                        فایل پیوست
                    </Typography>

                    {fileName ? (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1.5,
                                px: 2,
                                py: 1.25,
                            }}
                        >
                            <Stack direction="row" spacing={1} alignItems="center" sx={{minWidth: 0}}>
                                <InsertDriveFileOutlinedIcon fontSize="small" color="action" />
                                <Typography
                                    variant="body2"
                                    noWrap
                                    sx={{maxWidth: {xs: 160, sm: 320}}}
                                >
                                    {fileName}
                                </Typography>
                            </Stack>
                            <Button
                                size="small"
                                color="inherit"
                                onClick={handleRemoveFile}
                                startIcon={<CloseIcon fontSize="small" />}
                            >
                                حذف
                            </Button>
                        </Box>
                    ) : (
                        <Button
                            variant="outlined"
                            component="label"
                            color="inherit"
                            startIcon={<UploadFileIcon />}
                            sx={{
                                justifyContent: 'flex-start',
                                px: 2,
                                py: 1.25,
                                borderStyle: 'dashed',
                                borderRadius: 1.5,
                                textTransform: 'none',
                                color: 'text.secondary',
                                width: {xs: '100%', sm: 'auto'},
                            }}
                        >
                            انتخاب فایل
                            <input type="file" hidden onChange={handleFileChange} />
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Paper>
    )
}