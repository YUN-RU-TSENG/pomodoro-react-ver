import { useState } from 'react'

/**
 * 開關的狀態邏輯，預設為關閉 false
 * @param {boolean} isShowInitial 初始開關
 * @returns
 */
export default function useToggle(isShowInitial = false) {
    const [isShow, setIsShow] = useState(isShowInitial)

    function toggleIsShow() {
        setIsShow(!isShow)
    }

    return {
        isShow, // 是否呈現
        toggleIsShow, // 切換呈現狀態
    }
}
