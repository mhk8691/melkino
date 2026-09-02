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
import {OwnersCreate} from '../Create/OwnersCreate'

const RESOURCE = 'owners'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('نام', 'name'),
    createTableHeadCells('تلفن', 'phone'),
    createTableHeadCells('منطقه', 'area'),
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
                name: 'علی رضایی',
                phone: '09121234567',
                area: 'منطقه 2',
            },
            {
                id: 2,
                name: 'محمد احمدی',
                phone: '09129876543',
                area: 'منطقه 5',
            },
            {
                id: 3,
                name: 'سارا کریمی',
                phone: '09351234567',
                area: 'منطقه 1',
            },
            {
                id: 4,
                name: 'رضا مرادی',
                phone: '09105555555',
                area: 'منطقه 4',
            },
            {
                id: 5,
                name: 'نگار حسینی',
                phone: '09221234567',
                area: 'منطقه 7',
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
            searchField="name"
            searchText="نام"
            nofilter
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={() => {}}
            // getList={getOwners}
            filtersData={[]}
            createModal={OwnersCreate}
            defaultState={{
                name: '',
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
                                {item.area || '--'}
                            </Typography>
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
