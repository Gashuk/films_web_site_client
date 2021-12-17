import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {addCountryAPI, fetchOneCountryAPI} from "../../../http/countryAPI";

const AddCountry = observer(({show, onHide}) => {

    const [name, setName] = useState('')

    const addCountry = () =>{
        const regex_name = name.replace(/^\s+|\s+$/g, '')

        if(regex_name == '')
        {
            alert("Пустое поле!!!!")
        }
        else
        {
            fetchOneCountryAPI(name).then(data => {
                if(data != null)
                {
                    alert("Такая страна уже есть!!!!")
                }
                else
                {
                    addCountryAPI({name:name}).then(data=> {
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
                    Добавление страны
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
                <Button variant="outline-success" onClick={addCountry}>Добавить</Button>
                <Button variant="outline-danger" onClick={onHideFunction}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddCountry;