import {Button, ButtonProps, SxProps, Theme} from '@mui/material'
import React from 'react'
import {Link} from 'react-router-dom'

export function LinkButton(props: {
    to: string
    absoulutePath?: boolean
    sx?: SxProps<Theme>
    buttonProps?: ButtonProps
    variant?: 'text' | 'contained' | 'outlined'
    children?: React.ReactNode
}) {
    return (
        <Button
            {...(!props.absoulutePath && {LinkComponent: Link})}
            style={{padding: '0px', minWidth: '0px'}}
            {...(!props.absoulutePath && {to: props.to})}
            onClick={(e) => {
                if (props.absoulutePath) {
                    window.location.href = props.to
                }
            }}
            sx={props.sx}
            variant={props.variant}
            {...props.buttonProps}
        >
            {props.children}
        </Button>
    )
}
