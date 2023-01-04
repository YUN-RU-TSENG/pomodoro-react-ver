import { Outlet } from 'react-router-dom'
import CommonNavbar from '../components/Common/CommonNavbar/CommonNavbar.jsx'
import styled from 'styled-components'

const CommonNavbarWrapper = styled.div`
    position: fixed;
    width: 100%;
`

const MainWrapper = styled.div``

function Home() {
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
