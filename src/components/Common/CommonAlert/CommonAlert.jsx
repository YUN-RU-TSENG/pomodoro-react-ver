import styled from 'styled-components'
import alertIcon from '../../../assets/images/external-alert-user-interface-anggara-glyph-anggara-putra.png'
import closeIcon from '../../../assets/images/delete-sign--v1.png'

const AlertWrapper = styled.div`
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

const AlertCard = styled.section`
    flex: 0 1 240px;
    position: relative;
    padding: 36px;
    background: #00000050;
    border-radius: 4px;
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

const AlertIcon = styled.div`
    padding-top: 12px;
`

const Message = styled.p`
    font-size: 14px;
    font-weight: 400;
    margin-top: 16px;
`

function CommonAlert() {
    return (
        <AlertWrapper>
            <AlertCard>
                <Close>
                    <Icon src={closeIcon}></Icon>
                </Close>
                <AlertIcon>
                    <Icon size="36px" src={alertIcon}></Icon>
                </AlertIcon>
                <Message>警告文字</Message>
            </AlertCard>
        </AlertWrapper>
    )
}

export default CommonAlert
