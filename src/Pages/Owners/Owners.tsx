import {Stack} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'

export type CustomersType = {
    id: number
    name: string
    phone: string
    area: string
}

export function Owners({
    owners,
    setOwners,
    resource,
    editMode=false
}: {
    owners: CustomersType
    setOwners: React.Dispatch<React.SetStateAction<CustomersType>>
    resource: string
    editMode?:boolean
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
                            name="name"
                            setData={setOwners}
                            resource={resource}
                            label="نام"
                            defaultValue={owners.name}
                        />,

                        <CustomTextField
                            name="phone"
                            setData={setOwners}
                            resource={resource}
                            label="تلفن"
                            defaultValue={owners.phone}
                        />,

                        
                        <CustomTextField
                            name="area"
                            setData={setOwners}
                            resource={resource}
                            label="منطقه"
                            defaultValue={owners.area}
                        />,

                  
                    ]}
                />
            )}
        </Stack>
    )
}
