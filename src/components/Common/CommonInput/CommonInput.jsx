import styled from 'styled-components'
import PropTypes from 'prop-types'

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
    text-align: center;
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

function CommonInput({ title, errorMessage, label, register, required, attributes }) {
    return (
        <Label>
            <Title>{title}</Title>
            <Input {...register(label, { required })} {...attributes}></Input>
            <ErrorMessage>{errorMessage}</ErrorMessage>
        </Label>
    )
}

CommonInput.propTypes = {
    title: PropTypes.string,
    errorMessage: PropTypes.string,
    attributes: PropTypes.object,
    label: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    required: PropTypes.object,
}

CommonInput.defaultProps = { attributes: {} }

export default CommonInput
