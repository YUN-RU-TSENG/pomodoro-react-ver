import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { getUser } from '../features/user/userSlice'

import CommonLoading from '../components/Common/CommonLoading/CommonLoading.jsx'

export default function RequireAuth(props) {
    // === redux store ===
    const userIdOfUserStore = useSelector((state) => state.user.user.uid)
    const isLoadedUserStateOfUserStore = useSelector(
        (state) => state.user.isLoadedUserState
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // === component logic ===
    useEffect(() => {
        if (!isLoadedUserStateOfUserStore) dispatch(getUser())
    }, [dispatch, isLoadedUserStateOfUserStore])

    useEffect(() => {
        if (!userIdOfUserStore) navigate('/login')
    })

    // 判斷是否登入，有則返回頁面，無則返到登入頁
    if (!isLoadedUserStateOfUserStore) return <CommonLoading />

    return props.children
}
