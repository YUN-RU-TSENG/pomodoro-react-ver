import { createBrowserRouter } from 'react-router-dom'

export default createBrowserRouter([
    {
        path: '/',
        element: <div>Root</div>,
    },
    {
        path: '/b',
        element: <div>Hello world!</div>,
    },
    {
        path: '/*',
        element: <div>404</div>,
    },
])
