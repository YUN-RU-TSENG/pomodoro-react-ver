import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import CommonLoading from '../../Common/CommonLoading/CommonLoading'

const List = styled.ul`
    position: relative;
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

const PositionLoading = styled(CommonLoading)`
    position: absolute;
`

function HomeList({ items, isLoading }) {
    const itemElements = items.map((item) => (
        <Item key={item.id}>
            <Checkbox></Checkbox>
            <Text>{item.name}</Text>
            <Date>{item.createAt}</Date>
        </Item>
    ))

    return (
        <List>
            {itemElements}
            {isLoading && <PositionLoading></PositionLoading>}
        </List>
    )
}

HomeList.propTypes = {
    items: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
}

HomeList.defaultProps = { isLoading: false }

export default HomeList
