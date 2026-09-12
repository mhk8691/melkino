import React, { useState } from 'react'
import TableCell from '@mui/material/TableCell'
import { Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useQueryParams } from 'use-query-params'

import { CustomTable } from '../../../Components/Table/CustomTable'
import { createTableHeadCells } from '../../../Components/Table/CustomTableHead'
import { ListPage } from '../../../Components/Table/ListPage'
import { DataProvider } from '../../../Core/DataProvider'
import { createQueryParam } from '../../../Core/QueryParams'
import { setUtil } from '../../../redux/UtilSlice'
import { formatDate } from '../../../Core/FormatDate'

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

    const dispatch = useDispatch()

    // const getLogs = async () => {
    //     setLoading(true)

    //     try {
    //         const response = await DataProvider.get<{
    //             success: boolean
    //             message: string
    //                 total_results: number
    //                 results: LogsType[]
    //         }>(`${resource}/`, search)
    //         console.log(response.data)
    //         setLogs({
    //             total_results: response.data.total_results,
    //             results: response.data.results,
    //         })
    //     } catch (error: any) {
    //         dispatch(
    //             setUtil({
    //                 open: true,
    //                 message: error.message,
    //                 severity: 'error',
    //             })
    //         )
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // useDeepCompareEffect(() => {
    //     getLogs()
    // }, [search])

    return (
        <ListPage
            header="مدیریت لاگ ها"
            href={`${resource}/create`}
            searchField="username"
            searchText="شماره تلفن"
            setParams={setSearch}
            params={search}
            resource={resource}
            // getList={getLogs}\
            isCsvExport
            getList={()=>{}}
            filtersData={queryNames}
            noCreate
            listData={logs.results}
            defaultState={{
                status: '',
                username: '',
                createdAt: '',
            }}
        >
            <CustomTable
                title={'لاگ'}
                resource={resource}
                headCells={tableHeadCells}
                rows={logs.results}
                count={logs.total_results}
                getList={()=>{}}
                // getList={getLogs}
                params={search}
                setParams={setSearch}
                handleSort={()=>{}}
                // handleSort={getLogs}
                loading={loading}
                hasDetail={false}
                noEdit
                noDelete
                tableBodyCells={logs.results.map((item) => (
                    <React.Fragment key={item.id}>
                        <TableCell>
                            <Typography sx={{ whiteSpace: 'nowrap' }}>
                                {item.id}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography sx={{ whiteSpace: 'nowrap' }}>
                                {item.admin_mobile ?? '--'}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography sx={{ whiteSpace: 'nowrap' }}>
                                {item.user_mobile ?? '--'}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography sx={{ whiteSpace: 'nowrap' }}>
                                {item.action_type}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography sx={{ whiteSpace: 'nowrap' }}>
                                {item.action}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography sx={{ whiteSpace: 'nowrap' }}>
                                {item.level}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography sx={{ whiteSpace: 'nowrap' }}>
                                {item.response_status ?? '--'}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography sx={{ whiteSpace: 'nowrap' }}>
                                {item.ip_address}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography sx={{ whiteSpace: 'nowrap' }}>
                                {item.endpoint}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography sx={{ whiteSpace: 'nowrap' }}>
                                {formatDate(item.created_at)}
                            </Typography>
                        </TableCell>
                    </React.Fragment>
                ))}
            />
        </ListPage>
    )
}