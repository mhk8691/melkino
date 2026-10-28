
import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import { useCallback, useState } from 'react'
import { useQueryParams } from 'use-query-params'

import { CustomTable } from '../../../Components/Table/CustomTable'
import { createTableHeadCells } from '../../../Components/Table/CustomTableHead'
import { ListPage } from '../../../Components/Table/ListPage'
import { createQueryParam } from '../../../Core/QueryParams'

import type { UsersType } from '../Users'
import profileImage from '../../../Images/user.png'
import { UsersCreate } from '../Create/UsersCreate'
import { UserCardGrid } from '../UserCardGrid'
import { ViewModeToggle } from '../ViewModeToggle'
import { useViewMode } from '../../../Core/useViewMode'

const RESOURCE = 'user'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('نام و نام خانوادگی', 'full_name'),
    createTableHeadCells('شماره تماس', 'phone'),
    createTableHeadCells('کد ملی', 'national_code'),
    createTableHeadCells('شهر', 'city'),
    createTableHeadCells('آدرس', 'address'),
    createTableHeadCells('تاریخ ایجاد', 'date_joined'),
    createTableHeadCells('نقش', 'role'),
    createTableHeadCells('نوع کاربر', 'user_type'),
    createTableHeadCells('عملیات', 'action'),
]

const queryNames = tableHeadCells.slice(1, 5).map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))

interface UsersListResponse {
    total_results: number
    data: UsersType[]
}

const initialUsers: UsersListResponse = {
    total_results: 0,
    data: [],
}

const defaultUser: UsersType = {
    id: '0',
    phone: '',
    email: null,

    first_name: '',
    last_name: '',

    national_code: null,
    birth_date: null,
    avatar: null,

    province: null,
    city: null,
    postal_code: null,
    address: null,

    user_type: 'consumer',
    user_type_display: 'مصرف‌کننده',

    role: 'user',
    role_display: 'کاربر عادی',

    account_status: 'active',
    account_status_display: 'فعال',

    verification_status: 'unverified',
    verification_status_display: 'تأیید نشده',

    phone_verified: false,
    national_code_verified: false,

    is_active: true,
    is_staff: false,
    is_superuser: false,

    admin_level: null,
    has_profile: false,

    last_login: '',
    date_joined: '',
}

const formatDate = (value: string | null): string => {
    if (!value) return '--'

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return value
    }

    return new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(date)
}

export function UsersList() {
    const [search, setSearch] = useQueryParams(
        createQueryParam(queryNames)
    )

    const [loading] = useState(false)

    const [viewMode, setViewMode] = useViewMode(RESOURCE)

    const [users] = useState<UsersListResponse>(initialUsers)

    const getList = useCallback(() => {
        // اتصال به API دریافت لیست کاربران
    }, [])

    const handleSort = useCallback(() => {
        // اتصال مرتب‌سازی به API
    }, [])

    return (
        <ListPage
            header="مدیریت کاربران عادی"
            href={`${RESOURCE}/create`}
            searchField="full_name"
            searchText="نام و نام خانوادگی"
            setParams={setSearch}
            params={search}
            isCsvExport
            resource={RESOURCE}
            getList={getList}
            filtersData={queryNames}
            createModal={UsersCreate}
            defaultState={defaultUser}
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
                <UserCardGrid
                    rows={users.data}
                    resource={RESOURCE}
                    getList={getList}
                    title="کاربر عادی"
                />
            ) : (
                <CustomTable
                    title="کاربران عادی"
                    resource={RESOURCE}
                    headCells={tableHeadCells}
                    rows={users.data}
                    count={users.total_results}
                    getList={getList}
                    params={search}
                    setParams={setSearch}
                    handleSort={handleSort}
                    loading={loading}
                    hasDetail={true}
                    tableBodyCells={users.data.map((item) => (
                        <>
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    sx={{ whiteSpace: 'nowrap' }}
                                >
                                    {item.id}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Stack
                                    direction="row"
                                    gap={1}
                                    alignItems="center"
                                >
                                    <Avatar
                                        src={typeof item.avatar === 'string' ? item.avatar :profileImage}
                                        alt={item.first_name}
                                        sx={{
                                            width: 40,
                                            height: 40,
                                        }}
                                    />

                                    <Typography
                                        variant="body2"
                                        sx={{ whiteSpace: 'nowrap' }}
                                    >
                                        {
                                            `${item.first_name} ${item.last_name}`.trim() ||
                                            '--'}
                                    </Typography>
                                </Stack>
                            </TableCell>

                            <TableCell>
                                <Typography
                                    variant="body2"
                                    sx={{ whiteSpace: 'nowrap' }}
                                >
                                    {item.phone || '--'}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="body2">
                                    {item.national_code || '--'}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="body2">
                                    {item.city || '--'}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography
                                    variant="body2"
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
                                    sx={{ whiteSpace: 'nowrap' }}
                                >
                                    {formatDate(item.date_joined)}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography
                                    variant="body2"
                                    sx={{ whiteSpace: 'nowrap' }}
                                >
                                    {item.role_display ||
                                        (item.role === 'superadmin'
                                            ? 'سوپر ادمین'
                                            : 'کاربر عادی')}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography
                                    variant="body2"
                                    sx={{ whiteSpace: 'nowrap' }}
                                >
                                    {item.user_type_display ||
                                        (item.user_type === 'consumer'
                                            ? 'مصرف‌کننده'
                                            : 'سرمایه‌گذار')}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Button
                                    variant="outlined"
                                    color="success"
                                    sx={{
                                        whiteSpace: 'nowrap',
                                    }}
                                >
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
