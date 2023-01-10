import styled from 'styled-components'
import closeIcon from '../../../assets/images/delete-sign--v1.png'
import PropTypes from 'prop-types'

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
    background: #00000030;
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

const ModalCardBody = styled.section`
    *:not(:last-child) {
        margin-bottom: 12px;
    }
`

const Close = styled.button`
    position: absolute;
    right: 6px;
    top: 6px;
    padding: 4px;
`

const Icon = styled.img`
    width: ${(props) => props.size ?? '12px'};
    vertical-align: middle;
`

const Message = styled.p`
    font-size: 16px;
    font-weight: 700;
    margin-bottom: ${(props) => (props.children ? '12px' : '0')};
`

function CommonModal({ children, title, onClick }) {
    return (
        <ModalWrapper>
            <ModalCard>
                <Close onClick={onClick}>
                    <Icon src={closeIcon}></Icon>
                </Close>
                <Message>{title}</Message>
                {children && <ModalCardBody>{children}</ModalCardBody>}
            </ModalCard>
        </ModalWrapper>
    )
}

CommonModal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
}

CommonModal.defaultProps = {}

export default CommonModal
