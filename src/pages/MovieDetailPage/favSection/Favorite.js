import { Button } from "antd"
import { useEffect, useState } from "react"
import axios from 'axios';




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

        axios.post('/api/favorites/favoriteNumber', variable)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(response.data.FavoriteNumber)
                } else {
                    alert('Failed to get Favorite Number')
                }
            })

            axios.post('/api/favorites/favorited', variable)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.favorited)
                } else {
                    alert('Failed to get Favorite Information')
                }
            })


    }, [])

    const handleClickFav = () => {

        if (Favorited) {
            // if already added to the favorite
            axios.post('/api/favorites/removeFromFavortie', variable)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(FavoriteNumber - 1)
                    setFavorited(!Favorited)

                } else {
                    alert('Failed to remove from Favirotes')}
            })

        } else {

            // not added to the favrorite yet

            axios.post('/api/favorites/addToFavorite', variable)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(FavoriteNumber + 1)
                    setFavorited(!Favorited)

                } else {
                    alert('Failed to add to Favirotes')}
            })


        }

    }



    return (
        <div>
            <Button onClick={handleClickFav}>{!Favorited ? "Add to Favorite" : "Not Favorite"}{FavoriteNumber}</Button>

            
        </div>
    )
}


