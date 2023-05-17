import { observer } from "mobx-react-lite"
import React, { useContext, useState } from "react"
import { LOGIN_ROUTE, POSTS_ROUTE, REGISTRATION_ROUTE } from "../utils/consts"
import { useLocation, useNavigate, NavLink } from "react-router-dom"
import { Button, Card, Container, Form } from 'react-bootstrap';
import { Context } from "..";
import { login, registration } from "../http/userApi";

const AuthPage = observer(() => {
    const history = useNavigate()
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [userLogin, setUserLogin] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const click = async () => {
        try{
            let data;
            if(isLogin){
                data = await login(userLogin, userPassword)
            } else {
                data = await registration(userLogin, userPassword)
            }
            user.setUser(user)
            console.log(user)
            user.setIsAuth(true)
            history(POSTS_ROUTE)
        }catch(e){
            alert(e.response.data.message)
        }
    }


    return(
        <Container className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className='p-5'>
                <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control 
                        className='mt-3'
                        placeholder='Введите Ваш логин'
                        value={userLogin}
                        onChange={e => setUserLogin(e.target.value)}
                    />
                    <Form.Control 
                        className='mt-3'
                        placeholder='Введите Ваш пароль'
                        value={userPassword}
                        onChange={e => setUserPassword(e.target.value)}
                        type='password'
                    />
                    <div className='d-flex flex-row justify-content-between mt-3 '>
                        {isLogin ? 
                            <div>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink></div>
                            :
                            <div>Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink></div>
                        }
                        <Button onClick={()=>click()} className='align-self-end' variant='outline-success'>{isLogin ? 'Войти' : 'Создать аккаунт'}</Button>
                    </div>
                </Form>
            </Card>
        </Container>
    )
})

export default AuthPage