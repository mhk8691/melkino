import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import APP_URL from './APP_URL'

export interface ApiResponse<DataType> {
    statusCode: string
    status: number
    message: string
    data: DataType
}

const api = axios.create({
    baseURL: APP_URL,
    withCredentials: true,
})

let isRefreshing = false

let failedQueue: {
    resolve: (value?: any) => void
    reject: (reason?: any) => void
}[] = []

const processQueue = (error: any = null) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error)
        } else {
            promise.resolve()
        }
    })

    failedQueue = []
}

api.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error),
)

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest: any = error.config

        if (
            error.response?.status === 401 &&
            !originalRequest?._retry &&
            !window.location.pathname.startsWith('/login')
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve,
                        reject,
                    })
                }).then(() => api(originalRequest))
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                await axios.post('/accounts/token/refresh/',{
    withCredentials: true,
                })

                processQueue()

                return api(originalRequest)
            } catch (refreshError) {
                processQueue(refreshError)

                // window.location.replace('/login')

                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error.response?.data ?? error)
    },
)

export async function query<DataType>(
    options: AxiosRequestConfig,
): Promise<DataType> {
    const response = await api(options)

    return response.data as DataType
}

export default api