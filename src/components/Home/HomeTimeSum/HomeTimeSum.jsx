import { useSelector } from 'react-redux'
import { timeSum } from '../../../features/tasks/tasksSlice'

import styled from 'styled-components'

const SumWrapper = styled.section`
    padding: 12px;
    border-radius: 4px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 0px 4px #ededed;
    margin-bottom: 24px;
`

const SumItem = styled.section`
    flex: 0 1 20%;
    text-align: center;
    font-weight: 400;
`

const Quantity = styled.h3`
    font-size: 18px;
    light-height: 27px;
    font-weight: 700;
    color: #4ed3a9;
`

const Text = styled.p`
    font-size: 14px;
    light-height: 21px;
`

function HomeTimeSum() {
    const timeSumOfTaskStore = useSelector(timeSum)

    return (
        <SumWrapper>
            <SumItem>
                <Quantity>
                    {Math.ceil(
                        timeSumOfTaskStore.theSumOfExpectTimeOfTask / 60 / 60
                    )}
                </Quantity>
                <Text>預估時間 h</Text>
            </SumItem>
            <SumItem>
                <Quantity>
                    {Math.ceil(
                        timeSumOfTaskStore.theSumOfSpendTimeOfTask / 60 / 60
                    )}
                </Quantity>
                <Text>總專注時間 h</Text>
            </SumItem>
            <SumItem>
                <Quantity>{timeSumOfTaskStore.theSumOfNumberOfTasks}</Quantity>
                <Text>所有任務</Text>
            </SumItem>
            <SumItem>
                <Quantity>
                    {timeSumOfTaskStore.theSumOfNumberOfFinishTasks}
                </Quantity>
                <Text>完成任務</Text>
            </SumItem>
        </SumWrapper>
    )
}

export default HomeTimeSum
