import {ImpersonateButton} from '../../../Components/Impersonation/ImpersonateButton'
import {selectIsSuperAdmin} from '../../../redux/RoleSlice'
import {UserListCells, userCardFields, AccountStatus, userFullName, type UserListField, UserIdentity} from '../../User/UserListFields'
import {CustomCardList} from '../../../Components/Card/CustomCardList'
import {Box} from '@mui/material'
import {useState} from 'react'
import {useQueryParams} from 'use-query-params'

import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'

import {ExpertType, expertDefaults} from '../Expert'
import {ExpertCreate} from '../Create/ExpertCreate'
import {ViewModeToggle} from '../../User/ViewModeToggle'
import {useViewMode} from '../../../Core/useViewMode'
import {createQueryParam} from '../../../Core/QueryParams'
import { DataProvider } from '../../../Core/DataProvider'
import { setUtil } from '../../../redux/UtilSlice'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useDispatch, useSelector } from 'react-redux'

const RESOURCE = 'users'
const LIST_RESOURCE = 'users/?group=expert'

const fields: UserListField<ExpertType>[] = [
    {name: 'id', label: 'شناسه'},
    {name: 'full_name', label: 'نام و نام خانوادگی', render: (row) => <UserIdentity user={row} />},
    {name: 'phone', label: 'شماره موبایل'},
    {name: 'expert_code', label: 'کد کارشناسی'},
    {name: 'agency_id', label: 'شناسه دفتر املاک'},
    {name: 'job_title', label: 'عنوان شغلی'},
    {name: 'account_status', label: 'وضعیت حساب', render: (row) => <AccountStatus user={row} />},
]

const tableHeadCells = fields.map(({label, name}) => createTableHeadCells(label, name))
const cardFields = userCardFields(fields)

const queryNames = ['full_name', 'phone', 'expert_code', 'agency_id'].map((name) => ({
    field: name,
    label: fields.find((field) => field.name === name)?.label ?? name,
    type: '',
}))

export function ExpertList({title}: {title: string}) {
    const canImpersonate = useSelector(selectIsSuperAdmin)
    const [search, setSearch] = useQueryParams(
        createQueryParam(queryNames),
    )
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const [viewMode, setViewMode] = useViewMode(LIST_RESOURCE)

    const [expert,setExpert] = useState<{
        total_results: number
        data: ExpertType[]
    }>({
        total_results: 0,
        data: [],
    })

    const getExpert = async () => {
        setLoading(true)

        try {
            const response = await DataProvider.get<{
                total_results: number
                results: ExpertType[]
            }>(LIST_RESOURCE, search)

            if (response) {
                setExpert({
                    total_results: response.data.total_results,
                    data: response.data.results,
                })
            }
        } catch (error: any) {
            dispatch(
                setUtil({
                    open: true,
                    message: error.message,
                    severity: 'error',
                }),
            )
        }

        setLoading(false)
    }
    useDeepCompareEffect(() => {
        getExpert()
    }, [search])

    return (
        <ListPage
            header={title}
            href={'expert' + '/create'}
            searchField="full_name"
            searchText="نام و نام خانوادگی"
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={() => getExpert()}
            filtersData={queryNames}
            createModal={ExpertCreate}
            isCsvExport
            defaultState={expertDefaults}
        >
            <Box sx={{display: 'flex', justifyContent: 'flex-end', my: 2, px: 1}}>
                <ViewModeToggle value={viewMode} onChange={setViewMode} />
            </Box>
            {viewMode === 'card' ? (
                <CustomCardList
                    rows={expert.data}
                    resource={RESOURCE}
                    getList={getExpert}
                    title="کارشناس"
                    fields={cardFields}
                    loading={loading}
                    params={search}
                    setParams={setSearch}
                    count={expert.total_results}
                    hasDetail
                    renderers={{
                        actions: canImpersonate ? (row: ExpertType) => <ImpersonateButton target={row} /> : undefined,
                        title: (row: ExpertType) => userFullName(row),
                        status: (row: ExpertType) => <AccountStatus user={row} />,
                    }}
                />
            ) : (
                <CustomTable
                    title={title}
                    resource={RESOURCE}
                    headCells={canImpersonate ? [...tableHeadCells, {name: 'impersonate', label: 'ورود مدیریتی', sortable: false}] : tableHeadCells}
                    rows={expert.data}
                    count={expert.total_results}
                    getList={() => getExpert()}
                    params={search}
                    setParams={setSearch}
                    handleSort={() => {}}
                    loading={loading}
                    hasDetail={true}
                    tableBodyCells={expert.data.map((item) => (
                        <UserListCells key={item.id} fields={fields} row={item} action={canImpersonate ? <ImpersonateButton target={item} /> : undefined} />
                    ))}
                />
            )}
        </ListPage>
    )
}
