import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {deleteCompositionAPI} from "../../../http/compositionAPI";

const DeleteComposition = observer(({show, onHide}) => {

    const {composition_admin} = useContext(Context)
    const id = composition_admin.selectedComposition.id
    const [year1, setYear1] = useState(null)

    const deleteComposition = () =>{
        deleteCompositionAPI(id).then(data=> {
            onHide()
        })
    }
    useEffect(()=>{
        const date = composition_admin.selectedComposition.year1;
        if(date != undefined)
        {
            setYear1(date.substr(8, 2) + "." + date.substr(5, 2) + "." + date.substr(0, 4))
        }
    },[composition_admin.selectedComposition])
    return (
        <Modal
            show = {show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удаление произведения
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Код
                    <Form.Control
                        value={composition_admin.selectedComposition.id}
                        disabled
                    />
                    Название
                    <Form.Control
                        value={composition_admin.selectedComposition.name}
                        disabled
                    />
                    Постер
                    <Image width={130} height={190} className="m-2" src={process.env.REACT_APP_API_URL + composition_admin.selectedComposition.img}/>
                    Дата
                    <Form.Control
                        value={year1}
                        disabled
                    />
                    Описание
                    <Form.Control
                        value={composition_admin.selectedComposition.description}
                        disabled
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={deleteComposition}>Удалить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteComposition;