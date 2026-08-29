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
import {PropertyType} from '../../../Components/PropertyRecordForm'
import {RequestCreate} from '../Create/RequestCreate'
import { PropertyCard } from '../../Files/PropertyCard/PropertyCard'

const RESOURCE = 'requests'

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

export function RequestList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
    const [requests, setRequests] = useState<{
        total_results: number
        data: Partial<PropertyType>[]
    }>({
        total_results: 3,
        data: [
            {
                id: 1,
                propertyType: 'آپارتمان',
                contractType: 'فروش',
                city: 'تهران',
                district: ['منطقه ۱', 'منطقه ۲'],
                neighborhood: ['زعفرانیه', 'الهیه'],
                areaFrom: 90,
                areaTo: 130,
                totalPriceFrom: 5000000000,
                totalPriceTo: 7500000000,
                roomCount: 2,
                requesterName: 'علی محمدی',
                requesterPhone: '09121234567',
            },
            {
                id: 2,
                propertyType: 'ویلایی',
                contractType: 'رهن و اجاره',
                city: 'کرج',
                district: ['گوهردشت'],
                neighborhood: ['فاز ۲', 'فاز ۳'],
                areaFrom: 150,
                areaTo: 220,
                mortgagePriceFrom: 300000000,
                mortgagePriceTo: 600000000,
                monthlyRentFrom: 8000000,
                monthlyRentTo: 15000000,
                roomCount: 3,
                requesterName: 'سارا احمدی',
                requesterPhone: '09351234567',
            },
            {
                id: 3,
                propertyType: 'زمین',
                contractType: 'فروش',
                city: 'شیراز',
                district: ['معالی‌آباد'],
                neighborhood: [],
                areaFrom: 300,
                areaTo: 400,
                totalPriceFrom: 10000000000,
                totalPriceTo: 14000000000,
                roomCount: 0,
                requesterName: 'رضا کریمی',
                requesterPhone: '09131234567',
            },
        ],
    })
    const dispatch = useDispatch()
    // const getRequests = async () => {
    //     setLoading(true)
    //     try {
    //         let response = await DataProvider.get<{
    //             total_results: number
    //             results: PropertyType[]
    //         }>(`${RESOURCE}/`, search)
    //         if (response) {
    //             setRequests({
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
    //     getRequests()
    // }, [search])

    return (
        <ListPage
            header={'مدیریت درخواست‌ها'}
            href={RESOURCE + '/create'}
            searchField="title"
            searchText="نام"
            nofilter
            setParams={setSearch}
            params={search}
            resource={RESOURCE}
            getList={() => {}}
            // getList={getRequests}
            filtersData={[]}
            createModal={RequestCreate}
            defaultState={{
                name: '',
            }}
        >
            {loading ? (
                <Typography variant="bodySm" color="text.secondary" sx={{py: 4, textAlign: 'center'}}>
                    در حال بارگذاری...
                </Typography>
            ) : requests.data.length === 0 ? (
                <Typography variant="bodySm" color="text.secondary" sx={{py: 4, textAlign: 'center'}}>
                    درخواستی ثبت نشده است.
                </Typography>
            ) : (
                <Box sx={{pt: 1, px: 1.5}}>
                    <Grid container spacing={2.5}>
                        {requests.data.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item.id}>
                                <PropertyCard item={item} mode="request" />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </ListPage>
    )
}
