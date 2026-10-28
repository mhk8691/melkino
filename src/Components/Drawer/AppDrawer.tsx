
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
    Box,
    Collapse,
    ListItem,
    Stack,
    Theme,
    Tooltip,
    Typography,
    alpha,
    useMediaQuery,
    useTheme,
} from '@mui/material'

import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'

import {
    cloneElement,
    isValidElement,
    useEffect,
    useMemo,
    useState,
    type ReactElement,
} from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import AppbarProfile from '../Appbar/AppbarProfile'

import {
    DrawerGroupType,
    DrawerItemType,
    drawerGroups,
    drawerItems,
    canAccessDrawerItem,
} from './DrawerItems'
import { useAppSelector } from '../../redux/store'
import { UsersType } from '../../Pages/User/Users'

interface AppDrawerProps {
    setSelectedTitle: (title: string) => void
    drawerOpen: boolean
    user: UsersType
    setDrawerOpen: (open: boolean) => void
}

export function AppDrawer({
    setSelectedTitle,
    drawerOpen,
    user,
    setDrawerOpen,
}: AppDrawerProps) {
    const currentRole = useAppSelector(
        state => state.role.role
    )

    const [openGroupId, setOpenGroupId] =
        useState<string | null>(null)

    const theme = useTheme()
    const navigate = useNavigate()
    const location = useLocation()

    const isMobile = useMediaQuery(
        theme.breakpoints.down('mdl')
    )

    const primary = theme.palette.primary

    const accent = {
        main: primary.main,
        dark: primary.dark,
        contrastText: primary.contrastText,
        soft: alpha(primary.main, 0.08),
        gradient: `linear-gradient(160deg, ${primary.main} 0%, #327AED 100%)`,
    }

    // فیلتر منوها بر اساس نقش Redux
    const visibleDrawerItems = useMemo(() => {
        return drawerItems.filter(item =>
            canAccessDrawerItem(item, currentRole)
        )
    }, [currentRole])

    // پیدا کردن منوی فعال از روی مسیر
    const activeItem = useMemo(() => {
        const pathname = location.pathname

        return visibleDrawerItems
            .filter(item => {
                const path = `/${item.link}`

                return (
                    pathname === path ||
                    pathname.startsWith(`${path}/`)
                )
            })
            .sort(
                (a, b) => b.link.length - a.link.length
            )[0] ?? null
    }, [location.pathname, visibleDrawerItems])

    useEffect(() => {
        setSelectedTitle(activeItem?.title ?? '')

        if (activeItem?.groupId) {
            setOpenGroupId(activeItem.groupId)
        }
    }, [activeItem, setSelectedTitle])

    const handleClick = (item: DrawerItemType) => {
        if (
            item.disabled ||
            !canAccessDrawerItem(item, currentRole)
        ) {
            return
        }

        setSelectedTitle(item.title)

        if (isMobile) {
            setDrawerOpen(false)
        }

        navigate(`/${item.link}`)
    }

    const toggleGroup = (groupId: string) => {
        setOpenGroupId(prev =>
            prev === groupId ? null : groupId
        )
    }

    // نمایش یک آیتم
    const renderItem = (
        item: DrawerItemType,
        nested: boolean
    ) => {
        if (!canAccessDrawerItem(item, currentRole)) {
            return null
        }

        const isSelected = activeItem?.link === item.link
        const isDisabled = Boolean(item.disabled)

        return (
            <ListItemButton
                key={item.link}
                disabled={isDisabled}
                onClick={() => handleClick(item)}
                disableRipple
                sx={{
                    width: '100%',
                    minHeight: nested ? 40 : 46,
                    borderRadius: '15px',
                    py: nested ? 0.5 : 0.9,
                    pInlineStart: nested ? 2 : 1.75,
                    pInlineEnd: 1.5,
                    gap: 1.25,
                    transition: 'all .18s ease',
                    backgroundColor: isSelected
                        ? accent.dark
                        : 'transparent',
                    backgroundImage: isSelected
                        ? accent.gradient
                        : 'none',
                    boxShadow: isSelected
                        ? `0 6px 14px ${alpha(accent.dark, 0.32)}`
                        : 'none',

                    '&.Mui-disabled': {
                        opacity: 0.35,
                        cursor: 'not-allowed',
                        pointerEvents: 'auto',
                        filter: 'grayscale(60%)',
                    },

                    '&:hover': {
                        backgroundColor: isDisabled
                            ? 'transparent'
                            : isSelected
                              ? accent.dark
                              : alpha(accent.main, 0.08),

                        backgroundImage: isDisabled
                            ? 'none'
                            : isSelected
                              ? accent.gradient
                              : 'none',
                    },
                }}
            >
                {isMobile ? (
                    <ListItemIcon
                        sx={{
                            minWidth: nested ? 26 : 30,
                            color: isSelected
                                ? '#fff'
                                : '#9AA1AB',
                            '& svg': {
                                fontSize: nested
                                    ? '1.3rem'
                                    : '1.45rem',
                            },
                        }}
                    >
                        {item.icon}
                    </ListItemIcon>
                ) : (
                    <Tooltip
                        title={
                            isDisabled
                                ? `${item.title} (غیرفعال)`
                                : item.title
                        }
                        placement="left"
                        arrow
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: nested ? 26 : 30,
                                color: isSelected
                                    ? '#fff'
                                    : '#9AA1AB',
                                '& svg': {
                                    fontSize: nested
                                        ? '1.3rem'
                                        : '1.45rem',
                                },
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>
                    </Tooltip>
                )}

                <Typography
                    variant="bodyMd"
                    sx={{
                        color: isSelected
                            ? '#fff'
                            : 'grey.600',
                        fontWeight: isSelected ? 600 : 500,
                        fontSize: nested ? 13.5 : 14,
                        whiteSpace: 'nowrap',
                    }}
                >
                    {item.title}
                </Typography>
            </ListItemButton>
        )
    }

    // نمایش گروه و زیرمنوهای مجاز
    const renderGroup = (group: DrawerGroupType) => {
        const groupItems = visibleDrawerItems.filter(
            item => item.groupId === group.id
        )

        if (groupItems.length === 0) {
            return null
        }

        const isOpen = openGroupId === group.id

        const isGroupActive = groupItems.some(
            item => activeItem?.link === item.link
        )

        const chipActive = isOpen || isGroupActive

        const icon = isValidElement(group.icon)
            ? cloneElement(
                  group.icon as ReactElement<any>,
                  {
                      sx: {
                          fontSize: '1.15rem !important',
                      },
                  }
              )
            : group.icon

        return (
            <Box key={group.id}>
                <ListItemButton
                    onClick={() => toggleGroup(group.id)}
                    disableRipple
                    sx={{
                        width: '100%',
                        minHeight: 46,
                        borderRadius: '15px',
                        py: 0.9,
                        pInlineStart: 1.75,
                        pInlineEnd: 1.5,
                        gap: 1.25,
                        backgroundColor: chipActive
                            ? accent.dark
                            : 'transparent',
                        backgroundImage: chipActive
                            ? accent.gradient
                            : 'none',
                        boxShadow: chipActive
                            ? `0 6px 14px ${alpha(accent.dark, 0.32)}`
                            : 'none',
                        transition: 'all .18s ease',

                        '&:hover': {
                            backgroundColor: chipActive
                                ? accent.dark
                                : alpha(accent.main, 0.08),
                            backgroundImage: chipActive
                                ? accent.gradient
                                : 'none',
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            color: chipActive
                                ? '#fff'
                                : '#9AA1AB',
                        }}
                    >
                        {icon}
                    </Box>

                    <Typography
                        variant="bodyMd"
                        sx={{
                            flexGrow: 1,
                            fontWeight: chipActive
                                ? 600
                                : 500,
                            fontSize: 14,
                            whiteSpace: 'nowrap',
                            color: chipActive
                                ? '#fff'
                                : 'grey.600',
                        }}
                    >
                        {group.title}
                    </Typography>

                    <ExpandMoreIcon
                        sx={{
                            fontSize: '1.3rem',
                            color: chipActive
                                ? '#fff'
                                : '#A6ACB5',
                            transform: isOpen
                                ? 'rotate(180deg)'
                                : 'rotate(0deg)',
                            transition:
                                'transform .25s cubic-bezier(.4,0,.2,1), color .2s ease',
                        }}
                    />
                </ListItemButton>

                <Collapse
                    in={isOpen}
                    timeout={220}
                    unmountOnExit
                >
                    <Stack
                        gap="2px"
                        sx={{
                            mt: '2px',
                            mb: '2px',
                        }}
                    >
                        {groupItems.map(item =>
                            renderItem(item, true)
                        )}
                    </Stack>
                </Collapse>
            </Box>
        )
    }

    // ساخت منوها با حفظ ترتیب
    const renderMenu = () => {
        const nodes: ReactElement[] = []
        const renderedGroupIds = new Set<string>()

        visibleDrawerItems.forEach(item => {
            if (!item.groupId) {
                const node = renderItem(item, false)

                if (node) {
                    nodes.push(node)
                }

                return
            }

            if (renderedGroupIds.has(item.groupId)) {
                return
            }

            renderedGroupIds.add(item.groupId)

            const group = drawerGroups.find(
                g => g.id === item.groupId
            )

            if (!group) return

            const node = renderGroup(group)

            if (node) {
                nodes.push(node)
            }
        })

        return nodes
    }

    return (
        <Stack>
            <Drawer
                variant={
                    isMobile ? 'temporary' : 'permanent'
                }
                open={isMobile ? drawerOpen : true}
                onClose={() => setDrawerOpen(false)}
                anchor="left"
                sx={{
                    zIndex: 1000,
                    overflow: 'hidden',

                    '& .MuiDrawer-paper': {
                        width: 232,
                        overflowY: 'auto',
                        backgroundColor: (t: Theme) =>
                            `${t.palette.background.main} !important`,
                        border: 'none',
                        boxShadow:
                            '0px 2px 8px rgba(0, 0, 0, 0.04), 0px 4px 16px rgba(0, 0, 0, 0.03)',
                    },

                    '& .MuiPaper-root': {
                        backgroundImage: 'none',
                    },
                }}
            >
                <List
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        px: 2,
                        py: '1.25rem',
                        mt: isMobile ? 8 : 0,
                    }}
                >
                    {isMobile && (
                        <ListItem
                            sx={{
                                px: 0.5,
                                mb: 1,
                            }}
                        >
                            <AppbarProfile user={user} />
                        </ListItem>
                    )}

                    {renderMenu()}
                </List>
            </Drawer>
        </Stack>
    )
}

export const drawerWidth = 232
