import {buildUserRequestData, isAgencyValid} from './UserRequestData'

test.each(['user', 'agency', 'expert', 'superadmin'] as const)('%s requests omit address lookup fields in both JSON and multipart', (role) => {
    const values = {province: 'تهران', city: 'تهران', address: 'آدرس', postal_code: '1234567890'}
    expect(buildUserRequestData(values, role)).toEqual({postal_code: '1234567890'})
    const avatar = new File(['image'], 'avatar.png', {type: 'image/png'})
    const formData = buildUserRequestData({...values, avatar}, role) as FormData
    expect(formData.has('province')).toBe(false)
    expect(formData.has('city')).toBe(false)
    expect(formData.has('address')).toBe(false)
    expect(formData.get('postal_code')).toBe('1234567890')
    expect(formData.get('avatar')).toBe(avatar)
})

test('JSON requests preserve null, booleans, numeric IDs, and empty specialty lists', () => {
    expect(buildUserRequestData({id: 1, full_name: 'نام', manager_name: 'مدیر', email: null, agency_id: 2, is_staff: false, specialties: []})).toEqual({
        email: null, agency_id: 2, is_staff: false, specialties: [],
    })
})

test('file requests retain actual files and serialize structured fields', () => {
    const file = new File(['document'], 'document.pdf', {type: 'application/pdf'})
    const data = buildUserRequestData({professional_document: file, bio: null, specialties: ['فروش', 'اجاره'], is_active: true}) as FormData
    expect(data.get('professional_document')).toBe(file)
    expect(data.get('bio')).toBe('')
    expect(data.get('specialties')).toBe(JSON.stringify(['فروش', 'اجاره']))
    expect(data.get('is_active')).toBe('true')
})

test('agency requires both a name and an office address', () => {
    expect(isAgencyValid({agency_name: ' ', office_address: 'تهران'})).toBe(false)
    expect(isAgencyValid({agency_name: 'املاک', office_address: ''})).toBe(false)
    expect(isAgencyValid({agency_name: 'املاک', office_address: 'تهران'})).toBe(true)
})

test('ordinary user requests cannot inherit admin or agency fields from a previous form', () => {
    expect(buildUserRequestData({first_name: 'نام', is_superuser: true, agency_name: 'دفتر'}, 'user')).toEqual({first_name: 'نام'})
})

test('office verification is omitted from agency requests without superadmin permission', () => {
    expect(buildUserRequestData({office_verification_status: 'verified'}, 'agency', false)).toEqual({})
    expect(buildUserRequestData({office_verification_status: 'verified'}, 'agency', true)).toEqual({office_verification_status: 'verified'})
})
