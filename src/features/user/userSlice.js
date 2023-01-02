import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../../utils/firebaseAuth'

const initialState = {
    user: { email: null, uid: null },
    isLoadedUserState: false,
    // === getUser ===
    isLoadingUserGet: false,
    ErrorOfUserGet: null,
    // === Register ===
    isLoadingRegister: false,
    ErrorOfRegister: null,
    // === Login ===
    isLoadingLogin: false,
    ErrorOfLogin: null,
    // === Logout ===
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
                if (user) resolve(user)
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
export const Login = createAsyncThunk('user/login', async ({ email, password }) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        return { email: user.email, uid: user.uid }
    } catch (error) {
        throw error
    }
})

/**
 * 註冊
 * @param {Object} 註冊信箱、密碼
 * @returns {Promise} 成功返回 user 狀態；失敗返回錯誤原因
 */
export const Register = createAsyncThunk('user/register', async ({ email, password }) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        return { email: user.email, uid: user.uid }
    } catch (error) {
        throw error
    }
})

export const Logout = createAsyncThunk('user/logout', async () => {
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
                state.isLoadedUserState = true
                state.isLoadingUserGet = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoadingUserGet = false
                state.user = action.payload
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoadingUserGet = false
                state.ErrorOfUserGet = action.error
            })
        // === Register ===
        builder
            .addCase(Register.pending, (state, action) => {
                state.isLoadingRegister = true
            })
            .addCase(Register.fulfilled, (state, action) => {
                state.isLoadingRegister = false
                state.user = action.payload
            })
            .addCase(Register.rejected, (state, action) => {
                state.isLoadingRegister = false
                state.ErrorOfRegister = action.error
            })
        // === Login ===
        builder
            .addCase(Login.pending, (state, action) => {
                state.isLoadingLogin = true
            })
            .addCase(Login.fulfilled, (state, action) => {
                state.isLoadingLogin = false
                state.user = action.payload
            })
            .addCase(Login.rejected, (state, action) => {
                state.isLoadingLogin = false
                state.ErrorOfLogin = action.error
            })
        // === Logout ===
        builder
            .addCase(Logout.pending, (state, action) => {
                state.isLoadingLogout = true
            })
            .addCase(Logout.fulfilled, (state, action) => {
                state.isLoadingLogout = false
                state.user = action.payload
            })
            .addCase(Logout.rejected, (state, action) => {
                state.isLoadingLogout = false
                state.ErrorOfLogout = action.error
            })
    },
})

export default tasksSlice.reducer

/* =========== Actions Creator ========== */

export const {} = tasksSlice.actions
