import {Stack} from '@mui/material'
import type {Dispatch, SetStateAction} from 'react'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {CustomSelectField} from '../../Components/Input/CustomSelectField'
import {GridProducer} from '../../Components/Table/GridProducer'
import {formatDate} from '../../Core/FormatDate'

export type TicketStatus =
    | 'open'
    | 'in_progress'
    | 'waiting_for_user'
    | 'answered'
    | 'closed'

export const TICKET_STATUSES = [
    {value: 'open', label: 'باز', color: 'info'},
    {value: 'in_progress', label: 'در حال بررسی', color: 'warning'},
    {value: 'waiting_for_user', label: 'در انتظار پاسخ کاربر', color: 'secondary'},
    {value: 'answered', label: 'پاسخ داده شده', color: 'success'},
    {value: 'closed', label: 'بسته شده', color: 'default'},
] as const

export const TICKET_CATEGORIES = [
    {value: 'complaint', label: 'شکایت'},
    {value: 'technical', label: 'سوالات فنی درمورد ملکینو'},
    {value: 'other', label: 'متفرقه'},
] as const

export type TicketCategory = typeof TICKET_CATEGORIES[number]['value']

export type TicketsType = {
    id: number
    creator: number
    creator_name: string
    assigned_to: number | null
    assigned_to_name: string | null
    category: TicketCategory
    category_display: string
    subject: string
    status: TicketStatus
    status_display: string
    created_at: string
    updated_at: string
    closed_at: string | null
    messages_count: number
}

export const ticketDefaults: TicketsType = {
    id: 0, creator: 0, creator_name: '', assigned_to: null, assigned_to_name: null,
    category: 'other', category_display: '', subject: '', status: 'open', status_display: '',
    created_at: '', updated_at: '', closed_at: null, messages_count: 0,
}

export function Tickets({tickets, setTickets, resource, editMode = false}: {
    tickets: TicketsType
    setTickets: Dispatch<SetStateAction<TicketsType>>
    resource: string
    editMode?: boolean
}) {
    if (!tickets) return null
    return (
        <Stack>
            <GridProducer data={[
                ...(editMode ? [
                    <CustomTextField key="id" label="شناسه" value={tickets.id} disabled />,
                ] : []),
                <CustomTextField
                    key="subject" name="subject" label="موضوع" data-resource={resource}
                    value={tickets.subject ?? ''} setData={setTickets}
                />,
                <CustomSelectField
                    key="category" name="category" label="دسته‌بندی" resource={resource}
                    value={tickets.category} setData={setTickets} options={[...TICKET_CATEGORIES]}
                />,
                <CustomSelectField
                    key="status" name="status" label="وضعیت" resource={resource}
                    value={tickets.status} setData={setTickets} options={[...TICKET_STATUSES]}
                />,
                ...(editMode ? [
                    <CustomTextField
                        key="assigned_to" name="assigned_to" label="شناسه مسئول رسیدگی"
                        value={tickets.assigned_to ?? ''} disabled
                    />,
                    <CustomTextField key="creator" label="شناسه ثبت‌کننده" value={tickets.creator} disabled />,
                    <CustomTextField key="creator_name" label="ثبت‌کننده" value={tickets.creator_name || '--'} disabled />,
                    <CustomTextField key="assigned_to_name" label="مسئول رسیدگی" value={tickets.assigned_to_name ?? '--'} disabled />,
                    <CustomTextField key="messages_count" label="تعداد پیام‌ها" value={tickets.messages_count} disabled />,
                    ...([
                        ['created_at', 'تاریخ ثبت'],
                        ['updated_at', 'آخرین ویرایش'],
                        ['closed_at', 'تاریخ بسته شدن'],
                    ] as const).map(([name, label]) => (
                        <CustomTextField key={name} label={label} value={tickets[name] ? formatDate(tickets[name]!) : '--'} disabled />
                    )),
                ] : []),
            ]} />
        </Stack>
    )
}
