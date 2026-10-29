import {ImpersonateButton} from '../../../Components/Impersonation/ImpersonateButton'
import {selectIsSuperAdmin} from '../../../redux/RoleSlice'
import {UserListCells, userCardFields, AccountStatus, userFullName, type UserListField, UserIdentity, VerificationStatus} from '../UserListFields'
import {CustomCardList} from '../../../Components/Card/CustomCardList'
import {commonUserDefaults} from '../UserTypes'

import {Box} from '@mui/material'
import {useCallback, useState} from 'react'
import {useQueryParams} from 'use-query-params'
import {useDispatch, useSelector} from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'

import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {createQueryParam} from '../../../Core/QueryParams'
import {DataProvider} from '../../../Core/DataProvider'
import {setUtil} from '../../../redux/UtilSlice'

import type {UsersType} from '../Users'
import {UsersCreate} from '../Create/UsersCreate'
import {ViewModeToggle} from '../ViewModeToggle'
import {useViewMode} from '../../../Core/useViewMode'

const RESOURCE = 'users'
const LIST_RESOURCE = 'users/?group=user'

const fields: UserListField<UsersType>[] = [
    {name: 'id', label: 'شناسه'},
    {name: 'full_name', label: 'نام و نام خانوادگی', render: (row) => <UserIdentity user={row} />},
    {name: 'phone', label: 'شماره موبایل'},
    {name: 'user_type', label: 'نوع کاربر', render: (row) => row.user_type_display || ({consumer: 'مصرف‌کننده', investor: 'سرمایه‌گذار'}[row.user_type]) || '--'},
    {name: 'city', label: 'شهر'},
    {name: 'account_status', label: 'وضعیت حساب', render: (row) => <AccountStatus user={row} />},
    {name: 'verification_status', label: 'احراز هویت', render: (row) => <VerificationStatus status={row.verification_status} label={row.verification_status_display} />},
]

const tableHeadCells = fields.map(({label, name}) => createTableHeadCells(label, name))
const cardFields = userCardFields(fields)

const queryNames = [
    {
        field: 'full_name',
        label: 'نام و نام خانوادگی',
        type: '',
    },
    {
        field: 'phone',
        label: 'شماره تماس',
        type: '',
    },
    {
        field: 'national_code',
        label: 'کد ملی',
        type: '',
    },
    {
        field: 'city',
        label: 'شهر',
        type: '',
    },
]

interface UsersApiResponse {
    total_results: number
    results: UsersType[]
}

interface UsersListState {
    total_results: number
    data: UsersType[]
}

const initialUsers: UsersListState = {
    total_results: 0,
    data: [],
}



export function UsersList() {
    const canImpersonate = useSelector(selectIsSuperAdmin)
    const [search, setSearch] = useQueryParams(
        createQueryParam(queryNames),
    )

    const [loading, setLoading] = useState(false)

    const [viewMode, setViewMode] = useViewMode(LIST_RESOURCE)

    const [users, setUsers] = useState<UsersListState>(initialUsers)

    const dispatch = useDispatch()

    const getList = useCallback(async () => {
        setLoading(true)

        try {
            const response = await DataProvider.get<UsersApiResponse>(
                LIST_RESOURCE,
                search,
            )

            setUsers({
                total_results: response.data.total_results ?? 0,
                data: response.data.results ?? [],
            })
        } catch (error) {
            dispatch(
                setUtil({
                    open: true,
                    message:
                        error instanceof Error
                            ? error.message
                            : 'خطا در دریافت لیست کاربران',
                    severity: 'error',
                }),
            )
        } finally {
            setLoading(false)
        }
    }, [search, dispatch])

    useDeepCompareEffect(() => {
        getList()
    }, [search])

    return (
        <ListPage
            header="مدیریت کاربران عادی"
            href={`user/create`}
            searchField="full_name"
            searchText="نام و نام خانوادگی"
            setParams={setSearch}
            params={search}
            isCsvExport
            resource={RESOURCE}
            getList={getList}
            filtersData={queryNames}
            createModal={UsersCreate}
            defaultState={commonUserDefaults}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    my: 2,
                    px: 1,
                }}
            >
                <ViewModeToggle
                    value={viewMode}
                    onChange={setViewMode}
                />
            </Box>

            {viewMode === 'card' ? (
                <CustomCardList
                    rows={users.data}
                    resource={RESOURCE}
                    getList={getList}
                    title="کاربران عادی"
                    fields={cardFields}
                    loading={loading}
                    params={search}
                    setParams={setSearch}
                    count={users.total_results}
                    hasDetail
                    renderers={{
                        actions: canImpersonate ? (row: UsersType) => <ImpersonateButton target={row} /> : undefined,
                        title: (row: UsersType) => userFullName(row),
                        status: (row: UsersType) => <AccountStatus user={row} />,
                    }}
                />
            ) : (
                <CustomTable
                    title="کاربران عادی"
                    resource={RESOURCE}
                    headCells={canImpersonate ? [...tableHeadCells, {name: 'impersonate', label: 'ورود مدیریتی', sortable: false}] : tableHeadCells}
                    rows={users.data}
                    count={users.total_results}
                    getList={getList}
                    params={search}
                    setParams={setSearch}
                    handleSort={() => {}}
                    loading={loading}
                    hasDetail
                    tableBodyCells={users.data.map((item) => (
                        <UserListCells key={item.id} fields={fields} row={item} action={canImpersonate ? <ImpersonateButton target={item} /> : undefined} />
                    ))}
                />
            )}
        </ListPage>
    )
}
