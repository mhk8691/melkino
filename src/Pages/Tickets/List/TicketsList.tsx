import {Chip, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {Fragment, useState} from 'react'
import {useDispatch} from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'
import {createCardField} from '../../../Components/Card/CustomCard'
import {CustomCardList} from '../../../Components/Card/CustomCardList'
import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {createQueryParam} from '../../../Core/QueryParams'
import {DataProvider} from '../../../Core/DataProvider'
import {formatDate} from '../../../Core/FormatDate'
import {setUtil} from '../../../redux/UtilSlice'
import {TicketsCreate} from '../Create/TicketsCreate'
import {TicketsType, TICKET_STATUSES, TICKET_CATEGORIES, ticketDefaults} from '../Tickets'

const RESOURCE = 'tickets'

function TicketStatusChip({ticket}: {ticket: TicketsType}) {
    const option = TICKET_STATUSES.find((item) => item.value === ticket.status)
    return <Chip label={ticket.status_display || option?.label || '--'} color={option?.color ?? 'default'} size="small" />
}

const categoryLabel = (ticket: TicketsType) => ticket.category_display ||
    TICKET_CATEGORIES.find((option) => option.value === ticket.category)?.label || '--'

const fields: {
    name: keyof TicketsType
    label: string
    render?: (row: TicketsType) => React.ReactNode
}[] = [
    {name: 'subject', label: 'موضوع'},
    {name: 'creator_name', label: 'ثبت‌کننده'},
    {name: 'assigned_to_name', label: 'مسئول رسیدگی'},
    {name: 'category', label: 'دسته‌بندی', render: categoryLabel},
    {name: 'status', label: 'وضعیت', render: (row) => <TicketStatusChip ticket={row} />},
    {name: 'created_at', label: 'تاریخ ثبت', render: (row) => formatDate(row.created_at)},
]
const tableHeadCells = fields.map(({name, label}) => createTableHeadCells(label, name))
const cardFields = [
    createCardField('ثبت‌کننده', 'creator_name'),
    createCardField('مسئول رسیدگی', 'assigned_to_name', {render: (row: TicketsType) => row.assigned_to_name ?? '--'}),
    createCardField('دسته‌بندی', 'category', {render: categoryLabel}),
    createCardField('تعداد پیام‌ها', 'messages_count'),
]
const queryNames = [
    {field: 'status', label: 'وضعیت', type: 'choice', choice: TICKET_STATUSES.map(({value, label}) => ({id: value, label}))},
    {field: 'category', label: 'دسته‌بندی', type: 'choice', choice: TICKET_CATEGORIES.map(({value, label}) => ({id: value, label}))},
]

export function TicketsList() {
    const dispatch = useDispatch()
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
    const [tickets, setTickets] = useState<{
        total_results: number
        data: TicketsType[]
    }>({total_results: 0, data: []})

    const getTickets = async () => {
        setLoading(true)
        try {
            const response = await DataProvider.get<{
                total_results: number
                results: TicketsType[]
            }>(`${RESOURCE}/`, search)
            if (response) {
                setTickets({
                    total_results: response.data.total_results,
                    data: response.data.results,
                })
            }
        } catch (error: any) {
            dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
        } finally {
            setLoading(false)
        }
    }
    useDeepCompareEffect(() => {
        getTickets()
    }, [search])

    const shared = {
        title: 'تیکت', resource: RESOURCE, rows: tickets.data, count: tickets.total_results,
        params: search, setParams: setSearch, loading, getList: getTickets, hasDetail: true,
    }
    return (
        <ListPage
            viewKey={RESOURCE}
            defaultView="list"
            header="مدیریت تیکت‌ها"
            href={`${RESOURCE}/create`}
            searchField="subject"
            searchText="موضوع"
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={getTickets}
            filtersData={queryNames}
            createModal={TicketsCreate}
            defaultState={ticketDefaults}
        >
            {(view) => view === 'card' ? (
                <CustomCardList
                    {...shared}
                    fields={cardFields}
                    columns={{xs: 1, sm: 2, md: 3, xl: 4}}
                    renderers={{
                        title: (row: TicketsType) => row.subject || '--',
                        subtitle: (row: TicketsType) => formatDate(row.created_at),
                        status: (row: TicketsType) => <TicketStatusChip ticket={row} />,
                    }}
                />
            ) : (
                <CustomTable
                    {...shared}
                    headCells={tableHeadCells}
                    handleSort={getTickets}
                    tableBodyCells={tickets.data.map((item) => (
                        <Fragment key={item.id}>
                            {fields.map(({name, render}) => (
                                <TableCell key={name}>
                                    <Typography component="div" variant="body2" sx={{overflowWrap: 'anywhere'}}>
                                        {render ? render(item) : item[name] ?? '--'}
                                    </Typography>
                                </TableCell>
                            ))}
                        </Fragment>
                    ))}
                />
            )}
        </ListPage>
    )
}
