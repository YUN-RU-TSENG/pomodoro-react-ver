import styled from 'styled-components'
import CommonPopover from '../../Common/CommonPopover/CommonPopover'
import leftIcon from '../../../assets/images/circled-chevron-left.png'
import rightIcon from '../../../assets/images/circled-chevron-right.png'

const Row = styled.section`
    display: flex;
    justify-content: ${(props) => props.justifyContent || 'center'};
    align-items: ${(props) => props.alignItems || 'center'};
    flex-wrap: wrap;
`

const Column = styled.div``

const DateColumn = styled(Column)`
    background: #ededed;
    flex: 0 1 calc(100% / 7);
    text-align: center;
    border: 1px solid #fff;
`

const Button = styled.button`
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 14px;
    line-height: 21px;
`

const Text = styled.span`
    font-size: 14px;
    light-height: 21px;
    font-weight: 400;
`

const Icon = styled.img`
    width: 16px;
    display: block;
`

function HomeCalender() {
    return (
        <CommonPopover text="Calender">
            <Row justifyContent="space-between">
                <Button>
                    <Icon src={leftIcon}></Icon>
                </Button>
                <Text>Dec 2022</Text>
                <Button>
                    <Icon src={rightIcon}></Icon>
                </Button>
            </Row>
            <Row justifyContent="space-between">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((item) => {
                    return (
                        <Column>
                            <Text>{item}</Text>
                        </Column>
                    )
                })}
            </Row>
            <Row justifyContent="flex-start">
                {Array(31)
                    .fill(0)
                    .map((item, index) => {
                        return (
                            <DateColumn>
                                <Text>{index + 1}</Text>
                            </DateColumn>
                        )
                    })}
            </Row>
        </CommonPopover>
    )
}

export default HomeCalender
