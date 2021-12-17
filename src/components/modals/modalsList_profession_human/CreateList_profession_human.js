import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {
    fetchOneList_profession_human_prof_humAPI,
    updateList_profession_humanAPI
} from "../../../http/list_profession_humanAPI";
import {fetchProfessionAPI} from "../../../http/professionAPI";
import {fetchHumanAPI} from "../../../http/humanAPI";

const CreateList_profession_human = observer(({show, onHide}) => {

    const {table} = useContext(Context)
    const {list_profession_human} = useContext(Context)
    const {profession} = useContext(Context)
    const {human} = useContext(Context)
    const id = list_profession_human.selectedList_profession_human.id
    const professionId = profession.selectedProfession.id
    const humanId = human.selectedHuman.id

    const [imgHuman, setImgHuman] = useState(table.defaultImg.defaultImgHumanUser)

    useEffect(()=>{
        fetchProfessionAPI().then(data => profession.setProfession(data))
        fetchHumanAPI().then(data => human.setHuman(data))
    },[list_profession_human.selectedList_profession_human])

    useEffect(()=>{
        setImgHuman(human.selectedHuman.img)
    },[human.selectedHuman])

    const updateList_profession_human = () =>{

        if(professionId == null)
        {
            alert("Не выбранное поле профессия!!!!")
        }
        else if(humanId == null)
        {
            alert("Пустое поле персона!!!!")
        }
        else if(list_profession_human.selectedList_profession_human.professionId == professionId &&
            list_profession_human.selectedList_profession_human.humanId == humanId)
        {
            alert("Вы ничего не изменили!!!!")
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
                    formData.append('id', `${id}`)
                    formData.append('professionId', professionId)
                    formData.append('humanId',humanId)
                    updateList_profession_humanAPI(formData).then(data=> {
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
                    Изменение профессия/персона
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
                <Button variant="outline-success" onClick={updateList_profession_human}>Изменить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateList_profession_human;