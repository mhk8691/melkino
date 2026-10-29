import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {Tickets, ticketDefaults} from '../Tickets'

const resource = 'tickets'

export function TicketsCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    const formValues = {...ticketDefaults, ...data}
    return (
        <CreatePage
            title={'ثبت تیکت'}
            resource={resource + '/'}
            isFormData={false}
            redirect={resource}
            formDetails={{subject: formValues.subject, category: formValues.category, status: formValues.status}}
        >
            <Tickets tickets={formValues} setTickets={setData} resource={resource} />
        </CreatePage>
    )
}
