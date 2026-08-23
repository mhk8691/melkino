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
import { AnnouncementType } from '../Announcement'
import { AnnouncementCreate } from '../Create/AnnouncementCreate'

const RESOURCE = 'announcements'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('عنوان', 'title'),
    createTableHeadCells('توضیحات', 'description'),
    createTableHeadCells('لینک', 'link'),
]
const queryNames = tableHeadCells.map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))
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
            description: 'سامانه در روز پنجشنبه جهت بروزرسانی به مدت یک ساعت در دسترس نخواهد بود.',
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
            description: 'لطفاً اطلاعات حساب کاربری خود را بررسی و در صورت نیاز بروزرسانی کنید.',
            link: 'https://example.com/account',
        },
        {
            id: 5,
            title: 'جشنواره ویژه کاربران',
            description: 'جشنواره ویژه کاربران از تاریخ ۱ شهریور آغاز می‌شود و تا پایان ماه ادامه دارد.',
            link: 'https://example.com/festival',
        },
    ],
})
    const dispatch = useDispatch()
    // const getAnnouncement = async () => {
    //     setLoading(true)
    //     try {
    //         let response = await DataProvider.get<{
    //             total_results: number
    //             results: AnnouncementType[]
    //         }>(`${RESOURCE}/`, search)
    //         if (response) {
    //             setAnnouncement({
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
    //     getAnnouncement()
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
            getList={()=>{}}
            // getList={getAnnouncement}
            filtersData={[]}
            createModal={AnnouncementCreate}
            defaultState={{
                name: '',
            }}
        >
            <CustomTable
            title='اطلاعیه'
                resource={RESOURCE}
                headCells={tableHeadCells}
                rows={announcement.data}
                count={announcement.total_results}
                getList={()=>{}}
                // getList={getAnnouncement}
                params={search}
                setParams={setSearch}
                handleSort={()=>{}}
                // handleSort={getAnnouncement}
                loading={loading}
                hasDetail={true}
                tableBodyCells={announcement.data.map((item, index) => (
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
                                {item.link || '--'}
                            </Typography>
                        </TableCell>
                       
              
                    </>
                ))}
            />
        </ListPage>
    )
}
