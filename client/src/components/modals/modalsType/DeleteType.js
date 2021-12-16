import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {deleteTypeAPI} from "../../../http/typeAPI";

const DeleteType = observer(({show, onHide}) => {

    const {type} = useContext(Context)
    const id = type.selectedType.id

    const deleteType = () =>{
        deleteTypeAPI(id).then(data=> {
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
                    Удаление типа произведения
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Код
                    <Form.Control
                        value={type.selectedType.id}
                        disabled
                    />
                    Название
                    <Form.Control
                        value={type.selectedType.name}
                        disabled
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={deleteType}>Удалить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteType;