import {Button, Stack} from '@mui/material'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {CustomTextField} from '../../../Components/Input/CustomTextField'
import {setUtil} from '../../../redux/UtilSlice'

type LoginPasswordForm = {
    mobile: string
    password: string
    rememberMe: boolean
}

const LoginPassword = () => {
    const dispatch = useDispatch()

    const {register, handleSubmit} = useForm<LoginPasswordForm>({
        defaultValues: {
            mobile: '',
            password: '',
            rememberMe: false,
        },
    })

    const onSubmit = async (data: LoginPasswordForm) => {
        dispatch(setUtil({loading: true}))

        try {
            await axios.post('https://api.darine.shop/accounts/login/', {
                mobile: data.mobile,
                password: data.password,
            })
        } catch (error: any) {
            dispatch(
                setUtil({
                    open: true,
                    message: error?.response?.data?.message || 'اطلاعات ورود صحیح نیست',
                    severity: 'error',
                }),
            )
        } finally {
            dispatch(setUtil({loading: false}))
        }
    }

    return (
        <Stack
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            spacing={2.2}
            width="100%"
            mt={0.7}
        >
            <CustomTextField
                label="شماره تلفن"
                name="mobile"
                register={{
                    ...register('mobile', {
                        required: 'شماره تلفن الزامی است',
                    }),
                }}
                sx={{
                    '& .MuiFormLabel-root': {
                        fontSize: '14px',
                    },
                }}
            />

            <CustomTextField
                label="رمز عبور"
                name="password"
                type="password"
                register={{
                    ...register('password', {
                        required: 'رمز عبور الزامی است',
                    }),
                }}
                sx={{
                    '& .MuiFormLabel-root': {
                        fontSize: '14px',
                    },
                }}
            />

            <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                    mt: 1,
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
                ورود به حساب
            </Button>
        </Stack>
    )
}

export default LoginPassword
