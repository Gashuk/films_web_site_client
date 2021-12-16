import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {ListGroup} from "react-bootstrap";
import {Context} from "../index";

const TypeBar = observer(() => {
    const {composition} = useContext(Context)
    return (
        <ListGroup className={"mt-3"}>
            {composition.types.map(type =>
                <ListGroup.Item
                    // style={{cursor: 'pointer', background: '#B67929', color: 'white',}}
                    // active={type.id === composition.selectedType.id}
                    // variant={type.id === composition.selectedType.id ? 'danger' : 'success'}
                    style={type.id === composition.selectedType.id ?
                        {cursor: 'pointer', background: '#9cacbf', color: 'black',}
                        :
                        {cursor: 'pointer', background: '#B67929', color: 'white',}
                        }
                    onClick={() => {
                        {type.id === composition.selectedType.id ?
                            composition.setSelectedType({})
                            :
                            composition.setSelectedType(type)
                        }
                    }}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;