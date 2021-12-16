import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {addList_genreAPI, fetchOneList_genreAPI} from "../../../http/list_genreAPI";
import {fetchCompositionAPI} from "../../../http/compositionAPI";
import {fetchGenreAPI} from "../../../http/genreAPI";

const AddList_genre = observer(({show, onHide}) => {

    const {table} = useContext(Context)
    const {list_genre} = useContext(Context)
    const {genre} = useContext(Context)
    const {composition_admin} = useContext(Context)
    const compositionId= composition_admin.selectedComposition.id
    const genreId = genre.selectedGenre.id

    const [img, setImg] = useState(table.defaultImg.defaultImgComposition)

    useEffect(()=>{
        fetchCompositionAPI(null, null).then(data => composition_admin.setComposition(data.rows))
        fetchGenreAPI().then(data => genre.setGenre(data))
    },[list_genre.selectedList_genre])

    const addList_genre = () =>{

        if(compositionId == null)
        {
            alert("Не выбранное поле произвидение!!!!")
        }
        else if(genreId == null)
        {
            alert("Пустое поле жанр!!!!")
        }
        else
        {
            fetchOneList_genreAPI(compositionId, genreId).then(data => {
                if(data != null)
                {
                    alert("Вы уже добавляли жанр этому произведению!!!!")
                }
                else
                {
                    const formData = new FormData()
                    formData.append('compositionId',compositionId)
                    formData.append('genreId', genreId)
                    addList_genreAPI(formData).then(data=> {
                        onHideFunction()
                    })
                }
            })
        }
    }

    const onHideFunction = () =>{
        composition_admin.setSelectedComposition({})
        genre.setSelectedGenre({})
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
                    Добавление произвидение/жанр
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
                    Код жанра / Жанр
                    <Dropdown>
                        <Dropdown.Toggle>
                            {genre.selectedGenre.id || "Выбирите Код жанра"} / {genre.selectedGenre.name || "Жанр"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {genre.genre.map(genres =>
                                <Dropdown.Item className="d-flex justify-content-between align-items-center"
                                    onClick={() => {
                                        genre.setSelectedGenre(genres)
                                    }}
                                >
                                    {genres.id} / {genres.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={addList_genre} >Добавить</Button>
                <Button variant="outline-danger" onClick={onHideFunction}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddList_genre;