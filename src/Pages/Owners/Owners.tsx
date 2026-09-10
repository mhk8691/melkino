import {Stack} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import {CustomSelectField} from '../../Components/Input/CustomSelectField'
import {toSelectOptions} from '../../Components/PropertyRecordForm/utils'

export type CustomersType = {
    id: number
    full_name: string
    phone_number: string
    cities: string
    neighborhoods: string
}

export function Owners({
    owners,
    setOwners,
    resource,
    editMode = false,
}: {
    owners: CustomersType
    setOwners: React.Dispatch<React.SetStateAction<CustomersType>>
    resource: string
    editMode?: boolean
}) {
    return (
        <Stack>
            {owners && (
                <GridProducer
                    sx={{marginBottom: '16px'}}
                    data={[
                        ...(editMode
                            ? [
                                  <CustomTextField
                                      key="id"
                                      name="id"
                                      setData={setOwners}
                                      resource={resource}
                                      label="شناسه"
                                      defaultValue={owners.id}
                                      disabled
                                  />,
                              ]
                            : []),

                        <CustomTextField
                            name="full_name"
                            setData={setOwners}
                            resource={resource}
                            label="نام"
                            defaultValue={owners.full_name}
                        />,

                        <CustomTextField
                            name="phone_number"
                            setData={setOwners}
                            resource={resource}
                            label="تلفن"
                            defaultValue={owners.phone_number}
                        />,

                        <CustomSelectField
                            key="cities"
                            name="cities"
                            setData={setOwners}
                            resource={resource}
                            label="شهر"
                            defaultValue={owners.cities}
                            options={toSelectOptions(['قم'])}
                        />,

                        <CustomSelectField
                            key="neighborhoods"
                            name="neighborhoods"
                            setData={setOwners}
                            resource={resource}
                            label="محله"
                            defaultValue={owners.neighborhoods}
                            options={toSelectOptions(['زنبیل آباد', 'آزادگان'])}
                        />,
                    ]}
                />
            )}
        </Stack>
    )
}
