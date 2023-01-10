import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { db } from '../../utils/firebaseStore'
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore'
import dayjs from 'dayjs'
import showCommonModal from '../../components/Common/CommonModal'

const initialState = {
    folders: [],
    isLoadingFoldersGet: false,
    ErrorOfFoldersGet: null,
    isLoadingFoldersPost: false,
    ErrorOfFoldersPost: null,
}

/* =========== Thunk ========== */

/**
 * 取得 folders
 * @returns {Promise} 成功返回 folders 狀態；失敗返回錯誤原因
 */
export const getFolders = createAsyncThunk(
    'tasks/getFolders',
    async (_, { getState }) => {
        try {
            const { user: userStore } = getState()
            const folderRef = query(
                collection(db, 'folders'),
                where('uid', '==', userStore.user.uid)
            )
            const folderSnapshots = await getDocs(folderRef)
            const result = []

            folderSnapshots.forEach((folderSnapshot) => {
                result.push({
                    ...folderSnapshot.data(),
                    id: folderSnapshot.id,
                })
            })
            return result
        } catch (error) {
            throw error
        }
    }
)

/**
 * 新增 folder
 * @param {
 *  {
 *   "color":string,
 *   "name":string,number
 *  }
 * } 新增的 folder 狀態
 * @returns {Promise} 成功返回新增的 folder 狀態；失敗返回錯誤原因
 */
export const postFolder = createAsyncThunk(
    'tasks/postFolder',
    async (currentFolder, { getState }) => {
        try {
            const folderRef = collection(db, 'folders')
            const { user: userStore } = getState()

            const folderData = {
                ...currentFolder,
                uid: userStore.user.uid,
                createAt: dayjs().toISOString(),
            }

            // 需要添加上 folder uid
            const { id } = await addDoc(folderRef, folderData)

            return { id, ...folderData }
        } catch (error) {
            throw error
        }
    }
)

/* =========== Slice ========== */

export const foldersSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // === getFolders ===
            .addCase(getFolders.pending, (state) => {
                state.ErrorOfFoldersGet = null
                state.isLoadingFoldersGet = true
            })
            .addCase(getFolders.fulfilled, (state, action) => {
                state.isLoadingFoldersGet = false
                state.folders = action.payload
            })
            .addCase(getFolders.rejected, (state, action) => {
                state.isLoadingFoldersGet = false
                state.ErrorOfFoldersGet = action.error
                showCommonModal({
                    title: '意外錯誤',
                    children: action.error.message,
                })
            })
        builder
            // === postFolder ===
            .addCase(postFolder.pending, (state) => {
                state.ErrorOfFoldersPost = null
                state.isLoadingFoldersPost = true
            })
            .addCase(postFolder.fulfilled, (state, action) => {
                state.isLoadingFoldersPost = false
                state.folders.push(action.payload)
            })
            .addCase(postFolder.rejected, (state, action) => {
                state.isLoadingFoldersPost = false
                state.ErrorOfFoldersPost = action.error
                showCommonModal({
                    title: '意外錯誤',
                    children: action.error.message,
                })
            })
    },
})

export default foldersSlice.reducer

export const isFolderLoading = (state) => {
    const foldersStore = state.folders
    return foldersStore.isLoadingFoldersGet || foldersStore.isLoadingFoldersPost
}
