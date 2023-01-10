import { useSelector, useDispatch } from 'react-redux'
import {
    stopCountdown,
    breakCountdown,
    startCountdown,
    setupPomodoroClock,
} from '../features/pomodoroClock/pomodoroClockSlice'
import { getTasks } from '../features/tasks/tasksSlice'

import styled from 'styled-components'
import { useEffect } from 'react'

const MainWrapper = styled.div`
    padding-top: 42px;
`

const Button = styled.button`
    border: 3px solid #cfcfcf;
`

function UserSetting() {
    const timer = useSelector((state) => state.pomodoroClock.timer)
    const task = useSelector((state) => {
        return state.tasks.tasks.filter(
            (item) => item.id == '2kPVE7u9FtpYr3PzArP7'
        )[0]
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTasks())
    }, [])

    return (
        <MainWrapper>
            <p>timer.mode {timer.mode}</p>
            <p>timer.isStart {timer.isStart ? 'true' : 'false'}</p>
            <p>timer.countDownTime {timer.countDownTime}</p>
            <p>timer.settimeoutId {timer.settimeoutId}</p>
            <p>timer.currentInterval{timer.currentInterval}</p>
            <Button
                onClick={() =>
                    dispatch(setupPomodoroClock('2kPVE7u9FtpYr3PzArP7'))
                }
            >
                setupPomodoroClock
            </Button>
            <Button onClick={() => dispatch(startCountdown())}>start</Button>
            <Button onClick={() => dispatch(stopCountdown())}>stop</Button>
            <Button onClick={() => dispatch(breakCountdown())}>break</Button>
            <p>===</p>
            <p>task id {task?.id}</p>
            <p>task totalExpectTime {task?.totalExpectTime}</p>
        </MainWrapper>
    )
}

export default UserSetting
