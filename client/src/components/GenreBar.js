import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const GenreBar = observer(() => {
    const {composition} = useContext(Context)
    return (
        <Row className="d-flex" className="m-3">
            {composition.genre.map(genre =>
            <Card
                className="p-3"
                style={genre.id === composition.selectedGenre.id ?
                    {cursor: 'pointer', background: '#9cacbf', color: 'white',}
                    :
                    {cursor: 'pointer', background: '#cbcbcb'}
                }
                onClick={()=> {
                    {genre.id === composition.selectedGenre.id ?
                        composition.setSelectedGenre({})
                        :
                        composition.setSelectedGenre(genre)
                    }
                }}

            >
                {genre.name}
            </Card>
            )}
        </Row>
    );
});

export default GenreBar;