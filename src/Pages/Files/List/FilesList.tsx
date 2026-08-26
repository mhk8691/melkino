import {Box, Grid, Typography} from '@mui/material'
import {useState} from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {useQueryParams} from 'use-query-params'
import {createTableHeadCells} from '../../../Components/Table/CustomTableHead'
import {ListPage} from '../../../Components/Table/ListPage'
import {DataProvider} from '../../../Core/DataProvider'
import {createQueryParam} from '../../../Core/QueryParams'
import {setUtil} from '../../../redux/UtilSlice'
import {useDispatch} from 'react-redux'
import {FilesCreate} from '../Create/FilesCreate'
import {PropertyCard} from '../PropertyCard'
import { PropertyType } from '../../../Components/PropertyRecordForm'

const RESOURCE = 'files'

const tableHeadCells = [
    createTableHeadCells('شناسه', 'id'),
    createTableHeadCells('نوع ملک', 'propertyType'),
    createTableHeadCells('شهر', 'city'),
    createTableHeadCells('قیمت', 'totalPrice'),
]
const queryNames = tableHeadCells.map((cell) => ({
    field: cell.name,
    label: cell.label,
    type: '',
}))

export function FilesList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
    const [files, setFiles] = useState<{
        total_results: number
        data: Partial<PropertyType>[]
    }>({
        total_results: 5,
        data: [
            {
                id: 1,
                status: 'فعال',
                propertyType: 'آپارتمان',
                contractType: 'فروش',
                city: 'تهران',
                district: 'منطقه ۲',
                neighborhood: 'سعادت‌آباد',
                address: 'خیابان علامه شمالی، کوچه ۱۲',
                area: 120,
                totalPrice: 8500000000,
                roomCount: 2,
            },
            {
                id: 2,
                status: 'فعال',
                propertyType: 'ویلایی',
                contractType: 'رهن و اجاره',
                city: 'کرج',
                district: 'گوهردشت',
                neighborhood: 'فاز ۲',
                address: 'خیابان شهید بهشتی',
                area: 200,
                mortgagePrice: 500000000,
                monthlyRent: 15000000,
                roomCount: 3,
            },
            {
                id: 3,
                status: 'کنسل شد',
                propertyType: 'زمین',
                contractType: 'فروش',
                city: 'شیراز',
                district: 'معالی‌آباد',
                neighborhood: '',
                address: 'بلوار معالی‌آباد',
                area: 350,
                totalPrice: 12000000000,
                roomCount: 0,
            },
            {
                id: 4,
                status: 'منصرف شد',
                propertyType: 'آپارتمان',
                contractType: 'فروش',
                city: 'اصفهان',
                district: 'ملک‌شهر',
                neighborhood: '',
                address: 'خیابان کاوه',
                area: 95,
                totalPrice: 3200000000,
                roomCount: 2,
            },
            {
                id: 5,
                status: 'فروخته شده',
                propertyType: 'پیش فروش',
                contractType: 'مشارکت',
                city: 'مشهد',
                district: 'وکیل‌آباد',
                neighborhood: '',
                address: 'بلوار وکیل‌آباد',
                area: 140,
                totalPrice: 6100000000,
                roomCount: 3,
            },
        ],
    })
    const dispatch = useDispatch()
    // const getFiles = async () => {
    //     setLoading(true)
    //     try {
    //         let response = await DataProvider.get<{
    //             total_results: number
    //             results: PropertyType[]
    //         }>(`${RESOURCE}/`, search)
    //         if (response) {
    //             setFiles({
    //                 total_results: response.data.total_results,
    //                 data: response.data.results,
    //             })
    //         }
    //     } catch (error: any) {
    //         dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
    //     }
    //     setLoading(false)
    // }
    // useDeepCompareEffect(() => {
    //     getFiles()
    // }, [search])

    return (
        <ListPage
            header={'مدیریت فایل‌های ملکی'}
            href={RESOURCE + '/create'}
            searchField="title"
            searchText="نام"
            nofilter
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={() => {}}
            // getList={getFiles}
            filtersData={[]}
            createModal={FilesCreate}
            defaultState={{
                name: '',
            }}
        >
            {loading ? (
                <Typography variant="bodySm" color="text.secondary" sx={{py: 4, textAlign: 'center'}}>
                    در حال بارگذاری...
                </Typography>
            ) : files.data.length === 0 ? (
                <Typography variant="bodySm" color="text.secondary" sx={{py: 4, textAlign: 'center'}}>
                    فایلی ثبت نشده است.
                </Typography>
            ) : (
                <Box sx={{pt: 1,px:1.5}}>
                    <Grid container spacing={2.5}>
                        {files.data.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item.id}>
                                <PropertyCard item={item} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </ListPage>
    )
}