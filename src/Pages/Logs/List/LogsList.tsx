import {Chip, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'

import {createCardField} from '../../../Components/Card/CustomCard'
import {CustomCardList} from '../../../Components/Card/CustomCardList'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {formatDate} from '../../../Core/FormatDate'
import {createQueryParam} from '../../../Core/QueryParams'
import {setUtil} from '../../../redux/UtilSlice'
import type {LogsType} from '../Logs'

export type {LogsType} from '../Logs'

const resource = 'activity-logs'

function StatusChip({statusCode}: {statusCode: number}) {
    return (
        <Chip
            size="small"
            label={statusCode}
            color={statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warning' : 'success'}
            sx={{height: 22, fontSize: '11px', fontWeight: 700}}
        />
    )
}

const fields: {
    name: keyof LogsType
    label: string
    render?: (row: LogsType) => React.ReactNode
}[] = [
    {name: 'actor_name', label: 'کاربر'},
    {name: 'event', label: 'رویداد'},
    {name: 'method', label: 'متد'},
    {name: 'path', label: 'مسیر درخواست'},
    {
        name: 'status_code',
        label: 'کد پاسخ',
        render: (row) => <StatusChip statusCode={row.status_code} />,
    },
    {name: 'created_at', label: 'تاریخ ثبت', render: (row) => formatDate(row.created_at)},
]

const tableHeadCells = fields.map(({label, name}) => createTableHeadCells(label, name))
const cardFields = fields
    .filter(({name}) => !['event', 'created_at', 'status_code'].includes(name))
    .map(({label, name, render}) => createCardField(label, name, {
        render: render ?? ((row: LogsType) => row[name] as React.ReactNode ?? '--'),
        fullWidth: name === 'path',
    }))

const queryNames = [
    {field: 'event', label: 'رویداد', type: '', choice: []},
    {field: 'category', label: 'دسته‌بندی', type: '', choice: []},
    {field: 'method', label: 'متد درخواست', type: '', choice: []},
    {field: 'status_code', label: 'کد پاسخ', type: '', choice: []},
    {field: 'start_date', label: 'تاریخ شروع', type: 'date'},
    {field: 'end_date', label: 'تاریخ پایان', type: 'date'},
]

export function LogsList() {
    const dispatch = useDispatch()
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
    const [logs, setLogs] = useState<{
        total_results: number
        results: LogsType[]
    }>({total_results: 0, results: []})

    const getLogs = async () => {
        setLoading(true)
        try {
            const response = await DataProvider.get<{
                total_results: number
                results: LogsType[]
            }>(`${resource}/`, search)

            if (response) {
                setLogs({
                    total_results: response.data.total_results,
                    results: response.data.results,
                })
            }
        } catch (error: any) {
            dispatch(setUtil({
                open: true,
                message: error.message,
                severity: 'error',
            }))
        } finally {
            setLoading(false)
        }
    }

    useDeepCompareEffect(() => {
        getLogs()
    }, [search])

    const shared = {
        title: 'لاگ',
        resource,
        rows: logs.results,
        count: logs.total_results,
        params: search,
        setParams: setSearch,
        loading,
        getList: getLogs,
        hasDetail: true,
        noEdit: true,
        noDelete: true,
    }

    return (
        <ListPage
            viewKey={resource}
            defaultView="list"
            header="مدیریت لاگ‌ها"
            href={`${resource}/create`}
            searchField="search"
            searchText="جستجوی لاگ"
            setParams={setSearch}
            params={search}
            resource={resource}
            isCsvExport
            getList={getLogs}
            filtersData={queryNames}
            noCreate
            listData={logs.results}
            
        >
            {(view) => view === 'card' ? (
                <CustomCardList
                    {...shared}
                    fields={cardFields}
                    columns={{xs: 1, sm: 2, md: 3, xl: 4}}
                    renderers={{
                        title: (row: LogsType) => row.event,
                        subtitle: (row: LogsType) => formatDate(row.created_at),
                        status: (row: LogsType) => <StatusChip statusCode={row.status_code} />,
                    }}
                />
            ) : (
                <CustomTable
                    {...shared}
                    headCells={tableHeadCells}
                    handleSort={getLogs}
                    tableBodyCells={logs.results.map((item) => (
                        <React.Fragment key={item.id}>
                            {fields.map(({name, render}) => (
                                <TableCell key={name}>
                                    <Typography
                                        component="div"
                                        sx={{
                                            whiteSpace: 'normal',
                                            overflowWrap: 'anywhere',
                                            ...(name === 'path' && {maxWidth: 240, direction: 'ltr', textAlign: 'right'}),
                                        }}
                                    >
                                        {render ? render(item) : (item[name] as React.ReactNode) ?? '--'}
                                    </Typography>
                                </TableCell>
                            ))}
                        </React.Fragment>
                    ))}
                />
            )}
        </ListPage>
    )
}
