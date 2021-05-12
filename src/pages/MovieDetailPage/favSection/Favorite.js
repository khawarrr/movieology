import { Button } from "antd"
import { useEffect, useState } from "react"
import axios from 'axios';



import * as favoritesApi from '../../../utilities/favorites-api';




export default function Favorite(props) {


    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    
    const variable = {
        movieId: props.movieId,
        userFrom: props.userFrom,
        movieTitle: props.movieInfo.original_title,
        movieImage: props.movieInfo.backdrop_path,
        movieRunTime: props.movieInfo.runtime,
    }

    useEffect(() => {
        async function fetchMoviesNum() {
            const favMoviesNum = await favoritesApi.getFavNum(props.movieId)
            setFavoriteNumber(favMoviesNum)  
        }
        fetchMoviesNum()

        async function favorited() {
            const favorited = await favoritesApi.favorited(props.movieId)
            setFavorited(favorited)  
        }
        favorited()
    }, [])
    

    
    async function handleClickFav() {

        if (Favorited) {
            await favoritesApi.removeFavorite(props.movieId)
            setFavorited(!Favorited)
            setFavoriteNumber(FavoriteNumber - 1)
            
        } else {
            await favoritesApi.addToFavorite(variable)
            setFavorited(!Favorited)
            setFavoriteNumber(FavoriteNumber + 1)
        }

    }



    return (
        <div>
            <Button onClick={handleClickFav}>{!Favorited ? "Add to Favorite" : "Not Favorite"}{FavoriteNumber}</Button>

            
        </div>
    )
}


