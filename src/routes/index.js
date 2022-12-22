import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import Tasks from '../pages/Tasks.jsx'
import Dashboard from '../pages/Tasks.jsx'
import UserSetting from '../pages/UserSetting.jsx'
import Register from '../pages/Register.jsx'
import Login from '../pages/Login.jsx'
import NotFound from '../pages/NotFound.jsx'

export default createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: '/',
                element: <Tasks />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/user-setting',
                element: <UserSetting />,
            },
        ],
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/Login',
        element: <Login />,
    },
    {
        path: '/*',
        element: <NotFound />,
    },
])
