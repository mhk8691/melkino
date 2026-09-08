import {InputAdornment} from '@mui/material'

import {
    CITY_OPTIONS,
    CUSTOMER_OPTIONS,
    DOCUMENT_TYPE_OPTIONS,
    EXPERT_OPTIONS,
    PROPERTY_TYPE_OPTIONS,
    STATUS_OPTIONS,
} from '../constants'
import {MultiValueField} from '../components/MultiValueField'
import {RangeField} from '../components/RangeField'
import {CustomSelectField, CustomTextField, GridProducer} from '../shared'
import type {ModeStepProps} from '../types'
import {asStringArray, toSelectOptions} from '../utils'

// در «رهن و اجاره» علاوه‌بر گزینه‌های عمومی نوع ملک، «تجاری» و «سوله» هم اضافه می‌شود
const MORTGAGE_RENT_EXTRA_PROPERTY_TYPES = ['تجاری', 'سوله']

export function BaseStep({property, setProperty, resource, mode,editMode}: ModeStepProps) {
    const isMortgageRent = property.contractType === 'رهن و اجاره'
    const propertyTypeOptions = toSelectOptions(
        isMortgageRent
            ? [...PROPERTY_TYPE_OPTIONS, ...MORTGAGE_RENT_EXTRA_PROPERTY_TYPES]
            : PROPERTY_TYPE_OPTIONS,
    )
    // شارژ ماهانه فقط برای «آپارتمان» معنا دارد
    const isApartment = property.propertyType === 'آپارتمان'

    return (
        <GridProducer
            sx={{marginBottom: '16px'}}
            data={[
                // «وضعیت» فقط برای ثبت فایل معنا دارد
                ...(mode === 'file' && editMode
                    ? [
                          <CustomSelectField
                              key="status"
                              name="status"
                              setData={setProperty}
                              resource={resource}
                              label="وضعیت"
                              defaultValue={property.status}
                              options={toSelectOptions(STATUS_OPTIONS)}
                          />,
                      ]
                    : []),

                <CustomSelectField
                    key="propertyType"
                    name="propertyType"
                    setData={setProperty}
                    resource={resource}
                    label="نوع ملک"
                    defaultValue={property.propertyType}
                    options={propertyTypeOptions}
                />,

                // شارژ ماهانه فقط وقتی نوع ملک «آپارتمان» باشد نمایش داده می‌شود
                ...(isApartment
                    ? [
                          mode === 'request' ? (
                              <RangeField
                                  key="monthlyCharge"
                                  baseName="monthlyCharge"
                                  label="شارژ ماهانه"
                                  unit="تومان"
                                  property={property}
                                  setProperty={setProperty}
                                  resource={resource}
                              />
                          ) : (
                              <CustomTextField
                                  key="monthlyCharge"
                                  name="monthlyCharge"
                                  setData={setProperty}
                                  resource={resource}
                                  label="شارژ ماهانه"
                                  defaultValue={property.monthlyCharge}
                                  thousandSeparator
                                  endIcon={<InputAdornment position="end">تومان</InputAdornment>}
                              />
                          ),
                      ]
                    : []),


                // در «آگهی» شهر و اختصاص‌دادن نمایش داده نمی‌شود (در آن فرم موقعیت از روی نقشه انتخاب می‌شود)
                ...(mode !== 'ad'
                    ? [
                          <CustomSelectField
                              key="city"
                              name="city"
                              setData={setProperty}
                              resource={resource}
                              label="شهر"
                              defaultValue={property.city}
                              options={toSelectOptions(CITY_OPTIONS)}
                          />,

                          // در حالت «فایل» اختصاص به مشتری و در حالت «درخواست» اختصاص به کارشناس است
                          <CustomSelectField
                              key="assignedTo"
                              name="assignedTo"
                              setData={setProperty}
                              resource={resource}
                              label={mode === 'file' ? 'اختصاص به مشتری' : 'اختصاص به کارشناس'}
                              defaultValue={property.assignedTo}
                              options={toSelectOptions(mode === 'file' ? CUSTOMER_OPTIONS : EXPERT_OPTIONS)}
                          />,
                      ]
                    : []),

                // در «آگهی» فقط یک فیلد «محله یا محدوده» داریم؛ منطقه‌ی جدا لازم نیست
                ...(mode === 'ad'
                    ? []
                    : [
                          mode === 'request' ? (
                              <MultiValueField
                                  key="district"
                                  label="منطقه"
                                  value={asStringArray(property.district)}
                                  onChange={(next) =>
                                      setProperty((prev) => ({
                                          ...prev,
                                          district: next,
                                      }))
                                  }
                              />
                          ) : (
                              <CustomTextField
                                  key="district"
                                  name="district"
                                  setData={setProperty}
                                  resource={resource}
                                  label="منطقه"
                                  defaultValue={property.district as string}
                              />
                          ),
                      ]),

                mode === 'request' ? (
                    <MultiValueField
                        key="neighborhood"
                        label="محله"
                        value={asStringArray(property.neighborhood)}
                        onChange={(next) =>
                            setProperty((prev) => ({
                                ...prev,
                                neighborhood: next,
                            }))
                        }
                    />
                ) : (
                    <CustomTextField
                        key="neighborhood"
                        name="neighborhood"
                        setData={setProperty}
                        resource={resource}
                        // در آگهی این فیلد نقش «محله یا محدوده» را دارد
                        label={mode === 'ad' ? 'محله یا محدوده' : 'محله'}
                        defaultValue={property.neighborhood as string}
                    />
                ),

                // آدرس دقیق در متن آگهی عمومی نمایش داده نمی‌شود
                ...(mode === 'ad'
                    ? []
                    : [
                          <CustomTextField
                              key="address"
                              name="address"
                              setData={setProperty}
                              resource={resource}
                              label="آدرس"
                              defaultValue={property.address}
                              multiline
                              minRows={3}
                          />,
                      ]),
            ]}
        />
    )
}