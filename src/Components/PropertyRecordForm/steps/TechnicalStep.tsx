import {
    COOLING_OPTIONS,
    DIRECTION_OPTIONS,
    FACADE_OPTIONS,
    FLOORING_OPTIONS,
    HEATING_OPTIONS,
    OCCUPANCY_OPTIONS,
} from '../constants'
import {AmenitiesGrid} from '../components/AmenitiesGrid'
import {RangeField} from '../components/RangeField'
import {CustomSelectField, CustomTextField, GridProducer} from '../shared'
import type {ModeStepProps} from '../types'
import {toSelectOptions} from '../utils'

export function TechnicalStep({property, setProperty, resource, mode}: ModeStepProps) {
    return (
        <>
            <GridProducer
                sx={{marginBottom: '16px'}}
                data={[
                    <CustomTextField
                        key="roomCount"
                        name="roomCount"
                        setData={setProperty}
                        resource={resource}
                        label="تعداد اتاق"
                        defaultValue={property.roomCount}
                        thousandSeparator
                    />,

                    <CustomSelectField
                        key="occupancyStatus"
                        name="occupancyStatus"
                        setData={setProperty}
                        resource={resource}
                        label="وضعیت اشتغال"
                        defaultValue={property.occupancyStatus}
                        options={toSelectOptions(OCCUPANCY_OPTIONS)}
                    />,

                    <CustomTextField
                        key="bathroom"
                        name="bathroom"
                        setData={setProperty}
                        resource={resource}
                        label="حمام"
                        defaultValue={property.bathroom}
                    />,

                    // گرمایش/سرمایش/کف‌پوش/نما فقط برای ثبت فایل
                    ...(mode === 'file'
                        ? [
                              <CustomSelectField
                                  key="heating"
                                  name="heating"
                                  setData={setProperty}
                                  resource={resource}
                                  label="گرمایش"
                                  defaultValue={property.heating}
                                  options={toSelectOptions(HEATING_OPTIONS)}
                              />,

                              <CustomSelectField
                                  key="cooling"
                                  name="cooling"
                                  setData={setProperty}
                                  resource={resource}
                                  label="سرمایش"
                                  defaultValue={property.cooling}
                                  options={toSelectOptions(COOLING_OPTIONS)}
                              />,

                              <CustomSelectField
                                  key="flooring"
                                  name="flooring"
                                  setData={setProperty}
                                  resource={resource}
                                  label="کف پوش"
                                  defaultValue={property.flooring}
                                  options={toSelectOptions(FLOORING_OPTIONS)}
                              />,

                              <CustomSelectField
                                  key="facade"
                                  name="facade"
                                  setData={setProperty}
                                  resource={resource}
                                  label="نما"
                                  defaultValue={property.facade}
                                  options={toSelectOptions(FACADE_OPTIONS)}
                              />,
                          ]
                        : []),
  <CustomSelectField
                        key="direction"
                        name="direction"
                        setData={setProperty}
                        resource={resource}
                        label="جهت"
                        defaultValue={property.direction}
                        options={toSelectOptions(DIRECTION_OPTIONS)}
                    />,
                    mode === 'request' ? (
                        <RangeField
                            key="totalFloor"
                            baseName="totalFloor"
                            label="طبقه کل"
                            property={property}
                            setProperty={setProperty}
                            resource={resource}
                        />
                    ) : (
                        <CustomTextField
                            key="totalFloor"
                            name="totalFloor"
                            setData={setProperty}
                            resource={resource}
                            label="طبقه کل"
                            defaultValue={property.totalFloor}
                            thousandSeparator
                        />
                    ),

                  
                ]}
            />

            <AmenitiesGrid
                value={property.amenities}
                onChange={(next) =>
                    setProperty((prev) => ({
                        ...prev,
                        amenities: next,
                    }))
                }
            />
        </>
    )
}
