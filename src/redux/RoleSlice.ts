
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

export enum UserRole {
    SUPERADMIN = 'superadmin',
    USER = 'user',
}

interface RoleState {
    role: UserRole | null
}

const initialState: RoleState = {
    role: null,
}

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        setRole: (state, action: PayloadAction<UserRole>) => {
            state.role = action.payload
        },

        clearRole: (state) => {
            state.role = null
        },
    },
})

export const { setRole, clearRole } = roleSlice.actions

export const selectRole = (state: RootState): UserRole | null =>
    state.role.role

export const selectIsSuperAdmin = (state: RootState): boolean =>
    state.role.role === UserRole.SUPERADMIN

export const selectIsUser = (state: RootState): boolean =>
    state.role.role === UserRole.USER

export default roleSlice.reducer
