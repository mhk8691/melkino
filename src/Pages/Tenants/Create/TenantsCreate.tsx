import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {Tenants} from '../Tenants'

const resource = 'tenants'

export function TenantsCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage
            title={'افزودن مستاجر'}
            resource={resource + '/'}
            isFormData={true}
            redirect={resource}
            formDetails={data}
        >
            <Tenants tenants={data} setTenants={setData} resource={resource} />
        </CreatePage>
    )
}
