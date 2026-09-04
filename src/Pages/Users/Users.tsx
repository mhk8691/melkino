import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    SelectChangeEvent,
} from '@mui/material'

import { styled } from '@mui/material/styles'
import { useState } from 'react'

import {
    SuperUser,
    UserRole,
} from './UsersType'

import { CustomTextField } from '../../Components/Input/CustomTextField'
import { GridProducer } from '../../Components/Table/GridProducer'


// ======================================================
// Fake Super User
// ======================================================

const fakeSuperUser: SuperUser = {
    id: "user-super-001",
    role: UserRole.SUPER_USER,
    firstName: "علی",
    lastName: "رضایی",
    phoneNumber: "09121234567",
    profileImage: "/images/users/super-user.jpg",
    canImpersonateUsers: true,
    createdAt: "2026-08-01T09:00:00.000Z",
    updatedAt: "2026-08-18T10:30:00.000Z",
}


// ======================================================
// Users Type
// ======================================================

export interface ReferralType {
    id: number
    from_user_mobile: string
    from_user_name: string
    source_type: string
    source_type_raw: string
    transaction_amount: number
    commission_percent: number
    profit: number
    created_at: string
}

export type UsersType = {
    id: number
    referral_count: number
    referral_profit: number
    username: string
    first_name: string
    last_name: string
    email: string
    referral_earnings: ReferralType[]
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
    }

    fee_settings: {
        referral_percent: number
    }

    balances: {
        gold_wallet: {
            accessible_toman: number
            blocked_toman: number
        }

        silver_wallet: {
            accessible_toman: number
            blocked_toman: number
        }

        gold_inventory: {
            accessible_balance: number
            blocked_balance: number
        }

        silver_inventory: {
            accessible_balance: number
            blocked_balance: number
        }
    }
}

export interface TransactionsType {
    id: number
    type: 'DEPOSIT' | 'WITHDRAW'
    status: string
    amount: number
    toman_amount: number
    tracking_code: string
    description: string
    created_at: string
}


// ======================================================
// Styled Components
// ======================================================

const CustomFormControl = styled(FormControl)(({ theme }) => ({
    width: '100%',

    '& .MuiOutlinedInput-root': {
        borderRadius: '15px',

        '& fieldset': {
            borderRadius: '15px',
        },

        '&:hover fieldset': {
            borderColor: `${theme.palette.primary.light} !important`,
        },

        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },

        '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
            opacity: 0.6,
        },
    },

    '& .MuiSelect-select': {
        fontSize: '15px',
        padding: '16.5px 14px',
    },

    '& .MuiInputLabel-root': {
        fontSize: '15px',

        '&.Mui-disabled': {
            color: theme.palette.text.disabled,
            opacity: 0.7,
        },
    },
}))


// ======================================================
// Component
// ======================================================

export function Users({user,setUser}:{user:any,setUser:React.Dispatch<React.SetStateAction<any>>}) {

    const [selectedRole, setSelectedRole] = useState<UserRole>(
        fakeSuperUser.role
    )


    const handleRoleChange = (
        event: SelectChangeEvent
    ) => {
        const role = event.target.value as UserRole

        setSelectedRole(role)
    }


    return (
        <Stack gap={3}>

            <GridProducer
                data={[

                    // ==================================
                    // First Name
                    // ==================================

                    <CustomTextField
                        key="firstName"
                        name="firstName"
                        label="نام"
                        resource="users"
                        defaultValue={fakeSuperUser.firstName}
                    />,


                    // ==================================
                    // Last Name
                    // ==================================

                    <CustomTextField
                        key="lastName"
                        name="lastName"
                        label="نام خانوادگی"
                        resource="users"
                        defaultValue={fakeSuperUser.lastName}
                    />,


                    // ==================================
                    // Phone Number
                    // ==================================

                    <CustomTextField
                        key="phoneNumber"
                        name="phoneNumber"
                        label="شماره تلفن"
                        resource="users"
                        defaultValue={fakeSuperUser.phoneNumber}
                    />,



                    <CustomFormControl
                        key="role"
                    >

                        <InputLabel id="user-role-label">
                            نقش کاربر
                        </InputLabel>

                        <Select
                            labelId="user-role-label"
                            value={selectedRole}
                            label="نقش کاربر"
                            onChange={handleRoleChange}
                        >

                            <MenuItem value={UserRole.SUPER_USER}>
                                سوپر یوزر
                            </MenuItem>

                            <MenuItem value={UserRole.REAL_ESTATE_AGENCY}>
                                املاک
                            </MenuItem>

                            <MenuItem value={UserRole.REAL_ESTATE_AGENT}>
                                کارشناس املاک
                            </MenuItem>

                            <MenuItem value={UserRole.REGULAR_USER}>
                                کاربر عادی
                            </MenuItem>

                            <MenuItem value={UserRole.ACCOUNTANT}>
                                حسابدار
                            </MenuItem>

                            <MenuItem value={UserRole.SECRETARY}>
                                منشی
                            </MenuItem>

                        </Select>

                    </CustomFormControl>,

                ]}
            />

        </Stack>
    )
}