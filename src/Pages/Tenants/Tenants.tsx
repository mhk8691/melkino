import {Stack} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import {CustomSelectField} from '../../Components/Input/CustomSelectField'
import {toSelectOptions} from '../../Components/PropertyRecordForm/utils'

export type BudgetRangeType = {
    min: string
    max: string
}

export type TenantsType = {
    id: number
    full_name: string
    phone_number: string
    cities: string
    neighborhoods: string

    budgetStatus: 'رهن کامل' | 'اجاره کامل' | 'رهن و اجاره' | ''

    budget: {
        mortgage: BudgetRangeType
        rent: BudgetRangeType
    }

    defaultConditions: string
    nationality: string
}

const emptyBudget = {
    mortgage: {
        min: '',
        max: '',
    },
    rent: {
        min: '',
        max: '',
    },
}

export function Tenants({
    tenants,
    setTenants,
    resource,
    editMode = false,
}: {
    tenants: TenantsType
    setTenants: React.Dispatch<React.SetStateAction<TenantsType>>
    resource: string
    editMode?: boolean
}) {
    const budget = tenants.budget ?? emptyBudget

    const budgetFields = () => {
        switch (tenants.budgetStatus) {
            case 'رهن کامل':
                return [
                    <CustomTextField
                        key="mortgage-min"
                        name="budget.mortgage.min"
                        setData={setTenants}
                        resource={resource}
                        label="حداقل رهن"
                        defaultValue={budget.mortgage.min}
                    />,
                    <CustomTextField
                        key="mortgage-max"
                        name="budget.mortgage.max"
                        setData={setTenants}
                        resource={resource}
                        label="حداکثر رهن"
                        defaultValue={budget.mortgage.max}
                    />,
                ]

            case 'اجاره کامل':
                return [
                    <CustomTextField
                        key="rent-min"
                        name="budget.rent.min"
                        setData={setTenants}
                        resource={resource}
                        label="حداقل اجاره"
                        defaultValue={budget.rent.min}
                    />,
                    <CustomTextField
                        key="rent-max"
                        name="budget.rent.max"
                        setData={setTenants}
                        resource={resource}
                        label="حداکثر اجاره"
                        defaultValue={budget.rent.max}
                    />,
                ]

            case 'رهن و اجاره':
                return [
                    <CustomTextField
                        key="mortgage-min"
                        name="budget.mortgage.min"
                        setData={setTenants}
                        resource={resource}
                        label="حداقل رهن"
                        defaultValue={budget.mortgage.min}
                    />,
                    <CustomTextField
                        key="mortgage-max"
                        name="budget.mortgage.max"
                        setData={setTenants}
                        resource={resource}
                        label="حداکثر رهن"
                        defaultValue={budget.mortgage.max}
                    />,
                    <CustomTextField
                        key="rent-min"
                        name="budget.rent.min"
                        setData={setTenants}
                        resource={resource}
                        label="حداقل اجاره"
                        defaultValue={budget.rent.min}
                    />,
                    <CustomTextField
                        key="rent-max"
                        name="budget.rent.max"
                        setData={setTenants}
                        resource={resource}
                        label="حداکثر اجاره"
                        defaultValue={budget.rent.max}
                    />,
                ]

            default:
                return []
        }
    }

    return (
        <Stack>
            {tenants && (
                <GridProducer
                    sx={{marginBottom: '16px'}}
                    data={[
                        ...(editMode
                            ? [
                                  <CustomTextField
                                      key="id"
                                      name="id"
                                      setData={setTenants}
                                      resource={resource}
                                      label="شناسه"
                                      defaultValue={tenants.id}
                                      disabled
                                  />,
                              ]
                            : []),

                        <CustomTextField
                            key="full_name"
                            name="full_name"
                            setData={setTenants}
                            resource={resource}
                            label="نام و نام خانوادگی"
                            defaultValue={tenants.full_name}
                        />,

                        <CustomTextField
                            key="phone_number"
                            name="phone_number"
                            setData={setTenants}
                            resource={resource}
                            label="تلفن"
                            defaultValue={tenants.phone_number}
                        />,

                        <CustomSelectField
                            key="cities"
                            name="cities"
                            setData={setTenants}
                            resource={resource}
                            label="شهر"
                            defaultValue={tenants.cities}
                            options={toSelectOptions(['قم'])}
                        />,

                        <CustomSelectField
                            key="neighborhoods"
                            name="neighborhoods"
                            setData={setTenants}
                            resource={resource}
                            label="محله"
                            defaultValue={tenants.neighborhoods}
                            options={toSelectOptions([
                                'زنبیل آباد',
                                'آزادگان',
                            ])}
                        />,

                        <CustomSelectField
                            key="budgetStatus"
                            name="budgetStatus"
                            setData={setTenants}
                            resource={resource}
                            label="وضعیت بودجه"
                            defaultValue={tenants.budgetStatus}
                            options={toSelectOptions([
                                'رهن کامل',
                                'اجاره کامل',
                                'رهن و اجاره',
                            ])}
                        />,

                        ...budgetFields(),

                        <CustomSelectField
                            key="defaultConditions"
                            name="defaultConditions"
                            setData={setTenants}
                            resource={resource}
                            label="شرایط پیش‌فرض"
                            defaultValue={tenants.defaultConditions}
                            options={toSelectOptions([
                                'چک تخلیه می‌دهم',
                                'اجاره‌ها را چک می‌دهم',
                                'کل اجاره را یکجا پرداخت می‌کنم',
                            ])}
                        />,

                        <CustomSelectField
                            key="nationality"
                            name="nationality"
                            setData={setTenants}
                            resource={resource}
                            label="ملیت"
                            defaultValue={tenants.nationality}
                            options={toSelectOptions([
                                'ایرانی',
                                'اتباع',
                            ])}
                        />,
                    ]}
                />
            )}
        </Stack>
    )
}

