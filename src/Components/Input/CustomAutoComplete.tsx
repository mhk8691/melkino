import {Autocomplete} from '@mui/material'
import React, {useState} from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {CustomTextField} from './CustomTextField'

export function CustomAutocomplete(props) {
    const {options, defaultValue, label, name, setData, optionValue, onChange, value, sx} = props
    const [inputValue, setInputValue] = useState(defaultValue || null)

    function changeField(event, value) {
        if (value) {
            setData?.((prev) => {
                return {...prev, [name]: optionValue ? value[optionValue] : value.id}
            })
            setInputValue(value)
        }
        // 🔥 حتماً onChange بیرونی رو هم صدا بزن
        if (onChange) {
            onChange(event, value)
        }
    }

    return (
        <Autocomplete
            value={value ?? inputValue}
            options={options || []}
            onChange={changeField}
            popupIcon={<ExpandMoreIcon color="disabled" />}
            renderInput={(params) => <CustomTextField label={label} {...params} />}
            sx={{
                '& .MuiOutlinedInput-input ': {
                    fontSize: '14px',
                },
                ...sx,
            }}
            componentsProps={{
                paper: {
                    sx: {
                        '& .MuiAutocomplete-listbox': {
                            fontSize: '15px',
                        },
                        '& .MuiAutocomplete-option': {
                            py: '12px !important',
                        },
                    },
                },
            }}
        />
    )
}
