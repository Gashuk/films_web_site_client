import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export  const addList_profession_humanAPI  = async (list_profession_human) =>{
    const {data} = await $host.post('api/list_profession_human', list_profession_human)
    return data
}
export  const updateList_profession_humanAPI = async (list_profession_human) =>{
    const {data} = await $host.put('api/list_profession_human', list_profession_human)
    return data
}
export  const deleteList_profession_humanAPI = async (id) =>{
    const {data} = await $host.delete('api/list_profession_human/' + id )
    return data
}
export  const fetchList_profession_humanAPI = async () =>{
    const {data} = await $host.get('api/list_profession_human')
    return data
}
export  const fetchOneList_profession_human_prof_humAPI =  async (professionId, humanId) =>{
    const {data} = await $host.get('api/list_profession_human/'  + professionId + '/' + humanId)
    return data
}
export  const fetchOneList_profession_humanAPI =  async (id) =>{
    const {data} = await $host.get('api/list_profession_human/'  + id)
    return data
}