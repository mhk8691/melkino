import {Box, Button, Stack, Typography} from '@mui/material'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'

import {CustomTextField} from '../../../Components/Input/CustomTextField'
import {setUtil} from '../../../redux/UtilSlice'
import { registerUser } from './authApi'

type SignupInfoForm = {
    firstName: string
    lastName: string
    nationalCode: string
    birthDate: string
    email: string
    landline: string
    province: string
    city: string
    postalCode: string
    address: string
    password: string
    confirmPassword: string
}

interface Props {
    mobile: string
    onBack: () => void
}

type InfoSubStep = 0 | 1

const SUB_STEP_FIELDS: Record<InfoSubStep, (keyof SignupInfoForm)[]> = {
    0: ['firstName', 'lastName', 'nationalCode', 'birthDate', 'email', 'landline'],
    1: ['province', 'city', 'postalCode', 'address', 'password', 'confirmPassword'],
}

const subStepLabels = ['اطلاعات شخصی', 'آدرس و رمز عبور']

const SignupInfo = ({mobile, onBack}: Props) => {
    const dispatch = useDispatch()
    const [subStep, setSubStep] = useState<InfoSubStep>(0)

    const {
        register,
        handleSubmit,
        trigger,
        watch,
        formState: {errors, isSubmitting},
    } = useForm<SignupInfoForm>({mode: 'onTouched'})

    const password = watch('password')

    const goNext = async () => {
        const isValid = await trigger(SUB_STEP_FIELDS[0])
        if (isValid) setSubStep(1)
    }

    const goPrev = () => {
        if (subStep === 1) {
            setSubStep(0)
            return
        }
        onBack()
    }

    const onSubmit = async (data: SignupInfoForm) => {
        const {confirmPassword, ...rest} = data

        dispatch(setUtil({loading: true}))

        try {
            await registerUser({mobile, ...rest})

            dispatch(
                setUtil({
                    open: true,
                    message: 'اطلاعات ثبت شد',
                    severity: 'success',
                }),
            )
        } catch (error: any) {
            dispatch(
                setUtil({
                    open: true,
                    message: error?.response?.data?.message || 'ثبت اطلاعات با خطا مواجه شد',
                    severity: 'error',
                }),
            )
        } finally {
            dispatch(setUtil({loading: false}))
        }
    }

    return (
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2} width="100%">
            <Box>
                <Typography fontSize={{xs: 14, sm: 15}} fontWeight={700}>
                    اطلاعات حساب
                </Typography>

                <Typography fontSize={{xs: 11, sm: 12}} color="text.secondary" mt={0.5}>
                    {subStepLabels[subStep]} — بخش {subStep + 1} از ۲
                </Typography>

                <Stack direction="row" spacing={0.5} mt={1}>
                    {subStepLabels.map((_, index) => (
                        <Box
                            key={index}
                            sx={{
                                flex: 1,
                                height: 3,
                                borderRadius: 10,
                                bgcolor:
                                    subStep >= index ? 'primary.main' : 'rgba(30, 97, 205, 0.1)',
                                transition: 'background-color 300ms ease',
                            }}
                        />
                    ))}
                </Stack>
            </Box>

            {subStep === 0 && (
                <>
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                        <CustomTextField
                            label="نام"
                            name="firstName"
                            register={{...register('firstName', {required: 'نام الزامی است'})}}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                            fullWidth
                        />
                        <CustomTextField
                            label="نام خانوادگی"
                            name="lastName"
                            register={{
                                ...register('lastName', {required: 'نام خانوادگی الزامی است'}),
                            }}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                            fullWidth
                        />
                    </Stack>

                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                        <CustomTextField
                            label="کد ملی"
                            name="nationalCode"
                            inputMode="numeric"
                            register={{
                                ...register('nationalCode', {
                                    required: 'کد ملی الزامی است',
                                    pattern: {
                                        value: /^\d{10}$/,
                                        message: 'کد ملی باید ۱۰ رقم باشد',
                                    },
                                }),
                            }}
                            error={!!errors.nationalCode}
                            helperText={errors.nationalCode?.message}
                            sx={{'& input': {direction: 'ltr', textAlign: 'right'}}}
                            fullWidth
                        />
                        <CustomTextField
                            label="تاریخ تولد"
                            name="birthDate"
                            placeholder="1400/01/01"
                            register={{
                                ...register('birthDate', {required: 'تاریخ تولد الزامی است'}),
                            }}
                            error={!!errors.birthDate}
                            helperText={errors.birthDate?.message}
                            sx={{'& input': {direction: 'ltr', textAlign: 'right'}}}
                            fullWidth
                        />
                    </Stack>

                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                        <CustomTextField
                            label="ایمیل"
                            name="email"
                            type="email"
                            register={{
                                ...register('email', {
                                    required: 'ایمیل الزامی است',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'ایمیل معتبر نیست',
                                    },
                                }),
                            }}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            sx={{'& input': {direction: 'ltr', textAlign: 'right'}}}
                            fullWidth
                        />
                      
                    </Stack>

                    <Stack direction="row" spacing={1.5} mt={1}>
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={goPrev}
                            fullWidth
                            sx={{height: 48, borderRadius: 2, fontWeight: 700}}
                        >
                            مرحله قبل
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            onClick={goNext}
                            fullWidth
                            sx={{
                                height: 48,
                                borderRadius: 2,
                                fontWeight: 700,
                                boxShadow: 'none',
                                '&:hover': {boxShadow: 'none'},
                            }}
                        >
                            مرحله بعد
                        </Button>
                    </Stack>
                </>
            )}

            {subStep === 1 && (
                <>
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                        <CustomTextField
                            label="استان"
                            name="province"
                            register={{...register('province', {required: 'استان الزامی است'})}}
                            error={!!errors.province}
                            helperText={errors.province?.message}
                            fullWidth
                        />
                        <CustomTextField
                            label="شهر"
                            name="city"
                            register={{...register('city', {required: 'شهر الزامی است'})}}
                            error={!!errors.city}
                            helperText={errors.city?.message}
                            fullWidth
                        />
                    </Stack>

                    <CustomTextField
                        label="کد پستی"
                        name="postalCode"
                        inputMode="numeric"
                        register={{
                            ...register('postalCode', {
                                required: 'کد پستی الزامی است',
                                pattern: {value: /^\d{10}$/, message: 'کد پستی باید ۱۰ رقم باشد'},
                            }),
                        }}
                        error={!!errors.postalCode}
                        helperText={errors.postalCode?.message}
                        sx={{'& input': {direction: 'ltr', textAlign: 'right'}}}
                    />

                    <CustomTextField
                        label="آدرس"
                        name="address"
                        multiline
                        minRows={2}
                        register={{...register('address', {required: 'آدرس الزامی است'})}}
                        error={!!errors.address}
                        helperText={errors.address?.message}
                    />

                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                        <CustomTextField
                            label="رمز عبور"
                            name="password"
                            type="password"
                            register={{
                                ...register('password', {
                                    required: 'رمز عبور الزامی است',
                                    minLength: {
                                        value: 8,
                                        message: 'رمز عبور حداقل باید ۸ کاراکتر باشد',
                                    },
                                }),
                            }}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            fullWidth
                        />
                        <CustomTextField
                            label="تکرار رمز عبور"
                            name="confirmPassword"
                            type="password"
                            register={{
                                ...register('confirmPassword', {
                                    required: 'تکرار رمز عبور الزامی است',
                                    validate: (value) =>
                                        value === password || 'رمز عبور و تکرار آن یکسان نیست',
                                }),
                            }}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                            fullWidth
                        />
                    </Stack>

                    <Stack direction="row" spacing={1.5} mt={1}>
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={goPrev}
                            fullWidth
                            sx={{height: 48, borderRadius: 2, fontWeight: 700}}
                        >
                            مرحله قبل
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isSubmitting}
                            sx={{
                                height: 48,
                                borderRadius: 2,
                                fontWeight: 700,
                                boxShadow: 'none',
                                '&:hover': {boxShadow: 'none'},
                            }}
                        >
                            {isSubmitting ? 'در حال ثبت...' : 'تکمیل ثبت نام'}
                        </Button>
                    </Stack>
                </>
            )}
        </Stack>
    )
}

export default SignupInfo
