import React from 'react'
import {
    Box,
    IconButton,
    InputAdornment,
    TextField,
    TextFieldProps,
} from '@mui/material'
import {styled} from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import {NumericFormat} from 'react-number-format'

type CustomTextFieldProps<T = Record<string, unknown>> = {
    setData?: React.Dispatch<React.SetStateAction<T>>
    change?: (event: React.ChangeEvent<HTMLInputElement>) => void
    register?: Record<string, unknown>
    endIcon?: React.ReactNode
    thousandSeparator?: boolean

    /**
     * نوع داخلی کامپوننت
     *
     * text:
     * فیلد معمولی
     *
     * number:
     * فیلد عددی همراه با + و -
     */
    inputType?: 'text' | 'number'

    /**
     * نوع واقعی HTML input
     *
     * text
     * password
     * email
     * tel
     * number
     * و ...
     */
    type?: React.HTMLInputTypeAttribute

    /**
     * مقدار اولیه input عددی
     */
    defaultNumber?: number

    /**
     * حداقل مقدار
     */
    min?: number

    /**
     * حداکثر مقدار
     */
    max?: number

    /**
     * میزان تغییر با هر کلیک
     */
    step?: number
} & Omit<TextFieldProps, 'type'>

export function CustomTextField<T = Record<string, unknown>>(
    props: CustomTextFieldProps<T>,
) {
    const {
        setData,
        change,
        register,
        endIcon,
        thousandSeparator,
        onChange,
        InputProps,

        inputType = 'text',
        type = 'text',

        defaultNumber = 0,
        min,
        max,
        step = 1,

        value,
        defaultValue,

        /**
         * name را جدا می‌گیریم
         * تا مشکل computed property name نداشته باشیم
         */
        name,

        ...rest
    } = props

    /**
     * مقدار عددی داخلی
     */
    const [numberValue, setNumberValue] =
        React.useState<number>(() => {
            if (typeof value === 'number') {
                return value
            }

            if (typeof defaultValue === 'number') {
                return defaultValue
            }

            return defaultNumber
        })

    /**
     * هماهنگ کردن value خارجی
     */
    React.useEffect(() => {
        if (typeof value === 'number') {
            setNumberValue(value)
        }
    }, [value])

    /**
     * تغییر مقدار input
     */
    function changeField(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        const rawValue = event.target.value.replace(/,/g, '')

        const newEvent = {
            ...event,
            target: {
                ...event.target,
                value: rawValue,
            },
        } as React.ChangeEvent<HTMLInputElement>

        /**
         * اگر change نداشتیم،
         * مقدار را مستقیماً داخل state قرار می‌دهیم
         */
        if (!change && setData && name) {
            setData(
                (prev) =>
                    ({
                        ...prev,
                        [name]: rawValue,
                    }) as T,
            )
        }

        /**
         * callback اختصاصی
         */
        if (change) {
            change(newEvent)
        }

        /**
         * callback خود TextField
         */
        onChange?.(newEvent)
    }

    /**
     * تغییر مقدار عددی
     */
    function updateNumber(newValue: number) {
        let finalValue = newValue

        /**
         * min
         */
        if (min !== undefined) {
            finalValue = Math.max(finalValue, min)
        }

        /**
         * max
         */
        if (max !== undefined) {
            finalValue = Math.min(finalValue, max)
        }

        /**
         * state داخلی
         */
        setNumberValue(finalValue)

        /**
         * event
         */
        const syntheticEvent = {
            target: {
                name: name ?? '',
                value: String(finalValue),
            },
        } as React.ChangeEvent<HTMLInputElement>

        /**
         * آپدیت state فرم
         */
        if (!change && setData && name) {
            setData(
                (prev) =>
                    ({
                        ...prev,
                        [name]: finalValue,
                    }) as T,
            )
        }

        /**
         * callback اختصاصی
         */
        if (change) {
            change(syntheticEvent)
        }

        /**
         * callback اصلی
         */
        onChange?.(syntheticEvent)
    }

    /**
     * افزایش مقدار
     */
    function increaseNumber() {
        updateNumber(numberValue + step)
    }

    /**
     * کاهش مقدار
     */
    function decreaseNumber() {
        updateNumber(numberValue - step)
    }

    /**
     * ==========================================
     * NUMBER
     * ==========================================
     *
     * inputType="number"
     *
     * در این حالت دکمه‌های + و - نمایش داده می‌شوند.
     */
    if (inputType === 'number') {
        return (
            <Custom
                {...rest}
                name={name}
                type={type}
                value={numberValue}
                onChange={changeField}
                InputProps={{
                    ...InputProps,

                    endAdornment: (
                        <InputAdornment position="end">
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                }}
                            >
                                <IconButton
                                    type="button"
                                    size="small"
                                    onClick={decreaseNumber}
                                    disabled={
                                        min !== undefined &&
                                        numberValue <= min
                                    }
                                >
                                    <RemoveIcon fontSize="small" />
                                </IconButton>

                                <IconButton
                                    type="button"
                                    size="small"
                                    onClick={increaseNumber}
                                    disabled={
                                        max !== undefined &&
                                        numberValue >= max
                                    }
                                >
                                    <AddIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </InputAdornment>
                    ),
                }}
                inputProps={{
                    min,
                    max,
                    step,
                }}
                variant="outlined"
                fullWidth
                {...register}
            />
        )
    }

    /**
     * ==========================================
     * THOUSAND SEPARATOR
     * ==========================================
     *
     * برای قیمت و اعداد دارای جداکننده هزارگان
     */
    if (thousandSeparator) {
        return (
            <NumericFormat
                {...rest}
                name={name}
                customInput={Custom}
                thousandSeparator=","
                valueIsNumericString
                onChange={changeField}
                InputProps={{
                    disableUnderline: true,
                    endAdornment: endIcon,
                    ...InputProps,
                }}
                variant="outlined"
                fullWidth
                {...register}
            />
        )
    }

    /**
     * ==========================================
     * TEXT / OTHER TYPES
     * ==========================================
     */
    return (
        <Custom
            {...rest}
            name={name}
            type={type}
            onChange={changeField}
            InputProps={{
                disableUnderline: true,
                endAdornment: endIcon,
                ...InputProps,
            }}
            variant="outlined"
            fullWidth
            {...register}
        />
    )
}

/**
 * ==========================================
 * STYLED TEXT FIELD
 * ==========================================
 */
const Custom = styled(TextField)(({theme}) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '15px',

        '& fieldset': {
            borderRadius: '15px',
        },

        '&.Mui-disabled': {
            backgroundColor:
                theme.palette.action.disabledBackground,
            opacity: 0.6,
        },

        '&:hover fieldset': {
            borderColor: `${theme.palette.primary.light} !important`,
        },
    },

    '& .MuiOutlinedInput-input': {
        fontSize: '15px',
    },

    '& .MuiInputLabel-root': {
        fontSize: 15,

        '&.Mui-disabled': {
            color: theme.palette.text.disabled,
            opacity: 0.7,
        },
    },

    /**
     * حذف spinner پیش‌فرض number
     */
    '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button':
        {
            WebkitAppearance: 'none',
            margin: 0,
        },

    '& input[type=number]': {
        MozAppearance: 'textfield',
    },

    /**
     * Adornment
     */
    '& .MuiInputAdornment-root': {
        margin: 0,
    },

    /**
     * دکمه‌های + و -
     */
    '& .MuiIconButton-root': {
        padding: '5px',
    },
}))
