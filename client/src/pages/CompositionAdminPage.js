import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Nav, Row, Table} from "react-bootstrap";
import Table_admin from "../components/Table_admin";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import AddComposition from "../components/modals/modalsComposition/AddComposition";
import CreateComposition from "../components/modals/modalsComposition/CreateComposition";
import DeleteComposition from "../components/modals/modalsComposition/DeleteComposition";
import {fetchCompositionAPI} from "../http/compositionAPI";
import {fetchOneTypeAPI} from "../http/typeAPI";

const CompositionAdminPage = observer(() => {

    const {composition_admin} = useContext(Context)
    const {type} = useContext(Context)

    useEffect(()=>{
        fetchCompositionAPI(null, null).then(data => composition_admin.setComposition(data.rows))
    },[composition_admin.setComposition])

    const [addCompositionVisible, setAddCompositionVisible] = useState(false)
    const [createCompositionVisible, setCreateCompositionVisible] = useState(false)
    const [deleteCompositionVisible, setDeleteCompositionVisible] = useState(false)

    const fetchCompositionAdminFunction = () =>{
        fetchCompositionAPI(null, null).then(data => composition_admin.setComposition(data.rows))
        composition_admin.setSelectedComposition({})
        type.setSelectedType({})
    }
    const getRate = (rating) => {
        const new_rate = rating / 10
        if((`${new_rate}`).length == 1 || new_rate == 10)
        {
            return(rating / 10 + ".0")
        }
        else
        {
            return(rating / 10)
        }
    };
// console.log(table[0])
    return (
        <Container className="mt-3" style={{ background: '#3C5B74'}}>
            <Row className="mt-2">
                <Col md={3}>
                    <Table_admin/>
                </Col>
                <Col md={9}>
                    <div> <h2 style={{ color: 'white'}}>Произвидения</h2> </div>
                    <div className="d-flex justify-content-md-end align-items-center">
                        <Button variant="outline-info" onClick={()=> {
                            composition_admin.setSelectedComposition({})
                            type.setSelectedType({})
                            setAddCompositionVisible(true)
                        }} className="m-2" >Добавить</Button>
                    </div>


                    <Table striped bordered hover size="sm" style={{ background: 'white'}}>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>Название</th>
                            <th>Код типа</th>
                            <th>Тип </th>
                            <th>Постер</th>
                            <th>Рейтинг</th>
                            <th>Дата премьеры</th>
                            <th>Описание</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {composition_admin.composition.map(composition =>
                            <tr>
                                <td>{composition.id}</td>
                                <td>{composition.name}</td>
                                <td>{composition.typeId}</td>
                                <td>{composition.name_type}</td>
                                <td><Image width={150} height={220} src={process.env.REACT_APP_API_URL +composition.img}/></td>
                                <td>{getRate(composition.rating)}</td>
                                <td>{composition.year1.substr(8, 2)}.{composition.year1.substr(5, 2)}.{composition.year1.substr(0, 4)}</td>
                                <td>{composition.description}</td>
                                <td>
                                    <Button variant="outline-success" className="m-2"
                                            onClick={()=> {
                                                fetchOneTypeAPI(composition.name_type).then(data => { type.setSelectedType(data)})
                                                composition_admin.setSelectedComposition(composition)
                                                setCreateCompositionVisible(true)
                                            }}
                                    >Изменить</Button>
                                    <Button variant="outline-danger" className="m-2"
                                            onClick={()=> {
                                                fetchOneTypeAPI(composition.name_type).then(data => type.setSelectedType(data))
                                                composition_admin.setSelectedComposition(composition)
                                                setDeleteCompositionVisible(true)
                                            }}
                                    >Удалить</Button>
                                </td>

                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <AddComposition show={addCompositionVisible} onHide={()=> {
                setAddCompositionVisible(false)
                fetchCompositionAdminFunction()
            }}/>
            <CreateComposition show={createCompositionVisible} onHide={()=> {
                setCreateCompositionVisible(false)
                fetchCompositionAdminFunction()

            }}/>
            <DeleteComposition show={deleteCompositionVisible} onHide={()=> {
                setDeleteCompositionVisible(false)
                fetchCompositionAdminFunction()
            }}/>
        </Container>
    );
});

export default CompositionAdminPage;