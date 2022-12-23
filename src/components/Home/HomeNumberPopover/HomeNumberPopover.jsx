import styled from 'styled-components'
import CommonPopover from '../../Common/CommonPopover/CommonPopover'
import CommonInput from '../../Common/CommonInput/CommonInput'
import CommonButton from '../../Common/CommonButton/CommonButton'

const Title = styled.h2`
    font-size: 16px;
    light-height: 24px;
    font-weight: 700;
    text-align: center;
`

const Row = styled.h2`
    display: flex;
    gap: 12px;

    > * {
        flex: 1 1 auto;
    }
`

function HomeNumberPopover() {
    return (
        <CommonPopover text="數字輸入">
            <Title>標題</Title>
            <CommonInput></CommonInput>
            <Row>
                <CommonButton>是</CommonButton>
                <CommonButton>否</CommonButton>
            </Row>
        </CommonPopover>
    )
}

export default HomeNumberPopover
