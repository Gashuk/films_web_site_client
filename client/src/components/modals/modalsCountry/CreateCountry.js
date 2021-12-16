import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {fetchOneCountryAPI, updateCountryAPI} from "../../../http/countryAPI";

const CreateCountry = observer(({show, onHide}) => {

    const {country} = useContext(Context)
    const id = country.selectedCountry.id
    const [name, setName] = useState(country.selectedCountry.name)

    useEffect(() => {
        setName(country.selectedCountry.name)
    },[country.selectedCountry])

    const updateCountry = () =>{

        const regex_name = name.replace(/^\s+|\s+$/g, '')

        if(regex_name == '')
        {
            alert("Пустое поле!!!!")
        }
        else if(regex_name == country.selectedCountry.name)
        {
            alert("Старое название!!!!")
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
                    const formData = new FormData()
                    formData.append('id', `${id}`)
                    formData.append('name', name)
                    updateCountryAPI(formData).then(data=> {
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
                    Изменение страны
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Код
                    <Form.Control
                        value={country.selectedCountry.id}
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
                <Button variant="outline-success" onClick={updateCountry}>Изменить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateCountry;