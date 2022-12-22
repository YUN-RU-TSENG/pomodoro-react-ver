import { Outlet } from 'react-router-dom'
import CommonNavbar from '../components/Common/CommonNavbar.jsx'
import HomeSidebar from '../components/Home/HomeSidebar.jsx'
import HomeTimeSum from '../components/Home/HomeTimeSum.jsx'
import HomeAddTask from '../components/Home/HomeAddTask.jsx'
import HomeList from '../components/Home/HomeList.jsx'
import HomeEditForm from '../components/Home/HomeEditForm.jsx'
import styled from 'styled-components'

const CommonNavbarWrapper = styled.div`
    position: fixed;
    width: 100%;
`

const MainWrapper = styled.div`
    padding-top: 54px;
    display: flex;
`

const HomeSidebarWrapper = styled.div`
    flex: 0 1 240px;
    height: calc(100vh - 54px);
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
    flex: 0 1 30%;
    // display: none;
    margin-left: 24px;
    > * {
        height: calc(100vh - 80px);
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
            {/* <Outlet /> */}
        </div>
    )
}

export default Home
