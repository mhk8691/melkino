import {Box, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {createQueryParam} from '../../../Core/QueryParams'
import {setUtil} from '../../../redux/UtilSlice'
import {useDispatch} from 'react-redux'
import {ReminderType} from '../Reminder'
import {ReminderCreate} from '../Create/ReminderCreate'
import { formatDate } from '../../../Core/FormatDate'

const RESOURCE = 'reminders'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('عنوان', 'title'),
    createTableHeadCells('توضیحات', 'description'),
    createTableHeadCells('تاریخ', 'date'),
]
const queryNames = tableHeadCells.map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))
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
    const dispatch = useDispatch()
    // const getReminders = async () => {
    //     setLoading(true)
    //     try {
    //         let response = await DataProvider.get<{
    //             total_results: number
    //             results: ReminderType[]
    //         }>(`${RESOURCE}/`, search)
    //         if (response) {
    //             setReminders({
    //                 total_results: response.data.total_results,
    //                 data: response.data.results,
    //             })
    //         }
    //     } catch (error: any) {
    //         dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
    //     }
    //     setLoading(false)
    // }
    // useDeepCompareEffect(() => {
    //     getReminders()
    // }, [search])

    return (
        <ListPage
            header={'مدیریت اطلاعیه ها'}
            href={RESOURCE + '/create'}
            searchField="title"
            searchText="نام"
            nofilter
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={() => {}}
            // getList={getReminders}
            filtersData={[]}
            createModal={ReminderCreate}
            defaultState={{
                name: '',
            }}
        >
            <CustomTable
                title="اطلاعیه"
                resource={RESOURCE}
                headCells={tableHeadCells}
                rows={reminders.data}
                count={reminders.total_results}
                getList={() => {}}
                // getList={getReminders}
                params={search}
                setParams={setSearch}
                handleSort={() => {}}
                // handleSort={getReminders}
                loading={loading}
                hasDetail={true}
                tableBodyCells={reminders.data.map((item, index) => (
                    <>
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
                                }}
                            >
                                {item.id || '--'}
                            </Typography>
                        </TableCell>
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
                                }}
                            >
                                {item.title || '--'}
                            </Typography>
                        </TableCell>
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
                                }}
                            >
                                {item.description || '--'}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography sx={{whiteSpace: 'nowrap'}}>
                                {formatDate(item.date)}
                            </Typography>
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
