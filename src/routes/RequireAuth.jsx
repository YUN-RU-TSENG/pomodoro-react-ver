import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { getUser } from '../features/user/userSlice'

import CommonLoading from '../components/Common/CommonLoading/CommonLoading.jsx'

export default function RequireAuth(props) {
    // === redux store ===
    const userStore = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // === component logic ===
    useEffect(() => {
        if (!userStore.isLoadedUserState) dispatch(getUser())
    }, [userStore, dispatch])

    // 判斷是否登入，有則返回頁面，無則返到登入頁
    if (!userStore.isLoadedUserState) return <CommonLoading />
    if (!userStore.user.uid) navigate('/login')

    return props.children
}
