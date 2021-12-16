import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {addCompositionRatingAPI} from "../../../http/compositionAPI";

const AddRating = observer(({show, onHide}) => {
    const {rating} = useContext(Context)
    const {user} = useContext(Context)
    const userId = user.user.id
    const {id} = useParams()
    const [rate, setRate] = useState(null)

    const addRating = () =>{

        if(rate == null)
        {
            alert("Вы не поставили оценку!!!!")
        }
        else
        {
            const formData = new FormData()
            formData.append('rate', rate)
            formData.append('userId', userId)
            formData.append('compositionId', id)

            addCompositionRatingAPI(formData).then(data=> {
                setRate(null)
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
                    Добавление оценки
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Оценка
                    <Dropdown>
                        <Dropdown.Toggle>
                            {rate || "Выбирите оценку"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {rating.rate.map(rate =>
                                <Dropdown.Item
                                    onClick={() => {
                                        setRate(rate)
                                        rating.setSelectedRate(rate)
                                    }}
                                >
                                    {rate}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={addRating}>Добавить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddRating;