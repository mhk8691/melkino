import {Box, Typography} from '@mui/material'
import {DetailGrid} from './DetailGrid'
import {isFilled} from './propertyCardUtils'
import type {DetailField} from './propertyCardUtils'

export function DetailSection({title, fields}: {title: string; fields: DetailField[]}) {
    const hasAny = fields.some((field) => isFilled(field.value))
    if (!hasAny) return null

    return (
        <Box>
            <Typography variant="labelSm" fontWeight={700} color="text.disabled" sx={{mb: 1}}>
                {title}
            </Typography>
            <DetailGrid fields={fields} />
        </Box>
    )
}