import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {fetchOneGenreAPI, updateGenreAPI} from "../../../http/genreAPI";

const CreateGenre = observer(({show, onHide}) => {

    const {genre} = useContext(Context)
    const id = genre.selectedGenre.id
    const [name, setName] = useState('')

    useEffect(() => {
        setName(genre.selectedGenre.name)
    },[genre.selectedGenre])

    const updateGenre = () =>{

        const name_regex = name.replace(/^\s+|\s+$/g, '')

        if(name_regex == '')
        {
            alert("Пустое поле!!!!")
        }
        else if(name_regex == genre.selectedGenre.name)
        {
            alert("Старое название!!!!")
        }
        else
        {
            fetchOneGenreAPI(name).then(data => {
                if(data != null)
                {
                    alert("Такой жанр уже есть!!!!")
                }
                else
                {
                    const formData = new FormData()
                    formData.append('id', `${id}`)
                    formData.append('name', name)

                    updateGenreAPI(formData).then(data=> {onHide()})
                }
            })
        }
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
                    Изменение жанра
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
                        value={name}
                        onChange={e =>setName(e.target.value)}
                        placeholder={"Введите название"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={updateGenre}>Изменить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateGenre;