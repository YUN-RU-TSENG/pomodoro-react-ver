import styled from 'styled-components'

const Button = styled.button`
    padding: 4px 12px;

    border-radius: 4px;
    font-size: 14px;
    line-height: 21px;
    border: 1px solid #cfcfcf;
    background-color: #ededed;
    color: #00000080;

    text-align: center;
    transition: all 0.3s ease;
`

function CommonButton(props) {
    return <Button>{props.children}</Button>
}

export default CommonButton
