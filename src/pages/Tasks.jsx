import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {
    getTasks,
    postTask,
    updateTask,
    setUpdateSelectTaskId,
    selectTaskById,
} from '../features/tasks/tasksSlice'

import styled from 'styled-components'
import HomeSidebar from '../components/Home/HomeSidebar/HomeSidebar.jsx'
import HomeTimeSum from '../components/Home/HomeTimeSum/HomeTimeSum.jsx'
import HomeAddTask from '../components/Home/HomeAddTask/HomeAddTask.jsx'
import HomeList from '../components/Home/HomeList/HomeList.jsx'
import HomeEditForm from '../components/Home/HomeEditForm/HomeEditForm.jsx'

const MainWrapper = styled.div`
    padding-top: 42px;
    display: flex;
`

const HomeSidebarWrapper = styled.div`
    flex: 0 1 240px;
    height: calc(100vh - 42px);
`

const ContentWrapper = styled.div`
    padding: 12px;
    flex: 1 1 auto;
    display: flex;
    background: #f7f7f7;
`

const HomeListWrapper = styled.div`
    height: 570px;
    overflow: scroll;
`

const HomeTasksWrapper = styled.div`
    flex: 1 1 auto;
`

const HomeEditFormWrapper = styled.div`
    flex: 0 1 320px;
    margin-left: 12px;
    > * {
        height: calc(100vh - 68px);
    }
`

function Tasks() {
    const selectUpdateTaskIdOfTasksStore = useSelector((state) => state.tasks.selectUpdateTaskId)
    // const selectUpdateTask = useSelector(selectTaskById)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTasks())
    }, [])

    // redux
    // 選中任務 id（同時決定面板開關）
    // 選中任務狀態存在組件內，更新時會 debounce 更新，若出現錯誤則顯示異常錯誤，並提供重新發送按鈕（當錯誤狀態結束不顯示此按鈕）
    // 自面板中刪除任務後清除選中任務
    // ! 可以自 list 中刪除任務，但是刪除任務若是與選中狀態相同則刪除選中任務，封裝在組件內
    // 狀態交互：（過往這些邏輯可以封裝載 pinia 內部）
    // - 若是選中的番茄鐘任務是完成的，不能開始
    // - 若是番茄鐘執行期間選中的番茄鐘任務被刪除，停止當前番茄鐘
    // - 若是執行期間選中的番茄鐘任務被勾選成完成狀態，停止當前番茄鐘
    // 選中番茄鐘任務後可以執行番茄鐘
    // 番茄鐘開始、結束

    return (
        <MainWrapper>
            <HomeSidebarWrapper>
                <HomeSidebar />
            </HomeSidebarWrapper>
            <ContentWrapper>
                <HomeTasksWrapper>
                    <HomeTimeSum></HomeTimeSum>
                    <HomeAddTask></HomeAddTask>
                    <HomeListWrapper>
                        <HomeList />
                    </HomeListWrapper>
                </HomeTasksWrapper>
                {!!selectUpdateTaskIdOfTasksStore && (
                    <HomeEditFormWrapper>
                        <HomeEditForm
                            key={selectUpdateTaskIdOfTasksStore}
                            onClose={() => {}}
                            onDeleteTask={() => {}}
                        />
                    </HomeEditFormWrapper>
                )}
            </ContentWrapper>
        </MainWrapper>
    )
}

export default Tasks
