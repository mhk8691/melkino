import {useRef} from 'react'
import {InputAdornment} from '@mui/material'

import {RangeField} from '../components/RangeField'
import {CustomTextField, GridProducer} from '../shared'
import type {ModeStepProps} from '../types'
import {priceHelperText} from '../utils'

export function FinancialStep({property, setProperty, resource, mode}: ModeStepProps) {
    // آخرین مقادیری که پردازش شدن (برای تشخیص تغییر)
    const prevValues = useRef({
        area: property.area,
        totalPrice: property.totalPrice,
        pricePerMeter: property.pricePerMeter,
    })

    // آخرین فیلد قیمتی‌ای که خود کاربر دستی تغییرش داده: 'totalPrice' یا 'pricePerMeter'
    // نوع رو صراحتاً مشخص کردیم تا TS مقدار null رو narrow نکنه
    const lastEditedPriceField = useRef<'totalPrice' | 'pricePerMeter' | null>(null)

    if (property.contractType === 'فروش' && mode === 'file') {
        const prev = prevValues.current

        const areaChanged = property.area !== prev.area
        const totalPriceChanged = property.totalPrice !== prev.totalPrice
        const pricePerMeterChanged = property.pricePerMeter !== prev.pricePerMeter

        const area = Number(property.area) || 0
        const totalPrice = Number(property.totalPrice) || 0
        const pricePerMeter = Number(property.pricePerMeter) || 0

        // ثبت اینکه کاربر کدوم فیلد قیمتی رو دستی عوض کرده
        if (totalPriceChanged) lastEditedPriceField.current = 'totalPrice'
        if (pricePerMeterChanged) lastEditedPriceField.current = 'pricePerMeter'

        let nextTotalPrice = property.totalPrice
        let nextPricePerMeter = property.pricePerMeter

        if ((areaChanged || totalPriceChanged || pricePerMeterChanged) && area > 0) {
            if (lastEditedPriceField.current === 'totalPrice' && !pricePerMeterChanged) {
                // مبنا: قیمت کل (که کاربر آخرین بار زده) + متراژ فعلی => قیمت متری
                const computed = Math.round(totalPrice / area)
                if (computed !== pricePerMeter) {
                    nextPricePerMeter = computed
                    setProperty((prev) => ({...prev, pricePerMeter: computed}))
                }
            } else if (lastEditedPriceField.current === 'pricePerMeter' && !totalPriceChanged) {
                // مبنا: قیمت متری (که کاربر آخرین بار زده) + متراژ فعلی => قیمت کل
                const computed = Math.round(pricePerMeter * area)
                if (computed !== totalPrice) {
                    nextTotalPrice = computed
                    setProperty((prev) => ({...prev, totalPrice: computed}))
                }
            }
        }

        prevValues.current = {
            area: property.area,
            totalPrice: nextTotalPrice,
            pricePerMeter: nextPricePerMeter,
        }
    }

    return (
        <GridProducer
            sx={{marginBottom: '16px'}}
            data={[
                mode === 'request' ? (
                    <RangeField
                        key="area"
                        baseName="area"
                        label="متراژ"
                        unit="متر"
                        property={property}
                        setProperty={setProperty}
                        resource={resource}
                    />
                ) : (
                    <CustomTextField
                        key="area"
                        name="area"
                        setData={setProperty}
                        resource={resource}
                        label="متراژ"
                        defaultValue={property.area}
                        thousandSeparator
                        endIcon={<InputAdornment position="end">متر</InputAdornment>}
                    />
                ),

                /* ---------------- فروش ---------------- */

                ...(property.contractType === 'فروش'
                    ? [
                          mode === 'request' ? (
                              <RangeField
                                  key="totalPrice"
                                  baseName="totalPrice"
                                  label="قیمت کل"
                                  unit="تومان"
                                  property={property}
                                  setProperty={setProperty}
                                  resource={resource}
                              />
                          ) : (
                              <CustomTextField
                                  name="totalPrice"
                                  setData={setProperty}
                                  resource={resource}
                                  label="قیمت کل"
                                  defaultValue={property.totalPrice}
                                  thousandSeparator
                                  endIcon={<InputAdornment position="end">تومان</InputAdornment>}
                                  helperText={priceHelperText(property.totalPrice)}
                              />
                          ),

                          ...(mode === 'file'
                              ? [
                                    <CustomTextField
                                        name="pricePerMeter"
                                        setData={setProperty}
                                        resource={resource}
                                        label="قیمت متری"
                                        defaultValue={property.pricePerMeter}
                                        thousandSeparator
                                        endIcon={
                                            <InputAdornment position="end">تومان</InputAdornment>
                                        }
                                        helperText={priceHelperText(property.pricePerMeter)}
                                    />,
                                ]
                              : []),
                      ]
                    : []),

                /* ------------ رهن و اجاره ------------- */

                ...(property.contractType === 'رهن و اجاره'
                    ? [
                          mode === 'request' ? (
                              <RangeField
                                  key="mortgagePrice"
                                  baseName="mortgagePrice"
                                  label="قیمت رهن"
                                  unit="تومان"
                                  property={property}
                                  setProperty={setProperty}
                                  resource={resource}
                              />
                          ) : (
                              <CustomTextField
                                  key="mortgagePrice"
                                  name="mortgagePrice"
                                  setData={setProperty}
                                  resource={resource}
                                  label="قیمت رهن"
                                  defaultValue={property.mortgagePrice}
                                  thousandSeparator
                                  endIcon={<InputAdornment position="end">تومان</InputAdornment>}
                                  helperText={priceHelperText(property.mortgagePrice)}
                              />
                          ),

                          mode === 'request' ? (
                              <RangeField
                                  key="monthlyRent"
                                  baseName="monthlyRent"
                                  label="اجاره ماهانه"
                                  unit="تومان"
                                  property={property}
                                  setProperty={setProperty}
                                  resource={resource}
                              />
                          ) : (
                              <CustomTextField
                                  key="monthlyRent"
                                  name="monthlyRent"
                                  setData={setProperty}
                                  resource={resource}
                                  label="اجاره ماهانه"
                                  defaultValue={property.monthlyRent}
                                  thousandSeparator
                                  endIcon={<InputAdornment position="end">تومان</InputAdornment>}
                                  helperText={priceHelperText(property.monthlyRent)}
                              />
                          ),

                          <CustomTextField
                              key="mortgageTerms"
                              name="mortgageTerms"
                              setData={setProperty}
                              resource={resource}
                              label="شرایط رهن و اجاره"
                              defaultValue={property.mortgageTerms}
                              multiline
                              minRows={3}
                          />,
                      ]
                    : []),
            ]}
        />
    )
}
