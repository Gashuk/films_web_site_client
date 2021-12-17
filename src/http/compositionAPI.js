import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"




export  const addCompositionAPI = async (composition) =>{
    const {data} = await $host.post('api/composition', composition)
    return data
}
export  const updateCompositionAPI = async (composition) =>{
    const {data} = await $host.put('api/composition', composition)
    return data
}
export  const deleteCompositionAPI = async (id) =>{
    const {data} = await $host.delete('api/composition/' + id )
    return data
}

export  const fetchCompositionAPI = async (typeId, genreId) =>{
    const {data} = await $host.get('api/composition', {params: {typeId, genreId}})
    return data
}

export  const fetchOneCompositionAPI = async (id) =>{
    const {data} = await $host.get('api/composition/' + id)
     return data
}
export  const fetchCompositionAllProfessionAPI = async (id) =>{
    const {data} = await $host.get('api/composition/'+ id +'/allProfession')
    return data
}

export  const fetchCompositionTypeAPI = async (id) =>{
    const {data} = await $host.get('api/composition/'+ id +'/type')
    return data
}
export  const fetchCompositionCountryAPI = async (id) =>{
    const {data} = await $host.get('api/composition/'+ id +'/country')
    return data
}
export  const fetchCompositionGenreAPI = async (id) =>{
    const {data} = await $host.get('api/composition/'+ id +'/genre')
    return data
}

export  const fetchCompositionHumanAPI = async (id) =>{
    const {data} = await $host.get('api/composition/'+ id +'/human')
    return data
}




export  const fetchCompositionAllReviewAPI = async (id) =>{
    const {data} = await $host.get('api/composition/'+ id +'/allReview')
    return data
}
export  const fetchCompositionReviewAPI = async (compositionId, userId) =>{
    const {data} = await $host.get('api/composition/review/' + compositionId + '/' + userId)
    return data
}
export  const fetchCompositionRatingAPI = async (compositionId, userId) =>{
     const {data} = await $host.get('api/composition/rating/' + compositionId + '/' + userId)
     return data
}
export  const addCompositionRatingAPI = async (rating) =>{
    const {data} = await $host.post('api/composition/:id/creatRating', rating)
    return data
}
export  const updateCompositionRatingAPI = async (rating) =>{
    const {data} = await $host.put('api/composition/:id/updateRating', rating)
    return data
}
export  const deleteCompositionRatingAPI = async (id) =>{
    const {data} = await $host.delete('api/composition/'+ id +'/deleteRating' )
    return data
}

export  const addCompositionReviewAPI = async (review) =>{
    const {data} = await $host.post('api/composition/:id/creatReview', review)
    return data
}
export  const updateCompositionReviewAPI = async (review) =>{
    const {data} = await $host.put('api/composition/:id/updateReview', review)
    return data
}
export  const deleteCompositionReviewAPI = async (id) =>{
    const {data} = await $host.delete('api/composition/'+ id +'/deleteReview' )
    return data
}
