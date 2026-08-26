import {useState} from 'react'
import {Box, Button, Step, StepLabel, Stepper, Stack, Typography} from '@mui/material'
import type {Dispatch, SetStateAction} from 'react'

import {CustomStepIcon, CustomConnector} from './components/StepperElements'
import {TypeGate} from './components/TypeGate'
import {BaseStep} from './steps/BaseStep'
import {FinancialStep} from './steps/FinancialStep'
import {TechnicalStep} from './steps/TechnicalStep'
import {OwnerStep} from './steps/OwnerStep'
import {ImagesStep} from './steps/ImagesStep'
import {DescriptionStep} from './steps/DescriptionStep'
import {MODE_TITLE, STEPS_BY_MODE, STEP_CONTENT_HEIGHT} from './constants'
import type {PropertyType, RecordMode} from './types'

export function PropertyRecordForm({
    property,
    setProperty,
    resource,
    mode = 'file',
}: {
    property: PropertyType
    setProperty: Dispatch<SetStateAction<PropertyType>>
    resource: string
    mode?: RecordMode
}) {
    const [activeStep, setActiveStep] = useState(0)

    const steps = STEPS_BY_MODE[mode]

    const handleNext = () => {
        setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))
    }

    const handleBack = () => {
        setActiveStep((prev) => Math.max(prev - 1, 0))
    }

    const handleChangeType = () => {
        setProperty((prev) => ({...prev, contractType: ''}))
        setActiveStep(0)
    }

    if (!property) return null

    // پیش از شروع فرم (چه ثبت فایل، چه ثبت درخواست)، نوع باید مشخص شود
    if (!property.contractType) {
        return (
            <TypeGate
                value={property.contractType}
                title={mode === 'request' ? 'نوع درخواست را انتخاب کنید' : 'نوع فایل را انتخاب کنید'}
                onSelect={(value) =>
                    setProperty((prev) => ({
                        ...prev,
                        contractType: value,
                    }))
                }
            />
        )
    }

    const stepProps = {property, setProperty, resource}

    // نگاشت گام‌ها بر اساس حالت فرم
    const stepRenderers: Record<RecordMode, Array<() => React.ReactNode>> = {
        file: [
            () => <BaseStep {...stepProps} mode={mode} />,
            () => <FinancialStep {...stepProps} mode={mode} />,
            () => <TechnicalStep {...stepProps} mode={mode} />,
            () => <OwnerStep {...stepProps} />,
            () => <ImagesStep setProperty={setProperty} />,
            () => <DescriptionStep {...stepProps} />,
        ],
        request: [
            () => <BaseStep {...stepProps} mode={mode} />,
            () => <FinancialStep {...stepProps} mode={mode} />,
            () => <TechnicalStep {...stepProps} mode={mode} />,
            () => <DescriptionStep {...stepProps} />,
        ],
    }

    const renderStepContent = stepRenderers[mode][activeStep] ?? (() => null)

    return (
        <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" color="text.secondary">
                    {MODE_TITLE[mode]} · {property.contractType}
                </Typography>

                <Button size="small" onClick={handleChangeType}>
                    تغییر نوع
                </Button>
            </Stack>

            <Stepper activeStep={activeStep} alternativeLabel connector={<CustomConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Box
                sx={{
                    minHeight: STEP_CONTENT_HEIGHT,
                    maxHeight: STEP_CONTENT_HEIGHT,
                    overflowY: 'auto',
                    pr: 0.5,
                    pt: 1.5,
                }}
            >
                {renderStepContent()}
            </Box>

            <Stack direction="row" justifyContent="space-between">
                <Button disabled={activeStep === 0} onClick={handleBack}>
                    مرحله قبل
                </Button>

                <Button
                    variant="contained"
                    disabled={activeStep === steps.length - 1}
                    onClick={handleNext}
                >
                    مرحله بعد
                </Button>
            </Stack>
        </Stack>
    )
}


