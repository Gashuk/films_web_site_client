import React, {useContext} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {deleteGenreAPI} from "../../../http/genreAPI";
import {fetchOneList_genreGenreAPI} from "../../../http/genreAPI";

const DeleteGenre = observer(({show, onHide}) => {

    const {genre} = useContext(Context)
    const id = genre.selectedGenre.id

    const deleteGenre = () =>{
        fetchOneList_genreGenreAPI(null, id).then(data => {
            alert(data)
            if(data != null)
            {
                alert("Этот жанр уже использеться в таблице 'Список произвидение/жанр'!!!!")
            }
            else
            {
                alert("нет")
                // deleteGenreAPI(id).then(data=> {
                //     onHide()
                // })
            }
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
                <Form >
                    Код
                    <Form.Control
                        value={genre.selectedGenre.id}
                        disabled
                    />
                    Название
                    <Form.Control
                        value={genre.selectedGenre.name}
                        disabled
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={deleteGenre}>Удалить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteGenre;