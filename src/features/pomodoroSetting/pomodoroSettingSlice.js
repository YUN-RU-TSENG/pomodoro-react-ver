import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { db } from '../../utils/firebaseStore'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const initialState = {
    pomodoroSetting: {},
    isLoadedPomodoroSettingGet: false,
    isLoadingPomodoroSettingGet: false,
    ErrorOfPomodoroSettingGet: null,
    isLoadingPomodoroSettingUpdate: false,
    ErrorOfPomodoroSettingUpdate: null,
}

/* =========== Thunk ========== */

/**
 * 取得 PomodoroSetting（當沒有資料時自動初始化）
 * @returns {Promise} 成功返回 PomodoroSetting 狀態；失敗返回錯誤原因
 */
export const getAndInitialPomodoroSetting = createAsyncThunk(
    'pomodoroSetting/getPomodoroSetting',
    async (_, { getState }) => {
        try {
            const { user: userStore } = getState()
            const docRef = doc(db, 'pomodoroSetting', userStore.user.uid)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) return docSnap.data()

            const initPomodoroSetting = {
                pomodoro: 45 * 60, // pomodoro 時長(秒)
                breakTime: 5 * 60, // breakTime 時長(秒)
                longBreakTime: 15 * 60, // longBreakTime 時長(秒)
                longBreakInterval: 4, // longBreakTime 間隔回數
                uid: userStore.user.uid,
                autoContinue: false, // 是否自動繼續 Pomodoro
            }

            await setDoc(
                doc(db, 'pomodoroSetting', userStore.user.uid),
                initPomodoroSetting
            )

            return initPomodoroSetting
        } catch (error) {
            throw error
        }
    }
)

/**
 * 更新 PomodoroSetting
 * @param {
 * {
 *   pomodoro: number,
 *   breakTime:number,
 *   longBreakTime:number,
 *   longBreakInterval:number,
 *   uid:string,
 *   autoContinue:boolean
 * }} 更新的設定資料
 * @returns {Promise} 成功返回 PomodoroSetting 狀態；失敗返回錯誤原因
 */
export const updatePomodoroSetting = createAsyncThunk(
    'pomodoroSetting/updatePomodoroSetting',
    async (currentSetting, { getState }) => {
        try {
            const { user: userStore } = getState()
            await setDoc(
                doc(db, 'pomodoroSettings', userStore.user.uid),
                currentSetting
            )
            return currentSetting
        } catch (error) {
            throw error
        }
    }
)

/* =========== Slice ========== */

export const pomodoroSettingSlice = createSlice({
    name: 'pomodoroSetting',
    initialState,
    reducers: {
        resetPomodoroSetting() {
            return initialState
        },
    },
    extraReducers(builder) {
        builder
            // === getAndInitialPomodoroSetting ===
            .addCase(getAndInitialPomodoroSetting.pending, (state) => {
                state.ErrorOfPomodoroSettingGet = null
                state.isLoadingPomodoroSettingGet = true
            })
            .addCase(
                getAndInitialPomodoroSetting.fulfilled,
                (state, action) => {
                    state.isLoadedPomodoroSettingGet = true
                    state.isLoadingPomodoroSettingGet = false
                    state.pomodoroSetting = action.payload
                }
            )
            .addCase(getAndInitialPomodoroSetting.rejected, (state, action) => {
                state.isLoadedPomodoroSettingGet = true
                state.isLoadingPomodoroSettingGet = false
                state.ErrorOfPomodoroSettingGet = action.error
            })
        builder
            // === updatePomodoroSetting ===
            .addCase(updatePomodoroSetting.pending, (state) => {
                state.ErrorOfPomodoroSettingUpdate = null
                state.isLoadingPomodoroSettingUpdate = true
            })
            .addCase(updatePomodoroSetting.fulfilled, (state, action) => {
                state.isLoadingPomodoroSettingUpdate = false
                state.pomodoroSetting = action.payload
            })
            .addCase(updatePomodoroSetting.rejected, (state, action) => {
                state.isLoadingPomodoroSettingUpdate = false
                state.ErrorOfPomodoroSettingUpdate = action.error
            })
    },
})

export default pomodoroSettingSlice.reducer

export const { resetPomodoroSetting } = pomodoroSettingSlice.actions
