import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {fetchUserOneRatingAPI, addUserRatingAPI} from "../../../http/userAPI";

const AddRatingAdmin = observer(({show, onHide}) => {
    const {table} = useContext(Context)
    const {rating} = useContext(Context)
    const {composition_admin} = useContext(Context)
    const {user} = useContext(Context)
    const userId = user.user.id
    const [rate, setRate] = useState(null)
    const [img, setImg] = useState(table.defaultImg.defaultImgComposition)

    const addRating = () =>{

        if(composition_admin.selectedComposition.id == null)
        {
            alert("Вы не выбрали произведение!!!!")
        }
        else if(rate == null)
        {
            alert("Вы не поставили оценку!!!!")
        }
        else if(composition_admin.selectedComposition.id != null)
        {

            fetchUserOneRatingAPI(composition_admin.selectedComposition.id, userId).then(data => {
                if(data != null)
                {
                    alert("Вы уже ставили оценку этому произведению!!!!")
                }
                else
                {
                    const formData = new FormData()
                    formData.append('rate', rate)
                    formData.append('userId', userId)
                    formData.append('compositionId', composition_admin.selectedComposition.id)

                    addUserRatingAPI(formData).then(data=> {
                        onHideFunction()
                    })

                }
            })
        }
    }
    const onHideFunction = () =>{
        composition_admin.setSelectedComposition({})
            setRate(null)
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
                    Добавление оценки
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
                <Button variant="outline-danger" onClick={onHideFunction}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddRatingAdmin;