import {Avatar, Box, Button, Stack, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import {useQueryParams} from 'use-query-params'

import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import profileImage from '../../../Images/user.png'

import {ExpertType} from '../Expert'
import {ExpertCreate} from '../Create/ExpertCreate'
import {ViewModeToggle} from '../../User/ViewModeToggle'
import {UserCardGrid} from '../../User/UserCardGrid'
import {useViewMode} from '../../../Core/useViewMode'
import { DataProvider } from '../../../Core/DataProvider'
import { setUtil } from '../../../redux/UtilSlice'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useDispatch } from 'react-redux'

const RESOURCE = 'users/?group=expert'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('نام و نام خانوادگی', 'fullname'),
    createTableHeadCells('شماره تلفن', 'phoneNumber'),
    createTableHeadCells('نام املاکی', 'agencyName'),
    createTableHeadCells('نقش', 'role'),
    createTableHeadCells('آدرس منزل', 'homeAddress'),
    createTableHeadCells('آدرس محل کار', 'workAddress'),
    createTableHeadCells('عملیات', 'action'),
]

const queryNames = tableHeadCells.slice(1, 4).map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))

export function ExpertList({title}: {title: string}) {
    const [search, setSearch] = useQueryParams(
        Object.fromEntries(queryNames.map((item) => [item.field, undefined])),
    )
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const [viewMode, setViewMode] = useViewMode(RESOURCE)

    const [expert,setExpert] = useState<{
        total_results: number
        data: ExpertType[]
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
                role: 'real_estate_expert',
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
                role: 'real_estate_expert',
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

    const getExpert = async () => {
        setLoading(true)

        try {
            const response = await DataProvider.get<{
                total_results: number
                results: ExpertType[]
            }>(`${RESOURCE}`, search)

            if (response) {
                setExpert({
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
        getExpert()
    }, [search])

    return (
        <ListPage
            header={title}
            href={RESOURCE + '/create'}
            searchField="firstName"
            searchText="نام"
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={() => {}}
            filtersData={queryNames}
            createModal={ExpertCreate}
            isCsvExport
            defaultState={{
                firstName: '',
            }}
        >
            <Box sx={{display: 'flex', justifyContent: 'flex-end', my: 2, px: 1}}>
                <ViewModeToggle value={viewMode} onChange={setViewMode} />
            </Box>
            {viewMode === 'card' ? (
                <UserCardGrid
                    rows={expert.data}
                    resource={RESOURCE}
                    getList={() => {}}
                    title="کارشناس"
                />
            ) : (
                <CustomTable
                    title={title}
                    resource={RESOURCE}
                    headCells={tableHeadCells}
                    rows={expert.data}
                    count={expert.total_results}
                    getList={() => getExpert()}
                    params={search}
                    setParams={setSearch}
                    handleSort={() => {}}
                    loading={loading}
                    hasDetail={true}
                    tableBodyCells={expert.data.map((item) => (
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
                                <Stack direction={'row'} gap={1} alignItems={'center'}>
                                    <Avatar
                                        src={item.profileImage || ''}
                                        alt={`${item.firstName} ${item.lastName}`}
                                        sx={{
                                            width: 40,
                                            height: 40,
                                        }}
                                    />
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
                                        {item.firstName + item.lastName || '--'}
                                    </Typography>
                                </Stack>
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
                                    {item.role}
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
                            <TableCell>
                                <Button variant="outlined" color="success">
                                    ورود به پنل کاربری
                                </Button>
                            </TableCell>
                        </>
                    ))}
                />
            )}
        </ListPage>
    )
}
