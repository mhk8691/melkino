import {Grid, Stack, Typography, Skeleton, Box} from '@mui/material'
import {ReactNode, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import {DataProvider} from '../../Core/DataProvider'
import {setUtil} from '../../redux/UtilSlice'
import Widgets from './Widgets'

export interface FilterState {
    year: number
    month: string
}

interface WidgetProps {
    title: string
    value?: string | number
    icon: ReactNode
    loading?: boolean
    link?: string
}

interface DashboardStatsType {
    users: number
    products: number
    orders: number
}

export default function DashboardLayout() {
    const [data, setData] = useState<DashboardStatsType | null>(null)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const response = await DataProvider.get<DashboardStatsType>('dashboard/')
    //             setData(response.data)
    //         } catch (error: any) {
    //             dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
    //         }
    //     }
    //     getData()
    // }, [dispatch])

    const loading = !data
    const sampleWidgets = [
        {title: 'فروش', value: '۴۲۰,۰۰۰,۰۰۰ تومان', icon: '💰', color: 'success' as const},
        {title: 'مشتریان', value: 1284, icon: '👥', color: 'primary' as const},
        {title: 'اجاره', value: '۱۸۵,۰۰۰,۰۰۰ تومان', icon: '🏠', color: 'warning' as const},
        {title: 'قرارداد های فعال', value: 37, icon: '📄', color: 'info' as const},
        {title: 'تسویه شده', value: 29, icon: '✅', color: 'secondary' as const},
        {title: 'بازدید ها', value: 5620, icon: '👁️', color: 'primary' as const},
        {title: 'درآمد', value: '۶۰۵,۰۰۰,۰۰۰ تومان', icon: '📈', color: 'success' as const},
    ]

    return (
        <Box sx={{width: '100%', minHeight: '100vh', bgcolor: 'background.default'}}>
            <Box sx={{p: 3}}>
                <Grid container spacing={2.5}>
                    {sampleWidgets.map((widget) => (
                        <Widgets key={widget.title} {...widget} />
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}
