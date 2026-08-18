export const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'تاریخ موجود نیست'
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'تاریخ نامعتبر'
    return new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit',
    }).format(date)
}
