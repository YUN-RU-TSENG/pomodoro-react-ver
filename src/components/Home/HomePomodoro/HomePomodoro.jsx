import { useSelector, useDispatch } from 'react-redux'
import {
    stopCountdown,
    breakCountdown,
    startCountdown,
    setIsPomodoroOpen,
} from '../../../features/pomodoroClock/pomodoroClockSlice'

import HomePomodoroClock from './HomePomodoroClock'

import * as S from './styles'
import viewIcon from '../../../assets/images/full-page-view-1.png'
import closeIcon from '../../../assets/images/delete-sign.png'
import playIcon from '../../../assets/images/circled-play.png'
import stopIcon from '../../../assets/images/circled-pause.png'
import brakeIcon from '../../../assets/images/stop-squared.png'

function HomePomodoro() {
    const timer = useSelector((state) => state.pomodoroClock.timer)
    const selectCountdownTaskIdOfClockStore = useSelector(
        (state) => state.pomodoroClock.selectCountdownTaskId
    )
    const isPomodoroOpenOfPomodoroClockStore = useSelector(
        (state) => state.pomodoroClock.isPomodoroOpen
    )
    // 選中的任務 id
    const selectCountdownTask = useSelector((state) => {
        return state.tasks.tasks.filter(
            (task) => task.id === selectCountdownTaskIdOfClockStore
        )[0]
    })

    // 選中的任務細節
    // 任務刪除、修改狀態
    const dispatch = useDispatch()

    if (!selectCountdownTaskIdOfClockStore) {
        return (
            <div>
                <S.PomodoroWrapper>
                    <S.CloseWrapper>
                        <HomePomodoroClock isBig={false} time={0} />
                        <p>無選中任務</p>
                    </S.CloseWrapper>
                </S.PomodoroWrapper>
            </div>
        )
    }

    if (isPomodoroOpenOfPomodoroClockStore) {
        return (
            <S.PomodoroWrapper isBig={isPomodoroOpenOfPomodoroClockStore}>
                <S.OpenWrapper>
                    <S.Toggle
                        onClick={() => dispatch(setIsPomodoroOpen(false))}
                    >
                        <S.Icon src={viewIcon} width="24px" />
                    </S.Toggle>
                    <S.TaskCard>
                        <input type="checkbox" name="" id="" />
                        <div>
                            <p>{selectCountdownTask.name}</p>
                            <p>
                                完成：{selectCountdownTask.totalSpendTime} /
                                預期：
                                {selectCountdownTask.totalExpectTime}
                            </p>
                        </div>
                        <S.TaskClose>
                            <S.Icon src={closeIcon} width="12px" />
                        </S.TaskClose>
                    </S.TaskCard>
                    <S.PomodoroClock>
                        <HomePomodoroClock
                            isBig={true}
                            time={timer.countDownTime}
                        />
                    </S.PomodoroClock>
                    <S.PomodoroToggleButtonWrapper>
                        {timer.isStart ? (
                            <S.Button onClick={() => dispatch(stopCountdown())}>
                                <S.Icon src={stopIcon} width="48px" />
                            </S.Button>
                        ) : (
                            <S.Button
                                onClick={() => dispatch(startCountdown())}
                            >
                                <S.Icon src={playIcon} width="48px" />
                            </S.Button>
                        )}
                        <S.Button onClick={() => dispatch(breakCountdown())}>
                            <S.Icon src={brakeIcon} width="48px" />
                        </S.Button>
                    </S.PomodoroToggleButtonWrapper>
                </S.OpenWrapper>
            </S.PomodoroWrapper>
        )
    } else {
        return (
            <S.PomodoroWrapper>
                <S.CloseWrapper
                    onClick={() => dispatch(setIsPomodoroOpen(true))}
                >
                    <HomePomodoroClock
                        isBig={false}
                        time={timer.countDownTime}
                    />
                    <p>{selectCountdownTask.name}</p>
                    {timer.isStart ? (
                        <S.Button
                            onClick={(e) => {
                                e.stopPropagation()
                                dispatch(stopCountdown())
                            }}
                        >
                            <S.Icon src={stopIcon} width="36px" />
                        </S.Button>
                    ) : (
                        <S.Button
                            onClick={(e) => {
                                e.stopPropagation()
                                dispatch(startCountdown())
                            }}
                        >
                            <S.Icon src={playIcon} width="36px" />
                        </S.Button>
                    )}

                    <S.Button
                        onClick={(e) => {
                            e.stopPropagation()
                            dispatch(breakCountdown())
                        }}
                    >
                        <S.Icon src={brakeIcon} width="24px" />
                    </S.Button>
                </S.CloseWrapper>
            </S.PomodoroWrapper>
        )
    }
}

export default HomePomodoro
