import { useEffect, useState, useRef } from 'react'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'

import { FormControl, InputLabel } from '@mui/material'

import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import gregorian from 'react-date-object/calendars/gregorian'
import gregorian_en from 'react-date-object/locales/gregorian_en'
import { ParamType } from './CustomFilter'
import './datePicker.css'
import { CustomTextField } from '../Input/CustomTextField'

const DATE_FORMAT = 'YYYY-MM-DD'
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm'

type DatePickerFilterBaseProps = {
    item: any
    // اگه true باشه، انتخاب ساعت و دقیقه هم به کلندر اضافه میشه
    withTime?: boolean
}

// مود پیش‌فرض: خودش استیت رو با setParams مدیریت می‌کنه (رفتار قبلی)
type DatePickerFilterParamsModeProps = DatePickerFilterBaseProps & {
    mode?: 'params'
    setParams: React.Dispatch<React.SetStateAction<ParamType>>
    initialValue?: string
}

// مود کنترل‌شده: مقدار و تغییرش کاملاً از بیرون کنترل میشه
// value/onChange با فرمت گرگوری هستن: 'YYYY-MM-DD' یا در صورت withTime، 'YYYY-MM-DD HH:mm'
type DatePickerFilterControlledModeProps = DatePickerFilterBaseProps & {
    mode: 'controlled'
    value: string | null
    onChange: (value: string | null) => void
}

type DatePickerFilterProps =
    | DatePickerFilterParamsModeProps
    | DatePickerFilterControlledModeProps

export default function DatePickerFilter(props: DatePickerFilterProps) {
    const { item, withTime = false } = props
    const format = withTime ? DATE_TIME_FORMAT : DATE_FORMAT

    const [internalValue, setInternalValue] = useState<DateObject | null>(null)
    const [focused, setFocused] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)

    // برای وابستگی‌های useEffect؛ باعث narrow شدن props نمیشه، فقط برای dependency array استفاده میشه
    const controlledRawValue = props.mode === 'controlled' ? props.value : undefined
    const paramsInitialValue = props.mode !== 'controlled' ? props.initialValue : undefined

    // ورودی مود controlled گرگوریه، برای نمایش باید به شمسی تبدیل بشه
    const gregorianStringToDateObject = (dateStr: string | null | undefined) => {
        if (!dateStr) return null
        return new DateObject({
            date: dateStr,
            format,
            calendar: gregorian,
            locale: gregorian_en,
        }).convert(persian, persian_fa)
    }

    // مود params: مقداردهی اولیه بر اساس initialValue (شمسی فرض شده، طبق کد اصلی)
    // نکته: باید مستقیماً روی props.mode چک بشه تا TS بتونه نوع props رو narrow کنه
    useEffect(() => {
        if (props.mode === 'controlled') return
        const initialValue = props.initialValue
        setInternalValue(
            initialValue
                ? new DateObject({
                      date: initialValue,
                      format,
                      calendar: persian,
                      locale: persian_fa,
                  })
                : null
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.mode, format, paramsInitialValue])

    // مود controlled: همگام‌سازی مقدار داخلی با value بیرونی
    useEffect(() => {
        if (props.mode !== 'controlled') return
        setInternalValue(gregorianStringToDateObject(props.value))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.mode, format, controlledRawValue])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setFocused(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleChange = (date: DateObject | null) => {
        if (!date) {
            setInternalValue(null)
            if (props.mode === 'controlled') {
                props.onChange(null)
            } else {
                props.setParams((params) => {
                    const updated = { ...params }
                    delete updated[item.field]
                    return updated
                })
            }
            return
        }

        setInternalValue(date)

        const gregorianDate = new DateObject(date)
            .convert(gregorian, gregorian_en)
            .format(format)

        if (props.mode === 'controlled') {
            props.onChange(gregorianDate)
        } else {
            props.setParams((params) => ({
                ...params,
                [item.field]: gregorianDate,
            }))
        }
    }

    const active = focused || !!internalValue

    return (
        <FormControl fullWidth sx={{ width: '100%' }}>
            <InputLabel
                shrink={active}
                sx={{
                    color: '#B0B0B0',
                    fontSize: 15,
                    '&.Mui-focused': {
                        color: '#E2E7DF',
                    },
                }}
            >
                {item.label}
            </InputLabel>

            <div
                ref={wrapperRef}
                style={{
                    width: '100%',
                    display: 'block',
                }}
            >
                <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    format={format}
                    onOpenPickNewDate={false}
                    value={internalValue}
                    onChange={handleChange}
                    onOpen={() => setFocused(true)}
                    onClose={() => setFocused(false)}
                    className="blue"
                    plugins={withTime ? [<TimePicker key="time-picker" hideSeconds />] : []}
                    render={(_, openCalendar) => (
                        <CustomTextField
                            fullWidth
                            value={internalValue ? internalValue.format(format) : ''}
                            onClick={openCalendar}
                            label={item.label}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: focused || !!internalValue,
                            }}
                        />
                    )}
                />
            </div>
        </FormControl>
    )
}
