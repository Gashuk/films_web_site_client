import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export  const addProfessionAPI = async (profession) =>{
    const {data} = await $host.post('api/profession', profession)
    return data
}

export  const updateProfessionAPI = async (profession) =>{
    const {data} = await $host.put('api/profession', profession)
    return data
}

export  const deleteProfessionAPI = async (id) =>{
    const {data} = await $host.delete('api/profession/' + id )
    return data
}

export  const fetchProfessionAPI = async () =>{
    const {data} = await $host.get('api/profession')
    return data
}

export  const fetchOneProfessionAPI = async (name) =>{
    const {data} = await $host.get('api/profession/' + name )
    return data
}