import React, { useContext } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes';
import { POSTS_ROUTE } from '../utils/consts';
import { Context } from '..';

const AppRouter = () =>{
    const {user} = useContext(Context)
    return(
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key = {path} path = {path} element = {<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key = {path} path = {path} element = {<Component/>} exact/>
            )}
            <Route path = "*" element={<Navigate to = {POSTS_ROUTE}/>}/>
        </Routes>
    );
}

export default AppRouter;