import { PropertyType } from "../../../Components/PropertyRecordForm"

export const STATUS_COLOR: Record<string, string> = {
    فعال: 'primary.main',
    'فروخته شده': 'text.disabled',
    'منصرف شد': 'secondary.main',
    'کنسل شد': 'error.main',
}

export const isFilled = (value: unknown) =>
    value !== undefined && value !== null && value !== '' && !(Array.isArray(value) && value.length === 0)

export const formatNumber = (value?: number) =>
    value || value === 0 ? value.toLocaleString('fa-IR') : undefined

export const formatRange = (from?: number, to?: number) => {
    const f = formatNumber(from)
    const t = formatNumber(to)
    if (f && t) return `${f} تا ${t}`
    if (f) return `از ${f}`
    if (t) return `تا ${t}`
    return undefined
}

export const toText = (value?: string | string[]) => {
    if (!value) return undefined
    if (Array.isArray(value)) return value.filter(Boolean).join('، ') || undefined
    return value
}

export type DetailField = {
    label: string
    value?: React.ReactNode
}

export function useDerivedPropertyInfo(item: Partial<PropertyType>) {
    const location = [item.city, toText(item.district), toText(item.neighborhood)]
        .filter(Boolean)
        .join(' - ')

    const areaText = formatNumber(item.area)
        ? `${formatNumber(item.area)} متر`
        : formatRange(item.areaFrom, item.areaTo)
        ? `${formatRange(item.areaFrom, item.areaTo)} متر`
        : undefined

    const totalFloorText = formatNumber(item.totalFloor) ?? formatRange(item.totalFloorFrom, item.totalFloorTo)

    const totalPriceText = formatNumber(item.totalPrice) ?? formatRange(item.totalPriceFrom, item.totalPriceTo)
    const mortgagePriceText =
        formatNumber(item.mortgagePrice) ?? formatRange(item.mortgagePriceFrom, item.mortgagePriceTo)
    const monthlyRentText =
        formatNumber(item.monthlyRent) ?? formatRange(item.monthlyRentFrom, item.monthlyRentTo)

    let priceMain: string | undefined
    let priceLabel: string | undefined
    let priceSecondary: string | undefined

    if (totalPriceText) {
        priceMain = totalPriceText
        priceLabel = 'قیمت کل'
    } else if (mortgagePriceText) {
        priceMain = mortgagePriceText
        priceLabel = 'رهن'
        if (monthlyRentText) priceSecondary = `اجاره ماهانه ${monthlyRentText} تومان`
    } else if (monthlyRentText) {
        priceMain = monthlyRentText
        priceLabel = 'اجاره ماهانه'
    }

    const amenities = item.amenities?.filter(Boolean) ?? []

    const specFields: DetailField[] = [
        {label: 'آدرس', value: item.address},
        {label: 'نوع سند', value: item.documentType},
        {label: 'وضعیت تصرف', value: item.occupancyStatus},
        {label: 'متراژ', value: areaText},
        {label: 'تعداد خواب', value: isFilled(item.roomCount) ? `${item.roomCount} خوابه` : undefined},
        {label: 'تعداد طبقات', value: totalFloorText},
        {label: 'جهت', value: item.direction},
        {label: 'نما', value: item.facade},
        {label: 'کف‌پوش', value: item.flooring},
        {label: 'سیستم گرمایش', value: item.heating},
        {label: 'سیستم سرمایش', value: item.cooling},
        {label: 'سرویس بهداشتی', value: item.bathroom},
    ]

    const financialFields: DetailField[] = [
        {label: 'قیمت هر متر', value: formatNumber(item.pricePerMeter)},
        {label: 'اجاره', value: formatNumber(item.rent)},
        {label: 'شرایط رهن', value: item.mortgageTerms},
    ]

    const ownerFields: DetailField[] = [
        {label: 'نام مالک', value: item.ownerName},
        {label: 'تلفن مالک', value: item.ownerPhone},
        {label: 'تلفن دوم مالک', value: item.ownerPhone2},
        {label: 'شغل مالک', value: item.ownerJob},
    ]

    const requesterFields: DetailField[] = [
        {label: 'نام درخواست‌کننده', value: item.requesterName},
        {label: 'تلفن درخواست‌کننده', value: item.requesterPhone},
    ]

    return {
        location,
        areaText,
        totalFloorText,
        priceMain,
        priceLabel,
        priceSecondary,
        amenities,
        specFields,
        financialFields,
        ownerFields,
        requesterFields,
        hasNotes: [item.description, item.internalNote].some(isFilled),
    }
}