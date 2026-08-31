import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import { Customers } from '../Customers'

const resource = 'customers'

export function CustomersCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage
            title={'افزودن مشتری'}
            resource={resource + '/'}
            isFormData={true}
            redirect={resource}
            formDetails={data}
        >
            <Customers customers={data} setCustomers={setData} resource={resource} />
        </CreatePage>
    )
}
