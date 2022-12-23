import styled from 'styled-components'
import closeIcon from '../../../assets/images/delete-sign--v1.png'

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    z-index: 9;
    align-items: center;
    justify-content: center;
`

const ModalCard = styled.section`
    flex: 0 1 360px;
    position: relative;
    padding: 16px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 4px #ededed;
    text-align: center;
`

const Close = styled.button`
    position: absolute;
    right: 12px;
    top: 12px;
    padding: 4px;
`

const Icon = styled.img`
    width: ${(props) => props.size ?? '12px'};
    vertical-align: middle;
`

const Message = styled.p`
    font-size: 14px;
    font-weight: 400;
`

function CommonModal(props) {
    return (
        <ModalWrapper>
            <ModalCard>
                <Close>
                    <Icon src={closeIcon}></Icon>
                </Close>
                <Message>文字</Message>
                {props.children}
            </ModalCard>
        </ModalWrapper>
    )
}

export default CommonModal
