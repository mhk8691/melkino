import { Grid, Stack, Typography, Skeleton, Box, Divider } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { DataProvider } from '../../Core/DataProvider'
import { formatPrice } from '../../Core/FormatPrice'
import { setUtil } from '../../redux/UtilSlice'

import ServerResourceCharts from './ServerResourceCharts.'
import DifferentChart, { BuySellChartData } from './DifferentChart'
import StatsChart, { ChartData } from './StatsChart'

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================

interface WidgetProps {
    title: string
    data?: string
    description: { title: string; status: 'increment' | 'decrement' }
    icon: ReactNode
    loading?: boolean
    link?: string
}

interface DashboardStatsType {
    users: number
    products: number
    gold_products: number
    silver_products: number
    orders: number
    silver_orders: number
    wallet_balance: number
}

interface AnalitycsType {
    users: number
    gold: {
        buy: number
        sell: number
    }
    silver: {
        buy: number
        sell: number
    }
    total_buy: number
    total_sell: number
    difference: number
    reports: {
        daily: number
        weekly: number
        monthly: number
    }
    wallets: {
        gold: number
        silver: number
    }
    server: {
        cpu: number
        ram: {
            total_gb: number
            used_gb: number
            free_gb: number
            percent: number
        }
        disk: {
            total_gb: number
            used_gb: number
            free_gb: number
            percent: number
        }
    }
}

export const CURRENT_YEAR = 1405
export interface FilterState {
    year: number
    month: string
}

// ==========================================
// 2. WIDGET COMPONENT
// ==========================================

export function Widgets({
    title,
    data,
    description,
    icon,
    loading,
    link
}: WidgetProps) {
    // بررسی معتبر بودن دیتا (جلوگیری از نمایش NaN یا کلمات undefined)
    const isDataInvalid = !data || data.includes('NaN') || data.includes('undefined')
    const isLoading = loading || isDataInvalid

    return (
        <Grid component={link ? Link : 'div'} to={link} item xs={12} sm={6} md={4} lg={3}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="stretch"
                sx={{
                    height: '100%',
                    borderRadius: 3,
                    overflow: 'hidden',
                    position: 'relative',
                    bgcolor: '#0f0c08',
                    border: '1px solid rgba(212,175,55,0.25)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 20px 50px rgba(212,175,55,0.15)',
                        borderColor: 'rgba(212,175,55,0.5)',
                    },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '2px',
                        background:
                            'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                        opacity: 0.8,
                    },
                }}
            >
                {/* LEFT SIDE */}
                <Stack spacing={1.2} sx={{ p: 2.5, flex: 1 }}>
                    {isLoading ? (
                        <Skeleton width={120} height={22} />
                    ) : (
                        <Typography
                            sx={{
                                fontSize: 14,
                                color: 'rgba(212,175,55,0.8)',
                                fontWeight: 500,
                                letterSpacing: 0.3,
                            }}
                        >
                            {title}
                        </Typography>
                    )}

                    {isLoading ? (
                        <Skeleton width={90} height={40} />
                    ) : (
                        <Typography
                            sx={{
                                fontSize: 26,
                                fontWeight: 700,
                                color: '#F5E6C8',
                                letterSpacing: '-0.5px',
                            }}
                        >
                            {data}
                        </Typography>
                    )}

                    {isLoading ? (
                        <Skeleton width={140} height={18} />
                    ) : (
                        <Typography
                            sx={{
                                fontSize: 13,
                                color:
                                    description.status === 'increment'
                                        ? '#C9A227'
                                        : '#B91C1C',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                fontWeight: 500,
                            }}
                        >
                            {description.status === 'increment' ? '▲' : '▼'}
                            {description.title}
                        </Typography>
                    )}
                </Stack>

                {/* RIGHT ICON GOLD PANEL */}
                <Box
                    sx={{
                        width: 90,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background:
                            'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(255,215,0,0.05))',
                        borderLeft: '1px solid rgba(212,175,55,0.2)',
                    }}
                >
                    {isLoading ? (
                        <Skeleton variant="circular" width={40} height={40} />
                    ) : (
                        <Box
                            sx={{
                                color: '#D4AF37',
                                filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.3))',
                                transform: 'scale(1.2)',
                            }}
                        >
                            {icon}
                        </Box>
                    )}
                </Box>
            </Stack>
        </Grid>
    )
}

