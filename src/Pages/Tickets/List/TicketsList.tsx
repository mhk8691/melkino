import {Chip, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import {useQueryParams} from 'use-query-params'
import {createCardField} from '../../../Components/Card/CustomCard'
import {CustomCardList} from '../../../Components/Card/CustomCardList'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {createQueryParam} from '../../../Core/QueryParams'
import {TicketsCreate} from '../Create/TicketsCreate'
import {TicketsType} from '../Tickets'

const RESOURCE = 'tickets'

const tableHeadCells = [
    createTableHeadCells('عنوان', 'title'),
    createTableHeadCells('توضیحات', 'description'),
    createTableHeadCells('فایل', 'file'),
    createTableHeadCells('میزان اهمیت', 'priority'),
    createTableHeadCells('دسته‌بندی', 'category'),
]

const queryNames = tableHeadCells.map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))

const priorityLabel: Record<string, string> = {
    low: 'کم',
    medium: 'متوسط',
    high: 'زیاد',
}

const priorityColor: Record<string, 'default' | 'success' | 'warning' | 'error'> = {
    low: 'success',
    medium: 'warning',
    high: 'error',
}

const categoryLabel: Record<string, string> = {
    complaints: 'شکایت‌ها',
    technical: 'سوالات فنی درمورد ملکینو',
    other: 'متفرقه',
}

function PriorityChip({priority}: {priority: string}) {
    return (
        <Chip
            label={priorityLabel[priority] || '--'}
            color={priorityColor[priority] || 'default'}
            size="small"
        />
    )
}

const cellText = (value: any) => (
    <Typography
        variant="body2"
        fontSize={{xs: '13px', sm: '14px', md: '16px', xl: '17px'}}
        sx={{whiteSpace: 'nowrap'}}
    >
        {value || '--'}
    </Typography>
)

/** همان ستون‌ها، اما برای بدنه‌ی کارت. عنوان در سربرگ می‌آید و اهمیت به‌صورت Chip در گوشه‌ی کارت */
const cardFields = [
    createCardField('دسته‌بندی', 'category', {
        render: (row) => categoryLabel[row.category] || '--',
    }),
    createCardField('فایل', 'file', {
        render: (row) => (typeof row.file === 'string' ? row.file : '--'),
    }),
    createCardField('توضیحات', 'description', {fullWidth: true}),
]

export function TicketsList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
    const [tickets, setTickets] = useState<{
        total_results: number
        data: TicketsType[]
    }>({
        total_results: 6,
        data: [
            {
                title: 'مشکل در پرداخت آنلاین',
                description: 'هنگام پرداخت با کارت بانکی، سیستم خطای نامشخص نمایش می‌دهد.',
                file: 'payment-error.png',
                priority: 'high',
                category: 'complaints',
            },
            {
                title: 'راهنمایی درباره API ملکینو',
                description: 'نیاز به توضیح بیشتر درباره نحوه احراز هویت در API دارم.',
                file: null,
                priority: 'medium',
                category: 'technical',
            },
            {
                title: 'پیشنهاد بهبود رابط کاربری',
                description: 'پیشنهاد می‌شود منوی اصلی ساده‌تر و کاربرپسندتر شود.',
                file: null,
                priority: 'low',
                category: 'other',
            },
            {
                title: 'عدم نمایش تصاویر ملک',
                description: 'در برخی از آگهی‌ها تصاویر ملک به درستی بارگذاری نمی‌شود.',
                file: 'screenshot-bug.jpg',
                priority: 'medium',
                category: 'technical',
            },
            {
                title: 'شکایت از تاخیر در پاسخ‌گویی',
                description: 'بیش از سه روز است که به تیکت قبلی من پاسخی داده نشده است.',
                file: null,
                priority: 'high',
                category: 'complaints',
            },
            {
                title: 'سوال درباره تعرفه‌های اشتراک',
                description: 'می‌خواستم بدانم تفاوت پلن‌های اشتراک ویژه و معمولی چیست.',
                file: 'pricing.pdf',
                priority: 'low',
                category: 'other',
            },
        ],
    })

    const getTickets = () => {}

    // پراپ‌های مشترک بین جدول و کارت
    const shared = {
        title: 'تیکت',
        resource: RESOURCE,
        rows: tickets.data,
        count: tickets.total_results,
        params: search,
        setParams: setSearch,
        loading,
        getList: getTickets,
        hasDetail: true,
    }

    return (
        <ListPage
            viewKey={RESOURCE}
            defaultView="list"
            header={'مدیریت تیکت‌ها'}
            href={RESOURCE + '/create'}
            searchField="title"
            searchText="عنوان"
            nofilter
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={getTickets}
            filtersData={[]}
            createModal={TicketsCreate}
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
                            subtitle: (row) => categoryLabel[row.category] || '--',
                            status: (row) => <PriorityChip priority={row.priority} />,
                        }}
                    />
                ) : (
                    <CustomTable
                        {...shared}
                        headCells={tableHeadCells}
                        handleSort={getTickets}
                        tableBodyCells={tickets.data.map((item) => (
                            <>
                                <TableCell>{cellText(item.title)}</TableCell>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        fontSize={{
                                            xs: '13px',
                                            sm: '14px',
                                            md: '16px',
                                            xl: '17px',
                                        }}
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            maxWidth: '250px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {item.description || '--'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {cellText(typeof item.file === 'string' ? item.file : '--')}
                                </TableCell>
                                <TableCell>
                                    <PriorityChip priority={item.priority} />
                                </TableCell>
                                <TableCell>{cellText(categoryLabel[item.category])}</TableCell>
                            </>
                        ))}
                    />
                )
            }
        </ListPage>
    )
}