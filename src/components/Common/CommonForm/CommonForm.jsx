import styled from 'styled-components'

const Form = styled.form`
    width: 320px;
    margin: 0 auto;
    padding: 32px 20px;
    text-align: center;

    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 0 4px #ededed;

    *:not(:last-child) {
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

function CommonForm(props) {
    return (
        <Form>
            <Title>標題</Title>
            <Text>文字</Text>
            {props.children}
        </Form>
    )
}

export default CommonForm
