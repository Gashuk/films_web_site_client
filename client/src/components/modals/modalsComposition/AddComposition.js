import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {addCompositionAPI} from "../../../http/compositionAPI";
import {fetchTypeAPI} from "../../../http/typeAPI";

const AddComposition = observer(({show, onHide}) => {

    const {table} = useContext(Context)
    const {type} = useContext(Context)
    const defaultImg = table.defaultImg.defaultImgComposition

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [img, setImg] = useState(table.defaultImg.defaultImgComposition)
    const [preview, setPreview] = useState(null)
    const [year1, setYear1] = useState(null)

    useEffect(()=>{
        fetchTypeAPI().then(data => type.setType(data))
    },[type.selectedType])



    const addComposition = () =>{

        const regex_name = name.replace(/^\s+|\s+$/g, '')
        if(regex_name == '')
        {
            alert("Пустое поле название!!!!")
        }
        else if(type.selectedType.id == null)
        {
            alert("Не выбранное поле тип!!!!")
        }
        else if(year1 == null)
        {
            alert("Не выбранная дата!!!!")
        }
        else
        {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('img', img)
            formData.append('typeId', type.selectedType.id)
            formData.append('description', description)
            formData.append('year1', year1)
            formData.append('defaultImg', defaultImg)

            addCompositionAPI(formData).then(data=> {
                onHideFunction()
            })
        }
    }
    const onHideFunction = () =>{
        setName('')
        setDescription('')
        setYear1(null)
        setImg(table.defaultImg.defaultImgComposition)
        setPreview(null)
        onHide()
    }
    const deleteAvatar = (boolSelectFile) =>{
        if(boolSelectFile)
        {
            setImg(table.defaultImg.defaultImgComposition)
        }
    }

    useEffect(() => {
        try
        {
            if (!img)
            {
                setPreview(null)
                return
            }

            const objectUrl = URL.createObjectURL(img)
            setPreview(objectUrl)

            return () => URL.revokeObjectURL(objectUrl)
        }
        catch (e)
        {}

    }, [img])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0)
        {
            setImg(table.defaultImg.defaultImgComposition)
            return
        }

        setImg(e.target.files[0])
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
                    Добавление произведения
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Название
                    <Form.Control
                        value={name}
                        onChange={e =>setName(e.target.value)}
                        placeholder={"Введите ФИО"}
                    />
                    Код типа произведения / Тип произведения
                    <Dropdown>
                        <Dropdown.Toggle>{type.selectedType.id || "Выбирите Код типа произведения"} / {type.selectedType.name || " Тип произведения"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {type.type.map(types =>
                                <Dropdown.Item className="d-flex justify-content-between align-items-center"
                                    onClick={() => type.setSelectedType(types)}
                                >
                                    {types.id} / {types.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    Постер
                    <br/>

                    {img == table.defaultImg.defaultImgComposition ?
                        <Image width={130} height={190} className="m-2" src={process.env.REACT_APP_API_URL + table.defaultImg.defaultImgComposition}/>
                        :
                        <div>
                            <Image width={130} height={190} className="m-2" src={preview}/>
                            <Button variant="outline-danger"
                                    onClick={()=>
                                    {
                                        deleteAvatar(true)
                                    }}>
                                Удалить фотографию
                            </Button>
                        </div>
                    }

                    <br/>

                    <div className="custom-file">
                        <input id="customFileLangHTML" type="file" className="custom-file-input" onChange={onSelectFile}/>
                        <label className="custom-file-label" htmlFor="customFileLangHTML" data-browse="Найти">Выберите фотографию</label>
                    </div>
                    Дата премьеры
                    <Form.Control
                        value={year1}
                        onChange={e =>setYear1(e.target.value)}
                        type="date"
                    />
                    Описание
                    <Form.Control
                        value={description}
                        onChange={e =>setDescription(e.target.value)}
                        placeholder={"Введите описание"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={addComposition} >Добавить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddComposition;