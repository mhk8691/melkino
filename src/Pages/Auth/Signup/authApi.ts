import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.mlkino.com',
})

export interface RegisterPayload {
    phone: string
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

export const sendOtp = (phone: string) => api.post('/accounts/send-otp/', { phone })

export const verifyOtp = (phone: string, code: string) =>
    api.post('/accounts/login/otp/', { phone, code }, { withCredentials: true })

export const registerUser = (payload: RegisterPayload) =>
    api.post('/accounts/register/', payload, { withCredentials: true })