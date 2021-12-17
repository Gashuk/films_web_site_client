import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {deleteCompositionReviewAPI} from "../../../http/compositionAPI";

const DeleteReview = observer(({show, onHide}) => {
    const {user} = useContext(Context)
    const {review} = useContext(Context)
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    if(user.isAuth)
    {
        useEffect(() => {
            if(review.selectedReview != null)
            {
                setTitle(review.selectedReview.title)
                setText(review.selectedReview.text)
            }
        },[review.selectedReview])
    }

    const deleteReview = () =>{
        const id_review = review.selectedReview.id
        deleteCompositionReviewAPI(id_review).then(data=> {
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
                    Заголовок
                    <Form.Control
                        value={title}
                        disabled
                    />
                    Текст
                    <Form.Control
                        value={text}
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

export default DeleteReview;