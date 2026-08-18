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
    createTableHeadCells('آیدی', 'id'),
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
    const [selectedIds, setSelectedIds] = useState<string[]>([])

    const [logs, setLogs] = useState<{
        total_results: number
        results: LogsType[]
    }>({
        total_results: 0,
        results: [],
    })

    const dispatch = useDispatch()

    const getLogs = async () => {
        setLoading(true)

        try {
            const response = await DataProvider.get<{
                success: boolean
                message: string
                    total_results: number
                    results: LogsType[]
            }>(`${resource}/`, search)
            console.log(response.data)
            setLogs({
                total_results: response.data.total_results,
                results: response.data.results,
            })
        } catch (error: any) {
            dispatch(
                setUtil({
                    open: true,
                    message: error.message,
                    severity: 'error',
                })
            )
        } finally {
            setLoading(false)
        }
    }

    useDeepCompareEffect(() => {
        getLogs()
    }, [search])

    return (
        <ListPage
            isCsvExport
            header="مدیریت لاگ ها"
            href={`${resource}/create`}
            searchField="username"
            searchText="شماره تلفن"
            setParams={setSearch}
            params={search}
            resource={resource}
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
            <CustomTable
            groupEdit
              selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
                resource={resource}
                headCells={tableHeadCells}
                rows={logs.results}
                count={logs.total_results}
                getList={getLogs}
                params={search}
                setParams={setSearch}
                handleSort={getLogs}
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