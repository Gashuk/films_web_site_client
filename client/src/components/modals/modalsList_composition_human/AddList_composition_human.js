import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {fetchCompositionAPI} from "../../../http/compositionAPI";//
import {
    addList_composition_humanAPI,
    fetchOneList_composition_humanAPI
} from "../../../http/list_composition_humanAPI";
import {fetchList_profession_humanAPI} from "../../../http/list_profession_humanAPI";

const AddList_composition_human = observer(({show, onHide}) => {

    const {table} = useContext(Context)
    const {list_composition_human} = useContext(Context)
    const {composition_admin} = useContext(Context)
    const {list_profession_human} = useContext(Context)
    const compositionId = composition_admin.selectedComposition.id
    const list_profession_humanId = list_profession_human.selectedList_profession_human.id
    const [imgComposition, setImgComposition] = useState(table.defaultImg.defaultImgComposition)
    const [imgHuman, setImgHuman] = useState(table.defaultImg.defaultImgHumanUser)


    useEffect(()=>{
        fetchCompositionAPI(null, null).then(data => composition_admin.setComposition(data.rows))
        fetchList_profession_humanAPI().then(data => list_profession_human.setList_profession_human(data))
    },[list_composition_human.selectedList_composition_human])

    const addList_composition_human = () =>{

        if(compositionId == null)
        {
            alert("Не выбранное поле произвидение!!!!")
        }
        else if(list_profession_humanId == null)
        {
            alert("Не выбранное поле профессия / персона!!!!")
        }
        else
        {
            fetchOneList_composition_humanAPI(compositionId, list_profession_humanId).then(data => {
                if(data != null)
                {
                    alert("Вы уже добавляли профессия / персона этому произведению!!!!")
                }
                else
                {
                    const formData = new FormData()
                    formData.append('compositionId',compositionId)
                    formData.append('listProfessionHumanId', list_profession_humanId)
                    addList_composition_humanAPI(formData).then(data=> {
                        onHideFunction()
                    })
                }
            })

        }
    }

    const onHideFunction = () =>{
        composition_admin.setSelectedComposition({})
        list_profession_human.setSelectedList_profession_human({})
        setImgComposition(table.defaultImg.defaultImgComposition)
        setImgHuman(table.defaultImg.defaultImgHumanUser)
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
                    Добавление произведение/персона/профессия
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
                                                   setImgComposition(compositions.img)
                                               }}
                                >
                                    {compositions.id} / {compositions.name} / <Image width={50} height={50}  src={process.env.REACT_APP_API_URL + compositions.img}/>
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    Постер
                    <br/>
                    <Image width={130} height={190}   src={process.env.REACT_APP_API_URL + imgComposition}/>

                    <br/>
                    <br/>
                    Код персона / профессия ; Персона / аватар / профессия
                    <Dropdown>
                        <Dropdown.Toggle>
                            {list_profession_human.selectedList_profession_human.id || "Выбирите  Код персона / профессия"} ; {list_profession_human.selectedList_profession_human.name_human || "Персона / аватар"} / {list_profession_human.selectedList_profession_human.name_profession || "профессия"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {list_profession_human.list_profession_human.map(list_profession_humans =>
                                <Dropdown.Item className="d-flex justify-content-between align-items-center"
                                    onClick={() => {
                                        list_profession_human.setSelectedList_profession_human(list_profession_humans)
                                        setImgHuman(list_profession_humans.img_human)
                                    }}
                                >
                                    {list_profession_humans.id} ; {list_profession_humans.name_human} / <Image width={50} height={50}  src={process.env.REACT_APP_API_URL + list_profession_humans.img_human}/> / {list_profession_humans.name_profession}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    Аватар
                    <br/>
                    <Image width={130} height={190}   src={process.env.REACT_APP_API_URL + imgHuman}/>

                    <br/>
                    <br/>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={addList_composition_human} >Добавить</Button>
                <Button variant="outline-danger" onClick={onHideFunction}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddList_composition_human;