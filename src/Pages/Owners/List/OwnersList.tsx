import {Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import {useQueryParams} from 'use-query-params'
import {createCardField} from '../../../Components/Card/CustomCard'
import {CustomCardList} from '../../../Components/Card/CustomCardList'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {createQueryParam} from '../../../Core/QueryParams'
import {CustomersType} from '../Owners'

const RESOURCE = 'owners'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('نام و نام خانوادگی', 'full_name'),
    createTableHeadCells('تلفن', 'phone_number'),
    createTableHeadCells('شهر', 'cities'),
    createTableHeadCells('محله', 'neighborhoods'),
]

/** همان ستون‌ها، اما برای بدنه‌ی کارت. نام و تلفن در سربرگ کارت می‌آیند پس اینجا تکرار نشده */
const cardFields = [
    createCardField('شهر', 'cities'),
    createCardField('محله', 'neighborhoods'),
]

const queryNames = tableHeadCells.map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))

const cellText = (value: any) => (
    <Typography
        variant="body2"
        fontSize={{xs: '13px', sm: '14px', md: '16px', xl: '17px'}}
        sx={{whiteSpace: 'nowrap'}}
    >
        {value || '--'}
    </Typography>
)

export function OwnersList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)

    const [owners, setOwners] = useState<{
        total_results: number
        data: CustomersType[]
    }>({
        total_results: 5,
        data: [
            {
                id: 1,
                full_name: 'علی رضایی',
                phone_number: '09121234567',
                cities: 'قم',
                neighborhoods: 'آزادگان',
            },
            {
                id: 2,
                full_name: 'محمد احمدی',
                phone_number: '09129876543',
                cities: 'تهران',
                neighborhoods: 'پیروزی',
            },
        ],
    })

    const getOwners = () => {}

    // پراپ‌های مشترک بین جدول و کارت
    const shared = {
        title: 'مالکین',
        resource: RESOURCE,
        rows: owners.data,
        count: owners.total_results,
        params: search,
        setParams: setSearch,
        loading,
        getList: getOwners,
        hasDetail: true,
    }

    return (
        <ListPage
            viewKey={RESOURCE}
            defaultView="card"
            header="مدیریت مالکین"
            href={RESOURCE + '/create'}
            searchField="full_name"
            searchText="نام"
            nofilter
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={getOwners}
            filtersData={[]}
            noCreate
            defaultState={{full_name: ''}}
        >
            {(view) =>
                view === 'card' ? (
                    <CustomCardList
                        {...shared}
                        fields={cardFields}
                        columns={{xs: 1, sm: 2, md: 3, xl: 4}}
                        renderers={{
                            title: (row) => row.full_name || '--',
                            subtitle: (row) => row.phone_number || '--',
                        }}
                    />
                ) : (
                    <CustomTable
                        {...shared}
                        headCells={tableHeadCells}
                        handleSort={getOwners}
                        tableBodyCells={owners.data.map((item) => (
                            <>
                                <TableCell>{cellText(item.id)}</TableCell>
                                <TableCell>{cellText(item.full_name)}</TableCell>
                                <TableCell>{cellText(item.phone_number)}</TableCell>
                                <TableCell>{cellText(item.cities)}</TableCell>
                                <TableCell>{cellText(item.neighborhoods)}</TableCell>
                            </>
                        ))}
                    />
                )
            }
        </ListPage>
    )
}