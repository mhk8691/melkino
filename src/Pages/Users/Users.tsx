import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography, Button, Divider} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import { formatDate } from '../../Core/FormatDate'
import DatePickerFilter from '../../Components/Filter/DatePicker'
import { ParamType } from '../../Components/Filter/CustomFilter'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export interface ReferralType {
         "id": number,
                "from_user_mobile": string,
                "from_user_name": string,
                "source_type": string,
                "source_type_raw": string,
                "transaction_amount": number,
                "commission_percent": number,
                "profit": number,
                "created_at": string
}


export type UsersType = {
    id: number
    referral_count:number
    referral_profit:number
    username: string
    first_name: string
    last_name: string
    email: string
    referral_earnings:ReferralType[]
    mobile: string
    national_code: string
    birth_date: string

    card_number: string | null
    shaba_number: string | null

    referral_code: string | null
    referred_by: number | null

    role: 'customer' | 'admin' 

    is_active: boolean
    is_staff: boolean
    is_superuser: boolean

    auth_status: 'pending' | 'verified' | 'rejected'

    last_login: string | null
    created_at: string
    updated_at: string

    profile_picture: string | File

    fees: {
        gold_buy_fee: number
        gold_sell_fee: number
        silver_buy_fee: number
        silver_sell_fee: number
    },
    fee_settings:{
        referral_percent:number

    }
    "balances": {
            "gold_wallet": {
                "accessible_toman": number,
                "blocked_toman": number
            },
            "silver_wallet": {
                "accessible_toman": number,
                "blocked_toman": number
            },
            "gold_inventory": {
                "accessible_balance": number,
                "blocked_balance": number
            },
            "silver_inventory": {
                "accessible_balance": number,
                "blocked_balance": number
            }
        },
}
export interface TransactionsType{
    id:number
        "type": "DEPOSIT" | 'WITHDRAW',
        "status":string,
        "amount": number,
        "toman_amount": number,
        "tracking_code": string,
        "description": string,
        "created_at": string
}
const RESOURCE = 'users'

