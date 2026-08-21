import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {DataProvider} from '../../../Core/DataProvider'
import {Users, UsersType} from '../Users'
import { ParamType } from '../../../Components/Filter/CustomFilter'

const RESOURCE = 'users'
export function UserEdit() {
    const userId = useParams().id
    const [user, setUser] = useState<UsersType>({} as UsersType)
    const [initialData, setInitialData] = useState<UsersType>({} as UsersType)
    const [date,setDate] = useState<ParamType>({} as ParamType)
    const getUser = async () => {
        try {
            let response = await DataProvider.get<UsersType>(`users/${userId}/`)
            console.log(response.data.birth_date)
                        if (response) {
                setUser(response.data)
                setInitialData(response.data)
            }
        } catch (error: any) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUser()
    }, [userId])
    return (
        <EditPage
            resource={RESOURCE}
            title="ویرایش کاربر"
            formDetails={user}
            initialData={initialData}
            isFormData
        >
            {/* <Users id={userId} user={user} setDate={setDate} date={date} setUser={setUser} editMode={true} /> */}
        </EditPage>
    )
}
