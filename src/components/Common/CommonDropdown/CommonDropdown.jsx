import styled from 'styled-components'

const DropdownWrapper = styled.div``

const DropdownItem = styled.div`
    padding: 12px 4px;
    font-size: 14px;
    text-align: center;

    &:not(:last-child) {
        border-bottom: 1px solid #cfcfcf;
    }

    &:hover {
        background: #ededed;
        cursor: pointer;
    }

    background: ${(props) => (props.selectItem == props.item ? '#ededed' : '')};
`

function CommonDropdown({ items = ['s', 'sa'], selectItem = 's', updateSelectItem }) {
    const DropdownItems = items.map((item) => (
        <DropdownItem
            selectItem={selectItem}
            key={item}
            item={item}
            onClick={() => updateSelectItem(item)}
        >
            {item}
        </DropdownItem>
    ))

    return <DropdownWrapper>{DropdownItems}</DropdownWrapper>
}

export default CommonDropdown
