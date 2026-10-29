import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {DataProvider} from '../../../Core/DataProvider'
import {setUtil} from '../../../redux/UtilSlice'
import { Chip, Typography } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import { useQueryParams } from 'use-query-params'
import { createCardField } from '../../../Components/Card/CustomCard'
import { CustomCardList } from '../../../Components/Card/CustomCardList'
import { CustomTable } from '../../../Components/Table/CustomTable'
import { createTableHeadCells } from '../../../Components/Table/CustomTableHead'
import { ListPage } from '../../../Components/Table/ListPage'
import { createQueryParam } from '../../../Core/QueryParams'
import {formatDate} from '../../../Core/FormatDate'
import { TasksCreate } from '../Create/TasksCreate'
import { TasksType, taskStatusOptions } from '../Tasks'

const RESOURCE = 'tasks'

function TaskStatusChip({status}: {status: TasksType['status']}) {
    return (
        <Chip
            size="small"
            label={taskStatusOptions.find((option) => option.value === status)?.label ?? '--'}
            color={status === 'done' ? 'success' : status === 'in_progress' ? 'info' : 'warning'}
        />
    )
}

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('عنوان', 'title'),
    createTableHeadCells('وضعیت', 'status'),
    createTableHeadCells('تاریخ سررسید', 'due_date'),
    createTableHeadCells('ایجادکننده', 'created_by'),
]

const cardFields = [
    createCardField('شناسه', 'id'),
    createCardField('وضعیت', 'status', {render: (row: TasksType) => <TaskStatusChip status={row.status} /> }),
    createCardField('تاریخ سررسید', 'due_date', {render: (row: TasksType) => formatDate(row.due_date)}),
    createCardField('ایجادکننده', 'created_by'),
]

const queryNames = tableHeadCells.slice(1,2).map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))

const cellText = (value: string | number | boolean | null | undefined) => (
    <Typography
        variant="body2"
        fontSize={{ xs: '13px', sm: '14px', md: '16px', xl: '17px' }}
        sx={{ whiteSpace: 'nowrap' }}
    >
        {value === null || value === undefined || value === '' ? '--' : String(value)}
    </Typography>
)

export function TasksList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [tasks, setTasks] = useState<{
        total_results: number
        data: TasksType[]
    }>({total_results: 0, data: []})

    const getTasks = async () => {
        setLoading(true)
        try {
            const response = await DataProvider.get<{
                total_results: number
                results: TasksType[]
            }>(`${RESOURCE}/`, search)

            if (response) {
                setTasks({
                    total_results: response.data.total_results,
                    data: response.data.results,
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
        getTasks()
    }, [search])

    const shared = {
        title: 'تسک',
        resource: RESOURCE,
        rows: tasks.data,
        count: tasks.total_results,
        params: search,
        setParams: setSearch,
        loading,
        getList: getTasks,
        hasDetail: true,
    }

    return (
        <ListPage
            viewKey={RESOURCE}
            defaultView="list"
            header="مدیریت تسک‌ها"
            href={`${RESOURCE}/create`}
            searchField="title"
            searchText="عنوان"
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={getTasks}
            filtersData={queryNames}
            createModal={TasksCreate}
            defaultState={{
                title: '',
                status: 'pending',
                description: '',
                due_date: '',
                assignments: [],
            }}
        >
            {(view) =>
                view === 'card' ? (
                    <CustomCardList
                        {...shared}
                        fields={cardFields}
                        columns={{ xs: 1, sm: 2, md: 3, xl: 4 }}
                        renderers={{
                            title: (row: TasksType) => row.title || '--',
                            subtitle: (row: TasksType) => row.description || '--',
                        }}
                    />
                ) : (
                    <CustomTable
                        {...shared}
                        headCells={tableHeadCells}
                        handleSort={getTasks}
                        tableBodyCells={tasks.data.map((item) => (
                            <React.Fragment key={item.id}>
                                <TableCell>{cellText(item.id)}</TableCell>
                                <TableCell>{cellText(item.title)}</TableCell>
                                <TableCell><TaskStatusChip status={item.status} /></TableCell>
                                <TableCell>{cellText(formatDate(item.due_date))}</TableCell>
                                <TableCell>{cellText(item.created_by)}</TableCell>
                            </React.Fragment>
                        ))}
                    />
                )
            }
        </ListPage>
    )
}
