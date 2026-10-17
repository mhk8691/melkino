import {Avatar, Box, Button, Stack, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import {useQueryParams} from 'use-query-params'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {createQueryParam} from '../../../Core/QueryParams'
import {UsersType} from '../Users'
import profileImage from '../../../Images/user.png'
import {UsersCreate} from '../Create/UsersCreate'
import {UserCardGrid} from '../UserCardGrid'
import {ViewModeToggle} from '../ViewModeToggle'
import {useViewMode} from '../../../Core/useViewMode'

const RESOURCE = 'user'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('نام و نام خانوادگی', 'fullname'),
    createTableHeadCells('شماره تماس', 'phoneNumber'),
    createTableHeadCells('کد ملی', 'nationalId'),
    createTableHeadCells('شهر', 'city'),
    createTableHeadCells('آدرس', 'address'),
    createTableHeadCells('تاریخ ایجاد', 'createdAt'),
    createTableHeadCells('نقش', 'role'),
    createTableHeadCells('نوع کاربر', 'user_type'),
    createTableHeadCells('عملیات', 'action'),
]

const queryNames = tableHeadCells.slice(1,5).map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))

export function UsersList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))

    const [loading] = useState(false)
    const [viewMode, setViewMode] = useViewMode(RESOURCE)

    const [users] = useState<{
        total_results: number
        data: UsersType[]
    }>({
        total_results: 5,
        data: [
            {
                id: 'USR-1001',
                firstName: 'محمد',
                lastName: 'احمدی',
                phoneNumber: '09121234567',
                nationalId: '0012345678',
                birthDate: '1378/05/15',
                city: 'تهران',
                address: 'تهران، سعادت‌آباد، بلوار پاکنژاد',
                profileImage: profileImage,
                createdAt: '2026-09-01',
                updatedAt: '2026-09-05',
                role: 'regular_user',
                userType: 'consumer',
            },
            {
                id: 'USR-1002',
                firstName: 'علی',
                lastName: 'رضایی',
                phoneNumber: '09129876543',
                nationalId: '0023456789',
                birthDate: '1375/11/02',
                city: 'تهران',
                address: 'تهران، جردن، خیابان نلسون ماندلا',
                profileImage: profileImage,
                createdAt: '2026-09-02',
                updatedAt: '2026-09-06',
                role: 'regular_user',
                userType: 'investor',
            },
            {
                id: 'USR-1003',
                firstName: 'حسین',
                lastName: 'کریمی',
                phoneNumber: '09351234567',
                nationalId: '0034567890',
                birthDate: '1380/03/20',
                city: 'کرج',
                address: 'کرج، عظیمیه، بلوار شریعتی',
                profileImage: profileImage,
                createdAt: '2026-09-03',
                updatedAt: '2026-09-07',
                role: 'regular_user',
                userType: 'consumer',
            },
            {
                id: 'USR-1004',
                firstName: 'رضا',
                lastName: 'موسوی',
                phoneNumber: '09114567890',
                nationalId: '0045678901',
                birthDate: '1372/09/10',
                city: 'اصفهان',
                address: 'اصفهان، خیابان چهارباغ بالا',
                profileImage: profileImage,
                createdAt: '2026-09-04',
                updatedAt: '2026-09-08',
                role: 'regular_user',
                userType: 'consumer',
            },
            {
                id: 'USR-1005',
                firstName: 'امیر',
                lastName: 'حسینی',
                phoneNumber: '09361234567',
                nationalId: '0056789012',
                birthDate: '1382/01/25',
                city: 'شیراز',
                address: 'شیراز، معالی‌آباد، خیابان دوستان',
                profileImage: profileImage,
                createdAt: '2026-09-05',
                updatedAt: '2026-09-09',
                role: 'regular_user',
                userType: 'consumer',
            },
        ],
    })

    return (
        <ListPage
            header="مدیریت کاربران عادی"
            href={RESOURCE + '/create'}
            searchField="firstName"
            searchText="نام"
            setParams={setSearch}
            params={search}
            isCsvExport
            resource={RESOURCE}
            getList={() => {}}
            filtersData={queryNames}
            createModal={UsersCreate}
            defaultState={{
                id: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                nationalId: '',
                birthDate: '',
                city: '',
                address: '',
                profileImage: null,
                createdAt: '',
                updatedAt: '',
                role: 'regular_user',
            }}
        >
            <Box sx={{display: 'flex', justifyContent: 'flex-end', my: 2, px: 1}}>
                <ViewModeToggle value={viewMode} onChange={setViewMode} />
            </Box>

            {viewMode === 'card' ? (
                <UserCardGrid
                    rows={users.data}
                    resource={RESOURCE}
                    getList={() => {}}
                    title="کاربر عادی"
                />
            ) : (
                <CustomTable
                    title="کاربران عادی"
                    resource={RESOURCE}
                    headCells={tableHeadCells}
                    rows={users.data}
                    count={users.total_results}
                    getList={() => {}}
                    params={search}
                    setParams={setSearch}
                    handleSort={() => {}}
                    loading={loading}
                    hasDetail={true}
                    tableBodyCells={users.data.map((item) => (
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
                                <Stack direction={'row'} gap={1} alignItems={'center'}>
                                    <Avatar
                                        src={item.profileImage || ''}
                                        alt={`${item.firstName} ${item.lastName}`}
                                        sx={{
                                            width: 40,
                                            height: 40,
                                        }}
                                    />
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
                                        {item.firstName + item.lastName || '--'}
                                    </Typography>
                                </Stack>
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
                                    {item.nationalId || '--'}
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
                                    {item.city || '--'}
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
                                        maxWidth: '300px',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {item.address || '--'}
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
                                    {item.createdAt || '--'}
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
                                    {item.userType === 'consumer' ? 'مصرف کننده' : 'سرمایه گذار'}
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
                            <TableCell>
                                <Button variant="outlined" color="success" sx={{whiteSpace:'nowrap'}}>
                                    ورود به پنل کاربری
                                </Button>
                            </TableCell>
                        </>
                    ))}
                />
            )}
        </ListPage>
    )
}
