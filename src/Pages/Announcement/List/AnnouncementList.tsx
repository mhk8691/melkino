import {Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import {useQueryParams} from 'use-query-params'
import {useDispatch} from 'react-redux'

import {createCardField} from '../../../Components/Card/CustomCard'
import {CustomCardList} from '../../../Components/Card/CustomCardList'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {createQueryParam} from '../../../Core/QueryParams'
import {DataProvider} from '../../../Core/DataProvider'
import {setUtil} from '../../../redux/UtilSlice'

import {AnnouncementCreate} from '../Create/AnnouncementCreate'
import {AnnouncementType} from '../Announcement'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { formatDate } from '../../../Core/FormatDate'

const RESOURCE = 'announcements'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('عنوان', 'title'),
    createTableHeadCells('وضعیت', 'status_display'),
    createTableHeadCells('ایجاد کننده', 'created_by_name'),
    createTableHeadCells('تاریخ ایجاد', 'created_at'),
]

const cardFields = [
    createCardField('شناسه', 'id'),
    createCardField('وضعیت', 'status_display'),
    createCardField('ایجاد کننده', 'created_by_name'),
    createCardField('لینک', 'link'),
    createCardField('تاریخ ایجاد', 'created_at'),
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
        {value ?? '--'}
    </Typography>
)

export function AnnouncementList() {
    const dispatch = useDispatch()

    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))

    const [loading, setLoading] = useState(false)

    const [announcement, setAnnouncement] = useState<{
        total_results: number
        data: AnnouncementType[]
    }>({
        total_results: 0,
        data: [],
    })

    const getAnnouncement = async () => {
        setLoading(true)

        try {
            const response = await DataProvider.get<{
                total_results: number
                results: AnnouncementType[]
            }>(`${RESOURCE}/`, search)

            if (response) {
                setAnnouncement({
                    total_results: response.data.total_results,
                    data: response.data.results,
                })
            }
        } catch (error: any) {
            dispatch(
                setUtil({
                    open: true,
                    message: error.message,
                    severity: 'error',
                }),
            )
        }

        setLoading(false)
    }
    useDeepCompareEffect(() => {
        getAnnouncement()
    }, [search])
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
            viewKey="announcements"
            defaultView="list"
            header={'مدیریت اطلاعیه ها'}
            href="announcements/create"
            searchField="title"
            searchText="عنوان"
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={getAnnouncement}
            createModal={AnnouncementCreate}
            defaultState={{
                title: '',
                description: '',
                link: '',
                status: 'draft',
            }}
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
                            subtitle: (row) => row.status_display || '--',
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



                                <TableCell>{cellText(item.status_display)}</TableCell>

                                <TableCell>{cellText(item.created_by_name)}</TableCell>

                                <TableCell>{cellText(formatDate(item.created_at))}</TableCell>
                            </>
                        ))}
                    />
                )
            }
        </ListPage>
    )
}
