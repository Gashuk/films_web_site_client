import React, {useContext, useState} from 'react';
import {Button, Card, Form, Modal, Row} from "react-bootstrap";
import {Context} from "./../../index";
import {observer} from "mobx-react-lite";
import {NavLink, useHistory, useLocation, useParams} from "react-router-dom";
import {ADMIN_ROUTE, GENRE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "./../../utils/consts";
import {addGenreAPI} from "./../../http/compositionAPI";
import {login, registration} from "../../http/userAPI";

const AddRatingReview = observer(({show, onHide}) => {

    const history = useHistory()


    return (
        <Modal
            show = {show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Только авторизированные пользователи могут ставить оценку или писать рецензии произведениям
                </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
                <Button variant={"outline-info"} onClick={() => history.push(LOGIN_ROUTE)}>
                    Войти
                </Button>
                <Button variant={"outline-info"} onClick={() => history.push(REGISTRATION_ROUTE)}>
                    Регистрация
                </Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddRatingReview;