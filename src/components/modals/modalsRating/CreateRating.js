import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {fetchCompositionRatingAPI, updateCompositionRatingAPI} from "../../../http/compositionAPI";

const CreateRating = observer(({show, onHide}) => {
    const {rating} = useContext(Context)
    const {user} = useContext(Context)
    const userId = user.user.id
    const {id} = useParams()
    const [rate, setRate] = useState(null)


    if(user.isAuth)
    {
        useEffect(() => {
            setRate(rating.selectedRate)
        },[rating.selectedRate])
    }

    const updateRating = () =>{
        fetchCompositionRatingAPI(id, userId).then(data =>
        {
            if(rate == null)
            {
                alert("Вы не поставили оценку!!!!")
            }
            else if(rate == data.rate)
            {
                alert("Вы не изменили оценку!!!!")
            }
            else
            {
                const formData = new FormData()
                formData.append('id', `${data.id}`)
                formData.append('rate', rate)
                formData.append('userId', userId)
                formData.append('compositionId', id)

                updateCompositionRatingAPI(formData).then(data=> {onHideFunction()})
            }
        })
    }

    const onHideFunction = () =>{
        fetchCompositionRatingAPI(id, userId).then(data => {
            rating.setSelectedRate(rate)
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
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменение оценки
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
                <Button variant="outline-success" onClick={updateRating}>Изменить</Button>
                <Button variant="outline-danger" onClick={onHideFunction}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateRating;