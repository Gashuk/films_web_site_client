import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import Table_admin from "../components/Table_admin";
import {Context} from "../index";
import CreateGenre from "../components/modals/modalsGenre/CreateGenre";
import {observer} from "mobx-react-lite";
import AddGenre from "../components/modals/modalsGenre/AddGenre";
import DeleteGenre from "../components/modals/modalsGenre/DeleteGnere";
import {fetchGenreAPI} from "../http/genreAPI";

const GenrePage = observer(() => {

    const {genre} = useContext(Context)

    useEffect(()=>{
        fetchGenreAPI().then(data => genre.setGenre(data))
    },[genre.setGenre])

    const [addGenreVisible, setAddGenreVisible] = useState(false)
    const [createGenreVisible, setCreateGenreVisible] = useState(false)
    const [deleteGenreVisible, setDeleteGenreVisible] = useState(false)

    const fetchGenreFunction = () =>{
        fetchGenreAPI().then(data => genre.setGenre(data))
        genre.setSelectedGenre({})
    }

    return (
        <Container className="mt-3" style={{ background: '#3C5B74'}}>
            <Row className="mt-2">
                <Col md={3}>
                    <Table_admin/>
                </Col>
                <Col md={9}>
                    <div> <h2 style={{ color: 'white'}}>Жанры</h2> </div>
                        <div className="d-flex justify-content-md-end align-items-center">
                            <Button variant="outline-info" onClick={()=> {
                                genre.setSelectedGenre({})
                                setAddGenreVisible(true)
                            }} className="m-2" >Добавить</Button>
                        </div>


                    <Table striped bordered hover size="sm"style={{ background: 'white'}} >
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>Название</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {genre.genre.map(genres =>
                            <tr>
                                <td>{genres.id}</td>
                                <td>{genres.name}</td>
                                <td>
                                    <Button variant="outline-success" className="m-2"
                                            onClick={()=> {
                                                genre.setSelectedGenre(genres)
                                                setCreateGenreVisible(true)
                                            }}
                                    >Изменить</Button>
                                    <Button variant="outline-danger" className="m-2"
                                            onClick={()=> {
                                                genre.setSelectedGenre(genres)
                                                setDeleteGenreVisible(true)
                                            }}
                                    >Удалить</Button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <AddGenre show={addGenreVisible} onHide={()=> {
                setAddGenreVisible(false)
                fetchGenreFunction()
            }}/>
            <CreateGenre show={createGenreVisible} onHide={()=> {
                setCreateGenreVisible(false)
                fetchGenreFunction()
            }}/>
            <DeleteGenre show={deleteGenreVisible} onHide={()=> {
                setDeleteGenreVisible(false)
                fetchGenreFunction()
            }}/>
        </Container>
    );
});

export default GenrePage;