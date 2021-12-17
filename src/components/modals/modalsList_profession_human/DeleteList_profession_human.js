import React, {useContext} from 'react';
import {Button, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {deleteList_profession_humanAPI} from "../../../http/list_profession_humanAPI";

const DeleteList_profession_human = observer(({show, onHide}) => {

    const {list_profession_human} = useContext(Context)
    const {human} = useContext(Context)
    const id = list_profession_human.selectedList_profession_human.id

    const deleteList_profession_human = () =>{
        deleteList_profession_humanAPI(id).then(data=> {
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
                    Удаление профессия/персона
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Код
                    <Form.Control
                        value={list_profession_human.selectedList_profession_human.id}
                        disabled
                    />
                    Профессия
                    <Form.Control
                        value={list_profession_human.selectedList_profession_human.name_profession}
                        disabled
                    />
                    Персона
                    <Form.Control
                        value={list_profession_human.selectedList_profession_human.name_human}
                        disabled
                    />
                    Аватар
                    <br/>
                    <Image width={130} height={190}   src={process.env.REACT_APP_API_URL + human.selectedHuman.img}/>

                    <br/>
                    <br/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={deleteList_profession_human}>Удалить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteList_profession_human;