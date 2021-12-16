import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export  const addCountryAPI = async (country) =>{
    const {data} = await $host.post('api/country', country)
    return data
}

export  const updateCountryAPI = async (country) =>{
    const {data} = await $host.put('api/country', country)
    return data
}
export  const deleteCountryAPI = async (id) =>{
    const {data} = await $host.delete('api/country/' + id)
    return data
}
export  const fetchCountryAPI = async () =>{
    const {data} = await $host.get('api/country')
    return data
}

export  const fetchOneCountryAPI = async (name) =>{
    const {data} = await $host.get('api/country/' + name )
    return data
}