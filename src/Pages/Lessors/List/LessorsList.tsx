import {Box, Typography} from '@mui/material'
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
import { LessorsType } from '../Lessors'

const RESOURCE = 'lessors'

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
export function LessorsList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
  const [lessors, setLessors] = useState<{
    total_results: number
    data: LessorsType[]
}>({
    total_results: 5,
    data: [
        {
            id: 1,
            full_name: 'علی رضایی',
            phone_number: '09125463121',
            cities: 'قم',
            neighborhoods: 'زنبیل آباد',
        },
        {
            id: 2,
            full_name: 'تغییر ساعات پشتیبانی',
            phone_number: '09105463121',
            cities: 'تهران',
            neighborhoods: 'پیروزی',
        },
      
    ],
})
    const dispatch = useDispatch()
    // const getLessors = async () => {
    //     setLoading(true)
    //     try {
    //         let response = await DataProvider.get<{
    //             total_results: number
    //             results: LessorsType[]
    //         }>(`${RESOURCE}/`, search)
    //         if (response) {
    //             setLessors({
    //                 total_results: response.data.total_results,
    //                 data: response.data.results,
    //             })
    //         }
    //     } catch (error: any) {
    //         dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
    //     }
    //     setLoading(false)
    // }
    // useDeepCompareEffect(() => {
    //     getLessors()
    // }, [search])

    return (
        <ListPage
            header={'مدیریت موجر ها'}
            href={ '/landlord-tenant/lessors/create'}
            searchField="title"
            searchText="نام"
            nofilter
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={()=>{}}
            // getList={getLessors}
            filtersData={[]}
            noCreate
            defaultState={{
                name: '',
            }}
        >
            <CustomTable
            title='موجر'
                resource={RESOURCE}
                headCells={tableHeadCells}
                rows={lessors.data}
                count={lessors.total_results}
                getList={()=>{}}
                // getList={getLessors}
                params={search}
                setParams={setSearch}
                handleSort={()=>{}}
                // handleSort={getLessors}
                loading={loading}
                hasDetail={true}
                tableBodyCells={lessors.data.map((item, index) => (
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
