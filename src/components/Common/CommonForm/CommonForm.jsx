import styled from 'styled-components'
import PropTypes from 'prop-types'

const Form = styled.form`
    width: 320px;
    padding: 32px 20px;
    text-align: center;

    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 0 4px #ededed;

    & > *:not(:last-child) {
        margin-bottom: 12px;
    }
`

const Title = styled.h2`
    font-size: 24px;
    line-height: 36px;
    font-weight: 100;
    color: #4ed3a9;
`
const Text = styled.p`
    font-size: 12px;
    line-height: 18px;
    color: gray;
`

function CommonForm({ children, title, message }) {
    return (
        <Form>
            <Title>{title}</Title>
            <Text>{message}</Text>
            {children}
        </Form>
    )
}

CommonForm.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
    message: PropTypes.string,
}

export default CommonForm
