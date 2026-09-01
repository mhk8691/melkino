import {Stack} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import {CustomSelectField} from '../../Components/Input/CustomSelectField'
import {toSelectOptions} from '../../Components/PropertyRecordForm/utils'
import {PROPERTY_TYPE_OPTIONS} from '../../Components/PropertyRecordForm/constants'

export type CustomersType = {
    id: number
    name: string
    phone: string
    customerType: string
    status: string
    propertyType: string
    transactionType: string
    minArea: string
    maxArea: string
    budget: string
    rooms: string
    neighborhood: string
    note: string
}

export function Customers({
    customers,
    setCustomers,
    resource,
    editMode=false
}: {
    customers: CustomersType
    setCustomers: React.Dispatch<React.SetStateAction<CustomersType>>
    resource: string
    editMode?:boolean
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
                            name="name"
                            setData={setCustomers}
                            resource={resource}
                            label="نام"
                            defaultValue={customers.name}
                        />,

                        <CustomTextField
                            name="phone"
                            setData={setCustomers}
                            resource={resource}
                            label="تلفن"
                            defaultValue={customers.phone}
                        />,

                        <CustomSelectField
                            key="customerType"
                            name="customerType"
                            setData={setCustomers}
                            resource={resource}
                            label="نوع مشتری"
                            defaultValue={customers.customerType}
                            options={toSelectOptions(['خریدار', 'مستاجر', 'فروشنده'])}
                        />,

                        <CustomSelectField
                            key="status"
                            name="status"
                            setData={setCustomers}
                            resource={resource}
                            label="وضعیت"
                            defaultValue={customers.status}
                            options={toSelectOptions(['فعال', 'بالقوه', 'بسته'])}
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

                        <CustomSelectField
                            key="transactionType"
                            name="transactionType"
                            setData={setCustomers}
                            resource={resource}
                            label="نوع معامله"
                            defaultValue={customers.transactionType}
                            options={toSelectOptions(['خرید', 'اجاره', 'رهن'])}
                        />,

                        <CustomTextField
                            name="minArea"
                            setData={setCustomers}
                            resource={resource}
                            label="حداقل متراژ"
                            defaultValue={customers.minArea}
                        />,

                        <CustomTextField
                            name="maxArea"
                            setData={setCustomers}
                            resource={resource}
                            label="حداکثر متراژ"
                            defaultValue={customers.maxArea}
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
                            label="اتاق"
                            defaultValue={customers.rooms}
                        />,

                        <CustomTextField
                            name="neighborhood"
                            setData={setCustomers}
                            resource={resource}
                            label="محله"
                            defaultValue={customers.neighborhood}
                        />,

                        <CustomTextField
                            name="note"
                            setData={setCustomers}
                            resource={resource}
                            label="یادداشت"
                            defaultValue={customers.note}
                        />,
                    ]}
                />
            )}
        </Stack>
    )
}
