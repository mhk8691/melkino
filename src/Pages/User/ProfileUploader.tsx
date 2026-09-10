import EditIcon from '@mui/icons-material/Edit'
import {Box, Stack} from '@mui/material'
import {ChangeEvent, Dispatch, SetStateAction, useState} from 'react'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import userImage from '../../Images/user.png'

interface ProfileUploaderProps {
    profileImage?: string | null
}

interface Props<T extends ProfileUploaderProps> {
    user: T
    setUser: Dispatch<SetStateAction<T>>
}

export default function ProfileUploader<T extends ProfileUploaderProps>({
    user,
    setUser,
}: Props<T>) {
    const [isHover, setIsHover] = useState(false)
    const [imagePreview, setImagePreview] = useState('')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file) {
            const previewUrl = URL.createObjectURL(file)

            setImagePreview(previewUrl)

            setUser((prev) => ({
                ...prev,
                profileImage: previewUrl,
            }))
        }
    }

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
                }}
            >
                <Box
                    component="img"
                    src={
                        imagePreview
                            ? imagePreview
                            : user.profileImage
                              ? user.profileImage
                              : userImage
                    }
                    sx={{
                        borderRadius: '50%',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: isHover
                            ? 'brightness(0.4)'
                            : 'brightness(1)',
                        animation: isHover
                            ? 'imageAnimation .2s ease-in-out'
                            : 'none',

                        '@keyframes imageAnimation': {
                            '0%': {
                                filter: 'brightness(1)',
                            },
                            '100%': {
                                filter: 'brightness(0.4)',
                            },
                        },
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

                <CustomTextField
                    name="profileImage"
                    
                    id="profile_image"
                    onChange={handleChange}
                    sx={{
                        display: 'none',
                    }}
                />
            </Box>
        </Stack>
    )
}
