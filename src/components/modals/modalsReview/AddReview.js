import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import { useParams} from "react-router-dom";
import { addCompositionReviewAPI} from "../../../http/compositionAPI";

const AddReview = observer(({show, onHide}) => {
    const {user} = useContext(Context)
    const userId = user.user.id
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const addReview = () =>{
        const title_2 = title.replace(/^\s+|\s+$/g, '')
        const text_2 = text.replace(/^\s+|\s+$/g, '')
        if(title_2 == '')
        {
            alert("Пустое поле Заголовок !!!!")
        }
        else if(text_2 == '')
        {
            alert("Пустое поле Тескт !!!!")
        }
        else
        {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('text', text)
            formData.append('userId', userId)
            formData.append('compositionId', id)

            addCompositionReviewAPI(formData).then(data=> {
                setText('')
                setTitle('')
                onHide()
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
                    Добавление рецензии
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Заголовок
                    <Form.Control
                        value={title}
                        onChange={e =>setTitle(e.target.value)}
                        placeholder={"Напишите заголовок"}

                    />
                    Текст 
                    <Form.Control
                        value={text}
                        onChange={e =>setText(e.target.value)}
                        placeholder={"Напишите текст"}

                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={addReview}>Добавить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddReview;