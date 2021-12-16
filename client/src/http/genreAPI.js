import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export  const addGenreAPI = async (genre) =>{
    const {data} = await $host.post('api/genre', genre)
    return data
}

export  const updateGenreAPI = async (genre) =>{
    const {data} = await $host.put('api/genre', genre)
    return data
}
export  const deleteGenreAPI = async (id) =>{
    const {data} = await $host.delete('api/genre/' + id )
    return data
}
export  const fetchGenreAPI = async () =>{
    const {data} = await $host.get('api/genre')
    return data
}
export  const fetchOneGenreAPI = async (name) =>{
    const {data} = await $host.get('api/genre/' + name )
    return data
}

export  const fetchOneList_genreGenreAPI =  async (compositionId, genreId) =>{
    alert("тута" + " " + compositionId + " " + genreId)
    const {data} = await $host.get('api/genre/mraz', {params: {compositionId, genreId}})
    alert(data)
    return data
}