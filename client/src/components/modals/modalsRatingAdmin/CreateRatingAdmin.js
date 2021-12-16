import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {updateUserRatingAPI} from "../../../http/userAPI";

const CreateRatingAdmin = observer(({show, onHide}) => {

    const {rating} = useContext(Context)
    const {composition_admin} = useContext(Context)
    const id = rating.selectedRating.id
    const [rate, setRate] = useState(null)

    useEffect(() => {
        setRate(rating.selectedRating.rate)
    },[rating.selectedRating])

    const updateRating = () =>{
        if(rate == null)
        {
            alert("Вы не поставили оценку!!!!")
        }
        else if(rate == rating.selectedRating.rate)
        {
            alert("Вы не изменили оценку!!!!")
        }
        else
        {
            const formData = new FormData()
            formData.append('id', `${id}`)
            formData.append('rate', rate)

            updateUserRatingAPI(formData).then(data=> {onHide()})
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
                    Изменение оценки
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
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateRatingAdmin;