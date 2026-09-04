import React, { useState } from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {Users} from '../Users'
import { ParamType } from '../../../Components/Filter/CustomFilter'

export function UserCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
        const [date,setDate] = useState<ParamType>({} as ParamType)
    return (
        <CreatePage title={'افزودن کاربر'} resource={'users/'} formDetails={data} isFormData>
            <Users user={data} setUser={setData}  />
        </CreatePage>
    )
}
