import {Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {useState} from 'react'
import {useQueryParams} from 'use-query-params'

import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {createQueryParam} from '../../../Core/QueryParams'
import {TenantsType} from '../Tenants'
import {TenantsCreate} from '../Create/TenantsCreate'

const RESOURCE = 'tenants'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('نام و نام خانوادگی', 'full_name'),
    createTableHeadCells('تلفن', 'phone_number'),
    createTableHeadCells('شهر', 'cities'),
    createTableHeadCells('محله', 'neighborhoods'),
    createTableHeadCells('وضعیت بودجه', 'budgetStatus'),
    createTableHeadCells('بازه رهن', 'budget.mortgage'),
    createTableHeadCells('بازه اجاره', 'budget.rent'),
    createTableHeadCells('ملیت', 'nationality'),
]

const queryNames = tableHeadCells.map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))

const formatRange = (
    min: string,
    max: string
) => {
    if (!min && !max) {
        return '--'
    }

    if (!min) {
        return `تا ${max}`
    }

    if (!max) {
        return `از ${min}`
    }

    return `${min} - ${max}`
}

export function TenantsList() {
    const [search, setSearch] = useQueryParams(
        createQueryParam(queryNames)
    )

    const [loading] = useState(false)

    const [tenants] = useState<{
        total_results: number
        data: TenantsType[]
    }>({
        total_results: 5,

        data: [
            {
                id: 1,
                full_name: 'علی رضایی',
                phone_number: '09125463121',
                cities: 'قم',
                neighborhoods: 'زنبیل آباد',

                budgetStatus: 'رهن کامل',

                budget: {
                    mortgage: {
                        min: '500 میلیون',
                        max: '800 میلیون',
                    },
                    rent: {
                        min: '',
                        max: '',
                    },
                },

                defaultConditions: 'چک تخلیه می‌دهم',
                nationality: 'ایرانی',
            },

            {
                id: 2,
                full_name: 'محمد احمدی',
                phone_number: '09105463121',
                cities: 'قم',
                neighborhoods: 'آزادگان',

                budgetStatus: 'اجاره کامل',

                budget: {
                    mortgage: {
                        min: '',
                        max: '',
                    },
                    rent: {
                        min: '10 میلیون',
                        max: '20 میلیون',
                    },
                },

                defaultConditions: 'اجاره‌ها را چک می‌دهم',
                nationality: 'ایرانی',
            },

            {
                id: 3,
                full_name: 'رضا کریمی',
                phone_number: '09123456789',
                cities: 'قم',
                neighborhoods: 'زنبیل آباد',

                budgetStatus: 'رهن و اجاره',

                budget: {
                    mortgage: {
                        min: '300 میلیون',
                        max: '600 میلیون',
                    },
                    rent: {
                        min: '5 میلیون',
                        max: '12 میلیون',
                    },
                },

                defaultConditions: 'کل اجاره را یکجا پرداخت می‌کنم',
                nationality: 'ایرانی',
            },

            {
                id: 4,
                full_name: 'سجاد موسوی',
                phone_number: '09351234567',
                cities: 'قم',
                neighborhoods: 'آزادگان',

                budgetStatus: 'رهن کامل',

                budget: {
                    mortgage: {
                        min: '800 میلیون',
                        max: '1.2 میلیارد',
                    },
                    rent: {
                        min: '',
                        max: '',
                    },
                },

                defaultConditions: 'چک تخلیه می‌دهم',
                nationality: 'اتباع',
            },

            {
                id: 5,
                full_name: 'حسین محمدی',
                phone_number: '09191234567',
                cities: 'قم',
                neighborhoods: 'زنبیل آباد',

                budgetStatus: 'رهن و اجاره',

                budget: {
                    mortgage: {
                        min: '200 میلیون',
                        max: '400 میلیون',
                    },
                    rent: {
                        min: '8 میلیون',
                        max: '15 میلیون',
                    },
                },

                defaultConditions: 'اجاره‌ها را چک می‌دهم',
                nationality: 'ایرانی',
            },
        ],
    })

    return (
        <ListPage
            header="مدیریت مستأجرها"
            href={`/landlord-tenant/tenants/create`}
            searchField="full_name"
            searchText="نام"
            nofilter
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={() => {}}
            filtersData={[]}
            createModal={TenantsCreate}
            defaultState={{
                name: '',
            }}
        >
            <CustomTable
                title="مستأجر"
                resource={RESOURCE}
                headCells={tableHeadCells}
                rows={tenants.data}
                count={tenants.total_results}
                getList={() => {}}
                params={search}
                setParams={setSearch}
                handleSort={() => {}}
                loading={loading}
                hasDetail
                tableBodyCells={tenants.data.map((item) => (
                    <>
                        {/* شناسه */}
                        <TableCell key={`${item.id}-id`}>
                            <Typography
                                variant="body2"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    fontSize: {
                                        xs: '13px',
                                        sm: '14px',
                                        md: '16px',
                                        xl: '17px',
                                    },
                                }}
                            >
                                {item.id || '--'}
                            </Typography>
                        </TableCell>

                        {/* نام و نام خانوادگی */}
                        <TableCell key={`${item.id}-full_name`}>
                            <Typography
                                variant="body2"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    fontSize: {
                                        xs: '13px',
                                        sm: '14px',
                                        md: '16px',
                                        xl: '17px',
                                    },
                                }}
                            >
                                {item.full_name || '--'}
                            </Typography>
                        </TableCell>

                        {/* تلفن */}
                        <TableCell key={`${item.id}-phone_number`}>
                            <Typography
                                variant="body2"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    fontSize: {
                                        xs: '13px',
                                        sm: '14px',
                                        md: '16px',
                                        xl: '17px',
                                    },
                                }}
                            >
                                {item.phone_number || '--'}
                            </Typography>
                        </TableCell>

                        {/* شهر */}
                        <TableCell key={`${item.id}-cities`}>
                            <Typography
                                variant="body2"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    fontSize: {
                                        xs: '13px',
                                        sm: '14px',
                                        md: '16px',
                                        xl: '17px',
                                    },
                                }}
                            >
                                {item.cities || '--'}
                            </Typography>
                        </TableCell>

                        {/* محله */}
                        <TableCell key={`${item.id}-neighborhoods`}>
                            <Typography
                                variant="body2"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    fontSize: {
                                        xs: '13px',
                                        sm: '14px',
                                        md: '16px',
                                        xl: '17px',
                                    },
                                }}
                            >
                                {item.neighborhoods || '--'}
                            </Typography>
                        </TableCell>

                        {/* وضعیت بودجه */}
                        <TableCell key={`${item.id}-budgetStatus`}>
                            <Typography
                                variant="body2"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    fontSize: {
                                        xs: '13px',
                                        sm: '14px',
                                        md: '16px',
                                        xl: '17px',
                                    },
                                }}
                            >
                                {item.budgetStatus || '--'}
                            </Typography>
                        </TableCell>

                        {/* بازه رهن */}
                        <TableCell key={`${item.id}-mortgage`}>
                            <Typography
                                variant="body2"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    fontSize: {
                                        xs: '13px',
                                        sm: '14px',
                                        md: '16px',
                                        xl: '17px',
                                    },
                                }}
                            >
                                {formatRange(
                                    item.budget.mortgage.min,
                                    item.budget.mortgage.max
                                )}
                            </Typography>
                        </TableCell>

                        {/* بازه اجاره */}
                        <TableCell key={`${item.id}-rent`}>
                            <Typography
                                variant="body2"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    fontSize: {
                                        xs: '13px',
                                        sm: '14px',
                                        md: '16px',
                                        xl: '17px',
                                    },
                                }}
                            >
                                {formatRange(
                                    item.budget.rent.min,
                                    item.budget.rent.max
                                )}
                            </Typography>
                        </TableCell>

                        {/* ملیت */}
                        <TableCell key={`${item.id}-nationality`}>
                            <Typography
                                variant="body2"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    fontSize: {
                                        xs: '13px',
                                        sm: '14px',
                                        md: '16px',
                                        xl: '17px',
                                    },
                                }}
                            >
                                {item.nationality || '--'}
                            </Typography>
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
