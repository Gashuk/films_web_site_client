import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {
    fetchUser_profiles,
    fetchUser_profiles_login,
    fetchUser_profiles_registration,
    login,
    registration
} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchGenreAPI} from "../http/compositionAPI";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const {table} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () =>{
        try {
            let data;
            if(isLogin) {
                data = await login(email, password);
            }
            else {
                data = await registration(email, password, table.defaultImg.defaultImgHumanUser);
            }

            // alert(data.role)


            console.log(data.id)
            if(data.role === "ADMIN")
            {
                user.setIsADMIN(true)
            }
            else
            {
                user.setIsADMIN(false)
            }
            user.setUser(data)
            // if (isLogin)
            // {
            //     fetchUser_profiles_login(`${data.id}`).then(data => user.setUser(data))
            // }
            // else
            // {
            //     fetchUser_profiles_registration(`${data.id}`).then(data => user.setUser(data))
            // }


            //
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
        }
        catch (e){
            alert(e.response.data.message)
        }


    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width:600, background: '#3C5B74'}} className="p-5">
                <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                        :
                            <div>
                                Есть аккаунта? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }

                        <Button
                            variant={"outline-light"}
                            onClick={click}
                        >
                            {isLogin ? "Войти":"Регистрация"}

                        </Button>
                    </Row>


                </Form>
            </Card>
        </Container>
    );
});

export default Auth;