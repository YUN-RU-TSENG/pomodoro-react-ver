import { useState } from 'react'
import dayjs from 'dayjs'

export default function useCalender(selectDate) {
    // 當前時間
    const [now, setNow] = useState(selectDate ? dayjs(selectDate) : dayjs())

    // 當前月份
    const currentMonth = now.format('MMM')

    // 當前年
    const currentYear = now.year()

    // 當前月份中的天數
    const currentDate = now.daysInMonth()

    // 當前月份第一天的星期
    const currentMonthFirstDayOfWeek = now.date(1).day()

    /**
     * 增減當年時間月份
     * @param {number} updateMonth 輸入正整數是增加、負整數是減少
     */
    const updateCurrentTime = (updateMonth) => {
        if (!updateMonth) return
        if (updateMonth > 0) return setNow(now.add(updateMonth, 'month'))
        if (updateMonth < 0) return setNow(now.subtract(Math.abs(updateMonth), 'month'))
    }

    return {
        currentMonth,
        currentYear,
        currentDate,
        currentMonthFirstDayOfWeek,
        updateCurrentTime,
    }
}
