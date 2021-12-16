import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import CompositionItem from "./CompositionItem";

const CompositionList = observer(() => {
    const {composition} = useContext(Context)

    return (
        <Row className="d-flex" className="m-2">
            {composition.composition.map(composition =>
                <CompositionItem key={composition.id} composition={composition}/>
            )}
        </Row>
    );
});

export default CompositionList;