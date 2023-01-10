import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
import { auth } from '../../utils/firebaseAuth'
import showCommonModal from '../../components/Common/CommonModal'

const initialState = {
    user: { email: null, uid: null },
    isLoadedUserState: false,
    // === getUser ===
    isLoadingUserGet: false,
    ErrorOfUserGet: null,
    // === Register ===
    isLoadingRegister: false,
    ErrorOfRegister: null,
    // === login ===
    isLoadingLogin: false,
    ErrorOfLogin: null,
    // === logout ===
    isLoadingLogout: false,
    ErrorOfLogout: null,
}

/* =========== Thunk ========== */

/**
 * 取得用 user 狀態（已登入後即使刷新頁面也可 user 取得狀態）firebase v9 預設是登入後沒有登出會持久保留登入狀態
 * @param {Object} 登入信箱、密碼
 * @returns {Promise} 成功返回 user 狀態；失敗返回錯誤原因
 */
export const getUser = createAsyncThunk('user/getUser', () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(
            (user) => {
                unsubscribe()
                if (user) resolve({ email: user.email, uid: user.uid })
                resolve({ email: null, uid: null })
            },
            (error) => {
                unsubscribe()
                reject(error)
            }
        )
    })
})

/**
 * 登入
 * @param {Object} 登入信箱、密碼
 * @returns {Promise} 成功返回 user 狀態；失敗返回錯誤原因
 */
export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }) => {
        try {
            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
            return { email: user.email, uid: user.uid }
        } catch (error) {
            throw error
        }
    }
)

/**
 * 註冊
 * @param {Object} 註冊信箱、密碼
 * @returns {Promise} 成功返回 user 狀態；失敗返回錯誤原因
 */
export const register = createAsyncThunk(
    'user/register',
    async ({ email, password }) => {
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            return { email: user.email, uid: user.uid }
        } catch (error) {
            throw error
        }
    }
)

export const logout = createAsyncThunk('user/logout', async () => {
    try {
        await signOut(auth)
        return { email: null, uid: null }
    } catch (error) {
        throw error
    }
})

/* =========== Slice ========== */

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // === getUser ===
            .addCase(getUser.pending, (state, action) => {
                state.isLoadingUserGet = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoadingUserGet = false
                state.user = action.payload
                state.isLoadedUserState = true
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoadingUserGet = false
                state.ErrorOfUserGet = action.error
                state.isLoadedUserState = true
                showCommonModal({
                    title: '意外錯誤',
                    children: action.error.message,
                })
            })
        // === Register ===
        builder
            .addCase(register.pending, (state, action) => {
                state.ErrorOfRegister = null
                state.isLoadingRegister = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoadingRegister = false
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoadingRegister = false
                state.ErrorOfRegister = action.error
                showCommonModal({
                    title: '意外錯誤',
                    children: action.error.message,
                })
            })
        // === login ===
        builder
            .addCase(login.pending, (state, action) => {
                state.ErrorOfLogin = null
                state.isLoadingLogin = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoadingLogin = false
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoadingLogin = false
                state.ErrorOfLogin = action.error
                showCommonModal({
                    title: '意外錯誤',
                    children: action.error.message,
                })
            })
        // === logout ===
        builder
            .addCase(logout.pending, (state, action) => {
                state.isLoadingLogout = true
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoadingLogout = false
                state.user = action.payload
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoadingLogout = false
                state.ErrorOfLogout = action.error
                showCommonModal({
                    title: '意外錯誤',
                    children: action.error.message,
                })
            })
    },
})

export default tasksSlice.reducer

/* =========== Actions Creator ========== */

// export const {} = tasksSlice.actions
