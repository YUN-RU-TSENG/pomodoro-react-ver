import styled from 'styled-components'

const Button = styled.button`
    padding: 4px 12px;
    font-size: 14px;
    line-weight: 21px;
    font-weight: 400;
    border-radius: 4px;
    background: #fff;
`

const PopoverWrapper = styled.div`
    position: relative;
    padding: 12px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 4px #ededed;
    margin-top: 12px;
    width: 240px;
    font-size: 14px;
    line-weight: 21px;

    &::before {
        display: block;
        content: '';
        position: absolute;
        top: -12px;
        left: 12px;
        border: 6px solid;
        border-color: transparent transparent #fff transparent;
    }
`

function CommonPopover(props) {
    return (
        <div>
            <Button>{props.text}</Button>
            <PopoverWrapper>{props.children}</PopoverWrapper>
        </div>
    )
}

export default CommonPopover
