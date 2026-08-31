import {Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {createQueryParam} from '../../../Core/QueryParams'
import {setUtil} from '../../../redux/UtilSlice'
import {useDispatch} from 'react-redux'
import {CustomersType} from '../Customers'
import {CustomersCreate} from '../Create/CustomersCreate'

const RESOURCE = 'customers'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('نام', 'name'),
    createTableHeadCells('تلفن', 'phone'),
    createTableHeadCells('نوع مشتری', 'customerType'),
    createTableHeadCells('وضعیت', 'status'),
    createTableHeadCells('نوع ملک', 'propertyType'),
    createTableHeadCells('نوع معامله', 'transactionType'),
    createTableHeadCells('حداقل متراژ', 'minArea'),
    createTableHeadCells('حداکثر متراژ', 'maxArea'),
    createTableHeadCells('بودجه', 'budget'),
    createTableHeadCells('اتاق', 'rooms'),
    createTableHeadCells('محله', 'neighborhood'),
]

const queryNames = tableHeadCells.map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))

export function CustomersList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)

    const [customers, setCustomers] = useState<{
        total_results: number
        data: CustomersType[]
    }>({
        total_results: 5,
        data: [
            {
                id: 1,
                name: 'علی رضایی',
                phone: '09121234567',
                customerType: 'خریدار',
                status: 'فعال',
                propertyType: 'آپارتمان',
                transactionType: 'خرید',
                minArea: '80',
                maxArea: '150',
                budget: '5000000000',
                rooms: '2',
                neighborhood: 'سعادت آباد',
                note: 'به دنبال آپارتمان دو خوابه با پارکینگ است.',
            },
            {
                id: 2,
                name: 'محمد احمدی',
                phone: '09129876543',
                customerType: 'مستاجر',
                status: 'فعال',
                propertyType: 'آپارتمان',
                transactionType: 'اجاره',
                minArea: '70',
                maxArea: '120',
                budget: '300000000',
                rooms: '2',
                neighborhood: 'پونک',
                note: 'ترجیحاً واحد نوساز و نزدیک مترو باشد.',
            },
            {
                id: 3,
                name: 'سارا کریمی',
                phone: '09351234567',
                customerType: 'خریدار',
                status: 'بالقوه',
                propertyType: 'ویلایی',
                transactionType: 'خرید',
                minArea: '150',
                maxArea: '300',
                budget: '10000000000',
                rooms: '3',
                neighborhood: 'لواسان',
                note: 'به دنبال ویلای مستقل با حیاط بزرگ است.',
            },
            {
                id: 4,
                name: 'رضا مرادی',
                phone: '09105555555',
                customerType: 'فروشنده',
                status: 'فعال',
                propertyType: 'آپارتمان',
                transactionType: 'فروش',
                minArea: '90',
                maxArea: '130',
                budget: '7000000000',
                rooms: '2',
                neighborhood: 'تهرانپارس',
                note: 'قصد فروش واحد مسکونی خود را دارد.',
            },
            {
                id: 5,
                name: 'نگار حسینی',
                phone: '09221234567',
                customerType: 'مستاجر',
                status: 'بسته',
                propertyType: 'آپارتمان',
                transactionType: 'رهن',
                minArea: '60',
                maxArea: '100',
                budget: '1000000000',
                rooms: '1',
                neighborhood: 'جنت آباد',
                note: 'در صورت پیدا شدن گزینه مناسب مجدداً پیگیری شود.',
            },
        ],
    })

    const dispatch = useDispatch()

    // const getCustomers = async () => {
    //     setLoading(true)
    //     try {
    //         let response = await DataProvider.get<{
    //             total_results: number
    //             results: CustomersType[]
    //         }>(`${RESOURCE}/`, search)
    //         if (response) {
    //             setCustomers({
    //                 total_results: response.data.total_results,
    //                 data: response.data.results,
    //             })
    //         }
    //     } catch (error: any) {
    //         dispatch(
    //             setUtil({
    //                 open: true,
    //                 message: error.message,
    //                 severity: 'error',
    //             }),
    //         )
    //     }
    //     setLoading(false)
    // }

    // useDeepCompareEffect(() => {
    //     getCustomers()
    // }, [search])

    return (
        <ListPage
            header="مدیریت مشتری ها"
            href={RESOURCE + '/create'}
            searchField="name"
            searchText="نام"
            nofilter
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={() => {}}
            // getList={getCustomers}
            filtersData={[]}
            createModal={CustomersCreate}
            defaultState={{
                name: '',
            }}
        >
            <CustomTable
                title="مشتری ها"
                resource={RESOURCE}
                headCells={tableHeadCells}
                rows={customers.data}
                count={customers.total_results}
                getList={() => {}}
                // getList={getCustomers}
                params={search}
                setParams={setSearch}
                handleSort={() => {}}
                // handleSort={getCustomers}
                loading={loading}
                hasDetail={true}
                tableBodyCells={customers.data.map((item) => (
                    <>
                        <TableCell>
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
                                {item.id || '--'}
                            </Typography>
                        </TableCell>

                        <TableCell>
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
                                {item.name || '--'}
                            </Typography>
                        </TableCell>

                        <TableCell>
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
                                {item.phone || '--'}
                            </Typography>
                        </TableCell>

                        <TableCell>
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
                                {item.customerType || '--'}
                            </Typography>
                        </TableCell>

                        <TableCell>
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
                                {item.status || '--'}
                            </Typography>
                        </TableCell>

                        <TableCell>
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
                                {item.propertyType || '--'}
                            </Typography>
                        </TableCell>

                        <TableCell>
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
                                {item.transactionType || '--'}
                            </Typography>
                        </TableCell>

                        <TableCell>
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
                                {item.minArea || '--'}
                            </Typography>
                        </TableCell>

                        <TableCell>
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
                                {item.maxArea || '--'}
                            </Typography>
                        </TableCell>

                        <TableCell>
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
                                {item.budget || '--'}
                            </Typography>
                        </TableCell>

                        <TableCell>
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
                                {item.rooms || '--'}
                            </Typography>
                        </TableCell>

                        <TableCell>
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
                                {item.neighborhood || '--'}
                            </Typography>
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
