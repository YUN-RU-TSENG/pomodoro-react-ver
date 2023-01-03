import { useSelector, useDispatch } from 'react-redux'
import { getUser } from './features/user/userSlice'

import { useEffect } from 'react'

import CommonLoading from './components/Common/CommonLoading/CommonLoading.jsx'

function App(props) {
    // === redux store ===
    const userStore = useSelector((state) => state.user)
    const dispatch = useDispatch()

    // === component logic ===
    useEffect(() => {
        if (!userStore.isLoadedUserState) dispatch(getUser())
    })

    // render
    return (
        <div className="App">
            {!userStore.isLoadedUserState ? <CommonLoading /> : props.children}
        </div>
    )
}

export default App
