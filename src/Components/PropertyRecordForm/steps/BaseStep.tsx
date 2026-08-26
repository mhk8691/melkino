import {CITY_OPTIONS, DOCUMENT_TYPE_OPTIONS, PROPERTY_TYPE_OPTIONS, STATUS_OPTIONS} from '../constants'
import {MultiValueField} from '../components/MultiValueField'
import {CustomSelectField, CustomTextField, GridProducer} from '../shared'
import type {ModeStepProps} from '../types'
import {asStringArray, toSelectOptions} from '../utils'

export function BaseStep({property, setProperty, resource, mode}: ModeStepProps) {
    return (
        <GridProducer
            sx={{marginBottom: '16px'}}
            data={[
                // «وضعیت» فقط برای ثبت فایل معنا دارد
                ...(mode === 'file'
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
                    options={toSelectOptions(PROPERTY_TYPE_OPTIONS)}
                />,

                <CustomSelectField
                    key="documentType"
                    name="documentType"
                    setData={setProperty}
                    resource={resource}
                    label="نوع سند"
                    defaultValue={property.documentType}
                    options={toSelectOptions(DOCUMENT_TYPE_OPTIONS)}
                />,

                <CustomSelectField
                    key="city"
                    name="city"
                    setData={setProperty}
                    resource={resource}
                    label="شهر"
                    defaultValue={property.city}
                    options={toSelectOptions(CITY_OPTIONS)}
                />,

                // منطقه و محله: در «درخواست» چند مقداری، در «فایل» تک مقداری
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
                        label="محله"
                        defaultValue={property.neighborhood as string}
                    />
                ),

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
            ]}
        />
    )
}
