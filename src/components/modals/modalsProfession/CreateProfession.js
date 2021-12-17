import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {fetchOneProfessionAPI, updateProfessionAPI} from "../../../http/professionAPI";

const CreateProfession = observer(({show, onHide}) => {

    const {profession} = useContext(Context)
    const id = profession.selectedProfession.id
    const [name, setName] = useState(profession.selectedProfession.name)

    useEffect(() => {
        setName(profession.selectedProfession.name)
    },[profession.selectedProfession])

    const updateProfession = () =>{

        const regex_name = name.replace(/^\s+|\s+$/g, '')

        if(regex_name == '')
        {
            alert("Пустое поле!!!!")
        }
        else if(regex_name == profession.selectedProfession.name)
        {
            alert("Старое название!!!!")
        }
        else
        {
            fetchOneProfessionAPI(name).then(data => {
                if(data != null)
                {
                    alert("Такой жанр уже есть!!!!")
                }
                else
                {
                    const formData = new FormData()
                    formData.append('id', `${id}`)
                    formData.append('name', name)
                    updateProfessionAPI(formData).then(data=> {
                        onHide()
                    })
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
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменение профессии
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Код
                    <Form.Control
                        value={profession.selectedProfession.id}
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
                <Button variant="outline-success" onClick={updateProfession}>Изменить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProfession;