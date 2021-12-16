import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import { useParams} from "react-router-dom";
import { fetchCompositionReviewAPI, updateCompositionReviewAPI} from "../../../http/compositionAPI";

const CreateReview = observer(({show, onHide}) => {
    const {user} = useContext(Context)
    const {review} = useContext(Context)
    const userId = user.user.id
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    if(user.isAuth)
    {
        useEffect(() => {
            if(review.selectedReview != null)
            {
                setTitle(review.selectedReview.title)
                setText(review.selectedReview.text)
            }
        },[review.selectedReview])
    }

    const updateReview = () =>{
        fetchCompositionReviewAPI(id, userId).then(data => {

            const title_2 = title.replace(/^\s+|\s+$/g, '')
            const text_2 = text.replace(/^\s+|\s+$/g, '')
            if (title_2 == '')
            {
                alert("Пустое поле Заголовок !!!!")
            }
            else if (text_2 == '')
            {
                alert("Пустое поле Тескт !!!!")
            }
            else if (title == data.title && text == data.text)
            {
                alert("Вы ничего не изменили !!!!")
            }
            else {
                // alert(id_review)
                const formData = new FormData()
                formData.append('id', `${data.id}`)
                formData.append('title', title)
                formData.append('text', text)
                formData.append('userId', userId)
                formData.append('compositionId', id)

                updateCompositionReviewAPI(formData).then(data => {
                    onHideFunction()
                })
            }
        })
    }

    const onHideFunction = () =>{
        fetchCompositionReviewAPI(id, userId).then(data => {
            review.setSelectedReview(data)
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
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменение рецензии
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
                <Button variant="outline-success" onClick={updateReview}>Изменить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateReview;