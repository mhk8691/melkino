import {useState} from 'react'
import type {MouseEvent} from 'react'
import {useNavigate} from 'react-router-dom'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, MenuItem, Typography} from '@mui/material'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

export type PropertyCardMenuProps = {
    id?: number
    resource?: string
    /** true وقتی پس‌زمینه‌ی زیر آیکون تصویر است (برای کنتراست بهتر) */
    dark?: boolean
    onEdit?: () => void
    onDelete?: (id?: number) => void
}

export function PropertyCardMenu({id, resource = 'files', dark, onEdit, onDelete}: PropertyCardMenuProps) {
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
                    bgcolor: dark ? 'rgba(0,0,0,0.35)' : 'background.paper',
                    color: dark ? '#fff' : 'text.secondary',
                    border: dark ? 'none' : '1px solid',
                    borderColor: 'divider',
                    '&:hover': {bgcolor: dark ? 'rgba(0,0,0,0.55)' : 'action.hover'},
                }}
            >
                <MoreVertRoundedIcon fontSize="small" />
            </IconButton>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} onClick={(e) => e.stopPropagation()}>
                <MenuItem onClick={handleEdit}>
                    <EditRoundedIcon fontSize="small" sx={{ml: 1}} />
                    ویرایش
                </MenuItem>
                <MenuItem onClick={handleAskDelete} sx={{color: 'error.main'}}>
                    <DeleteRoundedIcon fontSize="small" sx={{ml: 1}} />
                    حذف
                </MenuItem>
            </Menu>

            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="xs" fullWidth onClick={(e) => e.stopPropagation()}>
                <DialogTitle>حذف فایل</DialogTitle>
                <DialogContent>
                    <Typography variant="bodySm">آیا از حذف این فایل مطمئن هستید؟ این عملیات قابل بازگشت نیست.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)}>انصراف</Button>
                    <Button color="error" variant="contained" onClick={handleConfirmDelete}>
                        حذف
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}