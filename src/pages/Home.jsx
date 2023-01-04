import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getAndInitialPomodoroSetting } from '../features/pomodoroSetting/pomodoroSettingSlice'

import styled from 'styled-components'

import CommonModal from '../components/Common/CommonModal/CommonModal.jsx'
import CommonNavbar from '../components/Common/CommonNavbar/CommonNavbar.jsx'
import CommonLoading from '../components/Common/CommonLoading/CommonLoading.jsx'
import { Outlet } from 'react-router-dom'

const CommonNavbarWrapper = styled.div`
    position: fixed;
    width: 100%;
`

const MainWrapper = styled.div``

function Home() {
    const pomodoroSettingStore = useSelector((state) => state.pomodoroSetting)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAndInitialPomodoroSetting())
    }, [])

    if (!pomodoroSettingStore.isLoadedPomodoroSettingGet) {
        return (
            <div>
                <CommonNavbarWrapper>
                    <CommonNavbar />
                </CommonNavbarWrapper>
                <MainWrapper></MainWrapper>
                <CommonLoading text="加載用戶配置..." />
            </div>
        )
    }

    if (pomodoroSettingStore.ErrorOfPomodoroSettingGet) {
        return (
            <div>
                <CommonNavbarWrapper>
                    <CommonNavbar />
                </CommonNavbarWrapper>
                <MainWrapper></MainWrapper>
                <CommonModal onClick={() => {}} title="意外錯誤">
                    <p> {pomodoroSettingStore.ErrorOfPomodoroSettingGet.message}</p>
                </CommonModal>
            </div>
        )
    }

    return (
        <div>
            <CommonNavbarWrapper>
                <CommonNavbar />
            </CommonNavbarWrapper>
            <MainWrapper>
                {/* Outlet */}
                <Outlet />
                {/* Outlet */}
            </MainWrapper>
        </div>
    )
}

export default Home
