import React, {useContext} from 'react';
import {Context} from "../index";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {Button, Container, Image, Nav, Navbar, NavLink} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import coseti from '../assats/coseti.png'
import Vector from '../assats/Vector.png'

const FootBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    // const logOut = () =>{
    //     history.push(SHOP_ROUTE)
    //     user.setUser({})
    //     user.setIsAuth(false)
    // }
    // console.log(user.isADMIN)
    // const adminOut = () =>{
    //     user.setUser({})
    //     user.setIsAuth(false)
    // }{user.isADMIN ? "Админ панель" :"Личный кабинет"}

    return (
        <Navbar  style = {{background: '#00243F'}} className="m-2" >
            <Container>
                    <Nav className="mp-auto" style = {{color: 'white'}} >
                       <div><Image style = {{height: 10, width: 10}}src={Vector}/> 2021, MAZE FILMS <Image style = {{height: 20, width: 75}}src={coseti}/> </div>
                    </Nav>
            </Container>
        </Navbar>
    );
});

export default FootBar;