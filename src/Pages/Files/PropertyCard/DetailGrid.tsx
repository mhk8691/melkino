import {Box, Typography} from '@mui/material'
import {isFilled} from './propertyCardUtils'
import type {DetailField} from './propertyCardUtils'

export function DetailGrid({fields}: {fields: DetailField[]}) {
    const visible = fields.filter((field) => isFilled(field.value))
    if (visible.length === 0) return null

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {xs: '1fr 1fr', sm: 'repeat(3, 1fr)'},
                rowGap: 1.5,
                columnGap: 2,
            }}
        >
            {visible.map((field) => (
                <Box key={field.label} sx={{minWidth: 0}}>
                    <Typography variant="labelSm" color="text.disabled" noWrap>
                        {field.label}
                    </Typography>
                    <Typography variant="bodySm" fontWeight={600} noWrap>
                        {field.value}
                    </Typography>
                </Box>
            ))}
        </Box>
    )
}