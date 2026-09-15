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
import {CustomersType} from '../Owners'

const RESOURCE = 'owners'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('نام و نام خانوادگی', 'full_name'),
    createTableHeadCells('تلفن', 'phone_number'),
    createTableHeadCells('شهر', 'cities'),
    createTableHeadCells('محله', 'neighborhoods'),
]

const queryNames = tableHeadCells.map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))

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
                neighborhoods:'آزادگان'
            },
            {
                id: 2,
                full_name: 'محمد احمدی',
                phone_number: '09129876543',
                cities: 'تهران',
                neighborhoods:'پیروزی'
            },
        
        ],
    })
    const dispatch = useDispatch()

    // const getOwners = async () => {
    //     setLoading(true)
    //     try {
    //         let response = await DataProvider.get<{
    //             total_results: number
    //             results: CustomersType[]
    //         }>(`${RESOURCE}/`, search)
    //         if (response) {
    //             setOwners({
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
    //     getOwners()
    // }, [search])

    return (
        <ListPage
            header="مدیریت مالکین"
            href={RESOURCE + '/create'}
            searchField="full_name"
            searchText="نام"
            nofilter
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={() => {}}
            // getList={getOwners}
            filtersData={[]}
            noCreate
            defaultState={{
                full_name: '',
            }}
        >
            <CustomTable
                title="مالکین"
                resource={RESOURCE}
                headCells={tableHeadCells}
                rows={owners.data}
                count={owners.total_results}
                getList={() => {}}
                // getList={getOwners}
                params={search}
                setParams={setSearch}
                handleSort={() => {}}
                // handleSort={getOwners}
                loading={loading}
                hasDetail={true}
                tableBodyCells={owners.data.map((item) => (
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
                                {item.full_name || '--'}
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
                                {item.phone_number || '--'}
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
                                {item.cities || '--'}
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
                                {item.neighborhoods || '--'}
                            </Typography>
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
