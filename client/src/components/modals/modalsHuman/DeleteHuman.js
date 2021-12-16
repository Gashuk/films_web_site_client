import React, {useContext} from 'react';
import {Button, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {deleteHumanAPI} from "../../../http/humanAPI";

const DeleteHuman = observer(({show, onHide}) => {

    const {human} = useContext(Context)
    const id = human.selectedHuman.id

    const deleteHuman = () =>{
        deleteHumanAPI(id).then(data=> {
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
                    Удаление жанра
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Код
                    <Form.Control
                        value={human.selectedHuman.id}
                        disabled
                    />
                    ФИО
                    <Form.Control
                        value={human.selectedHuman.fio}
                        disabled
                    />
                    Аватар
                    <Image width={130} height={190} className="m-2" src={process.env.REACT_APP_API_URL + human.selectedHuman.img}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={deleteHuman}>Удалить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteHuman;