import {Avatar, Box, Typography} from '@mui/material'
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
import {SuperUsersType} from '../SuperUsers'
import {SuperUsersCreate} from '../Create/SuperUsersCreate'
import profileImage from '../../../Images/user.png'
import { useViewMode } from '../../../Core/useViewMode'
import { ViewModeToggle } from '../../User/ViewModeToggle'
import { UserCardGrid } from '../../User/UserCardGrid'
const RESOURCE = 'super-users'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('پروفایل', 'profileImage'),
    createTableHeadCells('نام', 'firstName'),
    createTableHeadCells('نام خانوادگی', 'lastName'),
    createTableHeadCells('شماره تلفن', 'phoneNumber'),
    createTableHeadCells('نقش', 'role'),
]

const queryNames = tableHeadCells.map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))

export function SuperUsersList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
    const [viewMode, setViewMode] = useViewMode(RESOURCE)

    const [superUsers, setSuperUsers] = useState<{
        total_results: number
        data: SuperUsersType[]
    }>({
        total_results: 5,
        data: [
            {
                id: '1',
                firstName: 'محمد',
                lastName: 'احمدی',
                phoneNumber: '09121234567',
                profileImage: profileImage,
                createdAt: '2026-09-01',
                updatedAt: '2026-09-05',
                role: 'super_user',
            },
            {
                id: '2',
                firstName: 'علی',
                lastName: 'رضایی',
                phoneNumber: '09129876543',
                profileImage: profileImage,
                createdAt: '2026-09-02',
                updatedAt: '2026-09-06',
                role: 'super_user',
            },
            {
                id: '3',
                firstName: 'حسین',
                lastName: 'کریمی',
                phoneNumber: '09351234567',
                profileImage: profileImage,
                createdAt: '2026-09-03',
                updatedAt: '2026-09-07',
                role: 'super_user',
            },
            {
                id: '4',
                firstName: 'رضا',
                lastName: 'موسوی',
                phoneNumber: '09114567890',
                profileImage: profileImage,
                createdAt: '2026-09-04',
                updatedAt: '2026-09-08',
                role: 'super_user',
            },
            {
                id: '5',
                firstName: 'امیر',
                lastName: 'حسینی',
                phoneNumber: '09361234567',
                profileImage: profileImage,
                createdAt: '2026-09-05',
                updatedAt: '2026-09-09',
                role: 'super_user',
            },
        ],
    })

    const dispatch = useDispatch()

    // const getSuperUsers = async () => {
    //     setLoading(true)
    //     try {
    //         let response = await DataProvider.get<{
    //             total_results: number
    //             results: SuperUsersType[]
    //         }>(`${RESOURCE}/`, search)
    //         if (response) {
    //             setSuperUsers({
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
    //     getSuperUsers()
    // }, [search])

    return (
        <ListPage
            header={'مدیریت سوپر ادمین'}
            href={RESOURCE + '/create'}
            searchField="firstName"
            searchText="نام"
            nofilter
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={() => {}}
            // getList={getSuperUsers}
            filtersData={[]}
            createModal={SuperUsersCreate}
            defaultState={{
                name: '',
            }}
        >
              <Box sx={{display: 'flex', justifyContent: 'flex-end', my: 2 , px:1}}>
                            <ViewModeToggle value={viewMode} onChange={setViewMode} />
                        </Box>
            {
                viewMode === 'card' ? <UserCardGrid rows={superUsers.data} />:
            <CustomTable
                title="سوپر یوزر"
                resource={RESOURCE}
                headCells={tableHeadCells}
                rows={superUsers.data}
                count={superUsers.total_results}
                getList={() => {}}
                // getList={getSuperUsers}
                params={search}
                setParams={setSearch}
                handleSort={() => {}}
                // handleSort={getSuperUsers}
                loading={loading}
                hasDetail={true}
                tableBodyCells={superUsers.data.map((item, index) => (
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
                            <Avatar
                                src={item.profileImage || ''}
                                alt={`${item.firstName} ${item.lastName}`}
                                sx={{
                                    width: 40,
                                    height: 40,
                                }}
                            />
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
                                {item.firstName || '--'}
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
                                {item.lastName || '--'}
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
                                {item.phoneNumber || '--'}
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
                                {item.role || '--'}
                            </Typography>
                        </TableCell>
                    </>
                ))}
            />
            }

        </ListPage>
    )
}
