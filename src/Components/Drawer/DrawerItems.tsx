import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CategoryIcon from '@mui/icons-material/Category'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupIcon from '@mui/icons-material/Group'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import StorefrontIcon from '@mui/icons-material/Storefront'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import HandshakeIcon from '@mui/icons-material/Handshake'
import ImageIcon from '@mui/icons-material/Image'
import CallReceivedIcon from '@mui/icons-material/CallReceived'
import CallMadeIcon from '@mui/icons-material/CallMade'
import AssignmentIcon from '@mui/icons-material/Assignment'
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt"
import {
    CardMembershipRounded,
    CurrencyExchange,
    WorkspacePremium,
} from '@mui/icons-material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CampaignIcon from '@mui/icons-material/Campaign'
import DiamondIcon from '@mui/icons-material/Diamond'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { ReactNode } from 'react'

// ----------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------

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

const iconStyle = { fontSize: '1.9rem !important' }
const groupIconStyle = { fontSize: '1.6rem !important' }

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

// ----------------------------------------------------------------------
// Items
// ----------------------------------------------------------------------

export const drawerItems: DrawerItemType[] = [
    {
        title: 'پیشخوان',
        link: '',
        role: 'all',
        icon: <DashboardIcon sx={iconStyle} />,
    },
    {
        title: 'کاربران',
        link: 'users',
        role: 'admin',
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
        link: 'silver-announcements',
        role: 'all',
        icon: <CampaignIcon sx={iconStyle} />,
        // groupId: 'silver-content',
    },
]