import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'

const LoadWrapper = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const LoadCard = styled.section`
    padding: 24px;
    background: #00000030;
    border-radius: 4px;
    text-align: center;
    flex: 0 1 120px;
`

const circle = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const LoadingIcon = styled.button`
    margin: 0 auto;
    width: 24px;
    height: 24px;
    border: 4px solid #f7f7f7;
    border-top: 4px solid #4ed3a9;
    border-radius: 50%;
    animation: ${circle} 1.2s linear infinite;
`

const Message = styled.p`
    font-size: 14px;
    font-weight: 400;
    margin-top: 4px;
`

function CommonLoading({ text }) {
    return (
        <LoadWrapper>
            <LoadCard>
                <LoadingIcon></LoadingIcon>
                {text && <Message>{text}</Message>}
            </LoadCard>
        </LoadWrapper>
    )
}

CommonLoading.propTypes = {
    text: PropTypes.string,
}

CommonLoading.defaultProps = {}

export default CommonLoading
