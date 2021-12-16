import React, {useContext} from 'react';
import {Button, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {deleteList_composition_humanAPI} from "../../../http/list_composition_humanAPI";

const DeleteList_composition_human = observer(({show, onHide}) => {

    const {list_composition_human} = useContext(Context)
    const {composition_admin} = useContext(Context)
    const {list_profession_human} = useContext(Context)
    const id = list_composition_human.selectedList_composition_human.id

    const deleteList_composition_human = () =>{
        deleteList_composition_humanAPI(id).then(data=> {
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
                    Удаление произведение/персона/профессия
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Код произведение/персона/профессия
                    <Form.Control
                        value={list_composition_human.selectedList_composition_human.id}
                        disabled
                    />
                    Произвидение
                    <Form.Control
                        value={list_composition_human.selectedList_composition_human.name_composition}
                        disabled
                    />
                    Постер
                    <br/>
                    <Image width={130} height={190}   src={process.env.REACT_APP_API_URL + composition_admin.selectedComposition.img}/>

                    <br/>
                    <br/>
                    Профессия
                    <Form.Control
                        value={list_composition_human.selectedList_composition_human.name_profession}
                        disabled
                    />

                    Персона
                    <Form.Control
                        value={list_composition_human.selectedList_composition_human.name_human}
                        disabled
                    />
                    Аватар
                    <br/>
                    <Image width={130} height={190}   src={process.env.REACT_APP_API_URL + list_profession_human.selectedList_profession_human.img_human}/>

                    <br/>
                    <br/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={deleteList_composition_human}>Удалить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteList_composition_human;