import styled from 'styled-components'

export const Sidebar = styled.aside`
    display: flex;
    flex-direction: column;
    padding: 14px;
    height: 100%;
    box-shadow: 0px 0px 4px #ededed;
    background: #fff;
`

export const SidebarBody = styled.section`
    flex: 1 0 auto;
    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`

export const SidebarFooter = styled.section`
    flex: 0 1 auto;
`

export const SidebarItem = styled.a`
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    transition: all 0.3s ease-in;
    border-radius: 4px;
    background: ${(props) => props.isSelect && '#ededed'};

    &:hover {
        background: #efefef;
    }
`

export const Icon = styled.img`
    width: 16px;
    margin-right: 8px;
`

export const Text = styled.span`
    font-size: 14px;
    light-height: 21px;
    font-weight: 400;
`

export const Time = styled.span`
    font-size: 14px;
    light-height: 21px;
    margin-left: auto;
    font-weight: 300;
`

export const Quantity = styled.span`
    font-size: 14px;
    light-height: 21px;
    margin-left: 8px;
    font-weight: 300;
`

export const Line = styled.div`
    height: 1px;
    background: #ededed;
    margin: 8px 0px;
`
