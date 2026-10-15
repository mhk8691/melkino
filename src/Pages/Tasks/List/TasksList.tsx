import { Chip, Typography } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import { useQueryParams } from 'use-query-params'
import { createCardField } from '../../../Components/Card/CustomCard'
import { CustomCardList } from '../../../Components/Card/CustomCardList'
import { CustomTable } from '../../../Components/Table/CustomTable'
import { createTableHeadCells } from '../../../Components/Table/CustomTableHead'
import { ListPage } from '../../../Components/Table/ListPage'
import { createQueryParam } from '../../../Core/QueryParams'
import { TasksCreate } from '../Create/TasksCreate'
import { TasksType } from '../Tasks'

const RESOURCE = 'tasks'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('عنوان', 'title'),
    createTableHeadCells('تاریخ', 'date'),
    createTableHeadCells('اولویت', 'priority'),
    createTableHeadCells('وضعیت انجام', 'isDone'),
]

const cardFields = [
    createCardField('شناسه', 'id'),
    createCardField('تاریخ', 'date'),
    createCardField('اولویت', 'priority'),
    createCardField('وضعیت انجام', 'isDone'),
]

const queryNames = tableHeadCells.map((cell) => ({
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

const priorityLabels: Record<TasksType['priority'], string> = {
    high: 'بالا',
    medium: 'متوسط',
    low: 'پایین',
}

const priorityColors = {
    high: 'error',
    medium: 'warning',
    low: 'success',
} as const

export function TasksList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))

    const tasks: {
        total_results: number
        data: TasksType[]
    } = {
        total_results: 5,
        data: [
            {
                id: 1,
                title: 'بررسی درخواست‌های مشتریان',
                date: '۱۴۰۵/۰۷/۲۳',
                isDone: false,
                priority: 'high',
            },
            {
                id: 2,
                title: 'پیگیری بازدیدهای امروز',
                date: '۱۴۰۵/۰۷/۲۳',
                isDone: false,
                priority: 'high',
            },
            {
                id: 3,
                title: 'بررسی فایل‌های جدید',
                date: '۱۴۰۵/۰۷/۲۳',
                isDone: true,
                priority: 'medium',
            },
            {
                id: 4,
                title: 'تماس با مشتریان',
                date: '۱۴۰۵/۰۷/۲۳',
                isDone: false,
                priority: 'medium',
            },
            {
                id: 5,
                title: 'به‌روزرسانی اطلاعات فایل‌ها',
                date: '۱۴۰۵/۰۷/۲۳',
                isDone: false,
                priority: 'low',
            },
        ],
    }

    const getTasks = () => {}

    const shared = {
        title: 'تسک',
        resource: RESOURCE,
        rows: tasks.data,
        count: tasks.total_results,
        params: search,
        setParams: setSearch,
        loading: false,
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
            nofilter
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={getTasks}
            filtersData={[]}
            createModal={TasksCreate}
            defaultState={{
                title: '',
                date: '',
                isDone: false,
                priority: 'medium',
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
                            subtitle: (row: TasksType) =>
                                `${priorityLabels[row.priority]} | ${
                                    row.isDone ? 'انجام شده' : 'انجام نشده'
                                }`,
                        }}
                    />
                ) : (
                    <CustomTable
                        {...shared}
                        headCells={tableHeadCells}
                        handleSort={getTasks}
                        tableBodyCells={tasks.data.map((item) => (
                            <>
                                <TableCell>{cellText(item.id)}</TableCell>
                                <TableCell>{cellText(item.title)}</TableCell>
                                <TableCell>{cellText(item.date)}</TableCell>
                                <TableCell>
                                    <Chip
                                        size="small"
                                        label={priorityLabels[item.priority]}
                                        color={priorityColors[item.priority]}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        size="small"
                                        label={item.isDone ? 'انجام شده' : 'انجام نشده'}
                                        color={item.isDone ? 'success' : 'default'}
                                    />
                                </TableCell>
                            </>
                        ))}
                    />
                )
            }
        </ListPage>
    )
}