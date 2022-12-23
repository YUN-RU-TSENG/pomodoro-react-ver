import { Outlet } from 'react-router-dom'
import CommonNavbar from '../components/Common/CommonNavbar/CommonNavbar.jsx'
import CommonAlert from '../components/Common/CommonAlert/CommonAlert.jsx'
import HomeSidebar from '../components/Home/HomeSidebar/HomeSidebar.jsx'
import HomeTimeSum from '../components/Home/HomeTimeSum/HomeTimeSum.jsx'
import HomeAddTask from '../components/Home/HomeAddTask/HomeAddTask.jsx'
import HomeList from '../components/Home/HomeList/HomeList.jsx'
import HomeEditForm from '../components/Home/HomeEditForm/HomeEditForm.jsx'
import styled from 'styled-components'

const CommonNavbarWrapper = styled.div`
    position: fixed;
    width: 100%;
`

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
const HomeTasksWrapper = styled.div`
    flex: 1 1 auto;
`
const HomeEditFormWrapper = styled.div`
    flex: 0 1 320px;
    // display: none;
    margin-left: 24px;
    > * {
        height: calc(100vh - 68px);
    }
`

function Home() {
    return (
        <div>
            <CommonNavbarWrapper>
                <CommonNavbar />
            </CommonNavbarWrapper>
            <MainWrapper>
                <HomeSidebarWrapper>
                    <HomeSidebar />
                </HomeSidebarWrapper>
                <ContentWrapper>
                    <HomeTasksWrapper>
                        <HomeTimeSum></HomeTimeSum>
                        <HomeAddTask></HomeAddTask>
                        <HomeList></HomeList>
                    </HomeTasksWrapper>
                    <HomeEditFormWrapper>
                        <HomeEditForm></HomeEditForm>
                    </HomeEditFormWrapper>
                </ContentWrapper>
            </MainWrapper>
            <CommonAlert></CommonAlert>
            {/* <Outlet /> */}
        </div>
    )
}

export default Home
