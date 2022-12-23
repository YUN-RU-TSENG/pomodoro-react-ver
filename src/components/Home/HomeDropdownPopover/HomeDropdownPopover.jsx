import styled from 'styled-components'
import CommonPopover from '../../Common/CommonPopover/CommonPopover'

const List = styled.ul``

const ListItem = styled.li`
    display: block;
    padding: 4px;
    cursor: pointer;

    :hover {
        background: #ededed;
    }
`
const Tag = styled.div`
    vertical-align: middle;
    width: 4px;
    display: inline-block;
    height: 4px;
    border-radius: 4px;
    margin-right: 12px;
    background: ${(props) => props.color || '#ededed'};
`

const Text = styled.span`
    font-size: 14px;
    light-height: 21px;
    font-weight: 400;
`

function HomeDropdownPopover() {
    return (
        <CommonPopover text="下拉選單">
            <List>
                <ListItem>
                    <Tag></Tag>
                    <Text>文字內容</Text>
                </ListItem>
                <ListItem>
                    <Tag></Tag>
                    <Text>文字內容</Text>
                </ListItem>
                <ListItem>
                    <Tag></Tag>
                    <Text>文字內容</Text>
                </ListItem>
            </List>
        </CommonPopover>
    )
}

export default HomeDropdownPopover
