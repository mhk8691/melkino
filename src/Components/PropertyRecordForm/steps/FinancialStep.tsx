import {InputAdornment} from '@mui/material'

import {RangeField} from '../components/RangeField'
import {CustomTextField, GridProducer} from '../shared'
import type {ModeStepProps} from '../types'
import {priceHelperText} from '../utils'

export function FinancialStep({property, setProperty, resource, mode}: ModeStepProps) {
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
                                  key="totalPrice"
                                  name="totalPrice"
                                  setData={setProperty}
                                  resource={resource}
                                  label="قیمت کل"
                                  defaultValue={property.totalPrice}
                                  thousandSeparator
                                  endIcon={
                                      <InputAdornment position="end">تومان</InputAdornment>
                                  }
                                  helperText={priceHelperText(property.totalPrice)}
                              />
                          ),

                          ...(mode === 'file'
                              ? [
                                    <CustomTextField
                                        key="pricePerMeter"
                                        name="pricePerMeter"
                                        setData={setProperty}
                                        resource={resource}
                                        label="قیمت متری"
                                        defaultValue={property.pricePerMeter}
                                        thousandSeparator
                                        endIcon={
                                            <InputAdornment position="end">
                                                تومان
                                            </InputAdornment>
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
                                  endIcon={
                                      <InputAdornment position="end">تومان</InputAdornment>
                                  }
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
                                  endIcon={
                                      <InputAdornment position="end">تومان</InputAdornment>
                                  }
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
