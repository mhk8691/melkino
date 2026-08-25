import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import { Files } from '../Files'

const resource = 'files'

export function FilesCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage
            title={'افزودن فایل'}
            resource={resource + '/'}
            isFormData={true}
            redirect={resource}
            formDetails={data}
        >
            <Files property={data} setProperty={setData} resource={resource} />
        </CreatePage>
    )
}
