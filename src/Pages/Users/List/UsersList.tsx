import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import { useEffect, useState } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useQueryParams } from 'use-query-params'
import { CustomTable } from '../../../Components/Table/CustomTable'
import { createTableHeadCells } from '../../../Components/Table/CustomTableHead'
import { ListPage } from '../../../Components/Table/ListPage'
import { DataProvider } from '../../../Core/DataProvider'
import { createQueryParam } from '../../../Core/QueryParams'
import { UserCreate } from '../Create/UserCreate'
import { UsersType } from '../Users'
import { formatDate } from '../../../Core/FormatDate'
import { setUtil } from '../../../redux/UtilSlice'
import { useDispatch } from 'react-redux'
import { BaseModal } from '../../../Components/Modal/BaseModal'
import { CustomTextField } from '../../../Components/Input/CustomTextField'
import api from '../../../Core/Request'
import { GridProducer } from '../../../Components/Table/GridProducer'

const RECOURCE = 'users'

const tableHeadCells = [
    createTableHeadCells('نام', 'first_name'),
    createTableHeadCells('نام خانوادگی', 'last_name'),
    createTableHeadCells('موبایل', 'mobile'),
    createTableHeadCells('کد ملی', 'national_code'),
    createTableHeadCells('نقش', 'role'),
    createTableHeadCells('کارمزدها', 'fees'),
    createTableHeadCells('کد نمایندگی', 'referral_code'),
    // createTableHeadCells('سود رفرال', 'referral_code'),
    createTableHeadCells('وضعیت حساب', 'is_active'),
]

const queryNames = tableHeadCells.slice(2, 4).map((cell) => {
    if (cell.name === 'role')
        return {
            field: cell.name,
            label: cell.label,
            type: 'choice',
            choice: [
                { label: 'کاربر', id: 'customer' },
                { label: 'ادمین', id: 'admin' },
            ],
        }

    return {
        field: cell.name,
        label: cell.label,
        type: '',
        choice: [],
    }
})

function formatRole(role: string) {
    switch (role) {
        case 'admin':
            return 'ادمین'
        case 'customer':
            return 'کاربر'
   
        default:
            return role
    }
}

