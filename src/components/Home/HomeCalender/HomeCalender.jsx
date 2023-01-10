import useCalender from './useCalender'
import dayjs from 'dayjs'

import styled from 'styled-components'

import leftIcon from '../../../assets/images/circled-chevron-left.png'
import rightIcon from '../../../assets/images/circled-chevron-right.png'

const Row = styled.section`
    display: flex;
    justify-content: ${(props) => props.justifyContent || 'center'};
    align-items: ${(props) => props.alignItems || 'center'};
    flex-wrap: wrap;
`

const Column = styled.div`
    text-align: center;
    flex: 0 1 calc(100% / 7);
`

const DateColumn = styled.button`
    padding: 4px 0;
    background: #ededed;
    flex: 0 1 calc(100% / 7);
    text-align: center;
    border: 1px solid #fff;

    &:hover {
        background: #ddd;
    }
    &.select {
        background: #4ed3a9;
    }
    &.select-cache {
        background: #cfcfcf;
    }
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

function HomeCalender({ onSelectDataUpdate, selectCacheDate }) {
    const {
        currentMonth,
        currentYear,
        currentDate,
        currentMonthFirstDayOfWeek,
        updateCurrentTime,
    } = useCalender()
    return (
        <div text="Calender">
            <Row justifyContent="space-between">
                <Button onClick={() => updateCurrentTime(-1)}>
                    <Icon src={leftIcon}></Icon>
                </Button>
                <Text>{currentMonth + ' ' + currentYear}</Text>
                <Button onClick={() => updateCurrentTime(1)}>
                    <Icon src={rightIcon}></Icon>
                </Button>
            </Row>
            <Row justifyContent="flex-start">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                    (item) => {
                        return (
                            <Column key={item}>
                                <Text>{item}</Text>
                            </Column>
                        )
                    }
                )}
            </Row>
            <Row justifyContent="flex-start">
                {Array(currentMonthFirstDayOfWeek)
                    .fill(0)
                    .map((_, index) => {
                        return (
                            <DateColumn key={index + 1}>
                                <Text> {'-'}</Text>
                            </DateColumn>
                        )
                    })}
                {Array(currentDate)
                    .fill(0)
                    .map((_, index) => {
                        return (
                            <DateColumn
                                key={index + 1}
                                className={
                                    selectCacheDate &&
                                    dayjs(selectCacheDate).isSame(
                                        dayjs(
                                            currentYear +
                                                ' ' +
                                                currentMonth +
                                                ' ' +
                                                (index + 1),
                                            'YYYY MMM DD'
                                        ),
                                        'date'
                                    )
                                        ? 'select'
                                        : ''
                                }
                                onClick={() => {
                                    onSelectDataUpdate(
                                        dayjs(
                                            currentYear +
                                                ' ' +
                                                currentMonth +
                                                ' ' +
                                                (index + 1),
                                            'YYYY MMM DD'
                                        ).toISOString()
                                    )
                                }}
                            >
                                <Text>{index + 1}</Text>
                            </DateColumn>
                        )
                    })}
            </Row>
        </div>
    )
}

export default HomeCalender
