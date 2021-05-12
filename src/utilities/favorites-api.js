import sendRequest from './send-request';

const BASE_URL = '/api/favorites';


export function addToFavorite(variable) {
    return sendRequest(`${BASE_URL}/addToFavorite`, "POST", variable)
    
}

export function removeFavorite(id) {
    return sendRequest(`${BASE_URL}/${id}`, "DELETE")
    
}


export function getFavMovies() {
    return sendRequest(BASE_URL)
}


export function getFavNum(id) {
    return sendRequest(`${BASE_URL}/${id}/favoriteNumber` )
}

export function favorited(id) {
    return sendRequest(`${BASE_URL}/${id}/favorited`)
}

