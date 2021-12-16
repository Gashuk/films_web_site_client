import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {updateTypeAPI,fetchOneTypeAPI} from "../../../http/typeAPI";

const CreateType = observer(({show, onHide}) => {

    const {type} = useContext(Context)
    const id = type.selectedType.id
    const [name, setName] = useState('')

    useEffect(() => {
        setName(type.selectedType.name)
    },[type.selectedType])

    const updateType = () =>{

        const regex_name = name.replace(/^\s+|\s+$/g, '')

        if(regex_name == '')
        {
            alert("Пустое поле!!!!")
        }
        else if(regex_name == type.selectedType.name)
        {
            alert("Старое название!!!!")
        }
        else
        {
            fetchOneTypeAPI(name).then(data => {
                if(data != null)
                {
                    alert("Такой тип уже есть!!!!")
                }
                else
                {
                    const formData = new FormData()
                    formData.append('id', `${id}`)
                    formData.append('name', name)
                    updateTypeAPI(formData).then(data=> {
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
                    Изменение типа произведения
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Код
                    <Form.Control
                        value={type.selectedType.id}
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
                <Button variant="outline-success" onClick={updateType}>Изменить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateType;