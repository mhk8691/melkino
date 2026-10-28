
import {Stack, InputAdornment, IconButton, CircularProgress} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import type {Dispatch, SetStateAction} from 'react'
import {useState} from 'react'
import axios from 'axios'

import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'

export interface ExpertType {
    id: string
    firstName: string
    lastName: string
    phoneNumber: string
    profileImage?: string | null
    createdAt?: string
    updatedAt?: string
    role: 'real_estate_expert' | 'accountant' | 'secretary'
    agencyId: string
    agencyName: string
    homeAddress: string
    workAddress: string
    registrationData: Record<string, unknown>
    postal_code?: string | null
    province?: string | null
    city?: string | null
}

interface AddressType {
    province: string
    city: string
    address: string
}

interface ExpertProps {
    expert: ExpertType
    setExpert: Dispatch<SetStateAction<ExpertType>>
    resource: string
    editMode?: boolean
}

export function Expert({
    expert,
    setExpert,
    resource,
    editMode = true,
}: ExpertProps) {
    const [postalLoading, setPostalLoading] = useState(false)
    const [postalError, setPostalError] = useState('')

    const postalLookup = async () => {
        const postal = expert.postal_code?.trim() ?? ''

        if (!/^\d{10}$/.test(postal)) {
            setPostalError('کد پستی باید ۱۰ رقم باشد')
            return
        }

        setPostalError('')
        setPostalLoading(true)

        try {
            const response = await axios.get<{
                data: AddressType
            }>('https://api.mlkino.com/accounts/postal/lookup/', {
                params: {
                    postal_code: postal,
                },
                withCredentials: true,
            })

            const addressData = response.data.data

            setExpert((prev) => ({
                ...prev,
                province: addressData.province ?? '',
                city: addressData.city ?? '',
                homeAddress: addressData.address ?? '',
            }))
        } catch (error) {
            setPostalError('خطا در استعلام کد پستی')
            console.error('خطا در استعلام کد پستی:', error)
        } finally {
            setPostalLoading(false)
        }
    }

    return (
        <Stack>
            <GridProducer
                sx={{marginBottom: '16px'}}
                data={[
                    ...(editMode
                        ? [
                              <CustomTextField
                                  key="id"
                                  name="id"
                                  setData={setExpert}
                                  resource={resource}
                                  label="شناسه"
                                  value={expert.id ?? ''}
                                  disabled
                              />,

                              <CustomTextField
                                  key="agencyName"
                                  name="agencyName"
                                  setData={setExpert}
                                  resource={resource}
                                  label="نام املاکی"
                                  value={expert.agencyName ?? ''}
                                  disabled
                              />,
                          ]
                        : []),

                    <CustomTextField
                        key="firstName"
                        name="firstName"
                        setData={setExpert}
                        resource={resource}
                        label="نام"
                        value={expert.firstName ?? ''}
                    />,

                    <CustomTextField
                        key="lastName"
                        name="lastName"
                        setData={setExpert}
                        resource={resource}
                        label="نام خانوادگی"
                        value={expert.lastName ?? ''}
                    />,

                    <CustomTextField
                        key="phoneNumber"
                        name="phoneNumber"
                        setData={setExpert}
                        resource={resource}
                        label="شماره تلفن"
                        value={expert.phoneNumber ?? ''}
                    />,

                    <CustomTextField
                        key="postal_code"
                        name="postal_code"
                        setData={setExpert}
                        resource={resource}
                        label="کد پستی"
                        value={expert.postal_code ?? ''}
                        inputMode="numeric"
                        error={Boolean(postalError)}
                        helperText={postalError}
                        onChange={() => setPostalError('')}
                        sx={{
                            '& input': {
                                direction: 'ltr',
                                textAlign: 'right',
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        color="primary"
                                        aria-label="استعلام کد پستی"
                                        onClick={postalLookup}
                                        disabled={postalLoading}
                                    >
                                        {postalLoading ? (
                                            <CircularProgress size={20} />
                                        ) : (
                                            <SearchIcon fontSize="small" />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />,

                    <CustomTextField
                        key="province"
                        name="province"
                        setData={setExpert}
                        resource={resource}
                        label="استان"
                        value={expert.province ?? ''}
                        disabled
                    />,

                    <CustomTextField
                        key="city"
                        name="city"
                        setData={setExpert}
                        resource={resource}
                        label="شهر"
                        value={expert.city ?? ''}
                        disabled
                    />,

                    <CustomTextField
                        key="homeAddress"
                        name="homeAddress"
                        setData={setExpert}
                        resource={resource}
                        label="آدرس منزل"
                        value={expert.homeAddress ?? ''}
                        multiline
                        minRows={2}
                        disabled
                    />,

                    <CustomTextField
                        key="workAddress"
                        name="workAddress"
                        setData={setExpert}
                        resource={resource}
                        label="آدرس محل کار"
                        value={expert.workAddress ?? ''}
                        multiline
                        minRows={2}
                    />,

                    ...(editMode
                        ? [
                              <CustomTextField
                                  key="createdAt"
                                  name="createdAt"
                                  setData={setExpert}
                                  resource={resource}
                                  label="تاریخ ایجاد"
                                  value={expert.createdAt ?? ''}
                                  disabled
                              />,

                              <CustomTextField
                                  key="updatedAt"
                                  name="updatedAt"
                                  setData={setExpert}
                                  resource={resource}
                                  label="آخرین بروزرسانی"
                                  value={expert.updatedAt ?? ''}
                                  disabled
                              />,

                              <CustomTextField
                                  key="role"
                                  name="role"
                                  setData={setExpert}
                                  resource={resource}
                                  label="نقش"
                                  value={expert.role ?? ''}
                                  disabled
                              />,
                          ]
                        : []),
                ]}
            />
        </Stack>
    )
}
