import {Box, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import React, {ReactNode, useEffect, useMemo, useState} from 'react'
import {useQueryParams} from 'use-query-params'

import {CustomTable} from '../../../Components/Table/CustomTable'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {createQueryParam} from '../../../Core/QueryParams'
import {UserCreate} from '../Create/UserCreate'

import {AppUser, RealEstateAgency, RegularUser, UserRole} from '../UsersType'

type UserListProps = {
    role: UserRole
    data: AppUser[]
    total?: number
    loading?: boolean
    resource?: string
    onGetList?: () => void
}

type ColumnConfig = {
    label: string
    name: string
    render: (user: AppUser) => ReactNode
}

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

const textCell = (value: ReactNode) => (
    <TableCell>
        <Typography
            variant="body2"
            fontSize={{
                xs: '13px',
                sm: '14px',
                md: '16px',
                xl: '17px',
            }}
        >
            {value ?? '-'}
        </Typography>
    </TableCell>
)

const imageCell = (src?: string | null, alt = 'کاربر') => (
    <TableCell>
        {src ? (
            <Box
                component="img"
                src={src}
                alt={alt}
                sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    objectFit: 'cover',
                }}
            />
        ) : (
            '-'
        )}
    </TableCell>
)

/* -------------------------------------------------------------------------- */
/*                        Image + Name Cell                                   */
/* -------------------------------------------------------------------------- */

const userInfoCell = (user: AppUser, alt = 'کاربر') => (
    <TableCell>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
            }}
        >
            <Box
                component="img"
                src={user.profileImage || '/images/user.png'}
                alt={alt}
                sx={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    flexShrink: 0,
                }}
            />

            <Box>
                <Typography
                    variant="body2"
                    fontWeight={600}
                    color="text.primary"
                    sx={{
                        fontSize: {
                            xs: '13px',
                            sm: '14px',
                            md: '15px',
                            xl: '16px',
                        },
                    }}
                >
                    {user.firstName} {user.lastName}
                </Typography>
            </Box>
        </Box>
    </TableCell>
)

const getFullName = (user: AppUser) => `${user.firstName} ${user.lastName}`

const getAgencyName = (user: AppUser) => {
    if (
        user.role === UserRole.REAL_ESTATE_AGENT ||
        user.role === UserRole.ACCOUNTANT ||
        user.role === UserRole.SECRETARY
    ) {
        return user.agencyName
    }

    return '-'
}

/* -------------------------------------------------------------------------- */
/*                            Columns By Role                                  */
/* -------------------------------------------------------------------------- */

const columnsByRole: Record<UserRole, ColumnConfig[]> = {
    /* ---------------------------------------------------------------------- */
    /*                            Super User                                  */
    /* ---------------------------------------------------------------------- */

    [UserRole.SUPER_USER]: [
        {
            label: 'کاربر',
            name: 'name',
            render: (user) => userInfoCell(user, 'سوپر یوزر'),
        },
        {
            label: 'شماره تماس',
            name: 'phoneNumber',
            render: (user) => textCell(user.phoneNumber),
        },
    ],

    /* ---------------------------------------------------------------------- */
    /*                         Real Estate Agency                             */
    /* ---------------------------------------------------------------------- */

    [UserRole.REAL_ESTATE_AGENCY]: [
        {
            label: 'لوگو',
            name: 'logo',
            render: (user) => imageCell((user as RealEstateAgency).logo, 'لوگوی املاک'),
        },
        {
            label: 'نام املاک',
            name: 'agencyName',
            render: (user) => textCell((user as RealEstateAgency).agencyName),
        },
        {
            label: 'مدیر',
            name: 'manager',
            render: (user) => userInfoCell(user, 'مدیر املاک'),
        },
        {
            label: 'شماره تماس',
            name: 'phoneNumber',
            render: (user) => textCell(user.phoneNumber),
        },
    ],

    /* ---------------------------------------------------------------------- */
    /*                         Real Estate Agent                              */
    /* ---------------------------------------------------------------------- */

    [UserRole.REAL_ESTATE_AGENT]: [
        {
            label: 'کارشناس',
            name: 'name',
            render: (user) => userInfoCell(user, 'کارشناس'),
        },
        {
            label: 'شماره تلفن',
            name: 'phoneNumber',
            render: (user) => textCell(user.phoneNumber),
        },
        {
            label: 'نام املاک',
            name: 'agencyName',
            render: (user) => textCell(getAgencyName(user)),
        },
    ],

    /* ---------------------------------------------------------------------- */
    /*                           Regular User                                 */
    /* ---------------------------------------------------------------------- */

    [UserRole.REGULAR_USER]: [
        {
            label: 'کاربر',
            name: 'name',
            render: (user) => userInfoCell(user, 'کاربر عادی'),
        },
        {
            label: 'شماره تماس',
            name: 'phoneNumber',
            render: (user) => textCell(user.phoneNumber),
        },
        {
            label: 'کد ملی',
            name: 'nationalId',
            render: (user) => textCell((user as RegularUser).nationalId),
        },
    ],

    /* ---------------------------------------------------------------------- */
    /*                              Accountant                                */
    /* ---------------------------------------------------------------------- */

    [UserRole.ACCOUNTANT]: [
        {
            label: 'حسابدار',
            name: 'name',
            render: (user) => userInfoCell(user, 'حسابدار'),
        },
        {
            label: 'شماره تماس',
            name: 'phoneNumber',
            render: (user) => textCell(user.phoneNumber),
        },
        {
            label: 'نام املاک',
            name: 'agencyName',
            render: (user) => textCell(getAgencyName(user)),
        },
    ],



    [UserRole.SECRETARY]: [
        {
            label: 'منشی',
            name: 'name',
            render: (user) => userInfoCell(user, 'منشی'),
        },
        {
            label: 'شماره تماس',
            name: 'phoneNumber',
            render: (user) => textCell(user.phoneNumber),
        },
        {
            label: 'نام املاک',
            name: 'agencyName',
            render: (user) => textCell(getAgencyName(user)),
        },
    ],
}


