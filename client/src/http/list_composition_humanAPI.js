import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export  const addList_composition_humanAPI = async (list_composition_human) =>{
    const {data} = await $host.post('api/list_composition_human', list_composition_human)
    return data
}
export  const updateList_composition_humanAPI = async (list_composition_human) =>{
    const {data} = await $host.put('api/list_composition_human', list_composition_human)
    return data
}
export  const deleteList_composition_humanAPI = async (id) =>{
    const {data} = await $host.delete('api/list_composition_human/' + id )
    return data
}
export  const fetchList_composition_humanAPI = async () =>{
    const {data} = await $host.get('api/list_composition_human')
    return data
}
export  const fetchOneList_composition_humanAPI =  async (compositionId, list_profession_humanId) =>{
    const {data} = await $host.get('api/list_composition_human/'  + compositionId + '/' + list_profession_humanId)
    return data
}