import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { db } from '../../utils/firebaseStore'
import {
    orderBy,
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    query,
    doc,
    where,
} from 'firebase/firestore'
import dayjs from 'dayjs'

const initialState = {
    tasks: [],
    isLoadingTaskGet: false,
    ErrorOfTaskGet: null,
    isLoadingTaskPost: false,
    ErrorOfTaskPost: null,
    isLoadingTaskUpdate: false,
    ErrorOfTaskUpdate: null,
    isLoadingTaskDelete: false,
    ErrorOfTaskDelete: null,
}

/* =========== Thunk ========== */

/**
 * 取得 tasks
 * @returns {Promise} 成功返回 tasks 狀態；失敗返回錯誤原因
 */
export const getTasks = createAsyncThunk('tasks/getTasks', async (_, { getState }) => {
    try {
        const { user: userStore } = getState()
        const taskRef = query(collection(db, 'tasks'), where('uid', '==', userStore.user.uid))
        const taskSnapshots = await getDocs(taskRef)
        const result = []

        taskSnapshots.forEach((taskSnapshot) => {
            result.push({
                ...taskSnapshot.data(),
                id: taskSnapshot.id,
            })
        })

        return result
    } catch (error) {
        throw error
    }
})

/**
 * 新增 task
 * @param {
 * {
 *   "folder":string,
 *   "name":string,number
 *   "expectEndDate":string(utc-time)}
 * } 新增的 task 狀態
 * @returns {Promise} 成功返回新增的 task 狀態；失敗返回錯誤原因
 */
export const postTask = createAsyncThunk('tasks/postTasks', async (currentTask, { getState }) => {
    try {
        const taskRef = collection(db, 'tasks')
        const { user: userStore } = getState()
        // 需要添加上用戶 uid
        const { id } = await addDoc(taskRef, {
            ...currentTask,
            totalSpendTime: 0,
            isFinish: false,
            description: '',
            subtasks: [],
            createAt: dayjs().toISOString(),
            finishAt: '',
            tags: [],
            expectEndDate: dayjs().toISOString(),
            mentionDate: null,
            uid: userStore.user.uid,
        })
        return { id, ...currentTask }
    } catch (error) {
        throw error
    }
})

/**
 * 更新 task
 * @param {number} 更新 task id
 * @param {
 * {
 *   "isFinish":boolean,
 *   "description":string,
 *   "totalSpendTime":number,
 *   "uid":string,
 *   "id":string,
 *   "folder":string,
 *   "subtasks":array,
 *   "totalExpectTime":number,
 *   "createAt":string(utc-time),
 *   "finishAt":string(utc-time),
 *   "name":string,number
 *   "tags":array,
 *   "expectEndDate":string(utc-time),
 *   "mentionDate":null}
 * } 更新的 task 狀態
 * @returns {Promise} 成功返回更新的 task id；失敗返回錯誤原因
 */
export const updateTask = createAsyncThunk('tasks/updateTasks', async (id, currentTask) => {
    try {
        const currentEditTaskId = doc(db, 'tasks', id)
        // 添加上用戶 uid、移除 id
        const { id: currentId, ...task } = currentTask
        await updateDoc(currentEditTaskId, task)
        return { id, currentTask }
    } catch (error) {
        throw error
    }
})

/**
 * 刪除 tasks
 * @param {number} 刪除 task id
 * @returns {Promise} 成功返回刪除 task id；失敗返回錯誤原因
 */
export const deleteTask = createAsyncThunk('tasks/deleteTasks', async (id) => {
    try {
        const currentDocumentReference = doc(db, 'tasks', id)
        await deleteDoc(currentDocumentReference)
        return id
    } catch (error) {
        throw error
    }
})

/* =========== Slice ========== */

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action) {
            state.tasks.push(action.payload)
        },
        updateTask(state, action) {
            const index = state.tasks.findIndex((item) => item.id === action.payload.id)
            state.tasks.slice(index, 1, action.payload.currentTask)
        },
        deleteTask(state, action) {
            const index = state.tasks.findIndex((item) => item.id === action.payload)
            state.tasks.slice(index, 1)
        },
    },
    extraReducers(builder) {
        builder
            // === getTasks ===
            .addCase(getTasks.pending, (state, action) => {
                state.ErrorOfTaskGet = null
                state.isLoadingTaskGet = true
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.isLoadingTaskGet = false
                state.tasks = action.payload
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.isLoadingTaskGet = false
                state.ErrorOfTaskGet = action.error
            })
        builder
            // === postTasks ===
            .addCase(postTask.pending, (state, action) => {
                state.isLoadingTaskPost = true
            })
            .addCase(postTask.fulfilled, (state, action) => {
                state.isLoadingTaskPost = false
                state.tasks.push(action.payload)
            })
            .addCase(postTask.rejected, (state, action) => {
                state.isLoadingTaskPost = false
                state.ErrorOfTaskPost = action.error
            })
        builder
            // === updateTasks ===
            .addCase(updateTask.pending, (state, action) => {
                state.isLoadingTaskUpdate = true
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.isLoadingTaskUpdate = false
                const index = state.tasks.findIndex((item) => item.id === action.payload.id)
                state.tasks.slice(index, 1, action.payload.currentTask)
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.isLoadingTaskUpdate = false
                state.ErrorOfTaskUpdate = action.error
            })
        builder
            // === deleteTasks ===
            .addCase(deleteTask.pending, (state, action) => {
                state.isLoadingTaskDelete = true
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.isLoadingTaskDelete = false
                const index = state.tasks.findIndex((item) => item.id === action.payload)
                state.tasks.slice(index, 1)
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.isLoadingTaskDelete = false
                state.ErrorOfTaskDelete = action.error
            })
    },
})

export default tasksSlice.reducer

// export const { addTask, updateTask, deleteTask } = tasksSlice.actions
