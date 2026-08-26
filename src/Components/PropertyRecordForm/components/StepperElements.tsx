import {StepConnector, stepConnectorClasses} from '@mui/material'
import {styled} from '@mui/material/styles'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'

export const CustomConnector = styled(StepConnector)(({theme}) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 14,
    },

    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.primary.main,
        },
    },

    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.primary.main,
        },
    },

    [`& .${stepConnectorClasses.line}`]: {
        borderTopWidth: 2,
        borderRadius: 1,
        borderColor: theme.palette.divider,
    },
}))

const StepIconRoot = styled('div')<{
    ownerState: {
        active?: boolean
        completed?: boolean
    }
}>(({theme, ownerState}) => ({
    width: 28,
    height: 28,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: 600,
    transition: 'all .2s ease',

    border: `2px solid ${theme.palette.divider}`,
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,

    ...(ownerState.active && {
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        boxShadow: `0 0 0 4px ${theme.palette.primary.main}1f`,
    }),

    ...(ownerState.completed && {
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    }),
}))

export function CustomStepIcon(props: {
    active?: boolean
    completed?: boolean
    icon: React.ReactNode
}) {
    const {active, completed, icon} = props

    return (
        <StepIconRoot ownerState={{active, completed}}>
            {completed ? <CheckRoundedIcon sx={{fontSize: 16}} /> : icon}
        </StepIconRoot>
    )
}
