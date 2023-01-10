/**
 * 轉換秒數為 mm:ss 的格式，例如丟入 31 秒會變成：00:31
 * @param {number} time 秒數
 * @returns {string} mm:ss 格式
 */
export default function formatClockTime(time) {
  const minute = Math.floor(time / 60);
  const second = time % 60;
  const formatMinute = minute < 10 ? "0" + minute : minute;
  const formatSecond = second < 10 ? "0" + second : second;

  return `${formatMinute}:${formatSecond}`;
}
