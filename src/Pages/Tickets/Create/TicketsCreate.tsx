import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {Tickets} from '../Tickets'

const resource = 'tickets'

export function TicketsCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage
            title={'ثبت تیکت'}
            resource={resource + '/'}
            isFormData={true}
            redirect={resource}
            formDetails={data}
        >
            <Tickets tickets={data} setTickets={setData} resource={resource} />
        </CreatePage>
    )
}
