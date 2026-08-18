
import { useEffect, useState, useRef } from 'react'
import DatePicker, { DateObject } from 'react-multi-date-picker'

import { FormControl, InputLabel } from '@mui/material'

import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import gregorian from 'react-date-object/calendars/gregorian'
import gregorian_en from 'react-date-object/locales/gregorian_en'
import { ParamType } from './CustomFilter'
import './datePicker.css'
import { CustomTextField } from '../Input/CustomTextField'

export default function DatePickerFilter({
    setParams,
    item,
    initialValue
}: {
    setParams: React.Dispatch<React.SetStateAction<ParamType>>
    item: any
    initialValue?: string
}) {
    const [value, setValue] = useState<DateObject | null>(null)
    const [focused, setFocused] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const hasUserSelected = useRef(false)

    useEffect(() => {
        if (initialValue) {
            hasUserSelected.current = true
            setValue(
                new DateObject({
                    date: initialValue,
                    format: 'YYYY-MM-DD',
                    calendar: persian,
                    locale: persian_fa,
                })
            )
        }
    }, [initialValue])

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
            hasUserSelected.current = false
            setValue(null)
            setParams((params) => {
                const updated = { ...params }
                delete updated[item.field]
                return updated
            })
            return
        }

        hasUserSelected.current = true
        setValue(date)

        const gregorianDate = new DateObject(date)
            .convert(gregorian, gregorian_en)
            .format('YYYY-MM-DD')

        setParams((params) => ({
            ...params,
            [item.field]: gregorianDate,
        }))
    }

    const active = focused || !!value

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
                    onOpenPickNewDate={false}
                    value={value}
                    onChange={handleChange}
                    onOpen={() => setFocused(true)}
                    onClose={() => setFocused(false)}
                    className="blue"
                    render={(_, openCalendar) => (
                        <CustomTextField
                            fullWidth
                            value={value ? value.format('YYYY-MM-DD') : ''}
                            onClick={openCalendar}
                            label={item.label}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: focused || !!value,
                            }}
                          
                        />
                    )}
                />
            </div>
        </FormControl>
    )
}