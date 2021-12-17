import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Nav, Row, Table} from "react-bootstrap";
import Table_admin from "../components/Table_admin";
import {Context} from "../index";
import CreateGenre from "../components/modals/modalsGenre/CreateGenre";
import {observer} from "mobx-react-lite";
import {ADMIN_ROUTE, COMPOSITION_ROUTE_ADMIN, GENRE_ROUTE} from "../utils/consts";
import AddGenre from "../components/modals/modalsGenre/AddGenre";
import DeleteGenre from "../components/modals/modalsGenre/DeleteGnere";
import {addGenreAPI, fetchGenreAPI, fetchHumanAPI} from "../http/compositionAPI";
import {useHistory, useParams} from "react-router-dom";

const GenrePage = observer(() => {
    // const {table} = useContext(Context)
    // const history = useHistory()
    // useEffect(()=>{
    //     fetchGenreAPI().then(data => table.setGenre(data))
    // },[])
    // const [addGenreVisible, setAddGenreVisible] = useState(false)
    // const [createGenreVisible, setCreateGenreVisible] = useState(false)
    // const [deleteGenreVisible, setDeleteGenreVisible] = useState(false)


    return (
        <Container className="mt-3" style={{ background: '#3C5B74'}}>
            {/*<Row className="mt-2">*/}
            {/*    <Col md={3}>*/}
            {/*        <Table_admin/>*/}
            {/*    </Col>*/}
            {/*    <Col md={9}>*/}
            {/*        <div> <h2 style={{ color: 'white'}}>Жанры</h2> </div>*/}
            {/*            <div className="d-flex justify-content-md-end align-items-center">*/}
            {/*                <Button variant="outline-info" onClick={()=> setAddGenreVisible(true)} className="m-2" >Добавить</Button>*/}
            {/*            </div>*/}


            {/*        <Table striped bordered hover size="sm"style={{ background: 'white'}} >*/}
            {/*            <thead>*/}
            {/*            <tr>*/}
            {/*                <th>id</th>*/}
            {/*                <th>Название</th>*/}
            {/*                <th></th>*/}
            {/*            </tr>*/}
            {/*            </thead>*/}
            {/*            <tbody>*/}
            {/*            {table.genre.map(genre =>*/}
            {/*                <tr>*/}
            {/*                    <td>{genre.id}</td>*/}
            {/*                    <td>{genre.name}</td>*/}
            {/*                    <td>*/}
            {/*                        <Button variant="outline-success" className="m-2"*/}
            {/*                                onClick={()=> {*/}
            {/*                                    table.setSelectedGenre(genre)*/}
            {/*                                    history.push(GENRE_ROUTE + '/' + genre.id)*/}
            {/*                                    setCreateGenreVisible(true)*/}
            {/*                                }}*/}
            {/*                        >Изменить</Button>*/}
            {/*                        <Button variant="outline-danger" className="m-2"*/}
            {/*                                onClick={()=> {*/}
            {/*                                    table.setSelectedGenre(genre)*/}
            {/*                                    history.push(GENRE_ROUTE + '/' + genre.id)*/}
            {/*                                    setDeleteGenreVisible(true)*/}
            {/*                                }}*/}
            {/*                        >Удалить</Button>*/}
            {/*                    </td>*/}
            {/*                </tr>*/}
            {/*            )}*/}
            {/*            </tbody>*/}
            {/*        </Table>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            {/*<AddGenre show={addGenreVisible} onHide={()=> setAddGenreVisible(false)}/>*/}
            {/*<CreateGenre show={createGenreVisible} onHide={()=> setCreateGenreVisible(false)}/>*/}
            {/*<DeleteGenre show={deleteGenreVisible} onHide={()=> setDeleteGenreVisible(false)}/>*/}
        </Container>
    );
});

export default GenrePage;