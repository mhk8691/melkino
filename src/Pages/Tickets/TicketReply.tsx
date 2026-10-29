import {Button, FormControlLabel, Paper, Stack, Switch, Typography} from '@mui/material'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {DataProvider} from '../../Core/DataProvider'
import {setUtil} from '../../redux/UtilSlice'
import type {SupportTicketMessage} from './Tickets'

export function TicketReply({ticketId}: {ticketId: number}) {
    const dispatch = useDispatch()
    const [body, setBody] = useState('')
    const [isInternal, setIsInternal] = useState(false)
    const [loading, setLoading] = useState(false)
    const length = body.trim().length
    const valid = length >= 2 && length <= 20000

    const sendReply = async () => {
        if (!valid || loading) return
        setLoading(true)
        try {
            const response = await DataProvider.post<SupportTicketMessage>(`tickets/${ticketId}/replies/`, {
                data: {body: body.trim(), is_internal: isInternal},
            })
            setBody('')
            setIsInternal(false)
            dispatch(setUtil({open: true, message: response.message || 'پاسخ با موفقیت ارسال شد', severity: 'success'}))
        } catch (error: any) {
            dispatch(setUtil({open: true, message: error.message || 'خطا در ارسال پاسخ', severity: 'error'}))
        } finally {
            setLoading(false)
        }
    }

    return (
        <Paper variant="outlined" sx={{mt: 3, p: {xs: 2, sm: 3}, borderRadius: 3}}>
            <Stack spacing={2}>
                <Typography variant="subtitle1" fontWeight={700}>ارسال پاسخ</Typography>
                <CustomTextField
                    name="body" label="متن پاسخ" value={body}
                    change={(event) => setBody(event.target.value)}
                    multiline minRows={5} disabled={loading}
                    inputProps={{maxLength: 20000}}
                    helperText={`${length.toLocaleString('fa-IR')} از ۲۰٬۰۰۰ کاراکتر`}
                />
                <Stack direction={{xs: 'column', sm: 'row'}} justifyContent="space-between" gap={1}>
                    <FormControlLabel label="یادداشت داخلی پشتیبانی" control={
                        <Switch checked={isInternal} onChange={(_, checked) => setIsInternal(checked)} disabled={loading} />
                    } />
                    <Button variant="contained" onClick={sendReply} disabled={!valid || loading}>
                        {loading ? 'در حال ارسال…' : isInternal ? 'ثبت یادداشت' : 'ارسال پاسخ'}
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    )
}
