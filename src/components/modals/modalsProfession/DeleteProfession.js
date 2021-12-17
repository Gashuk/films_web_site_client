import React, {useContext} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {deleteProfessionAPI} from "../../../http/professionAPI";

const DeleteProfession = observer(({show, onHide}) => {

    const {profession} = useContext(Context)
    const id = profession.selectedProfession.id

    const deleteProfession = () =>{
        deleteProfessionAPI(id).then(data=> {
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
                    Удаление профессии
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Код
                    <Form.Control
                        value={profession.selectedProfession.id}
                        disabled
                    />
                    Название
                    <Form.Control
                        value={profession.selectedProfession.name}
                        disabled
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={deleteProfession}>Удалить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteProfession;