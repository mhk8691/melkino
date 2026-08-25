import {useState} from 'react'
import {
    Box,
    Button,
    Step,
    StepConnector,
    stepConnectorClasses,
    StepLabel,
    Stepper,
    Stack,
    Paper,
    Typography,
    InputAdornment,
} from '@mui/material'
import {styled} from '@mui/material/styles'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'

import {CustomTextField} from '../../Components/Input/CustomTextField'
import {CustomSelectField} from '../../Components/Input/CustomSelectField'
import {CustomImagesField} from '../../Components/Input/CustomImagesField'
import {GridProducer} from '../../Components/Table/GridProducer'
import {numberToPersianWordsToman} from '../../Core/numberToPersianWords'

export type PropertyType = {
    id: number
    status: string
    propertyType: string
    contractType: string
    documentType: string

    city: string
    district: string
    neighborhood: string
    address: string

    area: number
    totalPrice: number
    pricePerMeter: number
    rent: number

    mortgagePrice: number
    monthlyRent: number
    mortgageTerms: string

    roomCount: number
    occupancyStatus: string
    bathroom: string
    heating: string
    cooling: string
    flooring: string
    facade: string
    totalFloor: number
    direction: string

    amenities: string[]

    ownerName: string
    ownerPhone: string
    ownerPhone2: string
    ownerJob: string

    images: File[]

    description: string
    internalNote: string
}

const STATUS_OPTIONS = ['فعال', 'فروخته شده', 'منصرف شد', 'کنسل شد']

const PROPERTY_TYPE_OPTIONS = ['آپارتمان', 'ویلایی', 'زمین', 'پیش فروش']

const CONTRACT_TYPE_OPTIONS = ['فروش', 'تهاتر', 'مشارکت', 'رهن و اجاره']

const DOCUMENT_TYPE_OPTIONS = [
    'تک برگ',
    'مبایعه نامه',
    'وکالت نامه',
    'سند مشاعی',
    'سند اوقافی',
    'سند مسکن ملی',
    'صلح نامه',
    'در دست اقدام',
]

const CITY_OPTIONS = [
    'تهران',
    'مشهد',
    'اصفهان',
    'کرج',
    'شیراز',
    'تبریز',
    'اهواز',
    'قم',
    'کرمانشاه',
    'رشت',
    'ارومیه',
    'زاهدان',
    'کرمان',
    'اراک',
    'یزد',
]

const OCCUPANCY_OPTIONS = ['تخلیه', 'مالک', 'مستاجر']

const HEATING_OPTIONS = ['بومبلر', 'داکت اسپلیت', 'کولرآبی', 'پکیج', 'شوفاژ', 'موج گرم', 'ندارد']

const COOLING_OPTIONS = ['کولر آبی', 'اسپلیت', 'داکت اسپلیت', 'پکیج', 'ارتفاع دار', 'ندارد']

const FLOORING_OPTIONS = ['سرامیک', 'پارکت', 'موزاییک', 'سنگ', 'مربوط', 'کاشی', 'چوب', 'لاموینت']

const FACADE_OPTIONS = ['سنگ', 'آجر', 'رنگ', 'کامپوزیت', 'شیشه', 'فلز', 'ترکیبی']

const DIRECTION_OPTIONS = [
    'شمال',
    'جنوب',
    'شرق',
    'غرب',
    'شمال شرق',
    'شمال غرب',
    'جنوب شرق',
    'جنوب غرب',
]

const AMENITIES_OPTIONS = [
    'آسانسور',
    'پارکینگ',
    'انباری',
    'بالکن',
    'کابینت',
    'شیرآلات',
    'ورزشی',
    'لابی',
    'نگهبانی',
    'دوربین',
    'هوشمند',
    'روف گاردن',
]

const STEPS = ['پایه', 'اطلاعات مالی', 'فنی', 'مالک', 'تصاویر', 'توضیحات']

// ارتفاع ثابت محتوای هر مرحله
const STEP_CONTENT_HEIGHT = 430

export type FilesType = {
    id: number
    title: string
    description: string
    link: string
}

const toSelectOptions = (values: string[]) =>
    values.map((value) => ({
        label: value,
        value,
    }))

// اگر مقدار خالی/صفر بود متن حروفی نشون داده نشه
const priceHelperText = (value: number) => (value ? numberToPersianWordsToman(value) : '')

/* ---------------------------------------------------------------------- */
/* Stepper سفارشی                                                          */
/* ---------------------------------------------------------------------- */

