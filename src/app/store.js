import { configureStore, combineReducers } from '@reduxjs/toolkit'
import tasksReducer from '../features/tasks/tasksSlice'
import userReducer from '../features/user/userSlice'
import pomodoroSettingReducer from '../features/pomodoroSetting/pomodoroSettingSlice'
import pomodoroClockReducer from '../features/pomodoroClock/pomodoroClockSlice'
import foldersReducer from '../features/folder/foldersSlice'

const appReducer = combineReducers({
    tasks: tasksReducer,
    user: userReducer,
    pomodoroSetting: pomodoroSettingReducer,
    pomodoroClock: pomodoroClockReducer,
    folders: foldersReducer,
})

const reducerProxy = (state, action) => {
    if (action.type === 'user/logout/fulfilled') {
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}

export const store = configureStore({
    reducer: reducerProxy,
})