// ==========================================
// 3. SECTION HEADER COMPONENT
// ==========================================

function SectionHeader({ title, color }: { title: string; color: string }) {
    return (
        <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 4, mb: 1 }}>
                <Divider sx={{ flex: 1, borderColor: color, opacity: 0.4 }} />
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: color,
                        fontWeight: 'bold',
                        letterSpacing: 2,
                        whiteSpace: 'nowrap',
                        px: 1,
                    }}
                >
                    {title}
                </Typography>
                <Divider sx={{ flex: 1, borderColor: color, opacity: 0.4 }} />
            </Box>
        </Grid>
    )
}

// ==========================================
// 4. MAIN DASHBOARD LAYOUT
// ==========================================

export default function DashboardLayout() {
    const [salesChartData, setSalesChartData] = useState<ChartData[]>([])
    const [buyChartData, setBuyChartData] = useState<ChartData[]>([])
    const [buySellData, setBuySellData] = useState<BuySellChartData[]>([])

    const [data, setData] = useState<DashboardStatsType | null>(null)
    const [analitycs, setAnalitycs] = useState<AnalitycsType | null>(null)
    const dispatch = useDispatch()

    const [salesFilter, setSalesFilter] = useState<FilterState>({
        year: CURRENT_YEAR,
        month: '',
    })
    const [buyFilter, setBuyFilter] = useState<FilterState>({
        year: CURRENT_YEAR,
        month: '',
    })
    const [differentFilter, setDifferentFilter] = useState<FilterState>({
        year: CURRENT_YEAR,
        month: '',
    })

    // دریافت آمار عمومی
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await DataProvider.get<DashboardStatsType>('dashboard/')
                setData(response.data)
            } catch (error: any) {
                dispatch(
                    setUtil({
                        open: true,
                        message: error.message,
                        severity: 'error',
                    }),
                )
            }
        }
        getData()
    }, [dispatch])

    // دریافت آمار آنالیتیکس
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await DataProvider.get<AnalitycsType>('analytics/')
                setAnalitycs(response.data)
            } catch (error: any) {
                dispatch(
                    setUtil({
                        open: true,
                        message: error.message,
                        severity: 'error',
                    }),
                )
            }
        }
        getData()
    }, [dispatch])

    // دریافت نمودار فروش
    useEffect(() => {
        const getChart = async () => {
            const query = new URLSearchParams()
            if (salesFilter.year) query.append('year', salesFilter.year + '')
            if (salesFilter.month) query.append('month', salesFilter.month)
            try {
                const response = await DataProvider.get<ChartData[]>(`analytics/chart/?${query.toString()}`)
                setSalesChartData(response.data)
            } catch (error: any) {
                dispatch(
                    setUtil({
                        open: true,
                        message: error.message,
                        severity: 'error',
                    }),
                )
            }
        }
        getChart()
    }, [dispatch, salesFilter])

    // دریافت نمودار خرید و فروش
    useEffect(() => {
        const getChart = async () => {
            const query = new URLSearchParams()
            if (differentFilter.year) query.append('year', differentFilter.year + '')
            if (differentFilter.month) query.append('month', differentFilter.month)
            try {
                const response = await DataProvider.get<BuySellChartData[]>(`analytics/buy-sell-chart/?${query.toString()}`)
                setBuySellData(response.data)
            } catch (error: any) {
                dispatch(
                    setUtil({
                        open: true,
                        message: error.message,
                        severity: 'error',
                    }),
                )
            }
        }
        getChart()
    }, [dispatch, differentFilter])

    // دریافت نمودار خرید
    useEffect(() => {
        const getChart = async () => {
            const query = new URLSearchParams()
            if (buyFilter.year) query.append('year', buyFilter.year + '')
            if (buyFilter.month) query.append('month', buyFilter.month)
            try {
                const response = await DataProvider.get<ChartData[]>(`analytics/purchase-chart/?${query.toString()}`)
                setBuyChartData(response.data)
            } catch (error: any) {
                dispatch(
                    setUtil({
                        open: true,
                        message: error.message,
                        severity: 'error',
                    }),
                )
            }
        }
        getChart()
    }, [dispatch, buyFilter])

    // وضعیت‌های لودینگ مجزا
    const loading = !data
    const isAnalyticsLoading = !analitycs

    // تابع کمکی برای تبدیل داده‌های سرور
    const getServerData = () => {
        if (!analitycs || !analitycs.server) {
            return {
                cpu: 0,
                ram: { total_gb: 0, used_gb: 0, free_gb: 0, percent: 0 },
                disk: { total_gb: 0, used_gb: 0, free_gb: 0, percent: 0 }
            }
        }

        const server = analitycs.server as any

        return {
            cpu: server.cpu || 0,
            ram: typeof server.ram === 'number'
                ? { total_gb: 8, used_gb: server.ram, free_gb: 8 - server.ram, percent: (server.ram / 8) * 100 }
                : server.ram || { total_gb: 0, used_gb: 0, free_gb: 0, percent: 0 },
            disk: typeof server.disk === 'number'
                ? { total_gb: 8, used_gb: server.disk, free_gb: 8 - server.disk, percent: (server.disk / 8) * 100 }
                : server.disk || { total_gb: 0, used_gb: 0, free_gb: 0, percent: 0 }
        }
    }

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#0f0c08',
                color: '#fff',
            }}
        >
            <Box sx={{ flex: 1, p: 3, display: 'flex' }}>
                <Grid container spacing={2} sx={{ width: '100%', alignContent: 'flex-start' }}>
                    
                    {/* آمار کلی */}
                    <SectionHeader title="آمار کلی" color="#aaaaaa" />
                    <Widgets
                        title="کاربران"
                        data={data ? String(data.users) : ''}
                        description={{ title: 'کل کاربران سایت', status: 'increment' }}
                        icon="👤"
                        loading={loading}
                        link="/users"
                    />
                    <Widgets
                        title="کل محصولات"
                        data={data ? String(data.products) : ''}
                        description={{ title: 'کل محصولات ثبت‌شده', status: 'increment' }}
                        icon="📦"
                        loading={loading}
                    />
                    <Widgets
                        title="مجموع خرید ها"
                        data={analitycs ? String(formatPrice(analitycs.total_buy)) : ''}
                        description={{ title: 'مجموع خرید های ثبت شده', status: 'increment' }}
                        icon="💸"
                        loading={isAnalyticsLoading}
                    />
                    <Widgets
                        title="مجموع فروش ها"
                        data={analitycs ? String(formatPrice(analitycs.total_sell)) : ''}
                        description={{ title: 'مجموع فروش های ثبت شده', status: 'increment' }}
                        icon="💵"
                        loading={isAnalyticsLoading}
                    />
                    <Widgets
                        title="اختلاف"
                        data={analitycs ? String(formatPrice(analitycs.difference)) : ''}
                        description={{ title: 'اختلاف خرید و فروش', status: 'increment' }}
                        icon="💵"
                        loading={isAnalyticsLoading}
                    />

                    {/* طلا */}
                    <SectionHeader title="🥇 طلا" color="#FFD700" />
                    <Widgets
                        title="محصولات طلا"
                        data={data ? String(data.gold_products) : ''}
                        description={{ title: 'آمار محصولات طلا', status: 'increment' }}
                        icon="🥇"
                        loading={loading}
                        link="/products"
                    />
                    <Widgets
                        title="سفارشات طلا"
                        data={data ? String(data.orders) : ''}
                        description={{ title: 'سفارشات ثبت شده طلا', status: 'increment' }}
                        icon="🛒"
                        loading={loading}
                        link="/orders"
                    />
                    <Widgets
                        title="خرید های طلا"
                        data={analitycs ? String(formatPrice(analitycs.gold?.buy)) : ''}
                        description={{ title: 'مجموع خرید های ثبت شده', status: 'increment' }}
                        icon="💸"
                        loading={isAnalyticsLoading}
                        link="/orders"
                    />
                    <Widgets
                        title="فروش های طلا"
                        data={analitycs ? String(formatPrice(analitycs.gold?.sell)) : ''}
                        description={{ title: 'مجموع فروش های ثبت شده', status: 'increment' }}
                        icon="💵"
                        loading={isAnalyticsLoading}
                        link="/orders"
                    />
                    <Widgets
                        title="کیف پول طلا"
                        data={analitycs ? formatPrice(analitycs.wallets?.gold) : ''}
                        description={{ title: 'موجودی کل سیستم', status: 'increment' }}
                        icon="💎"
                        loading={isAnalyticsLoading}
                    />

                    {/* نقره */}
                    <SectionHeader title="🥈 نقره" color="#C0C0C0" />
                    <Widgets
                        title="محصولات نقره"
                        data={data ? String(data.silver_products) : ''}
                        description={{ title: 'آمار محصولات نقره', status: 'increment' }}
                        icon="🥈"
                        loading={loading}
                        link="/silver-products"
                    />
                    <Widgets
                        title="سفارشات نقره"
                        data={data ? String(data.silver_orders) : ''}
                        description={{ title: 'سفارشات ثبت شده نقره', status: 'increment' }}
                        icon="📑"
                        loading={loading}
                        link="/silver-orders"
                    />
                    <Widgets
                        title="خرید های نقره"
                        data={analitycs ? String(formatPrice(analitycs.silver?.buy)) : ''}
                        description={{ title: 'مجموع خرید های ثبت شده', status: 'increment' }}
                        icon="💸"
                        loading={isAnalyticsLoading}
                        link="/silver-orders"
                    />
                    <Widgets
                        title="فروش های نقره"
                        data={analitycs ? String(formatPrice(analitycs.silver?.sell)) : ''}
                        description={{ title: 'مجموع فروش های ثبت شده', status: 'increment' }}
                        icon="💵"
                        loading={isAnalyticsLoading}
                        link="/silver-orders"
                    />
                    <Widgets
                        title="کیف پول نقره"
                        data={analitycs ? formatPrice(analitycs.wallets?.silver) : ''}
                        description={{ title: 'موجودی کل سیستم', status: 'increment' }}
                        icon="💎"
                        loading={isAnalyticsLoading}
                    />

                    {/* سرور */}
                    <SectionHeader title="🖥️ سرور" color="#64B5F6" />
                    <Grid item xs={12}>
                        <ServerResourceCharts data={getServerData()} />
                    </Grid>

                    {/* نمودارها */}
                    <SectionHeader title="📊 نمودار فروش" color="#81C784" />
                    <Grid xs={12} item>
                        <StatsChart data={salesChartData} filter={salesFilter} setFilter={setSalesFilter} label='فروش' />
                    </Grid>

                    <SectionHeader title="📊 نمودار خرید" color="#81C784" />
                    <Grid xs={12} item>
                        <StatsChart data={buyChartData} filter={buyFilter} setFilter={setBuyFilter} label='خرید' />
                    </Grid>

                    <SectionHeader title="📊 نمودار اختلاف" color="#81C784" />
                    <Grid xs={12} item>
                        <DifferentChart data={buySellData} filter={differentFilter} setFilter={setDifferentFilter} />
                    </Grid>

                </Grid>
            </Box>
        </Box>
    )
}