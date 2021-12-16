import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export  const addRatingAPI = async (rating) =>{
    const {data} = await $host.post('api/rating', rating)
    return data
}

export  const updateRatingAPI = async (rating) =>{
    const {data} = await $host.put('api/rating', rating)
    return data
}
export  const deleteRatingAPI = async (id) =>{
    const {data} = await $host.delete('api/rating/' + id )
    return data
}