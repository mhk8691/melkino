import {Stack} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import {CustomSelectField} from '../../Components/Input/CustomSelectField'
import {toSelectOptions} from '../../Components/PropertyRecordForm/utils'
import {PROPERTY_TYPE_OPTIONS} from '../../Components/PropertyRecordForm/constants'
import {CustomAutocomplete} from '../../Components/Input/CustomAutoComplete'

export type CustomersType = {
    id: number
    full_name: string
    phone_number: string
    status: string
    propertyType: string
    minArea: string
    maxArea: string
    budget: string
    rooms: string
    neighborhoods: string[]
    note: string
    cities: string
    employmentStatus: string
    floors: string
    units: string
    area: string
}

export function Customers({
    customers,
    setCustomers,
    resource,
    editMode = false,
}: {
    customers: CustomersType
    setCustomers: React.Dispatch<React.SetStateAction<CustomersType>>
    resource: string
    editMode?: boolean
}) {
    return (
        <Stack>
            {customers && (
                <GridProducer
                    sx={{marginBottom: '16px'}}
                    data={[
                        ...(editMode
                            ? [
                                  <CustomTextField
                                      key="id"
                                      name="id"
                                      setData={setCustomers}
                                      resource={resource}
                                      label="شناسه"
                                      defaultValue={customers.id}
                                      disabled
                                  />,
                              ]
                            : []),

                        <CustomTextField
                            name="full_name"
                            setData={setCustomers}
                            resource={resource}
                            label="نام و نام خانوادگی"
                            defaultValue={customers.full_name}
                        />,

                        <CustomTextField
                            name="phone_number"
                            setData={setCustomers}
                            resource={resource}
                            label="تلفن"
                            defaultValue={customers.phone_number}
                        />,

                        <CustomSelectField
                            key="status"
                            name="status"
                            setData={setCustomers}
                            resource={resource}
                            label="وضعیت"
                            defaultValue={customers.status}
                            options={toSelectOptions([
                                'تهاتر',
                                'خرید نقد',
                                'خرید با شرایط یک ماهه',
                                'خرید با شرایط تا سه ماهه',
                                'نقد و تهاتر',
                            ])}
                        />,

                        <CustomSelectField
                            key="propertyType"
                            name="propertyType"
                            setData={setCustomers}
                            resource={resource}
                            label="نوع ملک"
                            defaultValue={customers.propertyType}
                            options={toSelectOptions(PROPERTY_TYPE_OPTIONS)}
                        />,

                        <CustomTextField
                            name="minArea"
                            setData={setCustomers}
                            resource={resource}
                            label="حداقل متراژ"
                            defaultValue={customers.minArea}
                            inputType="number"
                        />,

                        <CustomTextField
                            name="maxArea"
                            setData={setCustomers}
                            resource={resource}
                            label="حداکثر متراژ"
                            defaultValue={customers.maxArea}
                            inputType="number"
                        />,

                        <CustomTextField
                            name="budget"
                            setData={setCustomers}
                            resource={resource}
                            label="بودجه"
                            defaultValue={customers.budget}
                        />,

                        <CustomTextField
                            name="rooms"
                            setData={setCustomers}
                            resource={resource}
                            label="تعداد اتاق"
                            defaultValue={customers.rooms}
                            inputType="number"
                        />,
                        <CustomSelectField
                            key="cities"
                            name="cities"
                            setData={setCustomers}
                            resource={resource}
                            label="شهر"
                            defaultValue={customers.cities}
                            options={toSelectOptions(['قم'])}
                        />,
                        <CustomSelectField
                            key="area"
                            name="area"
                            setData={setCustomers}
                            resource={resource}
                            label="منطقه"
                            defaultValue={customers.area}
                            options={toSelectOptions(['1', '2', '3', '4', '5', '6', '7', '8'])}
                        />,
                        <CustomAutocomplete
                            key="neighborhoods"
                            name="neighborhoods"
                            setData={setCustomers}
                            label="محله"
                            multiple
                            maxSelections={10}
                            defaultValue={customers.neighborhoods}
                            options={[
                                'زنبیل آباد',
                                'آزادگان',
                                'سالاریه',
                                'صفائیه',
                                'بلوار امین',
                                'باجک',
                                'نیروگاه',
                                'پردیسان',
                                'انسجام',
                                'شهرک قدس',
                                'زنبیل آباد شمالی',
                                'جمکران',
                            ]}
                            sx={{
                                width: '100%',
                            }}
                        />,

                        <CustomSelectField
                            key="employmentStatus"
                            name="employmentStatus"
                            setData={setCustomers}
                            resource={resource}
                            label="وضعیت اشتغال"
                            defaultValue={customers.employmentStatus}
                            options={toSelectOptions(['تخلیه', 'مالک', 'مستاجر'])}
                        />,

                        <CustomTextField
                            name="floors"
                            setData={setCustomers}
                            resource={resource}
                            label="تعداد طبقات"
                            defaultValue={customers.floors}
                            inputType="number"
                        />,
                        <CustomTextField
                            name="units"
                            setData={setCustomers}
                            resource={resource}
                            label="تعداد واحد در طبقه"
                            defaultValue={customers.units}
                            inputType="number"
                        />,

                        <CustomTextField
                            name="note"
                            setData={setCustomers}
                            resource={resource}
                            label="یادداشت"
                            defaultValue={customers.note}
                            multiline
                            rows={4}
                        />,
                    ]}
                />
            )}
        </Stack>
    )
}
