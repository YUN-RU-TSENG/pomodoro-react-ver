import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import Tasks from '../pages/Tasks.jsx'
import Dashboard from '../pages/Tasks.jsx'
import UserSetting from '../pages/UserSetting.jsx'
import Register from '../pages/Register.jsx'
import Login from '../pages/Login.jsx'
import NotFound from '../pages/NotFound.jsx'
import RequireAuth from './RequireAuth.jsx'
import RequireGuest from './RequireGuest.jsx'

export default createBrowserRouter([
    {
        path: '/',
        element: (
            <RequireAuth>
                <Home />
            </RequireAuth>
        ),
        children: [
            {
                path: '',
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
        element: (
            <RequireGuest>
                <Register />
            </RequireGuest>
        ),
    },
    {
        path: '/Login',
        element: (
            <RequireGuest>
                <Login />
            </RequireGuest>
        ),
    },
    {
        path: '/*',
        element: <NotFound />,
    },
])