const CustomConnector = styled(StepConnector)(({theme}) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 14,
    },

    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.primary.main,
        },
    },

    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.primary.main,
        },
    },

    [`& .${stepConnectorClasses.line}`]: {
        borderTopWidth: 2,
        borderRadius: 1,
        borderColor: theme.palette.divider,
    },
}))

const StepIconRoot = styled('div')<{
    ownerState: {
        active?: boolean
        completed?: boolean
    }
}>(({theme, ownerState}) => ({
    width: 28,
    height: 28,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: 600,
    transition: 'all .2s ease',

    border: `2px solid ${theme.palette.divider}`,
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,

    ...(ownerState.active && {
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        boxShadow: `0 0 0 4px ${theme.palette.primary.main}1f`,
    }),

    ...(ownerState.completed && {
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    }),
}))

function CustomStepIcon(props: {active?: boolean; completed?: boolean; icon: React.ReactNode}) {
    const {active, completed, icon} = props

    return (
        <StepIconRoot ownerState={{active, completed}}>
            {completed ? <CheckRoundedIcon sx={{fontSize: 16}} /> : icon}
        </StepIconRoot>
    )
}

/* ---------------------------------------------------------------------- */
/* امکانات                                                                  */
/* ---------------------------------------------------------------------- */

function AmenitiesGrid({value, onChange}: {value: string[]; onChange: (next: string[]) => void}) {
    const selected = value ?? []

    const toggle = (item: string) => {
        onChange(selected.includes(item) ? selected.filter((v) => v !== item) : [...selected, item])
    }

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)',
                },
                gap: 1.5,
            }}
        >
            {AMENITIES_OPTIONS.map((item) => {
                const isSelected = selected.includes(item)

                return (
                    <Paper
                        key={item}
                        onClick={() => toggle(item)}
                        elevation={0}
                        sx={{
                            cursor: 'pointer',
                            userSelect: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 1,
                            px: 1.75,
                            py: 1.5,
                            borderRadius: 2,
                            border: '2px solid',
                            borderColor: isSelected ? 'primary.main' : 'divider',
                            backgroundColor: isSelected ? 'primary.main' : 'background.paper',
                            color: isSelected ? 'primary.contrastText' : 'text.primary',
                            transition:
                                'border-color .15s ease, background-color .15s ease, transform .1s ease',

                            '&:hover': {
                                borderColor: 'primary.main',
                                transform: 'translateY(-1px)',
                            },
                        }}
                    >
                        <Typography variant="body2" fontWeight={500}>
                            {item}
                        </Typography>

                        <Box
                            sx={{
                                width: 20,
                                height: 20,
                                flexShrink: 0,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid',
                                borderColor: isSelected ? 'primary.contrastText' : 'divider',
                                backgroundColor: 'transparent',
                            }}
                        >
                            {isSelected && (
                                <CheckRoundedIcon
                                    sx={{
                                        fontSize: 14,
                                        color: 'primary.contrastText',
                                    }}
                                />
                            )}
                        </Box>
                    </Paper>
                )
            })}
        </Box>
    )
}

/* ---------------------------------------------------------------------- */
/* کامپوننت اصلی                                                            */
/* ---------------------------------------------------------------------- */

