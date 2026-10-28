
import {
    Avatar,
    Box,
    Chip,
    Stack,
    Typography,
} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {Fragment, useCallback, useState} from 'react'
import {useQueryParams} from 'use-query-params'
import {useDispatch} from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'

import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {createQueryParam} from '../../../Core/QueryParams'
import {DataProvider} from '../../../Core/DataProvider'
import {setUtil} from '../../../redux/UtilSlice'

import type {UsersType} from '../Users'
import profileImage from '../../../Images/user.png'
import {UsersCreate} from '../Create/UsersCreate'
import {UserCardGrid} from '../UserCardGrid'
import {ViewModeToggle} from '../ViewModeToggle'
import {useViewMode} from '../../../Core/useViewMode'

const RESOURCE = 'users'
const LIST_RESOURCE = 'users/?group=user'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('نام و نام خانوادگی', 'full_name'),
    createTableHeadCells('شماره تماس', 'phone'),
    createTableHeadCells('کد ملی', 'national_code'),
    createTableHeadCells('شهر', 'city'),
    createTableHeadCells('آدرس', 'address'),
    createTableHeadCells('تاریخ ثبت‌نام', 'date_joined'),
    createTableHeadCells('نقش', 'role'),
    createTableHeadCells('نوع کاربر', 'user_type'),
    createTableHeadCells('وضعیت حساب', 'account_status'),
    createTableHeadCells('احراز هویت', 'verification_status'),
]

const queryNames = [
    {
        field: 'full_name',
        label: 'نام و نام خانوادگی',
        type: '',
    },
    {
        field: 'phone',
        label: 'شماره تماس',
        type: '',
    },
    {
        field: 'national_code',
        label: 'کد ملی',
        type: '',
    },
    {
        field: 'city',
        label: 'شهر',
        type: '',
    },
]

interface UsersApiResponse {
    total_results: number
    results: UsersType[]
}

interface UsersListState {
    total_results: number
    data: UsersType[]
}

const initialUsers: UsersListState = {
    total_results: 0,
    data: [],
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

const getVerificationLabel = (status: string): string => {
    const labels: Record<string, string> = {
        not_started: 'شروع نشده',
        verified: 'تأیید شده',
        pending: 'در انتظار بررسی',
        rejected: 'رد شده',
        unverified: 'تأیید نشده',
    }

    return labels[status] ?? status
}

const getVerificationColor = (
    status: string,
): 'success' | 'error' | 'warning' | 'default' => {
    switch (status) {
        case 'verified':
            return 'success'
        case 'rejected':
            return 'error'
        case 'pending':
            return 'warning'
        default:
            return 'default'
    }
}

export function UsersList() {
    const [search, setSearch] = useQueryParams(
        createQueryParam(queryNames),
    )

    const [loading, setLoading] = useState(false)

    const [viewMode, setViewMode] = useViewMode(LIST_RESOURCE)

    const [users, setUsers] = useState<UsersListState>(initialUsers)

    const dispatch = useDispatch()

    const getList = useCallback(async () => {
        setLoading(true)

        try {
            const response = await DataProvider.get<UsersApiResponse>(
                LIST_RESOURCE,
                search,
            )

            setUsers({
                total_results: response.data.total_results ?? 0,
                data: response.data.results ?? [],
            })
        } catch (error) {
            dispatch(
                setUtil({
                    open: true,
                    message:
                        error instanceof Error
                            ? error.message
                            : 'خطا در دریافت لیست کاربران',
                    severity: 'error',
                }),
            )
        } finally {
            setLoading(false)
        }
    }, [search, dispatch])

    useDeepCompareEffect(() => {
        getList()
    }, [search])

    return (
        <ListPage
            header="مدیریت کاربران عادی"
            href={`user/create`}
            searchField="full_name"
            searchText="نام و نام خانوادگی"
            setParams={setSearch}
            params={search}
            isCsvExport
            resource={RESOURCE}
            getList={getList}
            filtersData={queryNames}
            createModal={UsersCreate}
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
                // <UserCardGrid
                //     rows={users.data}
                //     resource={RESOURCE}
                //     getList={getList}
                //     title="کاربران عادی"
                // />
                <></>
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
                    handleSort={() => {}}
                    loading={loading}
                    hasDetail
                    tableBodyCells={users.data.map((item) => (
                        <Fragment key={item.id}>
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    sx={{whiteSpace: 'nowrap'}}
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
                                        src={
                                            typeof item.avatar === 'string'
                                                ? item.avatar
                                                : profileImage
                                        }
                                        alt={
                                            item.first_name ||
                                            'کاربر'
                                        }
                                        sx={{
                                            width: 40,
                                            height: 40,
                                        }}
                                    />

                                    <Typography
                                        variant="body2"
                                        sx={{whiteSpace: 'nowrap'}}
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
                                    sx={{whiteSpace: 'nowrap'}}
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
                                    sx={{whiteSpace: 'nowrap'}}
                                >
                                    {formatDate(item.date_joined)}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography
                                    variant="body2"
                                    sx={{whiteSpace: 'nowrap'}}
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
                                    sx={{whiteSpace: 'nowrap'}}
                                >
                                    {item.user_type_display ||
                                        (item.user_type === 'consumer'
                                            ? 'مصرف‌کننده'
                                            : 'سرمایه‌گذار')}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Chip
                                    size="small"
                                    variant="outlined"
                                    label={
                                        item.account_status_display ||
                                        (item.account_status === 'active'
                                            ? 'فعال'
                                            : item.account_status === 'inactive'
                                              ? 'غیرفعال'
                                              : 'مسدود')
                                    }
                                    color={
                                        item.account_status === 'active'
                                            ? 'success'
                                            : item.account_status === 'suspended'
                                              ? 'error'
                                              : 'default'
                                    }
                                />
                            </TableCell>

                            <TableCell>
                                <Chip
                                    size="small"
                                    variant="outlined"
                                    label={
                                        item.verification_status_display ||
                                        getVerificationLabel(
                                            item.verification_status,
                                        )
                                    }
                                    color={getVerificationColor(
                                        item.verification_status,
                                    )}
                                />
                            </TableCell>
                        </Fragment>
                    ))}
                />
            )}
        </ListPage>
    )
}
