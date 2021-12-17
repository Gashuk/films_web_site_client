import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {updateUserReviewAPI} from "../../../http/userAPI";

const CreateReviewAdmin = observer(({show, onHide}) => {

    const {review} = useContext(Context)
    const {composition_admin} = useContext(Context)
    const id = review.selectedReview.id
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    useEffect(() => {
        setTitle(review.selectedReview.title)
        setText(review.selectedReview.text)
    },[review.selectedReview])

    const updateReview = () =>{
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
        else if (title == review.selectedReview.title && text == review.selectedReview.text)
        {
            alert("Вы ничего не изменили !!!!")
        }
        else {
            // alert(id_review)
            const formData = new FormData()
            formData.append('id', `${id}`)
            formData.append('title', title)
            formData.append('text', text)

            updateUserReviewAPI(formData).then(data => {onHide()})
        }
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
                    Произведение
                    <Form.Control
                        value={composition_admin.selectedComposition.name}
                        disabled
                    />
                    <br/>
                    Постер
                    <br/>
                    <Image width={130} height={190}   src={process.env.REACT_APP_API_URL + composition_admin.selectedComposition.img}/>

                    <br/>
                    <br/>
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

export default CreateReviewAdmin;