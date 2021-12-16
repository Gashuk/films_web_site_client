import React, {useContext} from 'react';
import {Button, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {deleteList_countryAPI} from "../../../http/list_counrtyAPI";

const DeleteList_country = observer(({show, onHide}) => {

    const {list_country} = useContext(Context)
    const {composition_admin} = useContext(Context)
    const id = list_country.selectedList_country.id

    const deleteList_country = () =>{
        deleteList_countryAPI(id).then(data=> {
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
                    Удаление произвидение/страна
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Код произвидение/страна
                    <Form.Control
                        value={list_country.selectedList_country.id}
                        disabled
                    />
                    Произвидение
                    <Form.Control
                        value={list_country.selectedList_country.name_composition}
                        disabled
                    />
                    Постер
                    <br/>
                    <Image width={130} height={190}   src={process.env.REACT_APP_API_URL + composition_admin.selectedComposition.img}/>

                    <br/>
                    <br/>
                    Страна
                    <Form.Control
                        value={list_country.selectedList_country.name_country}
                        disabled
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={deleteList_country}>Удалить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteList_country;