import React, {useContext, useEffect} from 'react';
import {Button, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {deleteList_genreAPI} from "../../../http/list_genreAPI";

const DeleteList_genre = observer(({show, onHide}) => {

    const {composition_admin} = useContext(Context)
    const {list_genre} = useContext(Context)
    const id = list_genre.selectedList_genre.id

    const deleteList_genre = () =>{
        deleteList_genreAPI(id).then(data=> {
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
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Удаление произвидение/жанр
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Код произвидение/жанр
                    <Form.Control
                        value={list_genre.selectedList_genre.id}
                        disabled
                    />
                    Произвидение
                    <Form.Control
                        value={list_genre.selectedList_genre.name_composition}
                        disabled
                    />
                    Постер
                    <br/>
                    <Image width={130} height={190}   src={process.env.REACT_APP_API_URL + composition_admin.selectedComposition.img}/>

                    <br/>
                    <br/>
                    Жанр
                    <Form.Control
                        value={list_genre.selectedList_genre.name_genre}
                        disabled
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={deleteList_genre}>Удалить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteList_genre;