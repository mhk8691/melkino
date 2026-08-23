import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.darine.shop',
})

export interface RegisterPayload {
    mobile: string
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
}

export const sendOtp = (mobile: string) => api.post('/accounts/send-otp/', {mobile})

export const verifyOtp = (mobile: string, code: string) =>
    api.post('/accounts/login/otp/', {mobile, code}, {withCredentials: true})

export const registerUser = (payload: RegisterPayload) =>
    api.post('/accounts/register/', payload, {withCredentials: true})