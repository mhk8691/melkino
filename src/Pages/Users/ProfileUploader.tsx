import EditIcon from '@mui/icons-material/Edit'
import {Box, Stack} from '@mui/material'
import {ChangeEvent, useState} from 'react'
import {UsersType} from './Users'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import userImage from '../../Images/user.png'
interface Props {
    user: UsersType
    setUser: React.Dispatch<React.SetStateAction<UsersType>>
}
export default function ProfileUploader({user, setUser}: Props) {
    const [isHover, setIsHover] = useState(false)
    const [imagePreview, setImagePreview] = useState('')
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setImagePreview(URL.createObjectURL(file))
            setUser((prev) => ({...prev, profile_picture: file}))
        }
    }
    return (
        <Stack
            direction={'row'}
            justifyContent={{
                xs: 'center',
                sm: 'flex-start',
            }}
        >
            <Box
                component={'label'}
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
                    component={'img'}
                    src={
                        imagePreview
                            ? imagePreview
                            : typeof user.profile_picture === 'string' && user.profile_picture
                            ? user.profile_picture
                            : userImage
                    }
                    sx={{
                        borderRadius: '50%',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: isHover ? 'brightness(0.4)' : 'brightness(1)',
                        animation: isHover ? 'imageAnimation .2s ease-in-out' : 'none',
                        '@keyframes imageAnimation ': {
                            ' 0%': {
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
                            animation: isHover ? 'editIcon .2s ease-in-out' : 'none',
                            '@keyframes editIcon ': {
                                ' 0%': {
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
                    name="name"
                    type="file"
                    id="profile_image"
                    onChange={handleChange}
                    sx={{display: 'none'}}
                />
            </Box>
        </Stack>
    )
}
