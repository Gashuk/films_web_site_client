import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {
    addList_profession_humanAPI,
    fetchList_profession_humanAPI,
    fetchOneList_profession_human_prof_humAPI
} from "../../../http/list_profession_humanAPI";
import {fetchHumanAPI} from "../../../http/humanAPI";
import {fetchProfessionAPI} from "../../../http/professionAPI";
import {addList_composition_humanAPI, fetchOneList_composition_humanAPI} from "../../../http/list_composition_humanAPI";

const AddList_profession_human = observer(({show, onHide}) => {

    const {table} = useContext(Context)
    const {list_profession_human} = useContext(Context)
    const {profession} = useContext(Context)
    const {human} = useContext(Context)
    const professionId = profession.selectedProfession.id
    const humanId = human.selectedHuman.id

    const [imgHuman, setImgHuman] = useState(table.defaultImg.defaultImgHumanUser)

    useEffect(()=>{
        fetchProfessionAPI().then(data => profession.setProfession(data))
        fetchHumanAPI().then(data => human.setHuman(data))
    },[list_profession_human.selectedList_profession_human])

    const addList_profession_human = () =>{
        if(professionId == null)
        {
            alert("Не выбранное поле профессия!!!!")
        }
        else if(humanId == null)
        {
            alert("Пустое поле персона!!!!")
        }
        else
        {
            fetchOneList_profession_human_prof_humAPI(professionId, humanId).then(data => {
                if(data != null)
                {
                    alert("Вы уже добавляли профессию этой персоне!!!!")
                }
                else
                {
                    const formData = new FormData()
                    formData.append('professionId', professionId)
                    formData.append('humanId',humanId)
                    addList_profession_humanAPI(formData).then(data=> {
                        onHideFunction()
                    })
                }
            })

        }
    }

    const onHideFunction = () =>{
        list_profession_human.setSelectedList_profession_human({})
        profession.setSelectedProfession({})
        human.setSelectedHuman({})
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
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавление профессия/персона
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Код профессии / Профессия
                        <Dropdown>
                            <Dropdown.Toggle>
                                {profession.selectedProfession.id || "Выбирите Код профессии"} / {profession.selectedProfession.name || "Профессия"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {profession.profession.map(professions =>
                                    <Dropdown.Item
                                        onClick={() => profession.setSelectedProfession(professions)}
                                    >
                                        {professions.id} / {professions.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    Код персоны / Персона / Аватар
                    <Dropdown>
                        <Dropdown.Toggle>
                            {human.selectedHuman.id || "Выбирите Код персоны"} / {human.selectedHuman.fio || "Персона"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {human.human.map(humans =>
                                <Dropdown.Item
                                    onClick={() => {
                                        human.setSelectedHuman(humans)
                                        setImgHuman(humans.img)
                                    }}
                                >
                                    {humans.id} / {humans.fio} <Image width={50} height={50}  src={process.env.REACT_APP_API_URL + humans.img}/>
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
                <Button variant="outline-success" onClick={addList_profession_human} >Добавить</Button>
                <Button variant="outline-danger" onClick={onHideFunction}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddList_profession_human;