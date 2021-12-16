import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export  const addList_countryAPI = async (list_country) =>{
    const {data} = await $host.post('api/list_country', list_country)
    return data
}
export  const updateList_countryAPI = async (list_country) =>{
    const {data} = await $host.put('api/list_country', list_country)
    return data
}
export  const deleteList_countryAPI = async (id) =>{
    const {data} = await $host.delete('api/list_country/' + id )
    return data
}
export  const fetchList_countryAPI = async () =>{
    const {data} = await $host.get('api/list_country')
    return data
}
export  const fetchOneList_countryAPI =  async (compositionId, countryId) =>{
    const {data} = await $host.get('api/list_country/'  + compositionId + '/' + countryId)
    return data
}