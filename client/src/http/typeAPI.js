import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export  const addTypeAPI = async (type) =>{
    const {data} = await $authHost.post('api/type', type)
    return data
}
export  const updateTypeAPI = async (type) =>{
    const {data} = await $host.put('api/type', type)
    return data
}

export  const deleteTypeAPI = async (id) =>{
    const {data} = await $host.delete('api/type/' + id)
    return data
}
export  const fetchTypeAPI = async () =>{
    const {data} = await $host.get('api/type')
    return data
}

export  const fetchOneTypeAPI = async (name) =>{
    const {data} = await $host.get('api/type/' + name )
    return data
}