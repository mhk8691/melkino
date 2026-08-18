import {Box, Button, Stack, Typography} from '@mui/material'
import {makeStyles} from '@mui/styles'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {setUtil} from '../../../redux/UtilSlice'

import axios from 'axios'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {CustomTextField} from '../../../Components/Input/CustomTextField'
import logoImage from '../../../Images/darine.png'
import SubmitCode from '../SubmitCode'
export type LoginData = {
    username: string
    password: string
}

export const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min}:${sec < 10 ? '0' + sec : sec}`
}
export function Login(props) {
    const [isSubmit, setIsSubmit] = useState(false)
    const {register, handleSubmit, getValues} = useForm()
    const [time, setTime] = useState(0)
    const dispatch = useDispatch()
    useEffect(() => {
        if (time === 0) return

        const interval = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    clearInterval(interval)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [time])
    async function onSubmit(data) {
        dispatch(setUtil({loading: true}))
        try {
            await axios.post(`https://api.darine.shop/accounts/send-otp/`, data)
            setTime(120)
            setIsSubmit(true)
        } catch (error: any) {
            dispatch(
                setUtil({
                    open: true,
                    message: error.response.data.message,
                    severity: 'error',
                }),
            )
        } finally {
            dispatch(setUtil({loading: false}))
        }
    }

    return (
        <Stack justifyContent={'center'} alignItems="center" height="100%">
            <Box alignItems="center" justifyContent="center" marginBottom="20px">
                <Typography variant="subtitle1" fontWeight={700} marginRight="10px">
                    پنل مدیریت
                </Typography>
            </Box>
            <Box
                bgcolor="background.main"
                sx={{
                    width: {
                        xs: '80%',
                        sm: '60%',
                        md: '43%',
                        lg: '33%',
                    },
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
                borderRadius={3}
                px={5}
                py={7}
            >
                <Link to={'/'}>
                    <Box
                        component={'img'}
                        src={logoImage}
                        sx={{
                            width: '120px',
                            height: 'auto',
                            objectFit: 'contain',
                            mb: 2,
                        }}
                    />
                </Link>
                <Stack
                    direction={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    spacing={2.5}
                    width={'100%'}
                    mt={3}
                >
                    <Stack flexDirection={'row'} width={'100%'} justifyContent={'flex-start'}>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: '17px',
                            }}
                        >
                            ورود به حساب کاربری
                        </Typography>
                    </Stack>
                    {isSubmit ? (
                        <SubmitCode getValues={getValues} resource="login">
                            {time > 0 ? (
                                <Typography variant="body2" sx={{fontSize: '13px', mb: 1.5}}>
                                    {formatTime(time)} مانده تا دریافت مجدد کد
                                </Typography>
                            ) : (
                                <Button
                                    variant="text"
                                    disableRipple
                                    disableElevation
                                    onClick={handleSubmit(onSubmit)}
                                    sx={{
                                        ':hover': {
                                            backgroundColor: 'transparent',
                                        },
                                        ':active': {
                                            backgroundColor: 'transparent',
                                        },
                                        ':focus': {
                                            backgroundColor: 'transparent',
                                        },
                                        fontSize: '14px',
                                        mb: 1.5,
                                    }}
                                >
                                    دریافت مجدد کد
                                </Button>
                            )}
                        </SubmitCode>
                    ) : (
                        <Stack
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <Box width={'100%'}>
                                <CustomTextField
                                    label={'شماره تلفن'}
                                    register={{...register('mobile')}}
                                    name="mobile"
                                    sx={{
                                        '& .MuiFormLabel-root': {
                                            fontSize: '14px',
                                        },
                                    }}
                                />
                            </Box>

                            <Box textAlign="center" width={'100%'} mt={3}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{fontSize: '16px', width: '100%'}}
                                    type="submit"
                                >
                                    ورود
                                </Button>
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '14px',
                                    marginTop: '1.5rem !important',
                                }}
                            >
                                آیا حساب کاربری ندارید؟{' '}
                                <Box
                                    component={Link}
                                    to={'/register'}
                                    color={'primary.main'}
                                    sx={{ml: 0.5}}
                                >
                                    ثبت نام
                                </Box>
                            </Typography>
                        </Stack>
                    )}
                </Stack>
            </Box>
        </Stack>
    )
}

