import {Avatar, Box, Button, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import {useQueryParams} from 'use-query-params'
import {useDispatch} from 'react-redux'

import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {createQueryParam} from '../../../Core/QueryParams'
import {setUtil} from '../../../redux/UtilSlice'
import profileImage from '../../../Images/user.png'

import {AgencyType} from '../Agency'
import {AgencyCreate} from '../Create/AgencyCreate'
import {ViewModeToggle} from '../../User/ViewModeToggle'
import {UserCardGrid} from '../../User/UserCardGrid'
import {useViewMode} from '../../../Core/useViewMode'

const RESOURCE = 'agencies'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('پروفایل', 'profileImage'),
    createTableHeadCells('نام املاکی', 'agencyName'),
    createTableHeadCells('نام مدیر', 'firstName'),
    createTableHeadCells('نام خانوادگی مدیر', 'lastName'),
    createTableHeadCells('شماره تلفن', 'phoneNumber'),
    createTableHeadCells('استان', 'province'),
    createTableHeadCells('شهر', 'city'),
    createTableHeadCells('آدرس', 'officeAddress'),
    createTableHeadCells('وضعیت پروانه', 'licenseStatus'),
    createTableHeadCells('تعداد کارشناسان فعال', 'activeExpertCount'),
    createTableHeadCells('عملیات', 'action'),
]

const queryNames = tableHeadCells.map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))

