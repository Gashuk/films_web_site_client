import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Image, Modal} from "react-bootstrap";
import {Context} from "./../../index";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {fetchUser_profiles, updateUser_profilesAPI} from "../../http/userAPI";

const CreateUser_profile = observer(({show, onHide}) => {
    const {user} = useContext(Context)
    const {table} = useContext(Context)
    const id = user.user.id
    const defaultImg = table.defaultImg.defaultImgHumanUser
    const [value, setValue] = useState(user.user)
    const [fio, setFio] = useState(value.fio)
    const [email, setEmail] = useState(value.email)
    const [img, setImg] = useState(value.img)
    const [preview, setPreview] = useState(null)

    useEffect(() => {
        // alert("nkjvbjv")
        fetchUser_profiles(`${id}`).then(data => {setValue(data)})
    },[])

    const updateUser_profile = () =>{
        fetchUser_profiles(`${id}`).then(data =>
        {
            const fio_2 = fio.replace(/^\s+|\s+$/g, '')
            const email_2 = email.replace(/^\s+|\s+$/g, '')
            if(fio_2 == '')
            {
                alert("Пустое поле ФИО !!!!")
            }
            else if(email_2 == '')
            {
                alert("Пустое поле email !!!!")
            }
            else if(fio == data.fio && email == data.email && img == data.img)
            {
                alert("Вы ничего не изменили !!!!")
            }
            else
            {
                const formData = new FormData()
                formData.append('id', `${id}`)
                formData.append('fio', fio)
                formData.append('email', email)
                formData.append('img', img)
                formData.append('defaultImg', defaultImg)
                // alert(defaultImg)
                if(img == data.img)
                {
                    formData.append('boolUpdateImg', "false")
                }
                else
                {
                    formData.append('boolUpdateImg', "true")
                }

                updateUser_profilesAPI(formData).then(data=> {onHideUser_profile()})
            }
        })

    }

    const deleteAvatar = (boolSelectFile) =>{
        if(boolSelectFile)
        {
            setImg(table.defaultImg.defaultImgHumanUser)
        }
        else
        {
            setImg(value.img)
        }

    }

    const onHideUser_profile = () =>{
        fetchUser_profiles(`${id}`).then(data => {
            setValue(data)
            setFio(data.fio)
            setEmail(data.email)
            setImg(data.img)
            setPreview(null)
            onHide()
        })
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
            setImg(value.img)
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
                    Изменение профиля
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    ФИО
                    <Form.Control
                        value={fio}
                        onChange={e =>setFio(e.target.value)}
                        placeholder={"Напишите ФИО"}

                    />
                    Email
                    <Form.Control
                        value={email}
                        onChange={e =>setEmail(e.target.value)}
                        placeholder={"Напишите email"}

                    />
                    Аватар
                    <br/>
                        {img == value.img ?
                            <div>
                                {img == table.defaultImg.defaultImgHumanUser ?
                                    <Image width={130} height={190} className="m-2" src={process.env.REACT_APP_API_URL + table.defaultImg.defaultImgHumanUser}/>
                                :
                                    <div>
                                        <Image width={130} height={190} className="m-2" src={process.env.REACT_APP_API_URL + value.img}/>
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
                                {img == table.defaultImg.defaultImgHumanUser ?
                                    <Image width={130} height={190} className="m-2" src={process.env.REACT_APP_API_URL + table.defaultImg.defaultImgHumanUser}/>
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
                                {value.img != table.defaultImg.defaultImgHumanUser ?
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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={updateUser_profile}>Изменить</Button>
                <Button variant="outline-danger" onClick={onHideUser_profile}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateUser_profile;