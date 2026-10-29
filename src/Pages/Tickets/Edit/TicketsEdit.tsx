import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'

import {Tickets, TicketsType} from '../Tickets'
const resource = 'tickets'

export function TicketsEdit() {
    const state = useLocation().state as {row: TicketsType}
    const [tickets, setTickets] = useState(state.row)

    return (
        <EditPage
            resource={resource}
            title="جزئیات تیکت"
            formDetails={tickets}
            initialData={state.row}
            isFormData={false}
        >
            <Tickets
                tickets={tickets}
                setTickets={setTickets}
                resource={resource}
                editMode
            />
        </EditPage>
    )
}
