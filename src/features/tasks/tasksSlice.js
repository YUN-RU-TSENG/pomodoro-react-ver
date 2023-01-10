import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { db } from '../../utils/firebaseStore'
import {
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
import showCommonModal from '../../components/Common/CommonModal'

const initialState = {
    selectUpdateTaskId: null,
    tasks: [],
    filterTask: 'all',
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
export const getTasks = createAsyncThunk(
    'tasks/getTasks',
    async (_, { getState }) => {
        try {
            const { user: userStore } = getState()
            const taskRef = query(
                collection(db, 'tasks'),
                where('uid', '==', userStore.user.uid)
            )
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
    }
)

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
export const postTask = createAsyncThunk(
    'tasks/postTask',
    async (currentTask, { getState }) => {
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
                mentionDate: '',
                uid: userStore.user.uid,
            }

            // 需要添加上用戶 uid
            const { id } = await addDoc(taskRef, taskData)

            return { id, ...taskData }
        } catch (error) {
            throw error
        }
    }
)

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
export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async (currentTask) => {
        try {
            const { id, ...task } = currentTask
            const currentEditTaskReference = doc(db, 'tasks', currentTask.id)
            // 添加上用戶 uid、移除 id
            await updateDoc(currentEditTaskReference, task)
            return { id, currentTask }
        } catch (error) {
            throw error
        }
    }
)

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
        setFilterTask(state, action) {
            state.filterTask = action.payload
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
                showCommonModal({
                    title: '意外錯誤',
                    children: action.error.message,
                })
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
                showCommonModal({
                    title: '意外錯誤',
                    children: action.error.message,
                })
            })
        builder
            // === updateTasks ===
            .addCase(updateTask.pending, (state, action) => {
                state.ErrorOfTaskUpdate = null
                state.isLoadingTaskUpdate = true
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.isLoadingTaskUpdate = false
                const index = state.tasks.findIndex(
                    (item) => item.id === action.payload.id
                )
                state.tasks[index] = action.payload.currentTask
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.isLoadingTaskUpdate = false
                state.ErrorOfTaskUpdate = action.error
                showCommonModal({
                    title: '意外錯誤',
                    children: action.error.message,
                })
            })
        builder
            // === deleteTasks ===
            .addCase(deleteTask.pending, (state, action) => {
                state.ErrorOfTaskDelete = null
                state.isLoadingTaskDelete = true
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.isLoadingTaskDelete = false
                const index = state.tasks.findIndex(
                    (item) => item.id === action.payload
                )
                state.tasks.splice(index, 1)
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.isLoadingTaskDelete = false
                state.ErrorOfTaskDelete = action.error
                showCommonModal({
                    title: '意外錯誤',
                    children: action.error.message,
                })
            })
    },
})

export default tasksSlice.reducer

export const { setUpdateSelectTaskId } = tasksSlice.actions

/* =========== Getter ========== */

export const selectTaskById = (state) => {
    return state.tasks.tasks.filter(
        (task) => task.id === state.tasks.selectUpdateTaskId
    )[0]
}

export const isTaskLoading = (state) => {
    const taskStore = state.tasks
    return (
        taskStore.isLoadingTaskGet ||
        taskStore.isLoadingTaskPost ||
        taskStore.isLoadingTaskUpdate ||
        taskStore.isLoadingTaskDelete
    )
}

export const filterTask = (state) => {
    const taskStore = state.tasks
    if (taskStore.filterTask === 'taskOfToday') {
        return taskStore.tasks.filter((task) => {
            if (task.expectEndDate)
                return dayjs(task.expectEndDate).isSame(dayjs(), 'day')
        })
    }
    if (taskStore.filterTask === 'taskOfFuture') {
        return taskStore.tasks.filter((task) => {
            if (task.expectEndDate)
                return dayjs(task.expectEndDate).isAfter(dayjs(), 'day')
        })
    }
    if (taskStore.filterTask === 'taskOfNoExpectTime') {
        return taskStore.tasks.filter((task) => {
            return !task.expectEndDate
        })
    }
    if (taskStore.filterTask === 'taskOfFinish') {
        return taskStore.tasks.filter((task) => {
            return task.isFinish
        })
    }
    if (taskStore.filterTask === 'all') {
        return taskStore.tasks
    }
}
