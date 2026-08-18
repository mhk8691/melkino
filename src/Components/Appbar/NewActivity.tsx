import AddIcon from '@mui/icons-material/Add'
import CategoryIcon from '@mui/icons-material/Category'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import {Button, Menu, MenuItem, Stack, Typography} from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const addOptions = [
    {
        title: 'کاربر جدید',
        description: 'کاربر جدید ایجاد کنید',
        link: 'users/create',
        icon: <PersonAddIcon sx={{fontSize: '30px'}} />,
    },
    {
        title: 'محصول جدید',
        description: 'محصول جدید ایجاد کنید',
        link: 'products/create',
        icon: <ShoppingBasketIcon sx={{fontSize: '30px'}} />,
    },
    {
        title: 'دسته بندی جدید',
        description: 'دسته بندی جدید ایجاد کنید',
        link: 'category/create',
        icon: <CategoryIcon sx={{fontSize: '30px'}} />,
    },
]

const NewActivity = () => {
    const [createMenuAnchorEl, setCreateMenuAnchorEl] = useState<null | HTMLElement>(null)
    const navigate = useNavigate()

    const handleCreateMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setCreateMenuAnchorEl(event.currentTarget)
    }

    const handleCreateMenuClose = () => {
        setCreateMenuAnchorEl(null)
    }

    const createMenuOpen = Boolean(createMenuAnchorEl)

    return (
        <Stack direction="row" alignItems="center" gap={2} sx={{cursor: 'pointer'}}>
            <Stack>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateMenuClick}>
                    جدید
                </Button>
                <Menu
                    anchorEl={createMenuAnchorEl}
                    open={createMenuOpen}
                    onClose={handleCreateMenuClose}
                    disableScrollLock
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    sx={{
                        mt: '1rem',
                        '& .MuiList-root': {
                            width: '280px !important',
                            borderRadius: 2,
                        },
                    }}
                >
                    {addOptions.map((item, index) => (
                        <MenuItem
                            sx={{
                                '&:hover': {
                                    bgcolor: 'background.light',
                                    transition: '0.3s ease',
                                },
                            }}
                            onClick={() => {
                                navigate(item.link)
                                setCreateMenuAnchorEl(null)
                            }}
                        >
                            <Stack direction="row" alignItems="center" gap={1}>
                                <ListItemIcon
                                    sx={{
                                        py: 1,
                                        borderRadius: '5px',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <Stack>
                                    <Typography variant="bodyMd" fontWeight={700}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="xSmall" fontWeight={600} sx={{mt: 0.5}}>
                                        {item.description}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </MenuItem>
                    ))}
                </Menu>
            </Stack>
        </Stack>
    )
}

export default NewActivity
