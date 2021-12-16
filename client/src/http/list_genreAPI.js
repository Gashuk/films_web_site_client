import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export  const addList_genreAPI = async (list_genre) =>{
    const {data} = await $host.post('api/list_genre', list_genre)
    return data
}
export  const updateList_genreAPI = async (list_genre) =>{
    const {data} = await $host.put('api/list_genre', list_genre)
    return data
}

export  const deleteList_genreAPI = async (id) =>{
    const {data} = await $host.delete('api/list_genre/' + id )
    return data
}
export  const fetchList_genreAPI = async () =>{
    const {data} = await $host.get('api/list_genre')
    return data
}
export  const fetchOneList_genreAPI =  async (compositionId, genreId) =>{
    const {data} = await $host.get('api/list_genre/compositionId_genreId', {params: {compositionId, genreId}})
    alert(data)
    return data
}