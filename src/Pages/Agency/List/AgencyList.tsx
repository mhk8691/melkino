import {UserListCells, userCardFields, AccountStatus, userFullName, type UserListField, VerificationStatus} from '../../User/UserListFields'
import {CustomCardList} from '../../../Components/Card/CustomCardList'

import {Box} from '@mui/material'
import {useState} from 'react'
import {useQueryParams} from 'use-query-params'
import {useDispatch} from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'

import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {createQueryParam} from '../../../Core/QueryParams'
import {setUtil} from '../../../redux/UtilSlice'

import {AgencyType, agencyDefaults} from '../Agency'
import {AgencyCreate} from '../Create/AgencyCreate'
import {ViewModeToggle} from '../../User/ViewModeToggle'
import {useViewMode} from '../../../Core/useViewMode'
import {DataProvider} from '../../../Core/DataProvider'

const RESOURCE = 'users'
const LIST_RESOURCE = 'users/?group=agency'

const fields: UserListField<AgencyType>[] = [
    {name: 'id', label: 'شناسه'},
    {name: 'agency_name', label: 'نام دفتر املاک'},
    {name: 'manager_name', label: 'مدیر دفتر', render: (row) => row.manager_name || userFullName(row)},
    {name: 'phone', label: 'شماره موبایل'},
    {name: 'city', label: 'شهر'},
    {name: 'office_verification_status', label: 'تأیید دفتر', render: (row) => <VerificationStatus status={row.office_verification_status} />},
    {name: 'account_status', label: 'وضعیت حساب', render: (row) => <AccountStatus user={row} />},
]

const tableHeadCells = fields.map(({label, name}) => createTableHeadCells(label, name))
const cardFields = userCardFields(fields)

const queryNames = [
    {field: 'agency_name', label: 'نام دفتر املاک', type: ''},
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
        field: 'account_status',
        label: 'وضعیت حساب',
        type: '',
    },
    {
        field: 'office_verification_status',
        label: 'وضعیت تأیید دفتر',
        type: '',
    },
]

type AgencyListResponse = {
    total_results: number
    results: AgencyType[]
}

export function AgencyList() {
    const [search, setSearch] = useQueryParams(
        createQueryParam(queryNames),
    )

    const [loading, setLoading] = useState(false)

    const [viewMode, setViewMode] = useViewMode(LIST_RESOURCE)

    const [agency, setAgency] = useState<{
        total_results: number
        data: AgencyType[]
    }>({
        total_results: 0,
        data: [],
    })

    const dispatch = useDispatch()

    const getAgency = async () => {
        setLoading(true)

        try {
            const response =
                await DataProvider.get<AgencyListResponse>(
                    LIST_RESOURCE,
                    search,
                )

            setAgency({
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
                            : 'خطا در دریافت اطلاعات املاکی‌ها',
                    severity: 'error',
                }),
            )
        } finally {
            setLoading(false)
        }
    }

    useDeepCompareEffect(() => {
        getAgency()
    }, [search])

    return (
        <ListPage
            header="مدیریت املاکی‌ها"
            href={`agencies/create`}
            searchField="phone"
            searchText="شماره تماس"
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={getAgency}
            isCsvExport
            filtersData={queryNames}
            createModal={AgencyCreate}
            defaultState={agencyDefaults}
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
                    rows={agency.data}
                    resource={RESOURCE}
                    getList={getAgency}
                    title="املاکی‌ها"
                    fields={cardFields}
                    loading={loading}
                    params={search}
                    setParams={setSearch}
                    count={agency.total_results}
                    hasDetail
                    renderers={{
                        title: (row: AgencyType) => row.agency_name || '--',
                        status: (row: AgencyType) => <AccountStatus user={row} />,
                    }}
                />
            ) : (
                <CustomTable
                    title="املاکی‌ها"
                    resource={RESOURCE}
                    headCells={tableHeadCells}
                    rows={agency.data}
                    count={agency.total_results}
                    getList={getAgency}
                    params={search}
                    setParams={setSearch}
                    handleSort={() => {}}
                    loading={loading}
                    hasDetail
                    tableBodyCells={agency.data.map((item) => (
                        <UserListCells key={item.id} fields={fields} row={item} />
                    ))}
                />
            )}
        </ListPage>
    )
}
