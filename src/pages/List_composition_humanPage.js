import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Nav, Row, Table} from "react-bootstrap";
import Table_admin from "../components/Table_admin";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import CreateList_composition_human from "../components/modals/modalsList_composition_human/CreateList_composition_human";
import AddList_composition_human from "../components/modals/modalsList_composition_human/AddList_composition_human";
import DeleteList_composition_human from "../components/modals/modalsList_composition_human/DeleteList_composition_human";
import {fetchList_composition_humanAPI} from "../http/list_composition_humanAPI";
import {fetchOneCompositionAPI} from "../http/compositionAPI";
import {
    fetchOneList_profession_humanAPI
} from "../http/list_profession_humanAPI";

const List_composition_humanPage = observer(() => {

    const {list_composition_human} = useContext(Context)
    const {composition_admin} = useContext(Context)
    const {list_profession_human} = useContext(Context)

    useEffect(()=>{
        fetchList_composition_humanAPI().then(data => list_composition_human.setList_composition_human(data))
    },[list_composition_human.setList_composition_human])

    const [addList_composition_humanVisible, setAddList_composition_humanVisible] = useState(false)
    const [createList_composition_humanVisible, setCreateList_composition_humanVisible] = useState(false)
    const [deleteList_composition_humanVisible, setDeleteList_composition_humanVisible] = useState(false)

    const fetchList_composition_humanFunction = () =>{
        fetchList_composition_humanAPI().then(data => list_composition_human.setList_composition_human(data))
        list_composition_human.setSelectedList_composition_human({})
        composition_admin.setSelectedComposition({})
        list_profession_human.setSelectedList_profession_human({})
    }

    return (
        <Container className="mt-3" style={{ background: '#3C5B74'}}>
            <Row className="mt-2">
                <Col md={3}>
                    <Table_admin/>
                </Col>
                <Col md={9}>
                    <div> <h2 style={{ color: 'white'}}>Список произведение/персона/профессия</h2> </div>
                    <div className="d-flex justify-content-md-end align-items-center">
                        <Button variant="outline-info" onClick={()=> {
                            list_composition_human.setSelectedList_composition_human({})
                            composition_admin.setSelectedComposition({})
                            list_profession_human.setSelectedList_profession_human({})
                            setAddList_composition_humanVisible(true)
                        }} className="m-2" >Добавить</Button>
                    </div>


                    <Table striped bordered hover size="sm" style={{ background: 'white'}}>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>Код произведения</th>
                            <th>Произведение</th>
                            <th>Постер</th>
                            <th>Профессия</th>
                            <th>Персона</th>
                            <th>Автарка</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {list_composition_human.list_composition_human.map(list_composition_humans =>
                            <tr>
                                <td>{list_composition_humans.id}</td>
                                <td>{list_composition_humans.compositionId}</td>
                                <td>{list_composition_humans.name_composition}</td>
                                <td><Image width={50} height={50} src={process.env.REACT_APP_API_URL +list_composition_humans.img_composition}/></td>
                                <td>{list_composition_humans.name_profession}</td>
                                <td>{list_composition_humans.name_human}</td>
                                <td><Image width={50} height={50}  src={process.env.REACT_APP_API_URL + list_composition_humans.img_human}/></td>
                                <td>
                                    <Button variant="outline-success" className="m-2"
                                            onClick={()=> {
                                                fetchOneCompositionAPI(list_composition_humans.compositionId).then(data => {composition_admin.setSelectedComposition(data)})
                                                fetchOneList_profession_humanAPI(list_composition_humans.listProfessionHumanId).then(data => { list_profession_human.setSelectedList_profession_human(data)})
                                                list_composition_human.setSelectedList_composition_human(list_composition_humans)
                                                setCreateList_composition_humanVisible(true)
                                            }}
                                    >Изменить</Button>
                                    <Button variant="outline-danger" className="m-2"
                                            onClick={()=> {
                                                fetchOneCompositionAPI(list_composition_humans.compositionId).then(data => {composition_admin.setSelectedComposition(data)})
                                                fetchOneList_profession_humanAPI(list_composition_humans.listProfessionHumanId).then(data => { list_profession_human.setSelectedList_profession_human(data)})
                                                list_composition_human.setSelectedList_composition_human(list_composition_humans)
                                                setDeleteList_composition_humanVisible(true)
                                            }}
                                    >Удалить</Button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <AddList_composition_human show={addList_composition_humanVisible} onHide={()=> {
                setAddList_composition_humanVisible(false)
                fetchList_composition_humanFunction()
            }}/>
            <CreateList_composition_human show={createList_composition_humanVisible} onHide={()=> {
                setCreateList_composition_humanVisible(false)
                fetchList_composition_humanFunction()
            }}/>
            <DeleteList_composition_human show={deleteList_composition_humanVisible} onHide={()=> {
                setDeleteList_composition_humanVisible(false)
                fetchList_composition_humanFunction()
            }}/>
        </Container>
    );
});

export default List_composition_humanPage;