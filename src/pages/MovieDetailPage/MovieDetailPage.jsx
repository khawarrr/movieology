import { useEffect, useState } from "react"
import { API_URL, API_KEY, IMAGE_URL } from "../../components/API/Config.js"
import MainImage from "../LandingPage/Sections/MainImage.js"
import { Descriptions, Button, Row } from "antd"
import { useParams } from "react-router-dom"
import MovieCard from "../LandingPage/MovieCard/MovieCard.js"


export default function MovieDetailPage() {

    const [Movie, setMovie] = useState([])
    const [Crews, setCrews] = useState([])
    const [showCast, setShowCast] = useState(false)

    const {movieId} = useParams()
    

    useEffect(() => {


        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)

                    fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
                    .then(response => response.json())
                    .then(response => {
                        setCrews(response.cast)
                    })
            })
    }, [])

        const handleClick = () => {
            setShowCast(!showCast)
        }

    return (
        <div style={{ width: '100%', margin: 0}} >

          {/* Movie Main Image  */}
          {
            Movie && 
              <MainImage image={`${IMAGE_URL}w1280${Movie.backdrop_path}`} 
                title={Movie.original_title} text={Movie.overview} />
          }

          {/* Movie Info Table */}
        <Descriptions title="Movie Info" bordered>
        <Descriptions.Item label="Title">{Movie.original_title}</Descriptions.Item>
        <Descriptions.Item label="release_date">{Movie.release_date}</Descriptions.Item>
        <Descriptions.Item label="revenue">${Movie.revenue}</Descriptions.Item>
        <Descriptions.Item label="runtime">{Movie.runtime}</Descriptions.Item>
   
        <Descriptions.Item label="status">{Movie.status}</Descriptions.Item>

      </Descriptions>
          <br/> <br/>
          <div style={{display: 'flex', justifyContent: 'center'}}>
              <Button onClick={handleClick}>Movie Cast</Button>
          </div>

          {/* {cast pics} */}

          {showCast && 
          
          <Row gutter={[16, 16]} >
                  {Crews && Crews.map((crew, idx) => (
                    <>
                    {crew.profile_path &&
                    
                      <MovieCard 
                        actor image={`${IMAGE_URL}w500${crew.profile_path}`}
                        key={idx}   
                        />
                    }
                    </>
                  ))}

                </Row>
          }


    </div>
    )
}


