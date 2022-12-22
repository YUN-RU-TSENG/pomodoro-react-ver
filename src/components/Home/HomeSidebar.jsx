import styled from 'styled-components'
import sunIcon from '../../assets/images/sun.png'
import sunsetIcon from '../../assets/images/external-sunset-3.png'
import calenderNotYetIcon from '../../assets/images/calendar--v1-1.png'
import calenderFinishIcon from '../../assets/images/calendar--v1-2.png'
import checkedIcon from '../../assets/images/checked.png'
import folderIcon from '../../assets/images/folder-invoices--v1.png'
import addIcon from '../../assets/images/add--v1-1.png'

const Sidebar = styled.aside`
    display: flex;
    flex-direction: column;
    padding: 14px;
    height: 100%;
    box-shadow: 0px 0px 4px #ededed;
    background: #fff;
`

const SidebarBody = styled.section`
    flex: 1 0 auto;
    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`

const SidebarFooter = styled.section`
    flex: 0 1 auto;
`

const SidebarItem = styled.a`
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    transition: all 0.3s ease-in;
    border-radius: 4px;
    &:hover {
        background: #ededed;
    }
`

const Icon = styled.img`
    width: 16px;
    margin-right: 8px;
`

const Text = styled.span`
    font-size: 14px;
    light-height: 21px;
    font-weight: 400;
`

const Time = styled.span`
    font-size: 14px;
    light-height: 21px;
    margin-left: auto;
    font-weight: 300;
`

const Quantity = styled.span`
    font-size: 14px;
    light-height: 21px;
    margin-left: 8px;
    font-weight: 300;
`

const Line = styled.div`
    height: 1px;
    background: #ededed;
    margin: 8px 0px;
`

function HomeSidebar() {
    return (
        <Sidebar>
            <SidebarBody>
                {' '}
                <SidebarItem>
                    <Icon src={sunIcon}></Icon>
                    <Text>文字</Text>
                    <Time>4h</Time>
                    <Quantity>5</Quantity>
                </SidebarItem>
                <SidebarItem>
                    <Icon src={sunsetIcon}></Icon>
                    <Text>文字</Text>
                    <Time>4h</Time>
                    <Quantity>5</Quantity>
                </SidebarItem>
                <SidebarItem>
                    <Icon src={calenderNotYetIcon}></Icon>
                    <Text>文字</Text>
                    <Time>4h</Time>
                    <Quantity>5</Quantity>
                </SidebarItem>
                <SidebarItem>
                    <Icon src={calenderFinishIcon}></Icon>
                    <Text>文字</Text>
                    <Time>4h</Time>
                    <Quantity>5</Quantity>
                </SidebarItem>
                <SidebarItem>
                    <Icon src={checkedIcon}></Icon>
                    <Text>文字</Text>
                    <Time>4h</Time>
                    <Quantity>5</Quantity>
                </SidebarItem>
                <Line />
                <SidebarItem>
                    <Icon src={folderIcon}></Icon>
                    <Text>文字</Text>
                    <Time>4h</Time>
                    <Quantity>5</Quantity>
                </SidebarItem>
            </SidebarBody>
            <SidebarFooter>
                <SidebarItem>
                    <Icon src={addIcon}></Icon>
                    <Text>新增項目</Text>
                </SidebarItem>
            </SidebarFooter>
        </Sidebar>
    )
}

export default HomeSidebar
