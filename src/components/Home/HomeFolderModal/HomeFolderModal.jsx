import styled from 'styled-components'
import CommonModal from '../../Common/CommonModal/CommonModal'
import CommonInput from '../../Common/CommonInput/CommonInput'
import CommonButton from '../../Common/CommonButton/CommonButton'

const Row = styled.h2`
    display: flex;
    gap: ${(props) => props.gap || '0px'};
    justify-content: ${(props) => props.justifyContent || 'center'};
    flex-wrap: wrap;
    margin-bottom: 12px;
`

const Column = styled.div`
    width: 24px;
    height: 24px;
    background: #000;
    border-radius: 50%;
`

function HomeFolderModal() {
    return (
        <CommonModal>
            <form>
                <CommonInput></CommonInput>
                <Row justifyContent="flex-start" gap="9px">
                    {Array(20)
                        .fill('')
                        .map(() => (
                            <Column></Column>
                        ))}
                </Row>
                <Row justifyContent="flex-end" gap="12px">
                    <CommonButton>是</CommonButton>
                    <CommonButton>否</CommonButton>
                </Row>
            </form>
        </CommonModal>
    )
}

export default HomeFolderModal
