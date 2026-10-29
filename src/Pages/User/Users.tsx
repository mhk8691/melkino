
import {
    CircularProgress,
    IconButton,
    InputAdornment,
    Stack,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import {
    type Dispatch,
    type SetStateAction,
    useRef,
    useState,
} from 'react'
import axios from 'axios'

import {CustomTextField} from '../../Components/Input/CustomTextField'
import {CustomSelectField} from '../../Components/Input/CustomSelectField'
import {GridProducer} from '../../Components/Table/GridProducer'
import DatePickerFilter from '../../Components/Filter/DatePicker'
import ProfileUploader from './ProfileUploader'
import {formatDate} from '../../Core/FormatDate'
import type {CommonUserType} from './UserTypes'
import {FormControlLabel, Switch} from '@mui/material'

export interface UsersType extends CommonUserType {}

interface AddressType {
    province: string
    city: string
    address: string
}

interface UsersProps<T extends UsersType> {
    users: T
    setUsers: Dispatch<SetStateAction<T>>
    resource: string
    editMode?: boolean
}

export function Users<T extends UsersType>({
    users,
    setUsers,
    resource,
    editMode = true,
}: UsersProps<T>) {
    const [postalLoading, setPostalLoading] = useState(false)
    const [postalError, setPostalError] = useState('')
    const lookupIdRef = useRef(0)
    const postalRef = useRef(users.postal_code ?? '')

    postalRef.current = users.postal_code ?? ''

    const postalLookup = async () => {
        const postal = postalRef.current.trim()

        if (!/^\d{10}$/.test(postal)) {
            setPostalError('کد پستی باید دقیقاً ۱۰ رقم باشد')
            return
        }

        const lookupId = ++lookupIdRef.current

        setPostalError('')
        setPostalLoading(true)

        try {
            const response = await axios.get<{
                data: AddressType
            }>(
                'https://api.mlkino.com/accounts/postal/lookup/',
                {
                    params: {
                        postal_code: postal,
                    },
                    withCredentials: true,
                },
            )

            if (
                lookupId !== lookupIdRef.current ||
                postalRef.current !== postal
            ) {
                return
            }

            const addressData = response.data.data

            if (!addressData) {
                setPostalError('اطلاعاتی برای این کد پستی یافت نشد')
                return
            }

            setUsers((prev) => {
                if (prev.postal_code !== postal) {
                    return prev
                }

                return {
                    ...prev,
                    province: addressData.province ?? '',
                    city: addressData.city ?? '',
                    address: addressData.address ?? '',
                }
            })
        } catch (error) {
            if (lookupId !== lookupIdRef.current) {
                return
            }

            let message = 'خطا در استعلام کد پستی'

            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data as
                    | {message?: string}
                    | undefined

                message = responseData?.message || message
            }

            setPostalError(message)
        } finally {
            if (lookupId === lookupIdRef.current) {
                setPostalLoading(false)
            }
        }
    }

    const handlePostalChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const postal = event.target.value
            .replace(/\D/g, '')
            .slice(0, 10)

        postalRef.current = postal
        lookupIdRef.current += 1

        setPostalLoading(false)
        setPostalError('')

        setUsers((prev) => ({
            ...prev,
            postal_code: postal || null,
            province: null,
            city: null,
            address: null,
        }))
    }

    const text = (name: keyof CommonUserType, label: string, nullable = false, disabled = false) => (
        <CustomTextField
            key={name}
            name={name}
            data-resource={resource}
            label={label}
            value={users[name] ?? ''}
            disabled={disabled}
            change={(event) => {
                const value = event.target.value
                setUsers((prev) => ({...prev, [name]: nullable && value === '' ? null : value}))
            }}
        />
    )
    const select = (name: 'user_type' | 'account_status' | 'verification_status', label: string, options: {key: string; label: string}[]) => (
        <CustomSelectField
            key={name}
            name={name}
            setData={setUsers}
            resource={resource}
            label={label}
            value={users[name] ?? ''}
            options={users[name] && !options.some((option) => option.key === users[name])
                ? [...options, {key: users[name], label: users[name]}] : options}
        />
    )
    return (
        <Stack spacing={2}>
            <ProfileUploader user={users} setUser={setUsers} />
            <GridProducer
                sx={{marginBottom: '16px'}}
                data={[
                    ...(editMode ? [text('id', 'شناسه کاربر', false, true)] : []),
                    text('first_name', 'نام'),
                    text('last_name', 'نام خانوادگی'),
                    <CustomTextField
                        key="full_name"
                        label="نام کامل"
                        value={[users.first_name, users.last_name].filter(Boolean).join(' ') || users.full_name || ''}
                        disabled
                    />,
                    text('phone', 'شماره موبایل'),
                    text('email', 'ایمیل', true),
                    text('national_code', 'کد ملی', true, editMode),
                    <DatePickerFilter
                        key="birth_date"
                        mode="controlled"
                        item={{field: 'birth_date', label: 'تاریخ تولد'}}
                        value={users.birth_date ?? null}
                        onChange={(value) => setUsers((prev) => ({...prev, birth_date: value || null}))}
                    />,
                    <CustomTextField
                        key="postal_code"
                        name="postal_code"
                        data-resource={resource}
                        label="کد پستی"
                        value={users.postal_code ?? ''}
                        inputProps={{inputMode: 'numeric', maxLength: 10}}
                        error={Boolean(postalError)}
                        helperText={postalError}
                        change={handlePostalChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton
                                        type="button"
                                        aria-label="استعلام کد پستی"
                                        onClick={postalLookup}
                                        disabled={postalLoading || !/^\d{10}$/.test(users.postal_code ?? '')}
                                    >
                                        {postalLoading ? <CircularProgress size={20} /> : <SearchIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />,
                    text('province', 'استان', true, true),
                    text('city', 'شهر', true, true),
                    text('address', 'آدرس', true, true),
                    select('user_type', 'نوع کاربر', [
                        {key: 'consumer', label: 'مصرف‌کننده'},
                        {key: 'investor', label: 'سرمایه‌گذار'},
                    ]),
                    select('account_status', 'وضعیت حساب', [
                        {key: 'active', label: 'فعال'},
                        {key: 'inactive', label: 'غیرفعال'},
                        {key: 'suspended', label: 'مسدود'},
                    ]),
                    select('verification_status', 'وضعیت احراز هویت', [
                        {key: 'not_started', label: 'شروع نشده'},
                        {key: 'pending', label: 'در انتظار بررسی'},
                        {key: 'verified', label: 'تأیید شده'},
                        {key: 'rejected', label: 'رد شده'},
                        {key: 'unverified', label: 'تأیید نشده'},
                    ]),
                    <CustomTextField key="role" label="نقش کاربر" value={users.role_display || users.role || ''} disabled />,
                    <FormControlLabel
                        key="is_active"
                        label="حساب فعال"
                        control={<Switch checked={users.is_active ?? true} onChange={(_, checked) => setUsers((prev) => ({...prev, is_active: checked}))} />}
                    />,
                    ...(editMode ? [
                        ...([
                            ['phone_verified', 'موبایل تأیید شده'],
                            ['national_code_verified', 'کد ملی تأیید شده'],
                            ['has_profile', 'پروفایل تکمیل شده'],
                        ] as const).map(([name, label]) => (
                            <FormControlLabel key={name} label={label} control={<Switch checked={users[name] ?? false} disabled />} />
                        )),
                        <CustomTextField key="date_joined" label="تاریخ ثبت‌نام" value={users.date_joined ? formatDate(users.date_joined) : '--'} disabled />,
                        <CustomTextField key="last_login" label="آخرین ورود" value={users.last_login ? formatDate(users.last_login) : '--'} disabled />,
                    ] : []),
                ]}
            />
        </Stack>
    )
}
