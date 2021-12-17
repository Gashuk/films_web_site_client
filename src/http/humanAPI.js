import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export  const addHumanAPI = async (human) =>{
    const {data} = await $host.post('api/human', human)
    return data
}
export  const updateHumanAPI = async (human) =>{
    const {data} = await $host.put('api/human', human)
    return data
}
export  const deleteHumanAPI = async (id) =>{
    const {data} = await $host.delete('api/human/' + id )
    return data
}
export  const fetchHumanAPI = async () =>{
    const {data} = await $host.get('api/human')
    return data
}
export  const fetchOneHumanAPI = async (id) =>{
    const {data} = await $host.get('api/human/' + id )
    return data
}