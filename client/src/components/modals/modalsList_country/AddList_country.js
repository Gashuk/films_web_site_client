import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {fetchCompositionAPI} from "../../../http/compositionAPI";
import {fetchCountryAPI} from "../../../http/countryAPI";
import {addList_countryAPI, fetchOneList_countryAPI} from "../../../http/list_counrtyAPI";

const AddList_country = observer(({show, onHide}) => {

    const {table} = useContext(Context)
    const {list_country} = useContext(Context)
    const {country} = useContext(Context)
    const {composition_admin} = useContext(Context)
    const compositionId = composition_admin.selectedComposition.id
    const countryId = country.selectedCountry.id

    const [img, setImg] = useState(table.defaultImg.defaultImgComposition)

    useEffect(()=>{
        fetchCompositionAPI(null, null).then(data => composition_admin.setComposition(data.rows))
        fetchCountryAPI().then(data => country.setCountry(data))
    },[list_country.selectedList_country])

    const addList_country = () =>{

        if(compositionId == null)
        {
            alert("Не выбранное поле произвидение!!!!")
        }
        else if(countryId == null)
        {
            alert("Пустое поле страна!!!!")
        }
        else
        {
            fetchOneList_countryAPI(compositionId, countryId).then(data => {
                if(data != null)
                {
                    alert("Вы уже добавляли страну этому произведению!!!!")
                }
                else
                {
                    const formData = new FormData()
                    formData.append('compositionId', compositionId)
                    formData.append('countryId', countryId)
                    addList_countryAPI(formData).then(data=> {
                        onHideFunction()
                    })
                }
            })

        }
    }

    const onHideFunction = () =>{
        composition_admin.setSelectedComposition({})
        country.setSelectedCountry({})
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
                    Добавление произвидение/страна
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Код произведения / Произведение / Постер
                    <Dropdown>
                        <Dropdown.Toggle>
                            {composition_admin.selectedComposition.id || "Выбирите Код произведение"} / {composition_admin.selectedComposition.name || "Произведение"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {composition_admin.composition.map(compositions =>
                                <Dropdown.Item className="d-flex justify-content-between align-items-center"
                                               onClick={() => {
                                                   composition_admin.setSelectedComposition(compositions)
                                                   setImg(compositions.img)
                                               }}
                                >
                                    {compositions.id} / {compositions.name} / <Image width={50} height={50}  src={process.env.REACT_APP_API_URL + compositions.img}/>
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    Постер
                    <br/>
                    <Image width={130} height={190}   src={process.env.REACT_APP_API_URL + img}/>

                    <br/>
                    <br/>
                    Код страны / Страна
                    <Dropdown>
                        <Dropdown.Toggle>
                            {country.selectedCountry.id || "Выбирите Код страны"} / {country.selectedCountry.name || "Страна"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {country.country.map(list_countries =>
                                <Dropdown.Item className="d-flex justify-content-between align-items-center"
                                               onClick={() => country.setSelectedCountry(list_countries)}
                                >
                                    {list_countries.id} / {list_countries.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={addList_country} >Добавить</Button>
                <Button variant="outline-danger" onClick={onHideFunction}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddList_country;