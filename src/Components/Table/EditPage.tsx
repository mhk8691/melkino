import { Button, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { DataProvider } from '../../Core/DataProvider'
import { setUtil } from '../../redux/UtilSlice'
import { useEffect, useState } from 'react'

export function EditPage(props) {
    const {
        title,
        resource,
        noEdit,
        formDetails,
        initialData,
        isFormData = false,
        redirect,
        noId = false,
        reload = false,
        hasChange = true,
        buildRequestData,
        disabled = false,
    } = props
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [updatedFields, setUpdatedFields] = useState({})
    const params = useParams()
    useEffect(() => {
        const update = Object.keys(formDetails).reduce((acc, key) => {
            if (formDetails[key] !== initialData[key]) {
                acc[key] = formDetails[key]
            }
            return acc
        }, {})
        setUpdatedFields(update)

    }, [formDetails,initialData])
    async function saveChanges() {
        if (Object.keys(updatedFields).length === 0) {
            dispatch(setUtil({ open: true, message: 'تغییری اعمال نشده است', severity: 'error' }))
            dispatch(setUtil({ loading: false }))
            return
        }
        try {
            dispatch(setUtil({ loading: true }))
            const formData = new FormData()

            Object.entries(hasChange ? updatedFields : formDetails).forEach(([key, value]) => {
                if (value instanceof File) {
                    formData.append(key, value)
                } else {
                    formData.append(key, String(value))
                }
            })
            const res = await DataProvider.patch(
                noId ? `${resource}` : `${resource}/${params.id || formDetails.id}/`,
                {
                    data: buildRequestData ? buildRequestData(hasChange ? updatedFields : formDetails) : isFormData ? formData : updatedFields,
                },
            )
            dispatch(
                setUtil({
                    open: true,
                    message: res.message,
                    severity: 'success',
                }),
            )
            if (reload) {
                window.location.reload()
            } else {
                navigate(redirect ? `/${redirect}` : `/${resource}`)
            }
        } catch (error: any) {
            dispatch(setUtil({ open: true, message: error.message, severity: 'error' }))
        }

        dispatch(setUtil({ loading: false }))
    }
    return (
        <Box p={2}>
            <Stack mb={4}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: {
                                xs: '15px !important',
                                sm: '18px !important',
                            },
                            '@media (max-width: 350px)': {
                                fontSize: '14px !important',
                            },
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {title}
                    </Typography>
                    <Stack>
                        {!noEdit && Object.keys(updatedFields).length !== 0 ? (
                            <Button
                                variant="outlined"
                                onClick={saveChanges}
                                disabled={disabled}
                                sx={{
                                    fontSize: {
                                        xs: '14px !important',
                                        sm: '16px !important',
                                    },
                                    py: {
                                        xs: 0.7,
                                        sm: 1,
                                    },
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                ذخیره تغییرات
                            </Button>
                        ) : (<Button
                            variant="outlined"
                            onClick={() => navigate(redirect ? `/${redirect}` : `/${resource}`)}
                            sx={{
                                fontSize: {
                                    xs: '14px !important',
                                    sm: '16px !important',
                                },
                                py: {
                                    xs: 0.7,
                                    sm: 1,
                                },
                                whiteSpace: 'nowrap',
                            }}
                        >
                            بازگشت
                        </Button>)}
                    </Stack>
                </Stack>
            </Stack>
            {props.children}
        </Box>
    )
}
