import {Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import {useQueryParams} from 'use-query-params'

import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {createQueryParam} from '../../../Core/QueryParams'
import {CustomersType} from '../Customers'
import {CustomersCreate} from '../Create/CustomersCreate'

const RESOURCE = 'customers'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('نام و نام خانوادگی', 'full_name'),
    createTableHeadCells('تلفن', 'phone_number'),
    createTableHeadCells('وضعیت', 'status'),
    createTableHeadCells('نوع ملک', 'propertyType'),
    createTableHeadCells('متراژ', 'areaRange'),
    createTableHeadCells('بودجه', 'budget'),
    createTableHeadCells('اتاق', 'rooms'),
    createTableHeadCells('شهر', 'cities'),
    createTableHeadCells('منطقه', 'area'),
    createTableHeadCells('محله', 'neighborhoods'),
]

const queryNames = tableHeadCells.map(cell => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))

export function CustomersList() {
    const [search, setSearch] = useQueryParams(
        createQueryParam(queryNames),
    )

    const [loading] = useState(false)

    const [customers] = useState<{
        total_results: number
        data: CustomersType[]
    }>({
        total_results: 5,

        data: [
            {
                id: 1,
                full_name: 'علی رضایی',
                phone_number: '09121234567',
                status: 'فعال',
                propertyType: 'آپارتمان',
                minArea: '80',
                maxArea: '150',
                budget: '5000000000',
                rooms: '2',
                neighborhoods: ['سعادت آباد'],
                note: 'به دنبال آپارتمان دو خوابه با پارکینگ است.',
                cities: 'قم',
                employmentStatus: 'مالک',
                floors: '5',
                units: '2',
                area: '1',
            },
            {
                id: 2,
                full_name: 'محمد احمدی',
                phone_number: '09129876543',
                status: 'فعال',
                propertyType: 'آپارتمان',
                minArea: '70',
                maxArea: '120',
                budget: '300000000',
                rooms: '2',
                neighborhoods: ['پونک'],
                note: 'ترجیحاً واحد نوساز و نزدیک مترو باشد.',
                cities: 'قم',
                employmentStatus: 'مستاجر',
                floors: '4',
                units: '3',
                area: '2',
            },
            {
                id: 3,
                full_name: 'سارا کریمی',
                phone_number: '09351234567',
                status: 'بالقوه',
                propertyType: 'ویلایی',
                minArea: '150',
                maxArea: '300',
                budget: '10000000000',
                rooms: '3',
                neighborhoods: ['لواسان'],
                note: 'به دنبال ویلای مستقل با حیاط بزرگ است.',
                cities: 'قم',
                employmentStatus: 'مالک',
                floors: '2',
                units: '1',
                area: '3',
            },
            {
                id: 4,
                full_name: 'رضا مرادی',
                phone_number: '09105555555',
                status: 'فعال',
                propertyType: 'آپارتمان',
                minArea: '90',
                maxArea: '130',
                budget: '7000000000',
                rooms: '2',
                neighborhoods: ['تهرانپارس'],
                note: 'قصد فروش واحد مسکونی خود را دارد.',
                cities: 'قم',
                employmentStatus: 'مالک',
                floors: '6',
                units: '2',
                area: '4',
            },
            {
                id: 5,
                full_name: 'نگار حسینی',
                phone_number: '09221234567',
                status: 'بسته',
                propertyType: 'آپارتمان',
                minArea: '60',
                maxArea: '100',
                budget: '1000000000',
                rooms: '1',
                neighborhoods: ['جنت آباد'],
                note: 'در صورت پیدا شدن گزینه مناسب مجدداً پیگیری شود.',
                cities: 'قم',
                employmentStatus: 'مستاجر',
                floors: '3',
                units: '4',
                area: '5',
            },
        ],
    })

    return (
        <ListPage
            header="مدیریت مشتری ها"
            href={`${RESOURCE}/create`}
            searchField="full_name"
            searchText="نام و نام خانوادگی"
            nofilter
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={() => {}}
            filtersData={[]}
            createModal={CustomersCreate}
            defaultState={{
                full_name: '',
            }}
        >
            <CustomTable
                title="مشتری ها"
                resource={RESOURCE}
                headCells={tableHeadCells}
                rows={customers.data}
                count={customers.total_results}
                getList={() => {}}
                params={search}
                setParams={setSearch}
                handleSort={() => {}}
                loading={loading}
                hasDetail
                tableBodyCells={customers.data.map(item => (
                    <>
                        {/* شناسه */}
                        <TableCell key={`${item.id}-id`}>
                            <CellText>
                                {item.id || '--'}
                            </CellText>
                        </TableCell>

                        {/* نام و نام خانوادگی */}
                        <TableCell key={`${item.id}-full_name`}>
                            <CellText>
                                {item.full_name || '--'}
                            </CellText>
                        </TableCell>

                        {/* تلفن */}
                        <TableCell key={`${item.id}-phone`}>
                            <CellText>
                                {item.phone_number || '--'}
                            </CellText>
                        </TableCell>


                        {/* وضعیت */}
                        <TableCell key={`${item.id}-status`}>
                            <CellText>
                                {item.status || '--'}
                            </CellText>
                        </TableCell>

                        {/* نوع ملک */}
                        <TableCell key={`${item.id}-propertyType`}>
                            <CellText>
                                {item.propertyType || '--'}
                            </CellText>
                        </TableCell>

                    

                        {/* متراژ */}
                        <TableCell key={`${item.id}-areaRange`}>
                            <CellText>
                                {item.minArea && item.maxArea
                                    ? `${item.minArea} تا ${item.maxArea} متر`
                                    : item.minArea
                                      ? `از ${item.minArea} متر`
                                      : item.maxArea
                                        ? `تا ${item.maxArea} متر`
                                        : '--'}
                            </CellText>
                        </TableCell>

                        {/* بودجه */}
                        <TableCell key={`${item.id}-budget`}>
                            <CellText>
                                {item.budget
                                    ? `${formatNumber(item.budget)} تومان`
                                    : '--'}
                            </CellText>
                        </TableCell>

                        {/* تعداد اتاق */}
                        <TableCell key={`${item.id}-rooms`}>
                            <CellText>
                                {item.rooms
                                    ? `${item.rooms} اتاق`
                                    : '--'}
                            </CellText>
                        </TableCell>

                        {/* شهر */}
                        <TableCell key={`${item.id}-cities`}>
                            <CellText>
                                {item.cities || '--'}
                            </CellText>
                        </TableCell>

                        {/* منطقه */}
                        <TableCell key={`${item.id}-area`}>
                            <CellText>
                                {item.area
                                    ? `منطقه ${item.area}`
                                    : '--'}
                            </CellText>
                        </TableCell>

                        {/* محله */}
                        <TableCell key={`${item.id}-neighborhoods`}>
                            <CellText>
                                {item.neighborhoods?.length
                                    ? item.neighborhoods.join('، ')
                                    : '--'}
                            </CellText>
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}

function formatNumber(value: string): string {
    const number = Number(value)

    if (Number.isNaN(number)) {
        return value
    }

    return new Intl.NumberFormat('fa-IR').format(number)
}

function CellText({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Typography
            variant="body2"
            fontSize={{
                xs: '13px',
                sm: '14px',
                md: '16px',
                xl: '17px',
            }}
            sx={{
                whiteSpace: 'nowrap',
            }}
        >
            {children}
        </Typography>
    )
}