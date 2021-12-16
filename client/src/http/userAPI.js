import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export  const registration = async (email, password, img) =>{
    const {data} = await $host.post('api/user/registration', {email, password, role: 'USER', img})
    localStorage.setItem('token',data.token)
    return jwt_decode(data.token)
}


export  const login = async (email, password) =>{
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token',data.token)
    return jwt_decode(data.token)
}

export  const check = async () =>{
    const {data} = await $authHost.post('api/user/auth')
    localStorage.setItem('token',data.token)
    return jwt_decode(data.token)
}
export  const fetchOneCompositionRatingReview = async (id) =>{
    const {data} = await $host.get('api/user/oneComposition/' + id)
    return data
}
export  const fetchUser_profiles = async (id) =>{
    const {data} = await $host.get('api/user/'+id)
    return data
}

export  const updateUser_profilesAPI = async (user_profile) =>{

    const {data} = await $host.put('api/user/user_profile', user_profile)
    return data
}
export  const fetchUserOneReviewAPI = async (compositionId, userId) =>{
    const {data} = await $host.get('api/user/review/' + compositionId + '/' + userId)
    return data
}
export  const fetchUserOneRatingAPI = async (compositionId, userId) =>{
    const {data} = await $host.get('api/user/rating/' + compositionId + '/' + userId)
    return data
}

export  const fetchUserReviewAPI = async (userId) =>{
    const {data} = await $host.get('api/user/user_review/' + userId)
    return data
}
export  const fetchUserRatingAPI = async (userId) =>{
    const {data} = await $host.get('api/user/user_rating/' + userId)
    return data
}
export  const addUserRatingAPI = async (rating) =>{
    const {data} = await $host.post('api/user/creatRating', rating)
    return data
}
export  const updateUserRatingAPI = async (rating) =>{
    const {data} = await $host.put('api/user/updateRating', rating)
    return data
}
export  const deleteUserRatingAPI = async (id) =>{
    const {data} = await $host.delete('api/user/deleteRating/' + id)
    return data
}

export  const addUserReviewAPI = async (review) =>{
    const {data} = await $host.post('api/user/creatReview', review)
    return data
}
export  const updateUserReviewAPI = async (review) =>{
    const {data} = await $host.put('api/user/updateReview', review)
    return data
}
export  const deleteUserReviewAPI = async (id) =>{
    const {data} = await $host.delete('api/user/deleteReview/' + id )
    return data
}
// export  const fetchUser_profiles_login = async (id) =>{
//     const {data} = await $host.get('api/user/login/'+id)
//     return data
// }
// export  const fetchUser_profiles_registration = async (id) =>{
//     const {data} = await $host.get('api/user/registration/'+id)
//     return data
// }