import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {updateCompositionAPI} from "../../../http/compositionAPI";
import {fetchTypeAPI} from "../../../http/typeAPI";


const CreateComposition = observer(({show, onHide}) => {

    const {composition_admin} = useContext(Context)
    const {type} = useContext(Context)
    const {table} = useContext(Context)
    const id = composition_admin.selectedComposition.id
    const defaultImg = table.defaultImg.defaultImgComposition
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [img, setImg] = useState(table.defaultImg.defaultImgComposition)
    const [preview, setPreview] = useState(null)
    const [year1, setYear1] = useState(null)
    const [oldYear1, setOldYear1] = useState(null)
    useEffect(()=>{
        // alert(date)
        // const yyyy = date.getFullYear();
        // let MM = date.getMonth();
        // if(date.getMonth() < 10)
        // {
        //     MM = "0"+ MM
        // }
        // let dd = date.getDate();
        // if(date.getDate() < 10)
        // {
        //     dd = "0"+ dd
        // }

        setName(composition_admin.selectedComposition.name)
        setDescription(composition_admin.selectedComposition.description)
        const date = composition_admin.selectedComposition.year1;
        if(date != undefined)
        {
            setYear1(date.substr(0, 10))
            setOldYear1(date.substr(0, 10))
        }
        setImg(composition_admin.selectedComposition.img)
    },[composition_admin.selectedComposition])

    useEffect(()=>{
        fetchTypeAPI().then(data => type.setType(data))
    },[type.selectedType])

    const updateComposition = () =>{
        // alert(img + " " + composition_admin.selectedComposition.img + " " +  img == composition_admin.selectedComposition.img)
        // alert(name == composition_admin.selectedComposition.name)
        // alert(img == composition_admin.selectedComposition.img)
        // alert(description == composition_admin.selectedComposition.description)
        // alert(oldYear1 == year1)
        // alert(type.selectedType.id == composition_admin.selectedComposition.typeId)
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
        else if(name == composition_admin.selectedComposition.name &&
            img == composition_admin.selectedComposition.img &&
            description == composition_admin.selectedComposition.description &&
            oldYear1 == year1 &&
            type.selectedType.id == composition_admin.selectedComposition.typeId)
        {
            alert("Вы ничего не изменили !!!!")
        }
        else
        {
            const formData = new FormData()
            formData.append('id', id)
            formData.append('name', name)
            formData.append('img', img)
            formData.append('typeId', type.selectedType.id)
            formData.append('description', description)
            formData.append('year1', year1)
            formData.append('defaultImg', defaultImg)

            if(img == composition_admin.selectedComposition.img)
            {
                formData.append('boolUpdateImg', "false")
            }
            else
            {
                formData.append('boolUpdateImg', "true")
            }

            updateCompositionAPI(formData).then(data=> {
                onHide()
            })
        }

    }
    const deleteAvatar = (boolSelectFile) =>{
        if(boolSelectFile)
        {
            setImg(table.defaultImg.defaultImgComposition)
        }
        else
        {
            setImg(composition_admin.selectedComposition.img)
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
            setImg(composition_admin.selectedComposition.img)
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
                    Изменение произведения
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Код
                    <Form.Control
                        value={composition_admin.selectedComposition.id}
                        disabled
                    />
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
                    {img == composition_admin.selectedComposition.img ?
                        <div>
                            {img == table.defaultImg.defaultImgComposition ?
                                <Image width={130} height={190} className="m-2" src={process.env.REACT_APP_API_URL + table.defaultImg.defaultImgComposition}/>
                                :
                                <div>
                                    <Image width={130} height={190} className="m-2" src={process.env.REACT_APP_API_URL + composition_admin.selectedComposition.img}/>
                                    <Button variant="outline-danger"
                                            onClick={()=>
                                            {
                                                deleteAvatar(true)
                                            }}>
                                        Удалить фотографию
                                    </Button>
                                </div>
                            }

                        </div>
                        :
                        <div>
                            {img == table.defaultImg.defaultImgComposition ?
                                <Image width={130} height={190} className="m-2" src={process.env.REACT_APP_API_URL + table.defaultImg.defaultImgComposition}/>
                                :
                                <div>
                                    <Image width={130} height={190}  src={preview} />
                                    <Button variant="outline-danger"
                                            onClick={()=>
                                            {
                                                deleteAvatar(true)
                                            }}>
                                        Удалить фотографию
                                    </Button>
                                </div>
                            }
                            {composition_admin.selectedComposition.img != table.defaultImg.defaultImgComposition ?
                                <Button variant="outline-danger"
                                        onClick={()=>
                                        {
                                            deleteAvatar(false)
                                        }}>
                                    Отменить
                                </Button>
                                :
                                <div></div>
                            }
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
                <Button variant="outline-success" onClick={updateComposition}>Изменить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateComposition;