import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {deleteUserReviewAPI} from "../../../http/userAPI";

const DeleteReviewAdmin = observer(({show, onHide}) => {

    const {composition_admin} = useContext(Context)
    const {review} = useContext(Context)
    const id_review = review.selectedReview.id

    const deleteReview = () =>{
        deleteUserReviewAPI(id_review).then(data=> {
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
                    Заголовок
                    <Form.Control
                        value={review.selectedReview.title}
                        disabled
                    />
                    Текст
                    <Form.Control
                        value={review.selectedReview.text}
                        disabled
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={deleteReview}>Удалить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteReviewAdmin;