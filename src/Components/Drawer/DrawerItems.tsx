import CreditCardIcon from '@mui/icons-material/CreditCard'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupIcon from '@mui/icons-material/Group'
import StorefrontIcon from '@mui/icons-material/Storefront'
import AssignmentIcon from '@mui/icons-material/Assignment'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'

import {WorkspacePremium} from '@mui/icons-material'
import CampaignIcon from '@mui/icons-material/Campaign'
import DiamondIcon from '@mui/icons-material/Diamond'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import HomeIcon from '@mui/icons-material/Home'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import RequestPageIcon from '@mui/icons-material/RequestPage'
import {ReactNode} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export type DrawerItemType = {
    title: string
    link: string
    role: string
    icon: ReactNode
    disabled?: boolean
    groupId?: string
}

export type DrawerGroupType = {
    id: string
    title: string
    icon: ReactNode
}

const iconStyle = {fontSize: '1.9rem !important'}
const groupIconStyle = {fontSize: '1.6rem !important'}

// ----------------------------------------------------------------------
// Groups
// ----------------------------------------------------------------------

export const drawerGroups: DrawerGroupType[] = [
    // darineh (gold)
    {
        id: 'darineh-store',
        title: 'فروشگاه دارینه',
        icon: <StorefrontIcon sx={groupIconStyle} />,
    },
    {
        id: 'darineh-orders',
        title: 'سفارش‌های طلا',
        icon: <DiamondIcon sx={groupIconStyle} />,
    },
    {
        id: 'darineh-guarantee',
        title: 'تضمین قیمت',
        icon: <WorkspacePremium sx={groupIconStyle} />,
    },
    {
        id: 'darineh-investment',
        title: 'سرمایه‌گذاری طلا',
        icon: <TrendingUpIcon sx={groupIconStyle} />,
    },
    {
        id: 'darineh-finance',
        title: 'واریز و برداشت',
        icon: <CreditCardIcon sx={groupIconStyle} />,
    },
    {
        id: 'darineh-content',
        title: 'محتوا و اطلاع‌رسانی',
        icon: <CampaignIcon sx={groupIconStyle} />,
    },
    // silver
    {
        id: 'silver-store',
        title: 'فروشگاه نقرینه',
        icon: <StorefrontIcon sx={groupIconStyle} />,
    },
    {
        id: 'silver-orders',
        title: 'سفارش‌های نقره',
        icon: <DiamondIcon sx={groupIconStyle} />,
    },
    {
        id: 'silver-finance',
        title: 'واریز و برداشت',
        icon: <CreditCardIcon sx={groupIconStyle} />,
    },
    {
        id: 'silver-content',
        title: 'محتوا و اطلاع‌رسانی',
        icon: <CampaignIcon sx={groupIconStyle} />,
    },
]

export const drawerItems: DrawerItemType[] = [
    // {
    //     title: 'پیشخوان',
    //     link: '',
    //     role: 'all',
    //     icon: <DashboardIcon sx={iconStyle} />,
    // },
    {
        title: 'کاربران',
        link: 'users',
        role: 'all',
        icon: <GroupIcon sx={iconStyle} />,
    },

    {
        title: 'لاگ',
        link: 'logs',
        role: 'all',
        icon: <AssignmentIcon sx={iconStyle} />,
    },
    {
        title: 'اطلاعیه ها',
        link: 'announcements',
        role: 'all',
        icon: <CampaignIcon sx={iconStyle} />,
        // groupId: 'silver-content',
    },
    {
        title: 'فایل ها',
        link: 'files',
        role: 'all',
        icon: <HomeIcon sx={iconStyle} />,
        // groupId: 'silver-content',
    },
    {
        title: 'درخواست ها',
        link: 'requests',
        role: 'all',
        icon: (<AddCircleOutlineIcon sx={iconStyle} />
        ),
    },
    {
        title: 'تنظیمات',
        link: 'settings',
        role: 'all',
        icon: <SettingsRoundedIcon sx={iconStyle} />,
    },
    {
        title: 'پروفایل',
        link: 'profile',
        role: 'all',
        icon: <AccountCircleRoundedIcon sx={iconStyle} />,
    },
]
