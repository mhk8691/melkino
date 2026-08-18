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
import { cloneElement, isValidElement, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ProfileType } from '../../Core/types'
import AppbarProfile from '../Appbar/AppbarProfile'
import { DrawerGroupType, DrawerItemType, drawerGroups, drawerItems } from './DrawerItems'

export function AppDrawer({
    setSelectedTitle,
    drawerOpen,
    user,
    setDrawerOpen,
}: {
    setSelectedTitle: (title: string) => void
    drawerOpen: boolean
    user: ProfileType
    setDrawerOpen: (open: boolean) => void
}) {
    const [selected, setSelected] = useState<boolean[]>(new Array(drawerItems.length).fill(false))
    const [openGroupId, setOpenGroupId] = useState<string | null>(null)
    const theme = useTheme()
    const navigate = useNavigate()
    const location = useLocation()
    const isMobile = useMediaQuery(theme.breakpoints.down('mdl'))
    const primary = theme.palette.primary
    const accent = {
        main: primary.main,
        dark: primary.dark,
        contrastText: primary.contrastText,
        soft: alpha(primary.main, 0.08),
        gradient: `linear-gradient(160deg, ${primary.main} 0%, #327AED 100%)`,
    }

    useEffect(() => {
        const value = location.pathname
        let checked = false

        drawerItems.forEach((item, index) => {
            if (value.toString().startsWith('/' + item.link)) {
                const newList = new Array(drawerItems.length).fill(false)
                newList[index] = true
                setSelected(newList)
                setSelectedTitle(item.title)
                checked = true

                if (item.groupId) {
                    setOpenGroupId(item.groupId)
                }
            }
        })

        if (!checked) setSelectedTitle('')
    }, [location.pathname])

    function handleClick(item: DrawerItemType, index: number) {
        if (item.disabled) return

        const newList = new Array(drawerItems.length).fill(false)
        newList[index] = true
        setSelected(newList)
        setSelectedTitle(item.title)

        if (isMobile) setDrawerOpen(false)
        navigate(item.link)
    }

    function toggleGroup(groupId: string) {
        setOpenGroupId((prevId) => (prevId === groupId ? null : groupId))
    }

    // ---- shared row renderer ----
    const renderItem = (item: DrawerItemType, nested: boolean) => {
        const index = drawerItems.findIndex((i) => i.link === item.link)
        if (!(item.role === user.role || item.role === 'all')) return null

        const isSelected = selected[index]
        const isDisabled = Boolean(item.disabled)

        return (
            <ListItemButton
                key={item.title + item.link}
                disabled={isDisabled}
                onClick={() => handleClick(item, index)}
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
                    backgroundColor: isSelected ? accent.dark : 'transparent',
                    backgroundImage: isSelected ? accent.gradient : 'none',
                    boxShadow: isSelected ? `0 6px 14px ${alpha(accent.dark, 0.32)}` : 'none',
                    '&.Mui-disabled': {
                        opacity: 0.35,
                        cursor: 'not-allowed',
                        pointerEvents: 'auto',
                        filter: 'grayscale(60%)',
                    },
                    '&:hover': {
                        backgroundColor: isDisabled ? 'transparent' : isSelected ? accent.dark : alpha(accent.main, 0.08),
                        backgroundImage: isDisabled ? 'none' : isSelected ? accent.gradient : 'none',
                    },
                }}
            >
                {isMobile ? (
                    <ListItemIcon
                        sx={{
                            minWidth: nested ? 26 : 30,
                            color: isSelected ? '#fff' : '#9AA1AB',
                            '& svg': { fontSize: nested ? '1.3rem' : '1.45rem' },
                        }}
                    >
                        {item.icon}
                    </ListItemIcon>
                ) : (
                    <Tooltip title={isDisabled ? `${item.title} (غیرفعال)` : item.title} placement="left" arrow>
                        <ListItemIcon
                            sx={{
                                minWidth: nested ? 26 : 30,
                                color: isSelected ? '#fff' : '#9AA1AB',
                                '& svg': { fontSize: nested ? '1.3rem' : '1.45rem' },
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>
                    </Tooltip>
                )}

                <Typography
                    variant="bodyMd"
                    sx={{
                        color: isSelected ? '#fff' : 'grey.600',
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

    // ---- collapsible group header + its nested list ----
    const renderGroup = (group: DrawerGroupType) => {
        const groupItems = drawerItems.filter((i) => i.groupId === group.id)
        const visibleItems = groupItems.filter((i) => i.role === user.role || i.role === 'all')
        if (visibleItems.length === 0) return null

        const isOpen = openGroupId === group.id
        const isGroupActive = groupItems.some(
            (i) => selected[drawerItems.findIndex((di) => di.link === i.link)],
        )
        const chipActive = isOpen || isGroupActive

        const icon = isValidElement(group.icon)
            ? cloneElement(group.icon as React.ReactElement, { sx: { fontSize: '1.15rem !important' } })
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
                        backgroundColor: chipActive ? accent.dark : 'transparent',
                        backgroundImage: chipActive ? accent.gradient : 'none',
                        boxShadow: chipActive ? `0 6px 14px ${alpha(accent.dark, 0.32)}` : 'none',
                        transition: 'all .18s ease',
                        '&:hover': {
                            backgroundColor: chipActive ? accent.dark : alpha(accent.main, 0.08),
                            backgroundImage: chipActive ? accent.gradient : 'none',
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            color: chipActive ? '#fff' : '#9AA1AB',
                        }}
                    >
                        {icon}
                    </Box>

                    <Typography
                        variant="bodyMd"
                        sx={{
                            flexGrow: 1,
                            fontWeight: chipActive ? 600 : 500,
                            fontSize: 14,
                            whiteSpace: 'nowrap',
                            color: chipActive ? '#fff' : 'grey.600',
                        }}
                    >
                        {group.title}
                    </Typography>

                    <ExpandMoreIcon
                        sx={{
                            fontSize: '1.3rem',
                            color: chipActive ? '#fff' : '#A6ACB5',
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform .25s cubic-bezier(.4,0,.2,1), color .2s ease',
                        }}
                    />
                </ListItemButton>

                <Collapse in={isOpen} timeout={220} unmountOnExit>
                    <Stack gap={'2px'} sx={{ mt: '2px', mb: '2px' }}>
                        {groupItems.map((item) => renderItem(item, true))}
                    </Stack>
                </Collapse>
            </Box>
        )
    }

    // ---- render all items & groups linearly ----
    const renderMenu = () => {
        const nodes: JSX.Element[] = []
        const renderedGroupIds = new Set<string>()

        drawerItems.forEach((item) => {
            if (!item.groupId) {
                const node = renderItem(item, false)
                if (node) nodes.push(node)
                return
            }

            if (renderedGroupIds.has(item.groupId)) return
            renderedGroupIds.add(item.groupId)

            const group = drawerGroups.find((g) => g.id === item.groupId)
            if (!group) return
            const node = renderGroup(group)
            if (node) nodes.push(node)
        })

        return nodes
    }

    return (
        <Stack>
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? drawerOpen : true}
                onClose={() => setDrawerOpen(false)}
                anchor="left"
                sx={{
                    zIndex: 1000,
                    overflow: 'hidden',
                    '& .MuiDrawer-paper': {
                        width: 232,
                        overflowY: 'auto',
                        backgroundColor: (t: Theme) => `${t.palette.background.main} !important`,
                        border: 'none',
                        // افزودن همان سایه نرم و ملایم
                        boxShadow: `0px 2px 8px rgba(0, 0, 0, 0.04), 0px 4px 16px rgba(0, 0, 0, 0.03)`,
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
                        <ListItem sx={{ px: 0.5, mb: 1 }}>
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