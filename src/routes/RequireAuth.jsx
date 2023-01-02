import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function RequireAuth(props) {
    const userStore = useSelector((state) => state.user)
    const navigate = useNavigate()

    // - 判斷是否登入，有則返回頁面，無則返到登入頁
    useEffect(() => {
        if (!userStore.user.uid) navigate('/Login')
    })

    return props.children
}
