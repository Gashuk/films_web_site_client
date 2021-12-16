import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {deleteCompositionRatingAPI} from "../../../http/compositionAPI";

const DeleteRating = observer(({show, onHide}) => {
    const {rating} = useContext(Context)
    const {user} = useContext(Context)

    const [rate, setRate] = useState(null)

    if(user.isAuth)
    {
        useEffect(() => {
            setRate(rating.selectedRate)
        },[rating.selectedRate])
    }

    const deleteRating = () =>{
        const id_rating = rating.selectedRating.id
        deleteCompositionRatingAPI(id_rating).then(data=> {
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
                    Оценка
                    <Form.Control
                        value={rate}
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

export default DeleteRating;