import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Nav, Row, Table} from "react-bootstrap";
import Table_admin from "../components/Table_admin";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import CreateList_profession_human from "../components/modals/modalsList_profession_human/CreateList_profession_human";
import AddList_profession_human from "../components/modals/modalsList_profession_human/AddList_profession_human";
import DeleteList_profession_human from "../components/modals/modalsList_profession_human/DeleteList_profession_human";
import { fetchList_profession_humanAPI} from "../http/list_profession_humanAPI";
import {fetchOneProfessionAPI} from "../http/professionAPI";
import {fetchOneHumanAPI} from "../http/humanAPI";

const List_profession_humanPage = observer(() => {

    const {list_profession_human} = useContext(Context)
    const {profession} = useContext(Context)
    const {human} = useContext(Context)

    useEffect(()=>{
        fetchList_profession_humanAPI().then(data => list_profession_human.setList_profession_human(data))
    },[list_profession_human.setList_profession_human])

    const [addList_profession_humanVisible, setAddList_profession_humanVisible] = useState(false)
    const [createList_profession_humanVisible, setCreateList_profession_humanVisible] = useState(false)
    const [deleteList_profession_humanVisible, setDeleteList_profession_humanVisible] = useState(false)

    const fetchList_profession_humanFunction = () =>{
        fetchList_profession_humanAPI().then(data => list_profession_human.setList_profession_human(data))
        list_profession_human.setSelectedList_profession_human({})
        profession.setSelectedProfession({})
        human.setSelectedHuman({})
    }

    return (
        <Container className="mt-3" style={{ background: '#3C5B74'}}>
            <Row className="mt-2">
                <Col md={3}>
                    <Table_admin/>
                </Col>
                <Col md={9}>
                    <div> <h2 style={{ color: 'white'}}>Список профессия/персона</h2> </div>
                    <div className="d-flex justify-content-md-end align-items-center">
                        <Button variant="outline-info" onClick={()=> {
                            list_profession_human.setSelectedList_profession_human({})
                            profession.setSelectedProfession({})
                            human.setSelectedHuman({})
                            setAddList_profession_humanVisible(true)
                        }} className="m-2" >Добавить</Button>
                    </div>


                    <Table striped bordered hover size="sm" style={{ background: 'white'}}>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>Код профессии</th>
                            <th>Профессия</th>
                            <th>Код персоны</th>
                            <th>Персона</th>
                            <th>Автарка</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {list_profession_human.list_profession_human.map(list_profession_humans =>
                            <tr>
                                <td>{list_profession_humans.id}</td>
                                <td>{list_profession_humans.professionId}</td>
                                <td>{list_profession_humans.name_profession}</td>
                                <td>{list_profession_humans.humanId}</td>
                                <td>{list_profession_humans.name_human}</td>
                                <td><Image width={50} height={50}  src={process.env.REACT_APP_API_URL + list_profession_humans.img_human}/></td>
                                <td>
                                    <Button variant="outline-success" className="m-2"
                                            onClick={()=> {
                                                fetchOneProfessionAPI(list_profession_humans.name_profession).then(data => {profession.setSelectedProfession(data)})
                                                fetchOneHumanAPI(list_profession_humans.humanId).then(data => { human.setSelectedHuman(data)})
                                                list_profession_human.setSelectedList_profession_human(list_profession_humans)
                                                setCreateList_profession_humanVisible(true)
                                            }}
                                    >Изменить</Button>
                                    <Button variant="outline-danger" className="m-2"
                                            onClick={()=> {
                                                fetchOneProfessionAPI(list_profession_humans.name_profession).then(data => {profession.setSelectedProfession(data)})
                                                fetchOneHumanAPI(list_profession_humans.humanId).then(data => { human.setSelectedHuman(data)})
                                                list_profession_human.setSelectedList_profession_human(list_profession_humans)
                                                setDeleteList_profession_humanVisible(true)
                                            }}
                                    >Удалить</Button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <AddList_profession_human show={addList_profession_humanVisible} onHide={()=> {
                setAddList_profession_humanVisible(false)
                fetchList_profession_humanFunction()
            }}/>
            <CreateList_profession_human show={createList_profession_humanVisible} onHide={()=> {
                setCreateList_profession_humanVisible(false)
                fetchList_profession_humanFunction()
            }}/>
            <DeleteList_profession_human show={deleteList_profession_humanVisible} onHide={()=> {
                setDeleteList_profession_humanVisible(false)
                fetchList_profession_humanFunction()
            }}/>
        </Container>
    );
});

export default List_profession_humanPage;