import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";
import userSlice from "../features/user/userSlice";
import pomodoroSettingSlice from "../features/pomodoroSetting/pomodoroSettingSlice";
import pomodoroClockSlice from "../features/pomodoroClock/pomodoroClockSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    user: userSlice,
    pomodoroSetting: pomodoroSettingSlice,
    pomodoroClock: pomodoroClockSlice,
  },
});