export function AgencyList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading] = useState(false)
    const [viewMode, setViewMode] = useViewMode(RESOURCE)

    const [agency] = useState<{
        total_results: number
        data: AgencyType[]
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
                role: 'real_estate_agency',
                agencyName: 'املاک آریا',
                province: 'تهران',
                city: 'تهران',
                officeAddress: 'سعادت‌آباد، بلوار پاکنژاد',
                licenseStatus: 'active',
                activeExpertCount: 8,
                maritalStatus: 'married',
                officePropertyStatus: 'owner',
                leaseEndDate: null,
                logo: profileImage,
                managerImage: profileImage,
                registrationData: {},
            },
            {
                id: 'AG-1002',
                firstName: 'علی',
                lastName: 'رضایی',
                phoneNumber: '09129876543',
                profileImage,
                createdAt: '2026-09-02',
                updatedAt: '2026-09-06',
                role: 'real_estate_agency',
                agencyName: 'املاک سپهر',
                province: 'تهران',
                city: 'تهران',
                officeAddress: 'جردن، خیابان نلسون ماندلا',
                licenseStatus: 'inactive',
                activeExpertCount: 0,
                maritalStatus: 'single',
                officePropertyStatus: 'tenant',
                leaseEndDate: '2027-03-15',
                logo: profileImage,
                managerImage: profileImage,
                registrationData: {},
            },
            {
                id: 'AG-1003',
                firstName: 'حسین',
                lastName: 'کریمی',
                phoneNumber: '09351234567',
                profileImage,
                createdAt: '2026-09-03',
                updatedAt: '2026-09-07',
                role: 'real_estate_agency',
                agencyName: 'املاک پارس',
                province: 'تهران',
                city: 'تهران',
                officeAddress: 'پونک، بلوار میرزابابایی',
                licenseStatus: 'active',
                activeExpertCount: 5,
                maritalStatus: 'married',
                officePropertyStatus: 'tenant',
                leaseEndDate: '2026-12-20',
                logo: profileImage,
                managerImage: profileImage,
                registrationData: {},
            },
            {
                id: 'AG-1004',
                firstName: 'رضا',
                lastName: 'موسوی',
                phoneNumber: '09114567890',
                profileImage,
                createdAt: '2026-09-04',
                updatedAt: '2026-09-08',
                role: 'real_estate_agency',
                agencyName: 'املاک تهران نو',
                province: 'تهران',
                city: 'تهران',
                officeAddress: 'تهرانپارس، خیابان جشنواره',
                licenseStatus: 'inactive',
                activeExpertCount: 0,
                maritalStatus: 'single',
                officePropertyStatus: 'owner',
                leaseEndDate: null,
                logo: profileImage,
                managerImage: profileImage,
                registrationData: {},
            },
            {
                id: 'AG-1005',
                firstName: 'امیر',
                lastName: 'حسینی',
                phoneNumber: '09361234567',
                profileImage,
                createdAt: '2026-09-05',
                updatedAt: '2026-09-09',
                role: 'real_estate_agency',
                agencyName: 'املاک آفتاب',
                province: 'تهران',
                city: 'تهران',
                officeAddress: 'ونک، خیابان ملاصدرا',
                licenseStatus: 'active',
                activeExpertCount: 12,
                maritalStatus: 'married',
                officePropertyStatus: 'tenant',
                leaseEndDate: '2027-01-10',
                logo: profileImage,
                managerImage: profileImage,
                registrationData: {},
            },
        ],
    })

    const dispatch = useDispatch()

    // برای دریافت داده‌ها از API، این بخش را فعال کنید و تابع دریافت را به
    // getList در ListPage و CustomTable بدهید.
    //
    // const getAgency = async () => {
    //     setLoading(true)
    //     try {
    //         const response = await DataProvider.get<{
    //             total_results: number
    //             results: AgencyType[]
    //         }>(`${RESOURCE}/`, search)
    //
    //         if (response) {
    //             setAgency({
    //                 total_results: response.data.total_results,
    //                 data: response.data.results,
    //             })
    //         }
    //     } catch (error: any) {
    //         dispatch(
    //             setUtil({
    //                 open: true,
    //                 message: error.message,
    //                 severity: 'error',
    //             }),
    //         )
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    return (
        <ListPage
            header="مدیریت املاک"
            href={`${RESOURCE}/create`}
            searchField="agencyName"
            searchText="نام املاکی"
            nofilter
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={() => {}}
            isCsvExport
            filtersData={[]}
            createModal={AgencyCreate}
            defaultState={{
                agencyName: '',
            }}
        >
            <Box sx={{display: 'flex', justifyContent: 'flex-end', my: 2, px: 1}}>
                <ViewModeToggle value={viewMode} onChange={setViewMode} />
            </Box>

            {viewMode === 'card' ? (
                <UserCardGrid
                    rows={agency.data}
                    resource={RESOURCE}
                    getList={() => {}}
                    title="املاک"
                />
            ) : (
                <CustomTable
                    title="املاک"
                    resource={RESOURCE}
                    headCells={tableHeadCells}
                    rows={agency.data}
                    count={agency.total_results}
                    getList={() => {}}
                    params={search}
                    setParams={setSearch}
                    handleSort={() => {}}
                    loading={loading}
                    hasDetail
                    tableBodyCells={agency.data.map((item) => (
                        <>
                            <TableCell>
                                <Typography variant="body2" sx={{whiteSpace: 'nowrap'}}>
                                    {item.id || '--'}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Avatar
                                    src={item.logo || item.profileImage || ''}
                                    alt={item.agencyName}
                                    sx={{width: 40, height: 40}}
                                />
                            </TableCell>

                            <TableCell>
                                <Typography variant="body2" sx={{whiteSpace: 'nowrap'}}>
                                    {item.agencyName || '--'}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="body2" sx={{whiteSpace: 'nowrap'}}>
                                    {item.firstName || '--'}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="body2" sx={{whiteSpace: 'nowrap'}}>
                                    {item.lastName || '--'}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="body2" sx={{whiteSpace: 'nowrap'}}>
                                    {item.phoneNumber || '--'}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="body2" sx={{whiteSpace: 'nowrap'}}>
                                    {item.province || '--'}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="body2" sx={{whiteSpace: 'nowrap'}}>
                                    {item.city || '--'}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="body2" sx={{whiteSpace: 'nowrap'}}>
                                    {item.officeAddress || '--'}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="body2" sx={{whiteSpace: 'nowrap'}}>
                                    {item.licenseStatus === 'active'
                                        ? 'فعال'
                                        : item.licenseStatus === 'inactive'
                                          ? 'غیرفعال'
                                          : '--'}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography variant="body2" sx={{whiteSpace: 'nowrap'}}>
                                    {item.activeExpertCount ?? 0}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Button variant="outlined" color="success" sx={{whiteSpace:'nowrap'}}>
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
