import {Avatar, Box, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import {useQueryParams} from 'use-query-params'

import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import profileImage from '../../../Images/user.png'

import {AgentsType} from '../Agents'
import {AgentsCreate} from '../Create/AgentsCreate'
import {ViewModeToggle} from '../../User/ViewModeToggle'
import {UserCardGrid} from '../../User/UserCardGrid'
import { useViewMode } from '../../../Core/useViewMode'

const resource = 'agents'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('پروفایل', 'profileImage'),
    createTableHeadCells('نام', 'firstName'),
    createTableHeadCells('نام خانوادگی', 'lastName'),
    createTableHeadCells('شماره تلفن', 'phoneNumber'),
    createTableHeadCells('نقش', 'role'),
    createTableHeadCells('نام املاکی', 'agencyName'),
    createTableHeadCells('آدرس منزل', 'homeAddress'),
    createTableHeadCells('آدرس محل کار', 'workAddress'),
]

const queryNames = tableHeadCells.map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))

export function AgentsList({title, resource}: {title: string; resource: string}) {
    const [search, setSearch] = useQueryParams(
        Object.fromEntries(queryNames.map((item) => [item.field, undefined])),
    )

    const [loading] = useState(false)
    const [viewMode, setViewMode] = useViewMode(resource)

    const [agents] = useState<{
        total_results: number
        data: AgentsType[]
    }>({
        total_results: 5,
        data: [
            {
                id: 'AG-1001',
                firstName: 'محمد',
                lastName: 'احمدی',
                phoneNumber: '09121234567',
                profileImage,
                createdAt: '2026-09-01',
                updatedAt: '2026-09-05',
                role: 'real_estate_agent',
                agencyId: 'AGENCY-001',
                agencyName: 'املاک آریا',
                homeAddress: 'تهران، سعادت‌آباد، خیابان سرو، کوچه یاس',
                workAddress: 'تهران، سعادت‌آباد، بلوار پاکنژاد، پلاک ۲۵',
                registrationData: {},
            },
            {
                id: 'AC-1002',
                firstName: 'علی',
                lastName: 'رضایی',
                phoneNumber: '09129876543',
                profileImage,
                createdAt: '2026-09-02',
                updatedAt: '2026-09-06',
                role: 'accountant',
                agencyId: 'AGENCY-001',
                agencyName: 'املاک آریا',
                homeAddress: 'تهران، جردن، خیابان نلسون ماندلا، کوچه بهار',
                workAddress: 'تهران، سعادت‌آباد، بلوار پاکنژاد، پلاک ۲۵',
                registrationData: {},
            },
            {
                id: 'SC-1003',
                firstName: 'سارا',
                lastName: 'کریمی',
                phoneNumber: '09351234567',
                profileImage,
                createdAt: '2026-09-03',
                updatedAt: '2026-09-07',
                role: 'secretary',
                agencyId: 'AGENCY-002',
                agencyName: 'املاک سپهر',
                homeAddress: 'تهران، پونک، بلوار میرزابابایی، کوچه نسترن',
                workAddress: 'تهران، پونک، خیابان همیلا، پلاک ۴۲',
                registrationData: {},
            },
            {
                id: 'AG-1004',
                firstName: 'حسین',
                lastName: 'کریمی',
                phoneNumber: '09114567890',
                profileImage,
                createdAt: '2026-09-04',
                updatedAt: '2026-09-08',
                role: 'real_estate_agent',
                agencyId: 'AGENCY-003',
                agencyName: 'املاک پارس',
                homeAddress: 'تهران، تهرانپارس، خیابان جشنواره، کوچه شقایق',
                workAddress: 'تهران، تهرانپارس، خیابان استخر، پلاک ۱۸',
                registrationData: {},
            },
            {
                id: 'AC-1005',
                firstName: 'رضا',
                lastName: 'موسوی',
                phoneNumber: '09361234567',
                profileImage,
                createdAt: '2026-09-05',
                updatedAt: '2026-09-09',
                role: 'accountant',
                agencyId: 'AGENCY-002',
                agencyName: 'املاک سپهر',
                homeAddress: 'تهران، ونک، خیابان ملاصدرا، کوچه گلستان',
                workAddress: 'تهران، مرزداران، خیابان بهار، پلاک ۳۶',
                registrationData: {},
            },
        ],
    })

    const getRoleLabel = (role: AgentsType['role']) => {
        switch (role) {
            case 'real_estate_agent':
                return 'کارشناس'
            case 'accountant':
                return 'حسابدار'
            case 'secretary':
                return 'منشی'
            default:
                return '--'
        }
    }

    return (
        <ListPage
            header={title}
            href={resource + '/create'}
            searchField="firstName"
            searchText="نام"
            nofilter
            setParams={setSearch}
            params={search}
            resource={resource}
            getList={() => {}}
            filtersData={[]}
            createModal={AgentsCreate}
            isCsvExport
            defaultState={{
                firstName: '',
            }}
        >
            <Box sx={{display: 'flex', justifyContent: 'flex-end',  my: 2 , px:1}}>
                <ViewModeToggle value={viewMode} onChange={setViewMode} />
            </Box>
            {viewMode === 'card' ? (
                <UserCardGrid rows={agents.data} />
            ) : (
                <CustomTable
                    title={title}
                    resource={resource}
                    headCells={tableHeadCells}
                    rows={agents.data}
                    count={agents.total_results}
                    getList={() => {}}
                    params={search}
                    setParams={setSearch}
                    handleSort={() => {}}
                    loading={loading}
                    hasDetail={true}
                    tableBodyCells={agents.data.map((item) => (
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
                                <Avatar
                                    src={item.profileImage || ''}
                                    alt={`${item.firstName} ${item.lastName}`}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                    }}
                                />
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
                                    {item.firstName || '--'}
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
                                    {item.lastName || '--'}
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
                                    {item.phoneNumber || '--'}
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
                                    {getRoleLabel(item.role)}
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
                                    {item.agencyName || '--'}
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
                                    {item.homeAddress || '--'}
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
                                    {item.workAddress || '--'}
                                </Typography>
                            </TableCell>
                        </>
                    ))}
                />
            )}
        </ListPage>
    )
}
