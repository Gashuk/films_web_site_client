import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import GenreBar from "../components/GenreBar";
import CompositionList from "../components/CompositionList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchCompositionAPI} from "../http/compositionAPI";
import {fetchTypeAPI} from "../http/typeAPI";
import {fetchGenreAPI} from "../http/genreAPI";


const Shop = observer(() => {
    const {composition} = useContext(Context)

    useEffect(()=>{
        fetchTypeAPI().then(data => composition.setTypes(data))
        fetchGenreAPI().then(data => composition.setGenre(data))
        fetchCompositionAPI(composition.selectedType.id, composition.selectedGenre.id).then(data => composition.setComposition(data.rows))

    },[])
    useEffect(()=>{
        fetchCompositionAPI(composition.selectedType.id, composition.selectedGenre.id).then(data => composition.setComposition(data.rows))
    },[composition.selectedType, composition.selectedGenre])


    return (
        <Container style = {{background: '#3C5B74', height: window.innerHeight - 54}}>
           <Row className="mt-2" >
               <Col md={3}>
                    <TypeBar/>
               </Col>
               <Col md={9}>
                   <GenreBar/>
                   <CompositionList/>
               </Col>
           </Row>
        </Container>

    );
});

export default Shop;