import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {deleteUserRatingAPI} from "../../../http/userAPI";

const DeleteRatingAdmin = observer(({show, onHide}) => {

    const {composition_admin} = useContext(Context)
    const {rating} = useContext(Context)
    const id_rating = rating.selectedRating.id

    const deleteRating = () =>{

        deleteUserRatingAPI(id_rating).then(data=> {
            onHide()
        })
    }
    return (
        <Modal
            show = {show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Вы уверены, что хотите удалить?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Произведение
                    <Form.Control
                        value={composition_admin.selectedComposition.name}
                        disabled
                    />
                    <br/>
                    Постер
                    <br/>
                    <Image width={130} height={190}   src={process.env.REACT_APP_API_URL + composition_admin.selectedComposition.img}/>

                    <br/>
                    <br/>
                    Оценка
                    <Form.Control
                        value={rating.selectedRating.rate}
                        disabled
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={deleteRating}>Удалить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteRatingAdmin;