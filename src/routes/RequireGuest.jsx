import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function RequireGuest(props) {
    // === redux store ===
    const userStore = useSelector((state) => state.user)
    const navigate = useNavigate()

    // === component logic ===
    // - 判斷是否登入，有則返回頁面，無則返到登入頁
    useEffect(() => {
        if (userStore.user.uid) navigate('/')
    })

    return props.children
}
