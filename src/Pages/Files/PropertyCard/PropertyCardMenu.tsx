import {useState} from 'react'
import type {MouseEvent} from 'react'
import {useNavigate} from 'react-router-dom'
import {Box, Button, Dialog, DialogActions, DialogContent, IconButton, Menu, Stack, Typography} from '@mui/material'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'

export type PropertyCardMenuProps = {
    id?: number
    resource?: string
    /** true وقتی پس‌زمینه‌ی زیر آیکون تصویر است (برای کنتراست بهتر) */
    dark?: boolean
    /** برای متن دیالوگ تایید حذف — مثلاً «فایل»، «درخواست» یا «آگهی» */
    itemLabel?: string
    onEdit?: () => void
    onDelete?: (id?: number) => void
}

/** یک آیتم منو با آیکون داخل باکس رنگی؛ کاملاً جدا از MenuItem پیش‌فرض MUI طراحی شده */
function ActionItem({
    icon,
    label,
    color,
    onClick,
}: {
    icon: React.ReactNode
    label: string
    color: 'primary' | 'error'
    onClick: () => void
}) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={1.25}
            onClick={onClick}
            sx={{
                px: 1.25,
                py: 1,
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'background-color .12s ease',
                '&:hover': {
                    bgcolor: color === 'error' ? 'rgba(211,47,47,0.08)' : 'rgba(30,97,205,0.08)',
                },
            }}
        >
            <Box
                sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1.75,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    bgcolor: color === 'error' ? 'rgba(211,47,47,0.1)' : 'rgba(30,97,205,0.1)',
                    color: color === 'error' ? 'error.main' : 'primary.main',
                }}
            >
                {icon}
            </Box>
            <Typography variant="bodySm" fontWeight={600} sx={{color: color === 'error' ? 'error.main' : 'text.primary'}}>
                {label}
            </Typography>
        </Stack>
    )
}

export function PropertyCardMenu({id, resource = 'files', dark, itemLabel = 'فایل', onEdit, onDelete}: PropertyCardMenuProps) {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [confirmOpen, setConfirmOpen] = useState(false)

    const handleOpen = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => setAnchorEl(null)

    const handleEdit = () => {
        handleClose()
        if (onEdit) onEdit()
        else navigate(`/${resource}/${id}/edit`)
    }

    const handleAskDelete = () => {
        handleClose()
        setConfirmOpen(true)
    }

    const handleConfirmDelete = () => {
        onDelete?.(id)
        setConfirmOpen(false)
    }

    return (
        <>
            <IconButton
                size="small"
                onClick={handleOpen}
                sx={{
                    position: 'absolute',
                    top: 8,
                    insetInlineEnd: 8,
                    zIndex: 2,
                    width: 30,
                    height: 30,
                    bgcolor: dark ? 'rgba(0,0,0,0.4)' : 'background.paper',
                    color: dark ? '#fff' : 'text.secondary',
                    backdropFilter: dark ? 'blur(4px)' : undefined,
                    boxShadow: dark ? 'none' : '0 2px 6px rgba(0,0,0,0.08)',
                    '&:hover': {bgcolor: dark ? 'rgba(0,0,0,0.6)' : 'action.hover'},
                }}
            >
                <MoreVertRoundedIcon fontSize="small" />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onClick={(e) => e.stopPropagation()}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                transformOrigin={{vertical: 'top', horizontal: 'left'}}
                PaperProps={{
                    sx: {
                        mt: 0.75,
                        p: 0.75,
                        borderRadius: 2.5,
                        minWidth: 190,
                        boxShadow: '0 12px 28px -8px rgba(0,0,0,0.22)',
                    },
                }}
                MenuListProps={{sx: {p: 0, display: 'flex', flexDirection: 'column', gap: 0.25}}}
            >
                <ActionItem
                    icon={<EditRoundedIcon sx={{fontSize: 17}} />}
                    label="ویرایش"
                    color="primary"
                    onClick={handleEdit}
                />
                <ActionItem
                    icon={<DeleteRoundedIcon sx={{fontSize: 17}} />}
                    label="حذف"
                    color="error"
                    onClick={handleAskDelete}
                />
            </Menu>

            <Dialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                maxWidth="xs"
                fullWidth
                onClick={(e) => e.stopPropagation()}
                PaperProps={{sx: {borderRadius: 3}}}
            >
                <DialogContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 1.5, pt: 3.5}}>
                    <Box
                        sx={{
                            width: 52,
                            height: 52,
                            borderRadius: '50%',
                            bgcolor: 'rgba(211,47,47,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'error.main',
                        }}
                    >
                        <WarningRoundedIcon />
                    </Box>
                    <Typography variant="titleMd" fontWeight={700}>
                        حذف {itemLabel}
                    </Typography>
                    <Typography variant="bodySm" color="text.secondary">
                        آیا از حذف این {itemLabel} مطمئن هستید؟ این عملیات قابل بازگشت نیست.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{px: 3, pb: 2.5, gap: 1}}>
                    <Button fullWidth variant="outlined" onClick={() => setConfirmOpen(false)}>
                        انصراف
                    </Button>
                    <Button fullWidth color="error" variant="contained" onClick={handleConfirmDelete}>
                        حذف
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}