const roleLabels: Record<UserRole, string> = {
    [UserRole.SUPER_USER]: 'سوپر یوزر',
    [UserRole.REAL_ESTATE_AGENCY]: 'املاک',
    [UserRole.REAL_ESTATE_AGENT]: 'کارشناس',
    [UserRole.REGULAR_USER]: 'کاربر عادی',
    [UserRole.ACCOUNTANT]: 'حسابدار',
    [UserRole.SECRETARY]: 'منشی',
}


export function UsersList({
    role,
    data,
    total,
    loading = false,
    resource = 'users',
    onGetList,
}: UserListProps) {
    const columns = useMemo(() => columnsByRole[role], [role])

    const tableHeadCells = useMemo(
        () => columns.map((column) => createTableHeadCells(column.label, column.name)),
        [columns],
    )

    const queryNames = useMemo(
        () =>
            tableHeadCells.map((cell) => ({
                field: cell.name,
                label: cell.label,
                type: '',
                choice: [],
            })),
        [tableHeadCells],
    )

    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))

    const [selectedIds, setSelectedIds] = useState<string[]>([])

    const [isActiveEdit, setIsActiveEdit] = useState(false)

    useEffect(() => {
        setIsActiveEdit(selectedIds.length > 0)
    }, [selectedIds])



    const roleData = useMemo(() => data.filter((user) => user.role === role), [data, role])

    return (
        <ListPage
            setEditMode={() => {}}
            isActiveEdit={isActiveEdit}
            header={`مدیریت ${roleLabels[role]}`}
            href={`/${resource}/create`}
            searchField="title"
            searchText="نام و نام خانوادگی"
            setParams={setSearch}
            params={search}
            resource={resource}
            getList={onGetList ?? (() => {})}
            filtersData={queryNames}
            createModal={UserCreate}
            defaultState={{
                firstName: '',
                lastName: '',
                email: '',
                username: '',
                phoneNumber: '',
            }}
        >
            <CustomTable
            title='کاربر'
                groupEdit
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                resource={resource}
                headCells={tableHeadCells}
                rows={roleData}
                count={total ?? roleData.length}
                getList={onGetList ?? (() => {})}
                params={search}
                setParams={setSearch}
                handleSort={onGetList ?? (() => {})}
                loading={loading}
                hasDetail
                tableBodyCells={roleData.map((user) => (
                    <React.Fragment key={user.id}>
                        {columns.map((column) => (
                            <React.Fragment key={`${user.id}-${column.name}`}>
                                {column.render(user)}
                            </React.Fragment>
                        ))}
                    </React.Fragment>
                ))}
            />
        </ListPage>
    )
}
