import {UserListCells, userCardFields, AccountStatus, userFullName, type UserListField, UserIdentity} from '../../User/UserListFields'
import {CustomCardList} from '../../../Components/Card/CustomCardList'

import {Box} from '@mui/material'
import {useState} from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'
import {useDispatch} from 'react-redux'

import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {createQueryParam} from '../../../Core/QueryParams'
import {setUtil} from '../../../redux/UtilSlice'

import {type SuperUserType as UsersType, superUserDefaults} from '../SuperUsers'
import {SuperUsersCreate} from '../Create/SuperUsersCreate'
import {useViewMode} from '../../../Core/useViewMode'
import {ViewModeToggle} from '../../User/ViewModeToggle'

const RESOURCE = 'users'
const LIST_RESOURCE = 'users/?group=superadmin'

const fields: UserListField<UsersType>[] = [
    {name: 'id', label: 'شناسه'},
    {name: 'full_name', label: 'نام و نام خانوادگی', render: (row) => <UserIdentity user={row} />},
    {name: 'phone', label: 'شماره موبایل'},
    {name: 'admin_level', label: 'سطح مدیریت'},
    {name: 'is_staff', label: 'دسترسی پنل'},
    {name: 'is_superuser', label: 'دسترسی کامل Django'},
    {name: 'account_status', label: 'وضعیت حساب', render: (row) => <AccountStatus user={row} />},
]

const tableHeadCells = fields.map(({label, name}) => createTableHeadCells(label, name))
const cardFields = userCardFields(fields)

const queryNames = [
    {field: 'admin_level', label: 'سطح مدیریت', type: ''},
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
        field: 'email',
        label: 'ایمیل',
        type: '',
    },
]

interface SuperUsersApiResponse {
    total_results: number
    results: UsersType[]
}

interface SuperUsersListState {
    total_results: number
    data: UsersType[]
}



export function SuperUsersList() {
    const [search, setSearch] = useQueryParams(
        createQueryParam(queryNames),
    )

    const [loading, setLoading] = useState(false)

    const [viewMode, setViewMode] = useViewMode(LIST_RESOURCE)

    const [superUsers, setSuperUsers] = useState<SuperUsersListState>({
        total_results: 0,
        data: [],
    })

    const dispatch = useDispatch()

    const getSuperUsers = async () => {
        setLoading(true)

        try {
            const response =
                await DataProvider.get<SuperUsersApiResponse>(
                    LIST_RESOURCE,
                    search,
                )

            setSuperUsers({
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
                            : 'خطا در دریافت اطلاعات سوپر ادمین‌ها',
                    severity: 'error',
                }),
            )
        } finally {
            setLoading(false)
        }
    }

    useDeepCompareEffect(() => {
        getSuperUsers()
    }, [search])

    return (
        <ListPage
            header="مدیریت سوپر ادمین‌ها"
            isCsvExport
            href={`super-users/create`}
            searchField="full_name"
            searchText="نام و نام خانوادگی"
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={getSuperUsers}
            filtersData={queryNames}
            createModal={SuperUsersCreate}
            defaultState={superUserDefaults}
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
                    rows={superUsers.data}
                    resource={RESOURCE}
                    getList={getSuperUsers}
                    title="سوپر ادمین‌ها"
                    fields={cardFields}
                    loading={loading}
                    params={search}
                    setParams={setSearch}
                    count={superUsers.total_results}
                    hasDetail
                    renderers={{
                        title: (row: UsersType) => userFullName(row),
                        status: (row: UsersType) => <AccountStatus user={row} />,
                    }}
                />
            ) : (
                <CustomTable
                    title="سوپر ادمین‌ها"
                    resource={RESOURCE}
                    headCells={tableHeadCells}
                    rows={superUsers.data}
                    count={superUsers.total_results}
                    getList={getSuperUsers}
                    params={search}
                    setParams={setSearch}
                    handleSort={() => {}}
                    loading={loading}
                    hasDetail
                    tableBodyCells={superUsers.data.map((item) => (
                        <UserListCells key={item.id} fields={fields} row={item} />
                    ))}
                />
            )}
        </ListPage>
    )
}
