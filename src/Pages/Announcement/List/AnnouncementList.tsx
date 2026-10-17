import {Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import {useQueryParams} from 'use-query-params'
import {createCardField} from '../../../Components/Card/CustomCard'
import {CustomCardList} from '../../../Components/Card/CustomCardList'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {createQueryParam} from '../../../Core/QueryParams'
import {AnnouncementCreate} from '../Create/AnnouncementCreate'
import {AnnouncementType} from '../Announcement'

const RESOURCE = 'announcements'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('عنوان', 'title'),
    createTableHeadCells('توضیحات', 'description'),
    createTableHeadCells('لینک', 'link'),
]

/** همان ستون‌ها، اما برای بدنه‌ی کارت. عنوان در renderers.title می‌آید پس اینجا تکرار نشده */
const cardFields = [
    createCardField('شناسه', 'id'),
    createCardField('لینک', 'link'),
    createCardField('توضیحات', 'description', {fullWidth: true}),
]

const queryNames = tableHeadCells.slice(1,2).map((cell) => ({
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

export function AnnouncementList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
    const [announcement, setAnnouncement] = useState<{
        total_results: number
        data: AnnouncementType[]
    }>({
        total_results: 5,
        data: [
            {
                id: 1,
                title: 'اطلاعیه بروزرسانی سامانه',
                description:
                    'سامانه در روز پنجشنبه جهت بروزرسانی به مدت یک ساعت در دسترس نخواهد بود.',
                link: 'https://example.com/update',
            },
            {
                id: 2,
                title: 'تغییر ساعات پشتیبانی',
                description: 'از این پس ساعات پاسخگویی تیم پشتیبانی از ساعت ۸ صبح تا ۱۸ خواهد بود.',
                link: 'https://example.com/support',
            },
            {
                id: 3,
                title: 'نسخه جدید پنل مدیریت',
                description: 'نسخه جدید پنل مدیریت با امکانات و قابلیت‌های جدید منتشر شد.',
                link: 'https://example.com/panel',
            },
            {
                id: 4,
                title: 'اطلاعیه مهم کاربران',
                description:
                    'لطفاً اطلاعات حساب کاربری خود را بررسی و در صورت نیاز بروزرسانی کنید.',
                link: 'https://example.com/account',
            },
            {
                id: 5,
                title: 'جشنواره ویژه کاربران',
                description:
                    'جشنواره ویژه کاربران از تاریخ ۱ شهریور آغاز می‌شود و تا پایان ماه ادامه دارد.',
                link: 'https://example.com/festival',
            },
        ],
    })

    const getAnnouncement = () => {}

    // پراپ‌های مشترک بین جدول و کارت
    const shared = {
        title: 'اطلاعیه',
        resource: RESOURCE,
        rows: announcement.data,
        count: announcement.total_results,
        params: search,
        setParams: setSearch,
        loading,
        getList: getAnnouncement,
        hasDetail: true,
    }

    return (
        <ListPage
            viewKey={RESOURCE}
            defaultView="list"
            header={'مدیریت اطلاعیه ها'}
            href={RESOURCE + '/create'}
            searchField="title"
            searchText="نام"
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={getAnnouncement}
            createModal={AnnouncementCreate}
            defaultState={{name: ''}}
            filtersData={queryNames}
        >
            {(view) =>
                view === 'card' ? (
                    <CustomCardList
                        {...shared}
                        fields={cardFields}
                        columns={{xs: 1, sm: 2, md: 3, xl: 4}}
                        renderers={{
                            title: (row) => row.title || '--',
                            subtitle: (row) => row.link || '--',
                        }}
                    />
                ) : (
                    <CustomTable
                        {...shared}
                        headCells={tableHeadCells}
                        handleSort={getAnnouncement}
                        tableBodyCells={announcement.data.map((item) => (
                            <>
                                <TableCell>{cellText(item.id)}</TableCell>
                                <TableCell>{cellText(item.title)}</TableCell>
                                <TableCell>{cellText(item.description)}</TableCell>
                                <TableCell>{cellText(item.link)}</TableCell>
                            </>
                        ))}
                    />
                )
            }
        </ListPage>
    )
}