function formatAuthStatus(status: string) {
    switch (status) {
        case 'verified':
            return 'تایید شده'
        case 'pending':
            return 'در انتظار تایید'
        case 'rejected':
            return 'رد شده'
        default:
            return status
    }
}
interface FeesType {
    gold_buy_fee:number
gold_sell_fee:number
silver_buy_fee:number
silver_sell_fee:number
}
export function UsersList() {
    const [search, setSearch] = useQueryParams(createQueryParam(queryNames))
    const [loading, setLoading] = useState(false)
const [selectedIds, setSelectedIds] = useState<string[]>([])
const [isActiveEdit,setIsActiveEdit] = useState(false)
const [editMode,setEditMode] = useState<'fee'|'referral' | null>(null)
const [open,setOpen] = useState(false)
const [fees,setFees] = useState<FeesType>({} as FeesType)
const [referralProfit,setReferralProfit] = useState('')
    const [users, setUsers] = useState<{
        total_results: number
        data: UsersType[]
    }>({
        total_results: 0,
        data: [],
    })

    const dispatch = useDispatch()

    const getUsers = async () => {
        setLoading(true)

        try {
            const response = await DataProvider.get<{
                total_results: number
                results: UsersType[]
            }>(`${RECOURCE}/`, search)

            if (response) {
                setUsers({
                    total_results: response.data.total_results,
                    data: response.data.results,
                })
            }
        } catch (error: any) {
            dispatch(
                setUtil({
                    open: true,
                    message: error.message,
                    severity: 'error',
                })
            )
        }

        setLoading(false)
    }
    const handleClearFees = ()=>{
         setOpen(false)
        setSelectedIds([])
        setIsActiveEdit(false)
        setFees({} as FeesType)
        setReferralProfit('')
    }
const handleEditFees = async ()=>{
    try{
        const response = await DataProvider.post('users/bulk-update-fees/',{
            data:{
                user_ids:selectedIds,
                 "gold_buy_fee": fees.gold_buy_fee,
    "gold_sell_fee": fees.gold_sell_fee,
    "silver_buy_fee": fees.silver_buy_fee,
    "silver_sell_fee": fees.silver_sell_fee
            }
        })
        getUsers()
        dispatch(
                setUtil({
                    open: true,
                    message: response.message,
                    severity: 'success',
                }),
            )
            handleClearFees()
           
    }catch(error:any) {
        dispatch(
                setUtil({
                    open: true,
                    message: error.response.data.message,
                    severity: 'success',
                }),
            )
    }
}

const handleEditProfit = async ()=>{
    try{
        const response = await DataProvider.post('users/bulk-update-referral/',{
            data:{
                user_ids:selectedIds,
                 "referral_percent": referralProfit['referral_percent'],

            }
        })
        getUsers()
        dispatch(
                setUtil({
                    open: true,
                    message: response.message,
                    severity: 'success',
                }),
            )
            handleClearFees()
           
    }catch(error:any) {
        dispatch(
                setUtil({
                    open: true,
                    message: error.response.data.message,
                    severity: 'success',
                }),
            )
    }
}

    useDeepCompareEffect(() => {
        getUsers()
    }, [search])
useEffect(() => {
    setIsActiveEdit(selectedIds.length > 0)
}, [selectedIds])
    return (
        <>
        <ListPage
        setEditMode={setEditMode}
        setOpenModal={setOpen}
        isActiveEdit={isActiveEdit}
            header="مدیریت کاربران"
            href={RECOURCE + '/create'}
            searchField="title"
            searchText="نام و نام خانوادگی"
            setParams={setSearch}
            params={search}
            resource={RECOURCE}
            getList={getUsers}
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
            groupEdit
              selectedIds={selectedIds}  
    onSelectionChange={setSelectedIds} 
                resource={RECOURCE}
                headCells={tableHeadCells}
                rows={users.data}
                count={users.total_results}
                getList={getUsers}
                params={search}
                setParams={setSearch}
                handleSort={getUsers}
                loading={loading}
                hasDetail={true}
                tableBodyCells={users.data.map((item) => (
                    <>
                        <TableCell >
                            <Typography
                                variant="body2"
                                fontSize={{
                                    xs: '13px',
                                    sm: '14px',
                                    md: '16px',
                                    xl: '17px',
                                }}
                            >
                                {item.first_name}
                            </Typography>
                        </TableCell>

                        <TableCell >
                            <Typography
                                variant="body2"
                                fontSize={{
                                    xs: '13px',
                                    sm: '14px',
                                    md: '16px',
                                    xl: '17px',
                                }}
                            >
                                {item.last_name}
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
                            >
                                {item.mobile}
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
                            >
                                {item.national_code}
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
                            >
                                {formatRole(item.role)}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 0.5,
                                    minWidth: 150,
                                }}
                            >
                                <Typography variant="caption">
                                    خرید طلا:{' '}
                                    {(
                                        (item.fees?.gold_buy_fee ?? 0) * 100
                                    ).toFixed(2)}
                                    %
                                </Typography>

                                <Typography variant="caption">
                                    فروش طلا:{' '}
                                    {(
                                        (item.fees?.gold_sell_fee ?? 0) * 100
                                    ).toFixed(2)}
                                    %
                                </Typography>

                                <Typography variant="caption">
                                    خرید نقره:{' '}
                                    {(
                                        (item.fees?.silver_buy_fee ?? 0) * 100
                                    ).toFixed(2)}
                                    %
                                </Typography>

                                <Typography variant="caption">
                                    فروش نقره:{' '}
                                    {(
                                        (item.fees?.silver_sell_fee ?? 0) * 100
                                    ).toFixed(2)}
                                    %
                                </Typography>
                            </Box>
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
                            >
                                {item.referral_code}
                            </Typography>
                        </TableCell>
                        {/* <TableCell>
                            <Typography
                                variant="body2"
                                fontSize={{
                                    xs: '13px',
                                    sm: '14px',
                                    md: '16px',
                                    xl: '17px',
                                }}
                            >
                                {item?.fee_settings?.referral_percent}
                            </Typography>
                        </TableCell> */}

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
                                {item.is_active ? 'فعال' : 'غیرفعال'}
                            </Typography>
                        </TableCell>

                       
                    </>
                ))}
            />
        </ListPage>
        <BaseModal
                    open={open}
                    setOpen={setOpen}
                    title={editMode === 'fee' ? "ویرایش کارمزدها":'ویرایش سود رفرال'}
                    onClose={()=>setOpen(false)}
                    style={{maxWidth: 700}}
                >
                 <Stack my={2}>
                    <GridProducer
                 count={2}
                                 data={editMode === 'fee' ? [
                                     <CustomTextField
                                         
                                         name="gold_buy_fee"
                                         label="کارمزد خرید طلا"
                                         setData={setFees}
                                         defaultValue={fees.gold_buy_fee}
                                     />,
                                     <CustomTextField
                                         
                                         name="gold_sell_fee"
                                         label="کارمزد فروش طلا"
                                         setData={setFees}
                                         defaultValue={fees?.gold_sell_fee}
                                     />,
                                     <CustomTextField
                                         
                                         name="silver_buy_fee"
                                         label="کارمزد خرید نقره"
                                         setData={setFees}
                                         defaultValue={fees?.silver_buy_fee}
                                     />,
                                     <CustomTextField
                                         
                                         name="silver_sell_fee"
                                         label="کارمزد فروش نقره"
                                         setData={setFees}
                                         defaultValue={fees?.silver_sell_fee}
                                     />,
                                  
                                 ]:[
                                      <CustomTextField
                                         
                                         name="referral_percent"
                                         label="سود رفرال"
                                         setData={setReferralProfit}
                                         defaultValue={referralProfit}
                                     />
                                 ]}
                                 
                             />
                 </Stack>
        
                    <Stack direction={'row'} spacing={2} mt={1}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={editMode === 'fee' ?handleEditFees:handleEditProfit}
                        >
                            تایید
                        </Button>
                        <Button variant="outlined" color="primary" size="large" onClick={handleClearFees}>
                            لغو
                        </Button>
                    </Stack>
        </BaseModal>
        </>
    )
}