import './favorite.css';
import { useEffect, useState } from 'react';
import '../../index.css'

import * as favApi from '../../utilities/favorites-api';


export default function FavoritePage({user}) {

    const [FavoritedMovies, setFavoritedMovies] = useState([])

    const movieInformation = { userFrom: {user}

    }

// fetch movie data from mongodb

    useEffect(() => {
        async function fetchMovies() {
            const favMovies = await favApi.getFavMovies()
            console.log(favMovies)
            setFavoritedMovies(favMovies)  
        }
        fetchMovies()
    }, [])

    const renderBody = FavoritedMovies && FavoritedMovies.map((movie, idx) => {
        return <tr>
            <td>{movie.movieTitle}</td>
            <td>{movie.movieRunTime}</td>
            <td><button>Remove</button></td>
        </tr>

    })

    


    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            
            <h3>Favorite Movies By {user.name}</h3>    
            <hr/>

            <div style={{overflowY: 'auto', height: '400px'}}>

                <table>
                        <thead>
                            <tr>
                                <th>Movie Title</th>
                                <th>Movie RunTime</th>
                                <th>Remove from favorites</th>
                            </tr>
                        </thead>
                        <tbody>
                        {renderBody}
                        </tbody>
                    </table>
            </div>

            
        </div>
    )
}

