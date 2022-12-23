import styled from 'styled-components'
import checkIcon from '../../../assets/images/checked-checkbox.png'
import uncheckIcon from '../../../assets/images/unchecked-checkbox.png'

const Label = styled.label`
    display: inline-block;
    cursor: pointer;
`

const Input = styled.input.attrs({ type: 'checkbox' })`
    display: none;

    &:checked ~ div {
        background: no-repeat center/contain url(${checkIcon});
    }
`

const Box = styled.div`
    width: 20px;
    height: 20px;
    background: no-repeat center/contain url(${uncheckIcon});
`

function CommonCheckbox() {
    return (
        <Label>
            <Input></Input>
            <Box></Box>
        </Label>
    )
}

export default CommonCheckbox
