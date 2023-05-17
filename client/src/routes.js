import { LOGIN_ROUTE, POSTS_ROUTE, REGISTRATION_ROUTE, USER_ROUTE } from "./utils/consts"
import UserPage from "./pages/UserPage"
import AuthPage from "./pages/AuthPage"
import PostPage from "./pages/PostPage"

export const authRoutes = [
    {
        path: USER_ROUTE + '/:id',
        Component: UserPage
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: AuthPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: AuthPage
    }, 
    {
        path: POSTS_ROUTE,
        Component: PostPage
    }
]