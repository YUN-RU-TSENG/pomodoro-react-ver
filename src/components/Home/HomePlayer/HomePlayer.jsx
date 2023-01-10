import { useSelector, useDispatch } from 'react-redux'
import { setupPomodoroClock } from '../../../features/pomodoroClock/pomodoroClockSlice'

import styled from 'styled-components'
import uncheckIcon from '../../../assets/images/play-button-circled.png'
import checkIcon from '../../../assets/images/retro-alarm-clock.png'
import PropTypes from 'prop-types'

const Label = styled.label`
    display: inline-block;
    cursor: pointer;
`

const Input = styled.input.attrs({ type: 'checkbox' })`
    display: none;

    &:checked ~ div {
        background: no-repeat center/contain url(${checkIcon});
    }
`

const Box = styled.div`
    width: 20px;
    height: 20px;
    background: no-repeat center/contain url(${uncheckIcon});
`

function HomePlayer({ attributes, taskId }) {
    const selectCountdownTaskIdOfPomodoroClock = useSelector(
        (state) => state.pomodoroClock.selectCountdownTaskId
    )

    const dispatch = useDispatch()

    return (
        <Label>
            <Input
                {...attributes}
                checked={taskId === selectCountdownTaskIdOfPomodoroClock}
                onChange={() => dispatch(setupPomodoroClock(taskId))}
            />
            <Box />
        </Label>
    )
}

HomePlayer.propTypes = {
    attributes: PropTypes.object,
}

HomePlayer.defaultProps = { attributes: {} }

export default HomePlayer
