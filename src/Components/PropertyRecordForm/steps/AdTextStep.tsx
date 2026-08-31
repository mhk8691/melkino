import {Typography} from '@mui/material'

import {AD_TONE_OPTIONS} from '../constants'
import {CustomSelectField, CustomTextField, GridProducer} from '../shared'
import type {StepProps} from '../types'
import {toSelectOptions} from '../utils'

export function AdTextStep({property, setProperty, resource}: StepProps) {
    return (
        <>
          

            <CustomTextField
                key="strongPoint"
                name="strongPoint"
                setData={setProperty}
                resource={resource}
                label="نقطه قوت ویژه ملک"
                placeholder="مثلاً: غرق در نور، شرایط پرداخت عالی"
                defaultValue={property.strongPoint}
                multiline
                minRows={3}
                sx={{marginBottom: '20px'}}
            />

            <Typography variant="labelSm" fontWeight={700} color="text.disabled" sx={{mb: 1.5, display: 'block'}}>
                اطلاعات تماس در متن (اختیاری)
            </Typography>

            <GridProducer
                data={[
                    <CustomTextField
                        key="advisorName"
                        name="advisorName"
                        setData={setProperty}
                        resource={resource}
                        label="نام مشاور"
                        defaultValue={property.advisorName}
                    />,

                    <CustomTextField
                        key="agencyName"
                        name="agencyName"
                        setData={setProperty}
                        resource={resource}
                        label="نام آژانس املاک"
                        defaultValue={property.agencyName}
                    />,

                    <CustomTextField
                        key="contactPhone"
                        name="contactPhone"
                        setData={setProperty}
                        resource={resource}
                        label="شماره تماس"
                        defaultValue={property.contactPhone}
                    />,
                ]}
            />
        </>
    )
}
