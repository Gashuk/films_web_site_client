import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Nav, Row, Table} from "react-bootstrap";
import Table_admin from "../components/Table_admin";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import CreateList_genre from "../components/modals/modalsList_genre/CreateList_genre";
import AddList_genre from "../components/modals/modalsList_genre/AddList_genre";
import DeleteList_genre from "../components/modals/modalsList_genre/DeleteList_genre";
import {fetchList_genreAPI} from "../http/list_genreAPI";
import {fetchOneGenreAPI} from "../http/genreAPI";
import {fetchOneCompositionAPI} from "../http/compositionAPI";

const List_genrePage = observer(() => {

    const {list_genre} = useContext(Context)
    const {genre} = useContext(Context)
    const {composition_admin} = useContext(Context)

    useEffect(()=>{
        fetchList_genreAPI().then(data => list_genre.setList_genre(data))
    },[list_genre.setList_genre])

    const [addList_genreVisible, setAddList_genreVisible] = useState(false)
    const [createList_genreVisible, setCreateList_genreVisible] = useState(false)
    const [deleteList_genreVisible, setDeleteList_genreVisible] = useState(false)

    const fetchList_genreFunction = () =>{
        fetchList_genreAPI().then(data => list_genre.setList_genre(data))
        list_genre.setSelectedList_genre({})
        genre.setSelectedGenre({})
        composition_admin.setSelectedComposition({})
    }
    return (
        <Container className="mt-3" style={{ background: '#3C5B74'}}>
            <Row className="mt-2">
                <Col md={3}>
                    <Table_admin/>
                </Col>
                <Col md={9}>
                    <div> <h2 style={{ color: 'white'}}>Список произвидение/жанр</h2> </div>
                    <div className="d-flex justify-content-md-end align-items-center">
                        <Button variant="outline-info" onClick={()=> {
                            list_genre.setSelectedList_genre({})
                            genre.setSelectedGenre({})
                            composition_admin.setSelectedComposition({})
                            setAddList_genreVisible(true)
                        }} className="m-2" >Добавить</Button>
                    </div>


                    <Table striped bordered hover size="sm" style={{ background: 'white'}}>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>Код произведения</th>
                            <th>Произведение</th>
                            <th>Постер</th>
                            <th>Код жанра</th>
                            <th>Жанр</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {list_genre.list_genre.map(list_genres =>
                            <tr>
                                <td>{list_genres.id}</td>
                                <td>{list_genres.compositionId}</td>
                                <td>{list_genres.name_composition}</td>
                                <td><Image width={50} height={50} src={process.env.REACT_APP_API_URL +list_genres.img_composition}/></td>
                                <td>{list_genres.genreId}</td>
                                <td>{list_genres.name_genre}</td>
                                <td>
                                    <Button variant="outline-success" className="m-2"
                                            onClick={()=> {
                                                fetchOneCompositionAPI(list_genres.compositionId).then(data => composition_admin.setSelectedComposition(data))
                                                fetchOneGenreAPI(list_genres.name_genre).then(data => { genre.setSelectedGenre(data)})
                                                list_genre.setSelectedList_genre(list_genres)
                                                setCreateList_genreVisible(true)
                                            }}
                                    >Изменить</Button>
                                    <Button variant="outline-danger" className="m-2"
                                            onClick={()=> {
                                                fetchOneCompositionAPI(list_genres.compositionId).then(data => {composition_admin.setSelectedComposition(data)})
                                                fetchOneGenreAPI(list_genres.name_genre).then(data => { genre.setSelectedGenre(data)})
                                                list_genre.setSelectedList_genre(list_genres)
                                                setDeleteList_genreVisible(true)
                                            }}
                                    >Удалить</Button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <AddList_genre show={addList_genreVisible} onHide={()=> {
                setAddList_genreVisible(false)
                fetchList_genreFunction()
            }}/>
            <CreateList_genre show={createList_genreVisible} onHide={()=> {
                setCreateList_genreVisible(false)
                fetchList_genreFunction()
            }}/>
            <DeleteList_genre show={deleteList_genreVisible} onHide={()=> {
                setDeleteList_genreVisible(false)
                fetchList_genreFunction()
            }}/>
        </Container>
    );
});

export default List_genrePage;