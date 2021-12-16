import React, {useContext} from 'react';
import {Context} from "../index";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {Button, Container, Image, Nav, Navbar, NavLink} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import logo from '../assats/logo.png'
import Table_admin from "./Table_admin";
import Table_User from "./Table_User";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const logOut = () =>{
        history.push(SHOP_ROUTE)
        user.setUser({})
        user.setIsAuth(false)
    }
    // console.log(user.isADMIN)
    // const adminOut = () =>{
    //     user.setUser({})
    //     user.setIsAuth(false)
    // }{user.isADMIN ? "Админ панель" :"Личный кабинет"}//

    return (
        <Navbar style = {{background: '#00243F'}}>
            <Container>
                <NavLink style = {{color: 'white'}} onClick={() => history.push(SHOP_ROUTE)}><Image style = {{height: 50, width: 100}} src={logo}/></NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style = {{color: 'white'}} >
                        <Button
                            variant={"outline-light"}
                            className="ml-2"
                            onClick={() => history.push(ADMIN_ROUTE)}
                        >
                            {user.isADMIN ?
                                <div>Админ панель</div>
                                :
                                <div>Личный кабинет</div>
                            }

                        </Button>
                        <Button
                            variant={"outline-light"}
                            className="ml-2"
                            onClick={() => logOut()}
                        >Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style = {{color: 'white'}} >

                        <Button variant={"outline-light"} onClick={()=> history.push(LOGIN_ROUTE)} className="ml-2">Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;