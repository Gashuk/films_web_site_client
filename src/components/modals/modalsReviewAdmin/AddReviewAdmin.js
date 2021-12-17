import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {addUserReviewAPI, fetchUserOneReviewAPI } from "../../../http/userAPI";

const AddReviewAdmin = observer(({show, onHide}) => {
    const {table} = useContext(Context)
    const {composition_admin} = useContext(Context)
    const {user} = useContext(Context)
    const userId = user.user.id
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [img, setImg] = useState(table.defaultImg.defaultImgComposition)


    const addReview = () =>{

        const title_2 = title.replace(/^\s+|\s+$/g, '')
        const text_2 = text.replace(/^\s+|\s+$/g, '')
        if(composition_admin.selectedComposition.id == null)
        {
            alert("Вы не выбрали произведение!!!!")
        }
        else if(title_2 == '')
        {
            alert("Пустое поле Заголовок !!!!")
        }
        else if(text_2 == '')
        {
            alert("Пустое поле Тескт !!!!")
        }
        else if(composition_admin.selectedComposition.id != null)
        {
            fetchUserOneReviewAPI(composition_admin.selectedComposition.id, userId).then(data => {
                if(data != null)
                {
                    alert("Вы уже писали рецензию этому произведению!!!!")
                }
                else
                {
                    const formData = new FormData()
                    formData.append('title', title)
                    formData.append('text', text)
                    formData.append('userId', userId)
                    formData.append('compositionId', composition_admin.selectedComposition.id)

                    addUserReviewAPI(formData).then(data=> {
                        onHideFunction()
                    })
                }
            })
        }
    }
    const onHideFunction = () =>{
        composition_admin.setSelectedComposition({})
        setText('')
        setTitle('')
        setImg(table.defaultImg.defaultImgComposition)
        onHide()

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
                    Произведение / Постер
                    <Dropdown>
                        <Dropdown.Toggle>
                            {composition_admin.selectedComposition.name || "Выбирите Произведение / Постер"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {composition_admin.composition.map(compositions =>
                                <Dropdown.Item className="d-flex justify-content-between align-items-center"
                                               onClick={() => {
                                                   composition_admin.setSelectedComposition(compositions)
                                                   setImg(compositions.img)
                                               }}
                                >
                                    {compositions.name} / <Image width={50} height={50}  src={process.env.REACT_APP_API_URL + compositions.img}/>
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <br/>
                    Постер
                    <br/>
                    <Image width={130} height={190}   src={process.env.REACT_APP_API_URL + img}/>

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
                <Button variant="outline-success" onClick={addReview}>Добавить</Button>
                <Button variant="outline-danger" onClick={onHideFunction}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddReviewAdmin;