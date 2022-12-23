import styled from 'styled-components'

const Label = styled.label`
    display: inline-block;
    width: 100%;
`

const Title = styled.h3`
    margin-left: 6px;
    display: ${(props) => (props.children ? 'block' : 'none')};
    text-align: left;
    font-size: 14px;
    line-height: 21px;
    color: #7c7c7c;
`
const Input = styled.input`
    width: 100%;
    padding: 6px;

    border: 1px solid #ededed;
    border-radius: 4px;
    font-size: 14px;
    line-height: 21px;
    transition: all 0.3s ease;
`
const ErrorMessage = styled.p`
    margin-left: 6px;
    font-size: 12px;
    line-height: 18px;
    color: #d34e4e;
    text-align: left;
`

function CommonInput(props) {
    return (
        <Label>
            <Title>標題</Title>
            <Input></Input>
            <ErrorMessage>錯誤文字</ErrorMessage>
        </Label>
    )
}

export default CommonInput
