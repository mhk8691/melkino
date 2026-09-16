import {Chip, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import React, {useState} from 'react'
import {useQueryParams} from 'use-query-params'

import {createCardField} from '../../../Components/Card/CustomCard'
import {CustomCardList} from '../../../Components/Card/CustomCardList'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {formatDate} from '../../../Core/FormatDate'
import {createQueryParam} from '../../../Core/QueryParams'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('ادمین', 'admin_mobile'),
    createTableHeadCells('کاربر', 'user_mobile'),
    createTableHeadCells('نوع عملیات', 'action_type'),
    createTableHeadCells('متن عملیات', 'action'),
    createTableHeadCells('سطح', 'level'),
    createTableHeadCells('کد پاسخ', 'response_status'),
    createTableHeadCells('IP', 'ip_address'),
    createTableHeadCells('اندپوینت', 'endpoint'),
    createTableHeadCells('تاریخ', 'created_at'),
]

const queryNames = [
    {
        field: 'action_type',
        label: 'نوع عملیات',
        type: '',
        choice: [],
    },
    {
        field: 'start_date',
        label: 'تاریخ شروع',
        type: 'date',
    },
    {
        field: 'end_date',
        label: 'تاریخ پایان',
        type: 'date',
    },
]

export type LogsType = {
    id: number
    created_at: string
    action_type: string
    action: string
    level: string
    success: boolean
    response_status: number | null
    ip_address: string
    method: string
    endpoint: string
    tracking_code: string | null
    user_mobile: string
    admin_mobile: string | null
}

const resource = 'logs'

const levelColor = (level: string) => {
    switch (level) {
        case 'ERROR':
            return 'error.main'
        case 'WARNING':
            return 'warning.main'
        default:
            return 'success.main'
    }
}

function LevelChip({level}: {level: string}) {
    return (
        <Chip
            size="small"
            label={level}
            sx={{
                height: 22,
                fontSize: '11px',
                fontWeight: 700,
                color: levelColor(level),
            }}
        />
    )
}

const cellText = (value: any) => (
    <Typography sx={{whiteSpace: 'nowrap'}}>{value ?? '--'}</Typography>
)

/** همان ستون‌ها، اما برای بدنه‌ی کارت. متن عملیات و تاریخ در سربرگ کارت می‌آیند، سطح هم به‌صورت Chip */
const cardFields = [
    createCardField('نوع عملیات', 'action_type'),
    createCardField('کد پاسخ', 'response_status', {
        render: (row) => row.response_status ?? '--',
    }),
    createCardField('ادمین', 'admin_mobile', {render: (row) => row.admin_mobile ?? '--'}),
    createCardField('کاربر', 'user_mobile'),
    createCardField('IP', 'ip_address'),
    createCardField('اندپوینت', 'endpoint', {fullWidth: true}),
]

export function LogsList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)

    const [logs, setLogs] = useState<{
        total_results: number
        results: LogsType[]
    }>({
        total_results: 5,
        results: [
            {
                id: 1,
                created_at: '2026-08-20T12:30:00Z',
                action_type: 'LOGIN',
                action: 'ورود کاربر به سیستم',
                level: 'INFO',
                success: true,
                response_status: 200,
                ip_address: '192.168.1.10',
                method: 'POST',
                endpoint: '/api/auth/login/',
                tracking_code: 'TRK-10001',
                user_mobile: '09121234567',
                admin_mobile: null,
            },
            {
                id: 2,
                created_at: '2026-08-20T11:45:00Z',
                action_type: 'CREATE',
                action: 'ایجاد کاربر جدید',
                level: 'INFO',
                success: true,
                response_status: 201,
                ip_address: '192.168.1.15',
                method: 'POST',
                endpoint: '/api/users/',
                tracking_code: 'TRK-10002',
                user_mobile: '09123456789',
                admin_mobile: '09121111111',
            },
            {
                id: 3,
                created_at: '2026-08-20T10:20:00Z',
                action_type: 'UPDATE',
                action: 'ویرایش اطلاعات کاربر',
                level: 'INFO',
                success: true,
                response_status: 200,
                ip_address: '10.10.20.5',
                method: 'PUT',
                endpoint: '/api/users/25/',
                tracking_code: 'TRK-10003',
                user_mobile: '09129876543',
                admin_mobile: '09121111111',
            },
            {
                id: 4,
                created_at: '2026-08-20T09:10:00Z',
                action_type: 'DELETE',
                action: 'حذف کاربر',
                level: 'WARNING',
                success: false,
                response_status: 400,
                ip_address: '172.16.0.12',
                method: 'DELETE',
                endpoint: '/api/users/18/',
                tracking_code: 'TRK-10004',
                user_mobile: '09125555555',
                admin_mobile: '09122222222',
            },
            {
                id: 5,
                created_at: '2026-08-19T18:35:00Z',
                action_type: 'LOGIN',
                action: 'تلاش ناموفق برای ورود',
                level: 'ERROR',
                success: false,
                response_status: 401,
                ip_address: '185.20.30.40',
                method: 'POST',
                endpoint: '/api/auth/login/',
                tracking_code: 'TRK-10005',
                user_mobile: '09127777777',
                admin_mobile: null,
            },
        ],
    })

    const getLogs = () => {}

    // پراپ‌های مشترک بین جدول و کارت
    const shared = {
        title: 'لاگ',
        resource,
        rows: logs.results,
        count: logs.total_results,
        params: search,
        setParams: setSearch,
        loading,
        getList: getLogs,
        hasDetail: false,
        noEdit: true,
        noDelete: true,
    }

    return (
        <ListPage
            viewKey={resource}
            defaultView="list"
            header="مدیریت لاگ ها"
            href={`${resource}/create`}
            searchField="username"
            searchText="شماره تلفن"
            setParams={setSearch}
            params={search}
            resource={resource}
            isCsvExport
            getList={getLogs}
            filtersData={queryNames}
            noCreate
            listData={logs.results}
            defaultState={{
                status: '',
                username: '',
                createdAt: '',
            }}
        >
            {(view) =>
                view === 'card' ? (
                    <CustomCardList
                        {...shared}
                        fields={cardFields}
                        columns={{xs: 1, sm: 2, md: 3, xl: 4}}
                        renderers={{
                            title: (row) => row.action,
                            subtitle: (row) => formatDate(row.created_at),
                            status: (row) => <LevelChip level={row.level} />,
                        }}
                    />
                ) : (
                    <CustomTable
                        {...shared}
                        headCells={tableHeadCells}
                        handleSort={getLogs}
                        tableBodyCells={logs.results.map((item) => (
                            <React.Fragment key={item.id}>
                                <TableCell>{cellText(item.id)}</TableCell>
                                <TableCell>{cellText(item.admin_mobile)}</TableCell>
                                <TableCell>{cellText(item.user_mobile)}</TableCell>
                                <TableCell>{cellText(item.action_type)}</TableCell>
                                <TableCell>{cellText(item.action)}</TableCell>
                                <TableCell>
                                    <LevelChip level={item.level} />
                                </TableCell>
                                <TableCell>{cellText(item.response_status)}</TableCell>
                                <TableCell>{cellText(item.ip_address)}</TableCell>
                                <TableCell>{cellText(item.endpoint)}</TableCell>
                                <TableCell>{cellText(formatDate(item.created_at))}</TableCell>
                            </React.Fragment>
                        ))}
                    />
                )
            }
        </ListPage>
    )
}