export function Files({
    property,
    setProperty,
    resource,
}: {
    property: PropertyType
    setProperty: React.Dispatch<React.SetStateAction<PropertyType>>
    resource: string
}) {
    const [activeStep, setActiveStep] = useState(0)

    const handleNext = () => {
        setActiveStep((prev) => Math.min(prev + 1, STEPS.length - 1))
    }

    const handleBack = () => {
        setActiveStep((prev) => Math.max(prev - 1, 0))
    }

    if (!property) return null

    const renderStepContent = () => {
        switch (activeStep) {
            /* ---------------------------------------------------------- */
            /* پایه                                                        */
            /* ---------------------------------------------------------- */

            case 0:
                return (
                    <GridProducer
                        sx={{marginBottom: '16px'}}
                        data={[
                            <CustomSelectField
                                name="status"
                                setData={setProperty}
                                resource={resource}
                                label="وضعیت"
                                defaultValue={property.status}
                                options={toSelectOptions(STATUS_OPTIONS)}
                            />,

                            <CustomSelectField
                                name="propertyType"
                                setData={setProperty}
                                resource={resource}
                                label="نوع ملک"
                                defaultValue={property.propertyType}
                                options={toSelectOptions(PROPERTY_TYPE_OPTIONS)}
                            />,

                            <CustomSelectField
                                name="contractType"
                                setData={setProperty}
                                resource={resource}
                                label="نوع قرارداد"
                                defaultValue={property.contractType}
                                options={toSelectOptions(CONTRACT_TYPE_OPTIONS)}
                            />,

                            <CustomSelectField
                                name="documentType"
                                setData={setProperty}
                                resource={resource}
                                label="نوع سند"
                                defaultValue={property.documentType}
                                options={toSelectOptions(DOCUMENT_TYPE_OPTIONS)}
                            />,

                            <CustomSelectField
                                name="city"
                                setData={setProperty}
                                resource={resource}
                                label="شهر"
                                defaultValue={property.city}
                                options={toSelectOptions(CITY_OPTIONS)}
                            />,

                            <CustomTextField
                                name="district"
                                setData={setProperty}
                                resource={resource}
                                label="منطقه"
                                defaultValue={property.district}
                            />,

                            <CustomTextField
                                name="neighborhood"
                                setData={setProperty}
                                resource={resource}
                                label="محله"
                                defaultValue={property.neighborhood}
                            />,

                            <CustomTextField
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

            /* ---------------------------------------------------------- */
            /* اطلاعات مالی                                                */
            /* ---------------------------------------------------------- */

            case 1:
                return (
                    <GridProducer
                        sx={{marginBottom: '16px'}}
                        data={[
                            <CustomTextField
                                name="area"
                                setData={setProperty}
                                resource={resource}
                                label="متراژ"
                                defaultValue={property.area}
                                thousandSeparator
                                endIcon={<InputAdornment position="end">متر</InputAdornment>}
                            />,

                            /* ---------------- فروش ---------------- */

                            ...(property.contractType === 'فروش'
                                ? [
                                      <CustomTextField
                                          name="totalPrice"
                                          setData={setProperty}
                                          resource={resource}
                                          label="قیمت کل"
                                          defaultValue={property.totalPrice}
                                          thousandSeparator
                                          endIcon={
                                              <InputAdornment position="end">تومان</InputAdornment>
                                          }
                                          helperText={priceHelperText(property.totalPrice)}
                                      />,

                                      <CustomTextField
                                          name="pricePerMeter"
                                          setData={setProperty}
                                          resource={resource}
                                          label="قیمت متری"
                                          defaultValue={property.pricePerMeter}
                                          thousandSeparator
                                          endIcon={
                                              <InputAdornment position="end">تومان</InputAdornment>
                                          }
                                          helperText={priceHelperText(property.pricePerMeter)}
                                      />,
                                  ]
                                : []),

                            /* ------------ رهن و اجاره ------------- */

                            ...(property.contractType === 'رهن و اجاره'
                                ? [
                                      <CustomTextField
                                          name="mortgagePrice"
                                          setData={setProperty}
                                          resource={resource}
                                          label="قیمت رهن"
                                          defaultValue={property.mortgagePrice}
                                          thousandSeparator
                                          endIcon={
                                              <InputAdornment position="end">تومان</InputAdornment>
                                          }
                                          helperText={priceHelperText(property.mortgagePrice)}
                                      />,

                                      <CustomTextField
                                          name="monthlyRent"
                                          setData={setProperty}
                                          resource={resource}
                                          label="اجاره ماهانه"
                                          defaultValue={property.monthlyRent}
                                          thousandSeparator
                                          endIcon={
                                              <InputAdornment position="end">تومان</InputAdornment>
                                          }
                                          helperText={priceHelperText(property.monthlyRent)}
                                      />,

                                      <CustomTextField
                                          name="mortgageTerms"
                                          setData={setProperty}
                                          resource={resource}
                                          label="شرایط رهن و اجاره"
                                          defaultValue={property.mortgageTerms}
                                          multiline
                                          minRows={3}
                                      />,
                                  ]
                                : []),

                            /* ---------------- اجاره قدیمی -------------
                             *
                             * اگر rent برای قراردادهای دیگری مثل
                             * تهاتر/مشارکت استفاده می‌شود، می‌توانی
                             * این بخش را نگه داری.
                             *
                             * فعلاً طبق درخواست، فقط فروش و رهن و اجاره
                             * نمایش داده می‌شوند.
                             */
                        ]}
                    />
                )

            /* ---------------------------------------------------------- */
            /* فنی                                                          */
            /* ---------------------------------------------------------- */

            case 2:
                return (
                    <>
                        <GridProducer
                            sx={{marginBottom: '16px'}}
                            data={[
                                <CustomTextField
                                    name="roomCount"
                                    setData={setProperty}
                                    resource={resource}
                                    label="تعداد اتاق"
                                    defaultValue={property.roomCount}
                                    
                                />,

                                <CustomSelectField
                                    name="occupancyStatus"
                                    setData={setProperty}
                                    resource={resource}
                                    label="وضعیت اشتغال"
                                    defaultValue={property.occupancyStatus}
                                    options={toSelectOptions(OCCUPANCY_OPTIONS)}
                                />,

                                <CustomTextField
                                    name="bathroom"
                                    setData={setProperty}
                                    resource={resource}
                                    label="حمام"
                                    defaultValue={property.bathroom}
                                />,

                                <CustomSelectField
                                    name="heating"
                                    setData={setProperty}
                                    resource={resource}
                                    label="گرمایش"
                                    defaultValue={property.heating}
                                    options={toSelectOptions(HEATING_OPTIONS)}
                                />,

                                <CustomSelectField
                                    name="cooling"
                                    setData={setProperty}
                                    resource={resource}
                                    label="سرمایش"
                                    defaultValue={property.cooling}
                                    options={toSelectOptions(COOLING_OPTIONS)}
                                />,

                                <CustomSelectField
                                    name="flooring"
                                    setData={setProperty}
                                    resource={resource}
                                    label="کف پوش"
                                    defaultValue={property.flooring}
                                    options={toSelectOptions(FLOORING_OPTIONS)}
                                />,

                                <CustomSelectField
                                    name="facade"
                                    setData={setProperty}
                                    resource={resource}
                                    label="نما"
                                    defaultValue={property.facade}
                                    options={toSelectOptions(FACADE_OPTIONS)}
                                />,

                                <CustomTextField
                                    name="totalFloor"
                                    setData={setProperty}
                                    resource={resource}
                                    label="طبقه کل"
                                    defaultValue={property.totalFloor}
                                    thousandSeparator
                                />,

                                <CustomSelectField
                                    name="direction"
                                    setData={setProperty}
                                    resource={resource}
                                    label="جهت"
                                    defaultValue={property.direction}
                                    options={toSelectOptions(DIRECTION_OPTIONS)}
                                />,
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

            /* ---------------------------------------------------------- */
            /* مالک                                                          */
            /* ---------------------------------------------------------- */

            case 3:
                return (
                    <GridProducer
                        sx={{marginBottom: '16px'}}
                        data={[
                            <CustomTextField
                                name="ownerName"
                                setData={setProperty}
                                resource={resource}
                                label="نام مالک"
                                defaultValue={property.ownerName}
                            />,

                            <CustomTextField
                                name="ownerPhone"
                                setData={setProperty}
                                resource={resource}
                                label="تلفن"
                                defaultValue={property.ownerPhone}
                            />,

                            <CustomTextField
                                name="ownerPhone2"
                                setData={setProperty}
                                resource={resource}
                                label="تلفن دوم"
                                defaultValue={property.ownerPhone2}
                            />,

                            <CustomTextField
                                name="ownerJob"
                                setData={setProperty}
                                resource={resource}
                                label="شغل مالک"
                                defaultValue={property.ownerJob}
                            />,
                        ]}
                    />
                )

            /* ---------------------------------------------------------- */
            /* تصاویر                                                        */
            /* ---------------------------------------------------------- */

            case 4:
                return <CustomImagesField name="images" setData={setProperty} label="تصاویر" />

            /* ---------------------------------------------------------- */
            /* توضیحات                                                       */
            /* ---------------------------------------------------------- */

            case 5:
                return (
                    <GridProducer
                        sx={{marginBottom: '16px'}}
                        data={[
                            <CustomTextField
                                name="description"
                                setData={setProperty}
                                resource={resource}
                                label="توضیحات"
                                defaultValue={property.description}
                                multiline
                                minRows={4}
                            />,

                            <CustomTextField
                                name="internalNote"
                                setData={setProperty}
                                resource={resource}
                                label="یادداشت داخلی"
                                defaultValue={property.internalNote}
                                multiline
                                minRows={4}
                            />,
                        ]}
                    />
                )

            default:
                return null
        }
    }

    return (
        <Stack spacing={3}>
            <Stepper activeStep={activeStep} alternativeLabel connector={<CustomConnector />}>
                {STEPS.map((label) => (
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
                    disabled={activeStep === STEPS.length - 1}
                    onClick={handleNext}
                >
                    مرحله بعد
                </Button>
            </Stack>
        </Stack>
    )
}
