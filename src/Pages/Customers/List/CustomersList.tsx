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
    createTableHeadCells('شرایط مالی', 'financial'),
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
        createQueryParam(queryNames)
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
                status: 'تهاتر',
                propertyType: 'آپارتمان',
                minArea: '80',
                maxArea: '150',
                rooms: '2',
                neighborhoods: ['سعادت آباد'],
                note: 'به دنبال آپارتمان دو خوابه با پارکینگ است.',
                cities: 'قم',
                employmentStatus: 'مالک',
                floors: '5',
                units: '2',
                area: '1',

                barterAmount: '3000000000',
                cashAmount: '2000000000',
                initialPayment: '',

                remainingAmount1: '',
                remainingDate1: '',
                remainingAmount2: '',
                remainingDate2: '',
                remainingAmount3: '',
                remainingDate3: '',
                remainingAmount4: '',
                remainingDate4: '',
                remainingAmount5: '',
                remainingDate5: '',
                remainingAmount6: '',
                remainingDate6: '',
            },

            {
                id: 2,
                full_name: 'محمد احمدی',
                phone_number: '09129876543',
                status: 'خرید نقد',
                propertyType: 'آپارتمان',
                minArea: '70',
                maxArea: '120',
                rooms: '2',
                neighborhoods: ['پونک'],
                note: 'ترجیحاً واحد نوساز و نزدیک مترو باشد.',
                cities: 'قم',
                employmentStatus: 'مستاجر',
                floors: '4',
                units: '3',
                area: '2',

                barterAmount: '',
                cashAmount: '5000000000',
                initialPayment: '',

                remainingAmount1: '',
                remainingDate1: '',
                remainingAmount2: '',
                remainingDate2: '',
                remainingAmount3: '',
                remainingDate3: '',
                remainingAmount4: '',
                remainingDate4: '',
                remainingAmount5: '',
                remainingDate5: '',
                remainingAmount6: '',
                remainingDate6: '',
            },

            {
                id: 3,
                full_name: 'سارا کریمی',
                phone_number: '09351234567',
                status: 'خرید با شرایط یک ماهه',
                propertyType: 'ویلایی',
                minArea: '150',
                maxArea: '300',
                rooms: '3',
                neighborhoods: ['لواسان'],
                note: 'به دنبال ویلای مستقل با حیاط بزرگ است.',
                cities: 'قم',
                employmentStatus: 'مالک',
                floors: '2',
                units: '1',
                area: '3',

                barterAmount: '',
                cashAmount: '',
                initialPayment: '4000000000',

                remainingAmount1: '2000000000',
                remainingDate1: '1405/07/01',

                remainingAmount2: '2000000000',
                remainingDate2: '1405/07/15',

                remainingAmount3: '1000000000',
                remainingDate3: '1405/07/30',

                remainingAmount4: '',
                remainingDate4: '',
                remainingAmount5: '',
                remainingDate5: '',
                remainingAmount6: '',
                remainingDate6: '',
            },

            {
                id: 4,
                full_name: 'رضا مرادی',
                phone_number: '09105555555',
                status: 'خرید با شرایط تا سه ماهه',
                propertyType: 'آپارتمان',
                minArea: '90',
                maxArea: '130',
                rooms: '2',
                neighborhoods: ['تهرانپارس'],
                note: 'قصد فروش واحد مسکونی خود را دارد.',
                cities: 'قم',
                employmentStatus: 'مالک',
                floors: '6',
                units: '2',
                area: '4',

                barterAmount: '',
                cashAmount: '',
                initialPayment: '3000000000',

                remainingAmount1: '1000000000',
                remainingDate1: '1405/07/01',

                remainingAmount2: '1000000000',
                remainingDate2: '1405/07/15',

                remainingAmount3: '1000000000',
                remainingDate3: '1405/08/01',

                remainingAmount4: '1000000000',
                remainingDate4: '1405/08/15',

                remainingAmount5: '1000000000',
                remainingDate5: '1405/09/01',

                remainingAmount6: '1000000000',
                remainingDate6: '1405/09/15',
            },

            {
                id: 5,
                full_name: 'نگار حسینی',
                phone_number: '09221234567',
                status: 'نقد و تهاتر',
                propertyType: 'آپارتمان',
                minArea: '60',
                maxArea: '100',
                rooms: '1',
                neighborhoods: ['جنت آباد'],
                note: 'در صورت پیدا شدن گزینه مناسب مجدداً پیگیری شود.',
                cities: 'قم',
                employmentStatus: 'مستاجر',
                floors: '3',
                units: '4',
                area: '5',

                barterAmount: '1500000000',
                cashAmount: '1000000000',
                initialPayment: '',

                remainingAmount1: '500000000',
                remainingDate1: '1405/07/10',

                remainingAmount2: '500000000',
                remainingDate2: '1405/08/10',

                remainingAmount3: '500000000',
                remainingDate3: '1405/09/10',

                remainingAmount4: '',
                remainingDate4: '',
                remainingAmount5: '',
                remainingDate5: '',
                remainingAmount6: '',
                remainingDate6: '',
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

                        {/* شرایط مالی */}
                        <TableCell key={`${item.id}-financial`}>
                            <FinancialCell customer={item} />
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

function FinancialCell({
    customer,
}: {
    customer: CustomersType
}) {
    switch (customer.status) {
        case 'تهاتر':
            return (
                <CellText>
                    {customer.barterAmount
                        ? `تهاتر: ${formatNumber(customer.barterAmount)} تومان`
                        : '--'}
                    {customer.cashAmount
                        ? ` | نقد: ${formatNumber(customer.cashAmount)} تومان`
                        : ''}
                </CellText>
            )

        case 'خرید نقد':
            return (
                <CellText>
                    {customer.cashAmount
                        ? `نقدینگی: ${formatNumber(customer.cashAmount)} تومان`
                        : '--'}
                </CellText>
            )

        case 'خرید با شرایط یک ماهه':
            return (
                <CellText>
                    {customer.initialPayment
                        ? `اولیه: ${formatNumber(customer.initialPayment)} تومان`
                        : '--'}
                </CellText>
            )

        case 'خرید با شرایط تا سه ماهه':
            return (
                <CellText>
                    {customer.initialPayment
                        ? `اولیه: ${formatNumber(customer.initialPayment)} تومان`
                        : '--'}
                </CellText>
            )

        case 'نقد و تهاتر':
            return (
                <CellText>
                    {customer.barterAmount
                        ? `تهاتر: ${formatNumber(customer.barterAmount)} تومان`
                        : '--'}
                    {customer.cashAmount
                        ? ` | نقد: ${formatNumber(customer.cashAmount)} تومان`
                        : ''}
                </CellText>
            )

        default:
            return <CellText>--</CellText>
    }
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