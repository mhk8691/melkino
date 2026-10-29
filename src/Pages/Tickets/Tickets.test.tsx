import {useState} from 'react'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import {TicketsCreate} from './Create/TicketsCreate'
import {TicketReply} from './TicketReply'
import {isTicketCreateValid, ticketCreateDefaults, type TicketCreateInput} from './Tickets'
import {DataProvider} from '../../Core/DataProvider'

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({useDispatch: () => mockDispatch}))
jest.mock('../../Core/DataProvider', () => ({DataProvider: {post: jest.fn()}}))
jest.mock('../../Components/Table/CreatePage', () => ({
    CreatePage: ({children, formDetails, disabled, isFormData}: any) => <>
        <output data-testid="multipart">{String(isFormData)}</output>
        <output data-testid="attachment">{formDetails.attachment?.name ?? ''}</output>
        <output data-testid="payload">{JSON.stringify(formDetails)}</output>
        <button disabled={disabled}>ثبت تیکت</button>
        {children}
    </>,
}))

beforeEach(() => jest.clearAllMocks())

test('creation exposes required inputs and submits exactly the backend creation fields', () => {
    function Form() {
        const [data, setData] = useState<TicketCreateInput>(ticketCreateDefaults)
        return <TicketsCreate data={data} setData={setData} />
    }
    render(<Form />)
    const subject = screen.getByLabelText(/موضوع تیکت/) as HTMLInputElement
    const message = screen.getByLabelText(/متن درخواست/) as HTMLTextAreaElement
    expect(subject.disabled).toBe(false)
    expect(message.disabled).toBe(false)
    expect(subject.required).toBe(true)
    expect(message.required).toBe(true)
    expect(screen.queryByLabelText('شناسه مسئول رسیدگی')).toBeNull()
    expect(screen.queryByLabelText('وضعیت رسیدگی')).toBeNull()
    expect((screen.getByRole('button', {name: 'ثبت تیکت'}) as HTMLButtonElement).disabled).toBe(true)
    fireEvent.change(subject, {target: {value: 'مشکل ثبت آگهی'}})
    fireEvent.change(message, {target: {value: 'هنگام ثبت آگهی خطا دریافت می‌کنم.'}})
    expect((screen.getByRole('button', {name: 'ثبت تیکت'}) as HTMLButtonElement).disabled).toBe(false)
    expect(JSON.parse(screen.getByTestId('payload').textContent || '{}')).toEqual({
        category: 'other', subject: 'مشکل ثبت آگهی', message: 'هنگام ثبت آگهی خطا دریافت می‌کنم.',
    })
})

test.each([
    ['ab', 'ok', false], ['abc', 'x', false], ['abc', 'ok', true],
    ['a'.repeat(200), 'm'.repeat(20000), true],
    ['a'.repeat(201), 'ok', false], ['abc', 'm'.repeat(20001), false],
    ['   ', 'ok', false],
])('validates subject and message length boundaries (case %#)', (subject, message, valid) => {
    expect(isTicketCreateValid({category: 'technical', subject: String(subject), message: String(message)})).toBe(valid)
})

test('replies post body and internal flag to the ticket replies endpoint', async () => {
    ;(DataProvider.post as jest.Mock).mockResolvedValue({message: 'ارسال شد'})
    render(<TicketReply ticketId={15} />)
    fireEvent.change(screen.getByLabelText('متن پاسخ'), {target: {value: ' پاسخ پشتیبانی '}})
    fireEvent.click(screen.getByRole('checkbox', {name: 'یادداشت داخلی پشتیبانی'}))
    fireEvent.click(screen.getByRole('button', {name: 'ثبت یادداشت'}))
    await waitFor(() => expect(DataProvider.post).toHaveBeenCalledWith('tickets/15/replies/', {
        data: {body: 'پاسخ پشتیبانی', is_internal: true},
    }))
    await waitFor(() => expect((screen.getByLabelText('متن پاسخ') as HTMLTextAreaElement).value).toBe(''))
})

test('failed replies preserve the draft and show the backend error', async () => {
    ;(DataProvider.post as jest.Mock).mockRejectedValue(new Error('خطای ارسال'))
    render(<TicketReply ticketId={15} />)
    fireEvent.change(screen.getByLabelText('متن پاسخ'), {target: {value: 'متن پاسخ'}})
    fireEvent.click(screen.getByRole('button', {name: 'ارسال پاسخ'}))
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({payload: expect.objectContaining({message: 'خطای ارسال', severity: 'error'})})))
    expect((screen.getByLabelText('متن پاسخ') as HTMLTextAreaElement).value).toBe('متن پاسخ')
})


test('attachments use multipart with the attachment field and can be removed before submission', () => {
    function Form() {
        const [data, setData] = useState<TicketCreateInput>({...ticketCreateDefaults, subject: 'موضوع تیکت', message: 'متن درخواست'})
        return <TicketsCreate data={data} setData={setData} />
    }
    render(<Form />)
    const file = new File(['content'], 'document.pdf', {type: 'application/pdf'})
    fireEvent.change(screen.getByLabelText('فایل پیوست'), {target: {files: [file]}})
    expect(screen.getByTestId('attachment').textContent).toBe('document.pdf')
    expect(screen.getByTestId('multipart').textContent).toBe('true')
    fireEvent.click(screen.getByRole('button', {name: 'حذف فایل'}))
    expect(screen.getByTestId('attachment').textContent).toBe('')
    expect(screen.getByTestId('multipart').textContent).toBe('false')
    expect(JSON.parse(screen.getByTestId('payload').textContent || '{}')).not.toHaveProperty('attachment')
})
