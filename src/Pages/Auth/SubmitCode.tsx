import {Box, Button, Stack, Typography} from '@mui/material'
import axios from 'axios'
import React from 'react'
import {useForm, UseFormGetValues} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import {CustomTextField} from '../../Components/Input/CustomTextField'
import {setUtil} from '../../redux/UtilSlice'

type ParentForm = {
    mobile: string
}

type SubmitCodeForm = {
    otp: string
}

type AuthResponse = {
    data: {
        token: string
    }
}

interface Props {
    getValues?: UseFormGetValues<ParentForm>
    children: React.ReactNode
    phoneNumber?: string
    resource: string
}

export default function SubmitCode({getValues, children, phoneNumber}: Props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {register, handleSubmit} = useForm<SubmitCodeForm>()

    const mobile = getValues ? getValues('mobile') : phoneNumber

    const onSubmit = async (data: SubmitCodeForm) => {
        dispatch(setUtil({loading: true}))

        try {
            await axios.post<AuthResponse>(
                'https://api.darine.shop/accounts/login/otp/',
                {
                    mobile,
                    code: data.otp,
                },
                {
                    withCredentials: true,
                },
            )

            navigate('/dashboard')
        } catch (error: any) {
            dispatch(
                setUtil({
                    open: true,
                    message: error?.response?.data?.message || 'کد تایید صحیح نیست',
                    severity: 'error',
                }),
            )
        } finally {
            dispatch(setUtil({loading: false}))
        }
    }

    return (
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
            <Box width="100%">
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        my: 2,
                        fontSize: '12px',
                        lineHeight: 1.8,
                    }}
                >
                    کد تایید برای شماره{' '}
                    <Typography
                        component="span"
                        fontSize="12px"
                        fontWeight={700}
                        color="text.primary"
                    >
                        {mobile}
                    </Typography>{' '}
                    ارسال شده است
                </Typography>

                <CustomTextField
                    label="کد تایید"
                    name="otp"
                    register={{
                        ...register('otp', {
                            required: 'کد تایید الزامی است',
                        }),
                    }}
                />
            </Box>

            <Box width="100%" mt={3} textAlign="center">
                {children}

                <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    fullWidth
                    sx={{
                        height: 48,
                        borderRadius: 2,
                        fontSize: 15,
                        fontWeight: 700,
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: 'none',
                        },
                    }}
                >
                    تایید
                </Button>
            </Box>
        </Stack>
    )
}
