
import {Avatar, Box, Chip, Stack, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {Fragment, useState} from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'
import {useDispatch} from 'react-redux'

import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {createQueryParam} from '../../../Core/QueryParams'
import {setUtil} from '../../../redux/UtilSlice'

import type {UsersType} from '../../User/Users'
import {SuperUsersCreate} from '../Create/SuperUsersCreate'
import profileImage from '../../../Images/user.png'
import {useViewMode} from '../../../Core/useViewMode'
import {ViewModeToggle} from '../../User/ViewModeToggle'
import {UserCardGrid} from '../../User/UserCardGrid'

const RESOURCE = 'users'
const LIST_RESOURCE = 'users/?group=superadmin'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('نام و نام خانوادگی', 'full_name'),
    createTableHeadCells('شماره تماس', 'phone'),
    createTableHeadCells('ایمیل', 'email'),
    createTableHeadCells('نقش', 'role'),
    createTableHeadCells('وضعیت حساب', 'account_status'),
    createTableHeadCells('احراز هویت', 'verification_status'),
    createTableHeadCells('تاریخ ثبت‌نام', 'date_joined'),
    createTableHeadCells('آخرین ورود', 'last_login'),
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
        field: 'email',
        label: 'ایمیل',
        type: '',
    },
]

interface SuperUsersApiResponse {
    total_results: number
    results: UsersType[]
}

interface SuperUsersListState {
    total_results: number
    data: UsersType[]
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

export function SuperUsersList() {
    const [search, setSearch] = useQueryParams(
        createQueryParam(queryNames),
    )

    const [loading, setLoading] = useState(false)

    const [viewMode, setViewMode] = useViewMode(LIST_RESOURCE)

    const [superUsers, setSuperUsers] = useState<SuperUsersListState>({
        total_results: 0,
        data: [],
    })

    const dispatch = useDispatch()

    const getSuperUsers = async () => {
        setLoading(true)

        try {
            const response =
                await DataProvider.get<SuperUsersApiResponse>(
                    LIST_RESOURCE,
                    search,
                )

            setSuperUsers({
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
                            : 'خطا در دریافت اطلاعات سوپر ادمین‌ها',
                    severity: 'error',
                }),
            )
        } finally {
            setLoading(false)
        }
    }

    useDeepCompareEffect(() => {
        getSuperUsers()
    }, [search])

    return (
        <ListPage
            header="مدیریت سوپر ادمین‌ها"
            isCsvExport
            href={`super-users/create`}
            searchField="full_name"
            searchText="نام و نام خانوادگی"
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={getSuperUsers}
            filtersData={queryNames}
            createModal={SuperUsersCreate}
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
                    rows={superUsers.data}
                    resource={RESOURCE}
                    getList={getSuperUsers}
                    title="سوپر ادمین‌ها"
                />
            ) : (
                <CustomTable
                    title="سوپر ادمین‌ها"
                    resource={RESOURCE}
                    headCells={tableHeadCells}
                    rows={superUsers.data}
                    count={superUsers.total_results}
                    getList={getSuperUsers}
                    params={search}
                    setParams={setSearch}
                    handleSort={() => {}}
                    loading={loading}
                    hasDetail
                    tableBodyCells={superUsers.data.map((item) => (
                        <Fragment key={item.id}>
                            <TableCell>
                                <Typography variant="body2">
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
                                        alt={item.first_name || 'سوپر ادمین'}
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
                                <Typography variant="body2">
                                    {item.phone || '--'}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="body2">
                                    {item.email || '--'}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="body2">
                                    {item.role_display || item.role || '--'}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Chip
                                    size="small"
                                    variant="outlined"
                                    label={
                                        item.account_status_display ||
                                        item.account_status
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
                                    color={
                                        item.verification_status === 'verified'
                                            ? 'success'
                                            : item.verification_status === 'rejected'
                                              ? 'error'
                                              : item.verification_status === 'pending'
                                                ? 'warning'
                                                : 'default'
                                    }
                                />
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
                                    {formatDate(item.last_login)}
                                </Typography>
                            </TableCell>
                        </Fragment>
                    ))}
                />
            )}
        </ListPage>
    )
}
