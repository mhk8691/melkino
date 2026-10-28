
import EditIcon from '@mui/icons-material/Edit'
import { Box, Stack } from '@mui/material'
import {
    type ChangeEvent,
    type Dispatch,
    type SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react'
import userImage from '../../Images/user.png'

interface ProfileUploaderProps {
    avatar: string | null
}

interface Props<T extends ProfileUploaderProps> {
    user: T
    setUser: Dispatch<SetStateAction<T>>
    onFileChange?: (file: File) => void
}

export default function ProfileUploader<
    T extends ProfileUploaderProps
>({
    user,
    setUser,
    onFileChange,
}: Props<T>) {
    const [isHover, setIsHover] = useState(false)
    const [imagePreview, setImagePreview] = useState('')

    const previewRef = useRef<string | null>(null)

    useEffect(() => {
        return () => {
            if (previewRef.current) {
                URL.revokeObjectURL(previewRef.current)
            }
        }
    }, [])

    const handleChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0]

        if (!file) return

        if (!file.type.startsWith('image/')) {
            event.target.value = ''
            return
        }

        if (previewRef.current) {
            URL.revokeObjectURL(previewRef.current)
        }

        const previewUrl = URL.createObjectURL(file)

        previewRef.current = previewUrl
        setImagePreview(previewUrl)

        setUser((prev) => ({
            ...prev,
            avatar: previewUrl,
        }))

        onFileChange?.(file)

        event.target.value = ''
    }

    const imageSrc =
        imagePreview || user.avatar || userImage

    return (
        <Stack
            direction="row"
            justifyContent={{
                xs: 'center',
                sm: 'flex-start',
            }}
        >
            <Box
                component="label"
                htmlFor="profile_image"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                sx={{
                    width: {
                        xs: '110px',
                        sm: '125px',
                    },
                    height: {
                        xs: '110px',
                        sm: '125px',
                    },
                    position: 'relative',
                    borderRadius: '50%',
                    mb: {
                        xs: 4,
                        sm: 5,
                    },
                    cursor: 'pointer',
                    overflow: 'hidden',
                }}
            >
                <Box
                    component="img"
                    src={imageSrc}
                    alt="تصویر پروفایل کاربر"
                    onError={(event) => {
                        event.currentTarget.src = userImage
                    }}
                    sx={{
                        borderRadius: '50%',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: isHover
                            ? 'brightness(0.4)'
                            : 'brightness(1)',
                        transition: 'filter .2s ease-in-out',
                    }}
                />

                {isHover && (
                    <EditIcon
                        fontSize="large"
                        color="primary"
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            animation: 'editIcon .2s ease-in-out',

                            '@keyframes editIcon': {
                                '0%': {
                                    opacity: 0,
                                },
                                '100%': {
                                    opacity: 1,
                                },
                            },
                        }}
                    />
                )}

                <Box
                    component="input"
                    type="file"
                    name="avatar"
                    id="profile_image"
                    accept="image/*"
                    onChange={handleChange}
                    sx={{
                        display: 'none',
                    }}
                />
            </Box>
        </Stack>
    )
}
