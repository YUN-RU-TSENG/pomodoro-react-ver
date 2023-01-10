import formatClockTime from '../../../utils/formatClockTime'

function HomePomodoroClock({ isBig, time }) {
    if (isBig) {
        return (
            <svg height="400" width="400" viewBox="0 0 400 400" fill="red">
                <circle
                    r="190"
                    cx="200"
                    cy="200"
                    stroke="#fff"
                    fill="none"
                    strokeWidth="10"
                />
                <circle
                    r="190"
                    cx="200"
                    cy="200"
                    stroke="#d34e4e"
                    fill="none"
                    strokeDasharray="500"
                    strokeWidth="10"
                    transformorigin="center"
                    transform="rotate(270)"
                />
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    style={{ fontSize: '72px', fill: '#fff' }}
                >
                    {formatClockTime(time)}
                </text>
            </svg>
        )
    } else {
        return (
            <svg height="36" width="36" viewBox="0 0 36 36" fill="red">
                <circle
                    r="16"
                    cx="18"
                    cy="18"
                    stroke="#fff"
                    fill="none"
                    strokeWidth="2"
                />
                <circle
                    r="16"
                    cx="18"
                    cy="18"
                    stroke="#d34e4e"
                    fill="none"
                    strokeDasharray="500"
                    strokeWidth="2"
                    transformorigin="center"
                    transform="rotate(270)"
                />
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    style={{ fontSize: '10px', fill: '#fff' }}
                >
                    {formatClockTime(time)}
                </text>
            </svg>
        )
    }
}

export default HomePomodoroClock
