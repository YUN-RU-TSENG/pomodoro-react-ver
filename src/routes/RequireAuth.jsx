import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function RequireAuth(props) {
    // === redux store ===
    const userStore = useSelector((state) => state.user)
    const navigate = useNavigate()

    // === component logic ===
    // - 判斷是否登入，有則返回頁面，無則返到登入頁
    if (!userStore.user.uid) navigate('/login')

    return props.children
}
