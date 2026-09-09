import { Box, Grid } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { DataProvider } from '../../Core/DataProvider'
import { setUtil } from '../../redux/UtilSlice'
import Widgets from './Widgets'
import { PropertyCard } from '../Files/PropertyCard/PropertyCard'
import SectionTitle from './SectionTitle'

interface DashboardStatsType {
    users: number
    products: number
    orders: number
}

export interface FilterState {
    year: number
    month: string
}
const lastFileList = [
    // ۱) رکورد کامل — تقریباً همه‌ی فیلدها پر شده
    {
        id: 1,
        status: 'فعال',
        propertyType: 'آپارتمان',
        contractType: 'فروش',
        documentType: 'تک برگ',
        city: 'تهران',
        district: 'منطقه ۲',
        neighborhood: 'سعادت‌آباد',
        address: 'خیابان علامه شمالی، کوچه ۱۲، پلاک ۴',
        area: 120,
        totalPrice: 8500000000,
        pricePerMeter: 70833333,
        roomCount: 2,
        occupancyStatus: 'تخلیه',
        bathroom: 'ایرانی و فرنگی',
        heating: 'پکیج',
        cooling: 'اسپلیت',
        flooring: 'سرامیک',
        facade: 'سنگ',
        totalFloor: 6,
        direction: 'شمالی',
        amenities: ['آسانسور', 'پارکینگ', 'انباری', 'بالکن'],
        ownerName: 'علی رضایی',
        ownerPhone: '09121234567',
        ownerPhone2: '02188451234',
        ownerJob: 'مهندس',
        description: 'واحد نوساز، نور عالی، نزدیک مترو و مراکز خرید.',
        internalNote: 'مالک عجله برای فروش دارد، قابل مذاکره.',
    },
    // ۲) ویلایی رهن و اجاره — تعدادی از فیلدها خالی
    {
        id: 2,
        status: 'فعال',
        propertyType: 'ویلایی',
        contractType: 'رهن و اجاره',
        documentType: 'دفترچه‌ای',
        city: 'کرج',
        district: 'گوهردشت',
        neighborhood: 'فاز ۲',
        address: 'خیابان شهید بهشتی، بن‌بست گل‌ها',
        area: 200,
        mortgagePrice: 500000000,
        monthlyRent: 15000000,
        mortgageTerms: 'قابل تبدیل به رهن کامل',
        roomCount: 3,
        totalFloor: 2,
        heating: 'شوفاژ',
        cooling: 'کولر آبی',
        amenities: ['حیاط', 'پارکینگ'],
        ownerName: 'محمد کریمی',
        ownerPhone: '09351234567',
        description: 'ویلای دوبلکس با حیاط بزرگ و درخت‌های میوه.',
    },
    // ۳) زمین — فقط حداقل اطلاعات
    {
        id: 3,
        status: 'کنسل شد',
        propertyType: 'زمین',
        contractType: 'فروش',
        documentType: 'قولنامه‌ای',
        city: 'شیراز',
        district: 'معالی‌آباد',
        address: 'بلوار معالی‌آباد، نبش کوچه ۱۴',
        area: 350,
        totalPrice: 12000000000,
        direction: 'جنوبی',
    },
    // ۴) آپارتمان — اطلاعات متوسط، بدون قیمت هر متر و امکانات
    {
        id: 4,
        status: 'منصرف شد',
        propertyType: 'آپارتمان',
        contractType: 'فروش',
        city: 'اصفهان',
        neighborhood: 'ملک‌شهر',
        area: 95,
        totalPrice: 3200000000,
        pricePerMeter: 33684210,
        roomCount: 2,
        occupancyStatus: 'در حال سکونت',
        bathroom: 'ایرانی',
        facade: 'رومی',
        totalFloor: 4,
        ownerName: 'زهرا احمدی',
        ownerPhone: '09131234567',
        ownerJob: 'آزاد',
    },
    // ۵) پیش فروش — بدون مالک و بدون امکانات، فقط یادداشت داخلی
    {
        id: 5,
        status: 'فروخته شده',
        propertyType: 'پیش فروش',
        contractType: 'مشارکت',
        documentType: 'وکالتی',
        city: 'مشهد',
        district: 'وکیل‌آباد',
        area: 140,
        totalPrice: 6100000000,
        roomCount: 3,
        flooring: 'پارکت',
        internalNote: 'فایل به مشتری قبلی فروخته شد، آرشیو شود.',
    },
]

// The two "featured: true" stats get more visual weight (bigger type, its own row)
// so the numbers that matter most are visible at a glance; the rest sit underneath
// as a quieter, denser row. Same card chrome throughout — only scale changes.
const statWidgets = [
    { title: 'فروش این ماه', value: '۴۲۰,۰۰۰,۰۰۰ تومان', color: 'success' as const, featured: true },
    { title: 'درآمد', value: '۶۰۵,۰۰۰,۰۰۰ تومان', color: 'primary' as const, featured: true },
    { title: 'مشتریان', value: 1284, color: 'primary' as const },
    { title: 'اجاره این ماه', value: '۱۸۵,۰۰۰,۰۰۰ تومان', color: 'warning' as const },
    { title: 'قراردادهای فعال', value: 37, color: 'info' as const },
    { title: 'فایل‌های تسویه‌شده', value: 29, color: 'secondary' as const },
    { title: 'بازدیدها', value: 5620, color: 'primary' as const },
]

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

    return (
        <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Box sx={{ p: 3 }}>
                <SectionTitle title="نمای کلی" />
                <Grid container spacing={2}>
                    {statWidgets.map((widget) => (
                        <Widgets key={widget.title} {...widget} />
                    ))}
                </Grid>

                <Box sx={{ mt: 4 }}>
                    <SectionTitle title="آخرین فایل‌ها" actionLabel="مشاهده همه" actionHref="/files" />
                    <Grid container spacing={2}>
                        {lastFileList.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item.id}>
                                <PropertyCard item={item} mode="request" />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}