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
    selectUpdateTaskId: null,
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
export const postTask = createAsyncThunk('tasks/postTask', async (currentTask, { getState }) => {
    try {
        const taskRef = collection(db, 'tasks')
        const { user: userStore } = getState()

        // 由表單傳來的資料需要補上其餘預設狀態後再添加至 firebase NoSQL
        const taskData = {
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
        }

        // 需要添加上用戶 uid
        const { id } = await addDoc(taskRef, taskData)

        return { id, ...taskData }
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
export const updateTask = createAsyncThunk('tasks/updateTask', async (currentTask) => {
    try {
        const { id, ...task } = currentTask
        const currentEditTaskReference = doc(db, 'tasks', currentTask.id)
        // 添加上用戶 uid、移除 id
        console.log(task.mentionDate, 'task.mentionDate')
        await updateDoc(currentEditTaskReference, task)
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
        // addTask(state, action) {
        //     state.tasks.push(action.payload)
        // },
        // updateTask(state, action) {
        //     const index = state.tasks.findIndex((item) => item.id === action.payload.id)
        //     state.tasks.slice(index, 1, action.payload.currentTask)
        // },
        // deleteTask(state, action) {
        //     const index = state.tasks.findIndex((item) => item.id === action.payload)
        //     state.tasks.slice(index, 1)
        // },
        /**
         * 更改 updateSelectTaskId
         * @param {Object} state - task store
         * @param {
         *   payload: string|null
         * } action
         * @returns {Promise} 成功返回新增的 task 狀態；失敗返回錯誤原因
         */
        setUpdateSelectTaskId(state, action) {
            state.selectUpdateTaskId = action.payload
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
                state.ErrorOfTaskPost = null
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
                state.ErrorOfTaskUpdate = null
                state.isLoadingTaskUpdate = true
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.isLoadingTaskUpdate = false
                const index = state.tasks.findIndex((item) => item.id === action.payload.id)
                state.tasks[index] = action.payload.currentTask
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.isLoadingTaskUpdate = false
                state.ErrorOfTaskUpdate = action.error
            })
        builder
            // === deleteTasks ===
            .addCase(deleteTask.pending, (state, action) => {
                state.ErrorOfTaskDelete = null
                state.isLoadingTaskDelete = true
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.isLoadingTaskDelete = false
                const index = state.tasks.findIndex((item) => item.id === action.payload)
                state.tasks.splice(index, 1)
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.isLoadingTaskDelete = false
                state.ErrorOfTaskDelete = action.error
            })
    },
})

export default tasksSlice.reducer

export const { setUpdateSelectTaskId } = tasksSlice.actions

/* =========== Getter ========== */

export const selectTaskById = (state) => {
    return state.tasks.tasks.filter((task) => task.id === state.tasks.selectUpdateTaskId)[0]
}
