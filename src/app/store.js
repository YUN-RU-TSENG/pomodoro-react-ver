import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '../features/tasks/tasksSlice'
import userReducer from '../features/user/userSlice'
import pomodoroSettingReducer from '../features/pomodoroSetting/pomodoroSettingSlice'
import pomodoroClockReducer from '../features/pomodoroClock/pomodoroClockSlice'
import foldersReducer from '../features/folder/foldersSlice'

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        user: userReducer,
        pomodoroSetting: pomodoroSettingReducer,
        pomodoroClock: pomodoroClockReducer,
        folders: foldersReducer,
    },
})
