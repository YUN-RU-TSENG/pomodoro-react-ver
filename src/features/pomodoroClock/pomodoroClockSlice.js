import { createSlice } from '@reduxjs/toolkit'
import { updateTask } from '../tasks/tasksSlice'
import dayjs from 'dayjs'

const initialState = {
    selectCountdownTaskId: null,
    isPomodoroOpen: false,
    timer: {
        mode: 'pomodoro',
        isStart: false,
        countDownTime: null,
        settimeoutId: null,
        currentInterval: 0,
    },
    pomodoroSetting: {},
}

/* =========== Slice ========== */

export const pomodoroClockSlice = createSlice({
    name: 'pomodoroClock',
    initialState,
    reducers: {
        setSelectTaskId(state, action) {
            state.selectCountdownTaskId = action.payload
        },
        setIsPomodoroOpen(state, action) {
            state.isPomodoroOpen = action.payload
        },
        setSettimeoutIdOfTimer(state, action) {
            state.timer.settimeoutId = action.payload
        },
        setPomodoroSetting(state, action) {
            state.pomodoroSetting = action.payload
            state.timer.countDownTime = action.payload.pomodoro
        },
        setCountdownTimeOfTimer(state, action) {
            state.timer.countDownTime = action.payload
        },
        setTimer(state, action) {
            state.timer = action.payload
        },
        setIsStartOfTimer(state, action) {
            state.timer.isStart = action.payload
        },
    },
})

export default pomodoroClockSlice.reducer

export const {
    setSelectTaskId,
    setSettimeoutIdOfTimer,
    setPomodoroSetting,
    setCountdownTimeOfTimer,
    setTimer,
    setIsStartOfTimer,
    setIsPomodoroOpen,
} = pomodoroClockSlice.actions

/**
 * 啟動番茄鐘
 */
export function setupPomodoroClock(selectCountdownTaskId) {
    return (dispatch, getState) => {
        try {
            // 若是沒有用戶資料跳出不執行
            const pomodoroSetting = filterGetStateByFunction(
                (state) => state.pomodoroSetting.pomodoroSetting,
                getState
            )

            if (!pomodoroSetting.pomodoro)
                throw Error('缺少 user pomodoroSetting')

            // 若是有之前在計算的番茄鐘，清除之前的番茄鐘
            const timer = filterGetStateByFunction(
                (state) => state.pomodoroClock.timer,
                getState
            )
            if (timer.settimeoutId) dispatch(breakCountdown())

            // 依照用戶設置啟動番茄鐘
            dispatch(setSelectTaskId(selectCountdownTaskId))
            dispatch(setPomodoroSetting(pomodoroSetting))
            dispatch(setIsPomodoroOpen(true))
            dispatch(setCountdownTimeOfTimer(pomodoroSetting.pomodoro))
            dispatch(startCountdown())
        } catch (error) {
            throw error
        }
    }
}

/**
 * 開始番茄鐘計時
 * @param {function} dispatch
 * @param {function} getState
 */
export function startCountdown() {
    return (dispatch, getState) => {
        try {
            dispatch(setIsStartOfTimer(true))

            const countDownTimeOfTimer = filterGetStateByFunction(
                (state) => state.pomodoroClock.timer.countDownTime,
                getState
            )
            const countDownDate = dayjs().add(countDownTimeOfTimer, 'second')

            const id = setInterval(countDown, 800)

            dispatch(setSettimeoutIdOfTimer(id))

            function countDown() {
                // 設置當前倒數剩餘時間

                const newCountdown = countDownDate.diff(dayjs(), 'second')
                dispatch(setCountdownTimeOfTimer(newCountdown))

                const timer = filterGetStateByFunction(
                    (state) => state.pomodoroClock.timer,
                    getState
                )
                const pomodoroSetting = filterGetStateByFunction(
                    (state) => state.pomodoroClock.pomodoroSetting,
                    getState
                )
                const selectCountdownTaskId = filterGetStateByFunction(
                    (state) => state.pomodoroClock.selectCountdownTaskId,
                    getState
                )

                const task = filterGetStateByFunction((state) => {
                    return state.tasks.tasks.filter(
                        (task) => task.id === selectCountdownTaskId
                    )[0]
                }, getState)

                // --未倒數完成--
                // 不執行下方程式碼
                if (newCountdown > 0) return

                // --倒數完成--
                // 清除當前倒數
                clearInterval(id)
                setSettimeoutIdOfTimer(null)

                // 更新下次計時模式
                if (timer.mode === 'pomodoro') {
                    // 更新下次計時模式，如果下回和是是長休息回合則切換長休息
                    const isNextLongBreakInterval =
                        timer.currentInterval +
                            (1 % pomodoroSetting.longBreakInterval) ===
                        0

                    if (isNextLongBreakInterval) {
                        dispatch(
                            setTimer({
                                ...timer,
                                countDownTime: pomodoroSetting.longBreakTime,
                                mode: 'longBreakTime',
                                currentInterval: timer.currentInterval + 1,
                            })
                        )
                    } else {
                        dispatch(
                            setTimer({
                                ...timer,
                                mode: 'breakTime',
                                countDownTime: pomodoroSetting.breakTime,
                                currentInterval: timer.currentInterval + 1,
                            })
                        )
                    }

                    // 更新用戶番茄任務時間

                    dispatch(
                        updateTask({
                            ...task,
                            totalExpectTime:
                                task.totalExpectTime + pomodoroSetting.pomodoro,
                        })
                    )
                } else if (timer.mode === 'breakTime') {
                    // 更新下次計時模式
                    dispatch(
                        setTimer({
                            ...timer,
                            mode: 'pomodoro',
                            currentInterval: timer.currentInterval + 1,
                            countDownTime: pomodoroSetting.pomodoro,
                        })
                    )
                } else if (timer.mode === 'longBreakTime') {
                    // 更新下次計時模式
                    dispatch(
                        setTimer({
                            ...timer,
                            mode: 'pomodoro',
                            currentInterval: timer.currentInterval + 1,
                            countDownTime: pomodoroSetting.pomodoro,
                        })
                    )
                }

                if (pomodoroSetting.autoContinue) startCountdown()
            }
        } catch (error) {
            throw error
        }
    }
}

/**
 * 暫停番茄鐘（結束啟動的番茄鐘）
 * @param {function} dispatch
 */
export function stopCountdown() {
    return (dispatch, getState) => {
        const settimeoutId = filterGetStateByFunction(
            (state) => state.pomodoroClock.timer.settimeoutId,
            getState
        )
        clearInterval(settimeoutId)
        dispatch(setIsStartOfTimer(false))
    }
}

/**
 * 結束番茄鐘（結束啟動的番茄鐘）
 * @param {function} dispatch
 */
export function breakCountdown() {
    return (dispatch, getState) => {
        const settimeoutId = filterGetStateByFunction(
            (state) => state.pomodoroClock.timer.settimeoutId,
            getState
        )
        clearInterval(settimeoutId)
        dispatch(setIsStartOfTimer(false))
        dispatch(
            setTimer({
                mode: 'pomodoro',
                isStart: false,
                countDownTime: null,
                settimeoutId: null,
                currentInterval: 0,
            })
        )
        dispatch(setSelectTaskId(null))
    }
}

function filterGetStateByFunction(callback, getState) {
    const store = getState()
    return callback(store)
}
