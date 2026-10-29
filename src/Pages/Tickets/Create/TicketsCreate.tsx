import type {Dispatch, SetStateAction} from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {Tickets, ticketCreateDefaults, isTicketCreateValid, type TicketCreateInput} from '../Tickets'

const resource = 'tickets'

export function TicketsCreate({data, setData}: {
    data: Partial<TicketCreateInput>
    setData: Dispatch<SetStateAction<any>>
}) {
    const formValues: TicketCreateInput = {
        category: data.category ?? ticketCreateDefaults.category,
        subject: data.subject ?? '',
        message: data.message ?? '',
        attachment: data.attachment ?? null,
    }
    return (
        <CreatePage
            title="ثبت تیکت"
            resource={`${resource}/`}
            isFormData={formValues.attachment instanceof File}
            redirect={resource}
            disabled={!isTicketCreateValid(formValues)}
            buttonText="ثبت تیکت"
            formDetails={{
                category: formValues.category,
                subject: formValues.subject.trim(),
                message: formValues.message.trim(),
                ...(formValues.attachment instanceof File && {attachment: formValues.attachment}),
            }}
        >
            <Tickets tickets={formValues} setTickets={setData} resource={resource} />
        </CreatePage>
    )
}
