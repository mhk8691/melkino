
import {Avatar, Box, Chip, Stack, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {Fragment, useState} from 'react'
import {useQueryParams} from 'use-query-params'
import {useDispatch} from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'

import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {createQueryParam} from '../../../Core/QueryParams'
import {setUtil} from '../../../redux/UtilSlice'
import profileImage from '../../../Images/user.png'

import {AgencyType} from '../Agency'
import {AgencyCreate} from '../Create/AgencyCreate'
import {ViewModeToggle} from '../../User/ViewModeToggle'
import {useViewMode} from '../../../Core/useViewMode'
import {DataProvider} from '../../../Core/DataProvider'

const RESOURCE = 'users'
const LIST_RESOURCE = 'users/?group=agency'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('نام و نام خانوادگی', 'full_name'),
    createTableHeadCells('شماره تماس', 'phone'),
    createTableHeadCells('نقش', 'role_display'),
    createTableHeadCells('نوع کاربر', 'user_type_display'),
    createTableHeadCells('وضعیت حساب', 'account_status'),
    createTableHeadCells('وضعیت احراز هویت', 'verification_status'),
    createTableHeadCells('تأیید شماره تماس', 'phone_verified'),
    createTableHeadCells('تکمیل پروفایل', 'has_profile'),
    createTableHeadCells('تاریخ ثبت‌نام', 'date_joined'),
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
        field: 'account_status',
        label: 'وضعیت حساب',
        type: '',
    },
    {
        field: 'verification_status',
        label: 'وضعیت احراز هویت',
        type: '',
    },
]

type AgencyListResponse = {
    total_results: number
    results: AgencyType[]
}

const getVerificationLabel = (status: string) => {
    const labels: Record<string, string> = {
        not_started: 'شروع نشده',
        verified: 'تأیید شده',
        pending: 'در انتظار بررسی',
        rejected: 'رد شده',
        unverified: 'تأیید نشده',
    }

    return labels[status] ?? status
}

const formatDate = (value: string | null) => {
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

export function AgencyList() {
    const [search, setSearch] = useQueryParams(
        createQueryParam(queryNames),
    )

    const [loading, setLoading] = useState(false)

    const [viewMode, setViewMode] = useViewMode(LIST_RESOURCE)

    const [agency, setAgency] = useState<{
        total_results: number
        data: AgencyType[]
    }>({
        total_results: 0,
        data: [],
    })

    const dispatch = useDispatch()

    const getAgency = async () => {
        setLoading(true)

        try {
            const response =
                await DataProvider.get<AgencyListResponse>(
                    LIST_RESOURCE,
                    search,
                )

            setAgency({
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
                            : 'خطا در دریافت اطلاعات املاکی‌ها',
                    severity: 'error',
                }),
            )
        } finally {
            setLoading(false)
        }
    }

    useDeepCompareEffect(() => {
        getAgency()
    }, [search])

    return (
        <ListPage
            header="مدیریت املاکی‌ها"
            href={`agencies/create`}
            searchField="phone"
            searchText="شماره تماس"
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={getAgency}
            isCsvExport
            filtersData={queryNames}
            createModal={AgencyCreate}
            defaultState={{
                phone: '',
            }}
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
                //     rows={agency.data}
                //     resource={RESOURCE}
                //     getList={getAgency}
                //     title="املاکی‌ها"
                // />
                <></>
            ) : (
                <CustomTable
                    title="املاکی‌ها"
                    resource={RESOURCE}
                    headCells={tableHeadCells}
                    rows={agency.data}
                    count={agency.total_results}
                    getList={getAgency}
                    params={search}
                    setParams={setSearch}
                    handleSort={() => {}}
                    loading={loading}
                    hasDetail
                    tableBodyCells={agency.data.map((item) => (
                        <Fragment key={item.id}>
                            <TableCell>
                                <Typography variant="body2">
                                    {item.id}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >
                                    <Avatar
                                        src={profileImage}
                                        alt={item.full_name || 'املاکی'}
                                        sx={{
                                            width: 40,
                                            height: 40,
                                        }}
                                    />

                                    <Typography
                                        variant="body2"
                                        sx={{whiteSpace: 'nowrap'}}
                                    >
                                        {item.full_name ||
                                            [item.first_name, item.last_name]
                                                .filter(Boolean)
                                                .join(' ') ||
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
                                    {item.role_display || item.role || '--'}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="body2">
                                    {item.user_type_display || '--'}
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
                                    label={getVerificationLabel(
                                        item.verification_status,
                                    )}
                                    color={
                                        item.verification_status === 'verified'
                                            ? 'success'
                                            : item.verification_status === 'rejected'
                                              ? 'error'
                                              : 'default'
                                    }
                                />
                            </TableCell>

                            <TableCell>
                                <Typography variant="body2">
                                    {item.phone_verified
                                        ? 'تأیید شده'
                                        : 'تأیید نشده'}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="body2">
                                    {item.has_profile
                                        ? 'تکمیل شده'
                                        : 'تکمیل نشده'}
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
                        </Fragment>
                    ))}
                />
            )}
        </ListPage>
    )
}
