import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {observer} from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, USER_ROUTE } from '../utils/consts';
import { Context } from '..';
import jwt_decode from 'jwt-decode'

const NavBar = observer(() =>{
    const history = useNavigate();
    const {user} = useContext(Context)
    let token = localStorage.getItem('token')

    const logOut = () => {
        localStorage.setItem('token', "")
        user.setUser({})
        user.setIsAuth(false)
        history(LOGIN_ROUTE)
    }

    return(
        <Container>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="/">Домой</Navbar.Brand>
                {user.isAuth ?
                <Nav className="ms-auto">
                    <Button onClick={()=>history(USER_ROUTE + `/${token ? jwt_decode(token).id : "reset"}`)} variant={'outline-light'}>Личный кабинет</Button>
                    <Button onClick={() => logOut()}  variant={'outline-light'} className="ms-3">Выйти</Button>
                </Nav>
                :
                <Nav className="ms-auto">
                    <Button variant={'outline-light'} onClick={() => history(LOGIN_ROUTE)}>Авторизация</Button>
                </Nav>
                }
                </Container>
            </Navbar>
        </Container>
    )
})

export default NavBar