export function Users({
    user,
    setUser,
    editMode = false,
    isProfile = false,
    setDate,
    date,
    id
}: {
    user: UsersType
    setUser: React.Dispatch<React.SetStateAction<UsersType>>
     setDate: React.Dispatch<React.SetStateAction<ParamType>>
     date:ParamType
    editMode?: boolean
    isProfile?: boolean
    id?:string
    
}) {
    const navigate = useNavigate()
    const handleRoleChange = (event: SelectChangeEvent) => {
        setUser((prev) => ({
            ...prev,
            role: event.target.value as UsersType['role'],
        }))
    }
       const queryNames = {
  label: "تاریخ تولد",
  field: "date",
}   
useEffect(() => {
    if (!date.date) return;

    setUser(prev => ({
        ...prev,
        birth_date: date.date as string,
    }));
}, [date]);




    return (
        <>
        <Stack gap={3} >
            <GridProducer
                data={[
                    <CustomTextField
                        key={user.id}
                        name="first_name"
                        label="نام"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={user.first_name}
                    />,
                    <CustomTextField
                        key={user.id}
                        name="last_name"
                        label="نام خانوادگی"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={user.last_name}
                    />,
                    <CustomTextField
                        key={user.id}
                        name="national_code"
                        label="کد ملی"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={user.national_code}
                        disabled={editMode}
                    />,
                    <CustomTextField
                        key={user.id}
                        name="mobile"
                        label="شماره تلفن"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={user.mobile}
                        disabled={editMode}
                        
                    />,
                ]}
            />
<GridProducer
                data={[
                    <CustomTextField
                        key={user.id}
                        name="gold_buy_fee"
                        label="کارمزد خرید طلا"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={user.fees?.gold_buy_fee}
                    />,
                    <CustomTextField
                        key={user.id}
                        name="gold_sell_fee"
                        label="کارمزد فروش طلا"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={user?.fees?.gold_sell_fee}
                    />,
                    <CustomTextField
                        key={user.id}
                        name="silver_buy_fee"
                        label="کارمزد خرید نقره"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={user?.fees?.silver_buy_fee}
                    />,
                    <CustomTextField
                        key={user.id}
                        name="silver_sell_fee"
                        label="کارمزد فروش نقره"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={user?.fees?.silver_sell_fee}
                    />,
                 
                ]}
                
            />
            <GridProducer
               
                data={[
                   
                    !isProfile && (
                <Stack spacing={2}>
                    <FormControl fullWidth>
                        <InputLabel>نقش کاربر</InputLabel>
                        <Select
                        key={user.id}
                            value={user.role}
                            label="نقش کاربر"
                            onChange={handleRoleChange}
                        >
                            <MenuItem value="customer">کاربر عادی</MenuItem>
                            <MenuItem value="admin">ادمین</MenuItem>
                        </Select>
                    </FormControl>
                   
                </Stack>
                
                ),
        
                    <DatePickerFilter setParams={setDate} item={queryNames} initialValue={user.birth_date} /> ,
                    
                      editMode &&<CustomTextField   
                      key={user.id}
                        name="referral_code"
                        label="کد نمایندگی"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={user.referral_code}
                    />,
                    <CustomTextField   
                      key={user.id}
                        name="referral_percent"
                        label="سود کد نمایندگی"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={user?.fee_settings?.referral_percent}
                    />,
                      <CustomTextField   
                      key={user.id}
                        name="referral_count"
                        label="تعداد دعوت شده ها"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={user.referral_count}
                        disabled
                    />,
                     <FormControl fullWidth>
                                <InputLabel>وضعیت حساب</InputLabel>
                    
                                <Select
                                key={user.id}
                                  value={user.is_active ? 'true' : 'false'}
                                  label="وضعیت حساب"
                                  onChange={(e: SelectChangeEvent) => {
                                    const value = e.target.value === 'true';
                                    setUser((prev) => ({
                                      ...prev,
                                      is_active: value,
                                    }));
                                  }}
                                >
                                  <MenuItem value="true">فعال</MenuItem>
                                  <MenuItem value="false">غیرفعال</MenuItem>
                                </Select>
                    </FormControl>,
              
                         editMode &&  <CustomTextField
                        key={user.id}
                        name="created_at"
                        label="تاریخ عضویت"
                        resource={RESOURCE}
                        setData={setUser}
                        defaultValue={formatDate(user.created_at)}
                        disabled
                    />,
                   
            
                ]}
            />
            {
                editMode &&             <GridProducer
  data={[
    <CustomTextField
    thousandSeparator={true}
      key={user.id}
      name="gold_wallet_accessible"
      label="تومان طلا (قابل برداشت)"
      resource={RESOURCE}
      setData={setUser}
      defaultValue={user.balances?.gold_wallet?.accessible_toman}
      disabled
    />,
    <CustomTextField
    thousandSeparator
      key={user.id}
      name="gold_wallet_blocked"
      label="تومان طلا (مسدود)"
      resource={RESOURCE}
      setData={setUser}
      defaultValue={user.balances?.gold_wallet?.blocked_toman}
      disabled
    />,
    <CustomTextField
    thousandSeparator
      key={user.id}
      name="silver_wallet_accessible"
      label="تومان نقره (قابل برداشت)"
      resource={RESOURCE}
      setData={setUser}
      defaultValue={user.balances?.silver_wallet?.accessible_toman}
      disabled
    />,
    <CustomTextField
    thousandSeparator
      key={user.id}
      name="silver_wallet_blocked"
      label="تومان نقره (مسدود)"
      resource={RESOURCE}
      setData={setUser}
      defaultValue={user.balances?.silver_wallet?.blocked_toman}
      disabled
    />,
    <CustomTextField
    thousandSeparator
      key={user.id}
      name="gold_inventory_accessible"
      label="موجودی طلا (قابل استفاده)"
      resource={RESOURCE}
      setData={setUser}
      defaultValue={user.balances?.gold_inventory?.accessible_balance}
      disabled
    />,
    <CustomTextField
    thousandSeparator
      key={user.id}
      name="gold_inventory_blocked"
      label="موجودی طلا (مسدود)"
      resource={RESOURCE}
      setData={setUser}
      defaultValue={user.balances?.gold_inventory?.blocked_balance}
      disabled
    />,
    <CustomTextField
    thousandSeparator
      key={user.id}
      name="silver_inventory_accessible"
      label="موجودی نقره (قابل استفاده)"
      resource={RESOURCE}
      setData={setUser}
      defaultValue={user.balances?.silver_inventory?.accessible_balance}
      disabled
    />,
    <CustomTextField
    thousandSeparator
      key={user.id}
      name="silver_inventory_blocked"
      label="موجودی نقره (مسدود)"
      resource={RESOURCE}
      setData={setUser}
      defaultValue={user.balances?.silver_inventory?.blocked_balance}
      disabled
    />,
  ]}
/>
            }
        </Stack>
     {
        editMode && <>
           <Typography variant="body1" mt={5}>عملیات:</Typography>
        <Stack direction={'row'} gap={2} mt={2}>
            <Button variant="outlined" color="primary" size='large' onClick={()=>{
                 navigate(`/users/${id}/balance/`)
            }}>
          واریز دارینه 
        </Button>
            <Button variant="outlined" color="primary" size='large' onClick={()=>{
                 navigate(`/users/${id}/silver-balance/`)
            }}>
          واریز نقرینه 
        </Button>
        <Button variant="outlined" color="primary" size='large' onClick={()=>{
           navigate(`/users/${id}/gold-withdrawals/`)
        }}>
          برداشت دارینه
        </Button>
   <Button variant="outlined" color="primary" size='large' onClick={()=>{
           navigate(`/users/${id}/silver-withdrawals/`)
        }}>
          برداشت نقرینه
        </Button>
        </Stack>

     
        <Divider sx={{mt:5}} />
        </>
     }
  
        </>
    )
}