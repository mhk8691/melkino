import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'

import {
    Box,
    Divider,
    IconButton,
    InputAdornment,
    List,
    ListItemButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material'

import {useEffect, useMemo, useRef, useState} from 'react'

type SearchItem = {
    id: number
    title: string
    description: string
    category: string
    link: string
}

type AppbarSearchProps = {
    placeholder?: string
    mobile?: boolean
}

const STATIC_SEARCH_DATA: SearchItem[] = [
    {
        id: 1,
        title: 'مدیریت کاربران',
        description: 'مشاهده و مدیریت کاربران سامانه',
        category: 'کاربران',
        link: '/users',
    },
    {
        id: 2,
        title: 'افزودن کاربر جدید',
        description: 'ایجاد یک کاربر جدید در سیستم',
        category: 'کاربران',
        link: '/users/create',
    },
    {
        id: 3,
        title: 'مدیریت محصولات',
        description: 'مشاهده و مدیریت محصولات فروشگاه',
        category: 'محصولات',
        link: '/products',
    },
    {
        id: 4,
        title: 'افزودن محصول جدید',
        description: 'ایجاد محصول جدید',
        category: 'محصولات',
        link: '/products/create',
    },
    {
        id: 5,
        title: 'دسته بندی محصولات',
        description: 'مدیریت دسته بندی محصولات',
        category: 'دسته بندی',
        link: '/category',
    },
    {
        id: 6,
        title: 'مدیریت سفارشات',
        description: 'مشاهده سفارشات ثبت شده',
        category: 'سفارشات',
        link: '/orders',
    },
    {
        id: 7,
        title: 'اطلاعیه ها',
        description: 'مدیریت اطلاعیه های سیستم',
        category: 'سیستم',
        link: '/announcement',
    },
    {
        id: 8,
        title: 'تنظیمات حساب',
        description: 'مدیریت اطلاعات حساب کاربری',
        category: 'حساب کاربری',
        link: '/profile',
    },
]

const AppbarSearch = ({placeholder = 'جستجو در پنل...', mobile = false}: AppbarSearchProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false)

    const results = useMemo(() => {
        const value = search.trim().toLowerCase()

        if (!value) {
            return []
        }

        return STATIC_SEARCH_DATA.filter((item) => {
            return (
                item.title.toLowerCase().includes(value) ||
                item.description.toLowerCase().includes(value) ||
                item.category.toLowerCase().includes(value)
            )
        })
    }, [search])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleClear = () => {
        setSearch('')
        setOpen(false)
        inputRef.current?.focus()
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape') {
            handleClear()
        }
    }

    const handleResultClick = (item: SearchItem) => {
        console.log('Selected:', item)

        // بعداً:
        // navigate(item.link)

        setOpen(false)
    }

    return (
        <Box
            ref={containerRef}
            sx={{
                position: 'relative',
                width: mobile
                    ? '100%'
                    : {
                          xs: '100%',
                          sm: 300,
                          md: 360,
                          lg: 420,
                      },
            }}
        >
            {/* Search */}

            <TextField
                inputRef={inputRef}
                value={search}
                onChange={(event) => {
                    const value = event.target.value

                    setSearch(value)
                    setOpen(Boolean(value.trim()))
                }}
                onFocus={() => {
                    if (search.trim()) {
                        setOpen(true)
                    }
                }}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                size="small"
                fullWidth
                autoFocus={mobile}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Box
                                sx={{
                                    width: 34,
                                    height: 34,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '10px',
                                    color: open ? 'primary.main' : 'text.secondary',
                                    backgroundColor: open ? 'primary.lighter' : 'action.hover',
                                    transition: 'all .2s ease',
                                }}
                            >
                                <SearchRoundedIcon
                                    sx={{
                                        fontSize: 19,
                                    }}
                                />
                            </Box>
                        </InputAdornment>
                    ),

                    endAdornment: search && (
                        <InputAdornment position="end">
                            <IconButton
                                size="small"
                                onClick={handleClear}
                                sx={{
                                    width: 30,
                                    height: 30,
                                    color: 'text.secondary',
                                }}
                            >
                                <CloseRoundedIcon
                                    sx={{
                                        fontSize: 17,
                                    }}
                                />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        height: {
                            xs: 44,
                            sm: 46,
                        },

                        borderRadius: '14px',

                        backgroundColor: 'background.default',

                        paddingLeft: '5px',
                        paddingRight: '5px',

                        '& fieldset': {
                            borderColor: open ? 'primary.main' : 'divider',

                            transition: 'border-color .2s ease',
                        },

                        '&:hover fieldset': {
                            borderColor: 'primary.light',
                        },

                        '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                        },
                    },

                    '& input': {
                        fontSize: {
                            xs: 13,
                            sm: 14,
                        },

                        fontWeight: 500,
                    },

                    '& input::placeholder': {
                        color: 'text.secondary',
                        opacity: 0.8,
                    },
                }}
            />

            {/* Search Result Panel */}

            {open && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        left: 0,
                        right: 0,

                        backgroundColor: 'background.paper',

                        border: '1px solid',
                        borderColor: 'divider',

                        borderRadius: '16px',

                        overflow: 'hidden',

                        boxShadow: '0 16px 45px rgba(0,0,0,.10)',

                        zIndex: 1500,

                        animation: 'searchPanel .16s ease-out',

                        '@keyframes searchPanel': {
                            from: {
                                opacity: 0,
                                transform: 'translateY(-5px)',
                            },
                            to: {
                                opacity: 1,
                                transform: 'translateY(0)',
                            },
                        },
                    }}
                >
                    {/* Header */}

                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        px={2}
                        py={1.5}
                    >
                        <Typography fontSize={12} fontWeight={700} color="text.secondary">
                            {results.length > 0 ? `${results.length} نتیجه` : 'نتیجه جستجو'}
                        </Typography>

                        <Typography fontSize={11} color="text.disabled">
                            جستجوی سریع
                        </Typography>
                    </Stack>

                    <Divider />

                    {/* Results */}

                    {results.length > 0 ? (
                        <List
                            disablePadding
                            sx={{
                                maxHeight: 360,
                                overflowY: 'auto',
                            }}
                        >
                            {results.map((item) => (
                                <ListItemButton
                                    key={item.id}
                                    onClick={() => handleResultClick(item)}
                                    sx={{
                                        px: 1.5,
                                        py: 1.2,
                                        mx: 0.75,
                                        my: 0.4,
                                        borderRadius: '11px',

                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                        },
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        width="100%"
                                        gap={1.25}
                                    >
                                        {/* Icon */}

                                        <Box
                                            sx={{
                                                width: 38,
                                                height: 38,
                                                flexShrink: 0,

                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',

                                                borderRadius: '10px',

                                                backgroundColor: 'primary.lighter',

                                                color: 'primary.main',
                                            }}
                                        >
                                            <SearchRoundedIcon
                                                sx={{
                                                    fontSize: 19,
                                                }}
                                            />
                                        </Box>

                                        {/* Text */}

                                        <Stack minWidth={0} flex={1}>
                                            <Typography fontSize={13} fontWeight={700} noWrap>
                                                {item.title}
                                            </Typography>

                                            <Typography
                                                fontSize={11}
                                                color="text.secondary"
                                                noWrap
                                                sx={{
                                                    mt: 0.3,
                                                }}
                                            >
                                                {item.description}
                                            </Typography>
                                        </Stack>

                                        {/* Category */}

                                        <Box
                                            sx={{
                                                display: {
                                                    xs: 'none',
                                                    sm: 'block',
                                                },

                                                px: 1,
                                                py: 0.5,

                                                borderRadius: '7px',

                                                backgroundColor: 'action.hover',
                                            }}
                                        >
                                            <Typography
                                                fontSize={10}
                                                fontWeight={600}
                                                color="text.secondary"
                                            >
                                                {item.category}
                                            </Typography>
                                        </Box>

                                        <ArrowBackRoundedIcon
                                            sx={{
                                                fontSize: 17,
                                                color: 'text.disabled',
                                            }}
                                        />
                                    </Stack>
                                </ListItemButton>
                            ))}
                        </List>
                    ) : (
                        <Stack alignItems="center" justifyContent="center" py={4} px={2}>
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,

                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                    borderRadius: '13px',

                                    backgroundColor: 'action.hover',

                                    color: 'text.disabled',

                                    mb: 1.5,
                                }}
                            >
                                <SearchRoundedIcon />
                            </Box>

                            <Typography fontSize={13} fontWeight={700}>
                                نتیجه‌ای پیدا نشد
                            </Typography>

                            <Typography fontSize={11} color="text.secondary" sx={{mt: 0.5}}>
                                عبارت دیگری را امتحان کنید
                            </Typography>
                        </Stack>
                    )}
                </Box>
            )}
        </Box>
    )
}

export default AppbarSearch
