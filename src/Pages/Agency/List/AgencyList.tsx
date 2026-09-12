import {Avatar, Box, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'
import {useDispatch} from 'react-redux'

import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {createQueryParam} from '../../../Core/QueryParams'
import {setUtil} from '../../../redux/UtilSlice'
import profileImage from '../../../Images/user.png'

import {AgencyType} from '../Agency'
import {AgencyCreate} from '../Create/AgencyCreate'
import {ViewModeToggle} from '../../User/ViewModeToggle'
import {UserCardGrid} from '../../User/UserCardGrid'
import { useViewMode } from '../../../Core/useViewMode'

const RESOURCE = 'agencies'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('پروفایل', 'profileImage'),
    createTableHeadCells('نام املاکی', 'agencyName'),
    createTableHeadCells('نام مدیر', 'firstName'),
    createTableHeadCells('نام خانوادگی مدیر', 'lastName'),
    createTableHeadCells('شماره تلفن', 'phoneNumber'),
    createTableHeadCells('کد پستی', 'postalCode'),
    createTableHeadCells('وضعیت تأهل', 'maritalStatus'),
    createTableHeadCells('وضعیت ملک دفتر', 'officePropertyStatus'),
]

const queryNames = tableHeadCells.map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))

export function AgencyList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))

    const [loading, setLoading] = useState(false)
    const [viewMode, setViewMode] = useViewMode(RESOURCE)

    const [agency, setAgency] = useState<{
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
                profileImage: profileImage,
                createdAt: '2026-09-01',
                updatedAt: '2026-09-05',

                role: 'real_estate_agency',

                agencyName: 'املاک آریا',

                postalCode: '1234567890',
                maritalStatus: 'married',
                officeAddress: 'تهران، سعادت‌آباد، بلوار پاکنژاد',
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
                profileImage: profileImage,
                createdAt: '2026-09-02',
                updatedAt: '2026-09-06',

                role: 'real_estate_agency',

                agencyName: 'املاک سپهر',

                postalCode: '2345678901',
                maritalStatus: 'single',
                officeAddress: 'تهران، جردن، خیابان نلسون ماندلا',
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
                profileImage: profileImage,
                createdAt: '2026-09-03',
                updatedAt: '2026-09-07',

                role: 'real_estate_agency',

                agencyName: 'املاک پارس',

                postalCode: '3456789012',
                maritalStatus: 'married',
                officeAddress: 'تهران، پونک، بلوار میرزابابایی',
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
                profileImage: profileImage,
                createdAt: '2026-09-04',
                updatedAt: '2026-09-08',

                role: 'real_estate_agency',

                agencyName: 'املاک تهران نو',

                postalCode: '4567890123',
                maritalStatus: 'single',
                officeAddress: 'تهران، تهرانپارس، خیابان جشنواره',
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
                profileImage: profileImage,
                createdAt: '2026-09-05',
                updatedAt: '2026-09-09',

                role: 'real_estate_agency',

                agencyName: 'املاک آفتاب',

                postalCode: '5678901234',
                maritalStatus: 'married',
                officeAddress: 'تهران، ونک، خیابان ملاصدرا',
                officePropertyStatus: 'tenant',
                leaseEndDate: '2027-01-10',

                logo: profileImage,
                managerImage: profileImage,

                registrationData: {},
            },
        ],
    })

    const dispatch = useDispatch()

    // const getAgency = async () => {
    //     setLoading(true)
    //     try {
    //         const response = await DataProvider.get<{
    //             total_results: number
    //             results: AgencyType[]
    //         }>(`${RESOURCE}/`, search)

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
    //     }

    //     setLoading(false)
    // }

    // useDeepCompareEffect(() => {
    //     getAgency()
    // }, [search])

    return (
        <ListPage
            header="مدیریت املاک"
            href={RESOURCE + '/create'}
            searchField="agencyName"
            searchText="نام املاکی"
            nofilter
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={() => {}}
            // getList={getAgency}
            filtersData={[]}
            createModal={AgencyCreate}
            defaultState={{
                agencyName: '',
            }}
        >
            <Box sx={{display: 'flex', justifyContent: 'flex-end',  my: 2 , px:1}}>
                <ViewModeToggle value={viewMode} onChange={setViewMode} />
            </Box>
            {viewMode === 'card' ? (
                <UserCardGrid rows={agency.data} />
            ) : (
                <CustomTable
                    title="املاک"
                    resource={RESOURCE}
                    headCells={tableHeadCells}
                    rows={agency.data}
                    count={agency.total_results}
                    getList={() => {}}
                    // getList={getAgency}
                    params={search}
                    setParams={setSearch}
                    handleSort={() => {}}
                    // handleSort={getAgency}
                    loading={loading}
                    hasDetail={true}
                    tableBodyCells={agency.data.map((item) => (
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
                                    src={item.logo || item.profileImage || ''}
                                    alt={item.agencyName}
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
                                    {item.postalCode || '--'}
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
                                    {item.maritalStatus === 'married'
                                        ? 'متأهل'
                                        : item.maritalStatus === 'single'
                                          ? 'مجرد'
                                          : '--'}
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
                                    {item.officePropertyStatus === 'owner'
                                        ? 'مالک'
                                        : item.officePropertyStatus === 'tenant'
                                          ? 'مستأجر'
                                          : '--'}
                                </Typography>
                            </TableCell>
                        </>
                    ))}
                />
            )}
        </ListPage>
    )
}
