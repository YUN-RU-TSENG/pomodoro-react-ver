import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tasks: [],
    isLoading: false,
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action) {},
        updateTask(state, action) {},
        deleteTask(state, action) {},
    },
})

export const { addTask, updateTask, deleteTask } = tasksSlice.actions

export function getTasks(dispatch, getState) {}

export function postTasks(dispatch, getState) {}

export function putTasks(dispatch, getState) {}

export function deleteTasks(dispatch, getState) {}

export default tasksSlice.reducer
