import styled from 'styled-components'

const List = styled.ul`
    > *:not(:last-child) {
        margin-bottom: 8px;
    }
`

const Item = styled.li`
    padding: 8px;
    border-radius: 4px;
    display: flex;
    background: #fff;
    box-shadow: 0px 0px 4px #ededed;
    align-items: center;
`

const Checkbox = styled.input.attrs({ type: 'checkbox' })``

const Text = styled.p`
    font-size: 14px;
    light-height: 21px;
`

const Date = styled.p`
    font-size: 14px;
    light-height: 21px;
    margin-left: auto;
`

function HomeList() {
    return (
        <List>
            <Item>
                <Checkbox></Checkbox>
                <Text>Text</Text>
                <Date>2022/12/12</Date>
            </Item>
            <Item>
                <Checkbox></Checkbox>
                <Text>Text</Text>
                <Date>2022/12/12</Date>
            </Item>
            <Item>
                <Checkbox></Checkbox>
                <Text>Text</Text>
                <Date>2022/12/12</Date>
            </Item>
        </List>
    )
}

export default HomeList
