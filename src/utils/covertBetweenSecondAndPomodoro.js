/**
 * 將秒數依照傳入的 pomodoro 時間計算當前秒數為幾個 pomodoro
 * @param {number} second
 * @param {number} pomodoro
 * @returns pomodoroQuantity pomodoro 數量
 */
export function covertSecondToPomodoroQuantity(second, pomodoro) {
    return Math.ceil((second / pomodoro) * 10) / 10
}

/**
 * 將 pomodoro 依照傳入數量轉換為時間（秒）
 * @param {number} pomodoro 時長（秒）
 * @param {number} pomodoroQuantity 數量
 * @returns 總秒數
 */
export function covertPomodoroQuantityToSecond(pomodoro, pomodoroQuantity) {
    return pomodoro * pomodoroQuantity
}
