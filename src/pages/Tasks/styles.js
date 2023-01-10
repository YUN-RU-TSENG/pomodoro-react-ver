import styled from 'styled-components'

export const MainWrapper = styled.div`
    padding-top: 42px;
    display: flex;
`

export const HomeSidebarWrapper = styled.div`
    flex: 0 1 240px;
    height: calc(100vh - 42px);
`

export const ContentWrapper = styled.div`
    padding: 12px;
    flex: 1 1 auto;
    display: flex;
    background: #f7f7f7;
`

export const HomeListWrapper = styled.div`
    height: 570px;
    overflow: scroll;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
    }
`

export const HomeTasksWrapper = styled.div`
    flex: 1 1 auto;
`

export const HomeEditFormWrapper = styled.div`
    flex: 0 1 320px;
    margin-left: 12px;
    > * {
        height: calc(100vh - 68px);
    }
`
