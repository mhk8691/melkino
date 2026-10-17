import {Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import {useQueryParams} from 'use-query-params'
import {createCardField} from '../../../Components/Card/CustomCard'
import {CustomCardList} from '../../../Components/Card/CustomCardList'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {formatDate} from '../../../Core/FormatDate'
import {createQueryParam} from '../../../Core/QueryParams'
import {ReminderCreate} from '../Create/ReminderCreate'
import {ReminderType} from '../Reminder'

const RESOURCE = 'reminders'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('عنوان', 'title'),
    createTableHeadCells('توضیحات', 'description'),
    createTableHeadCells('تاریخ', 'date'),
]

/** همان ستون‌ها، اما برای بدنه‌ی کارت. عنوان در renderers.title می‌آید پس اینجا تکرار نشده */
const cardFields = [
    createCardField('شناسه', 'id'),
    createCardField('تاریخ', 'date', {render: (row) => formatDate(row.date)}),
    createCardField('توضیحات', 'description', {fullWidth: true}),
]

const queryNames = tableHeadCells.slice(1, 2).map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))

const cellText = (value: any) => (
    <Typography
        variant="body2"
        fontSize={{xs: '13px', sm: '14px', md: '16px', xl: '17px'}}
        sx={{whiteSpace: 'nowrap'}}
    >
        {value || '--'}
    </Typography>
)

export function ReminderList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
    const [reminders, setReminders] = useState<{
        total_results: number
        data: ReminderType[]
    }>({
        total_results: 5,
        data: [
            {
                id: 1,
                title: 'اطلاعیه بروزرسانی سامانه',
                description:
                    'سامانه در روز پنجشنبه جهت بروزرسانی به مدت یک ساعت در دسترس نخواهد بود.',
                date: '2026-08-06T13:30:55.008241+03:30',
            },
            {
                id: 2,
                title: 'تغییر ساعات پشتیبانی',
                description: 'از این پس ساعات پاسخگویی تیم پشتیبانی از ساعت ۸ صبح تا ۱۸ خواهد بود.',
                date: '2026-08-06T13:30:55.008241+03:30',
            },
            {
                id: 3,
                title: 'نسخه جدید پنل مدیریت',
                description: 'نسخه جدید پنل مدیریت با امکانات و قابلیت‌های جدید منتشر شد.',
                date: '2026-08-06T13:30:55.008241+03:30',
            },
            {
                id: 4,
                title: 'اطلاعیه مهم کاربران',
                description:
                    'لطفاً اطلاعات حساب کاربری خود را بررسی و در صورت نیاز بروزرسانی کنید.',
                date: '2026-08-06T13:30:55.008241+03:30',
            },
            {
                id: 5,
                title: 'جشنواره ویژه کاربران',
                description:
                    'جشنواره ویژه کاربران از تاریخ ۱ شهریور آغاز می‌شود و تا پایان ماه ادامه دارد.',
                date: '2026-08-06T13:30:55.008241+03:30',
            },
        ],
    })

    const getReminders = () => {}

    // پراپ‌های مشترک بین جدول و کارت
    const shared = {
        title: 'اطلاعیه',
        resource: RESOURCE,
        rows: reminders.data,
        count: reminders.total_results,
        params: search,
        setParams: setSearch,
        loading,
        getList: getReminders,
        hasDetail: true,
    }

    return (
        <ListPage
            viewKey={RESOURCE}
            defaultView="list"
            header={'مدیریت یادآوری ها'}
            href={RESOURCE + '/create'}
            searchField="title"
            searchText="نام"
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={getReminders}
            filtersData={queryNames}
            createModal={ReminderCreate}
            defaultState={{name: ''}}
        >
            {(view) =>
                view === 'card' ? (
                    <CustomCardList
                        {...shared}
                        fields={cardFields}
                        columns={{xs: 1, sm: 2, md: 3, xl: 4}}
                        renderers={{
                            title: (row) => row.title || '--',
                            subtitle: (row) => formatDate(row.date),
                        }}
                    />
                ) : (
                    <CustomTable
                        {...shared}
                        headCells={tableHeadCells}
                        handleSort={getReminders}
                        tableBodyCells={reminders.data.map((item) => (
                            <>
                                <TableCell>{cellText(item.id)}</TableCell>
                                <TableCell>{cellText(item.title)}</TableCell>
                                <TableCell>{cellText(item.description)}</TableCell>
                                <TableCell>
                                    <Typography sx={{whiteSpace: 'nowrap'}}>
                                        {formatDate(item.date)}
                                    </Typography>
                                </TableCell>
                            </>
                        ))}
                    />
                )
            }
        </ListPage>
    )
}
