import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {addProfessionAPI, fetchOneProfessionAPI} from "../../../http/professionAPI";

const AddProfession = observer(({show, onHide}) => {

    const [name, setName] = useState('')

    const addProfession = () =>{
        const regex_name = name.replace(/^\s+|\s+$/g, '')

        if(regex_name == '')
        {
            alert("Пустое поле!!!!")
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
                    addProfessionAPI({name:name}).then(data=> {
                        onHideFunction()
                    })
                }
            })
        }
    }

    const onHideFunction = () =>{
        setName('')
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
                    Добавление профессии
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Название
                    <Form.Control
                        value={name}
                        onChange={e =>setName(e.target.value)}
                        placeholder={"Введите название"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={addProfession}>Добавить</Button>
                <Button variant="outline-danger" onClick={onHideFunction}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddProfession;