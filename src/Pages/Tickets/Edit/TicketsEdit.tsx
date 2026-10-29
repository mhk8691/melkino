import {useEffect, useState} from 'react'
import {LinearProgress} from '@mui/material'
import {useDispatch} from 'react-redux'
import {DataProvider} from '../../../Core/DataProvider'
import {setUtil} from '../../../redux/UtilSlice'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'

import {Tickets, TicketsType} from '../Tickets'
const resource = 'tickets'

export function TicketsEdit() {
    const state = useLocation().state as {row: TicketsType}
    const [tickets, setTickets] = useState(state.row)
    const [initialTicket, setInitialTicket] = useState(state.row)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        let active = true
        const getTicket = async () => {
            setLoading(true)
            try {
                const response = await DataProvider.get<TicketsType>(`${resource}/${state.row.id}/`)
                if (active) {
                    setTickets(response.data)
                    setInitialTicket(response.data)
                }
            } catch (error: any) {
                if (active) dispatch(setUtil({open: true, message: error.message || 'خطا در دریافت جزئیات تیکت', severity: 'error'}))
            } finally {
                if (active) setLoading(false)
            }
        }
        getTicket()
        return () => { active = false }
    }, [state.row.id, dispatch])

    return (
        <EditPage
            resource={resource}
            title="جزئیات تیکت"
            formDetails={{subject: tickets.subject, category: tickets.category, status: tickets.status}}
            initialData={{subject: initialTicket.subject, category: initialTicket.category, status: initialTicket.status}}
            disabled={loading || tickets.subject.trim().length < 3 || tickets.subject.trim().length > 200}
            isFormData={false}
        >
            {loading ? <LinearProgress /> : <Tickets
                tickets={tickets}
                setTickets={setTickets}
                resource={resource}
                editMode
            />}
        </EditPage>
    )
}
