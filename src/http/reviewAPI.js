import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export  const addReviewAPI = async (review) =>{
    const {data} = await $host.post('api/review', review)
    return data
}

export  const updateReviewAPI = async (review) =>{
    const {data} = await $host.put('api/review', review)
    return data
}
export  const deleteReviewAPI = async (id) =>{
    const {data} = await $host.delete('api/review/' + id )
    return data
}