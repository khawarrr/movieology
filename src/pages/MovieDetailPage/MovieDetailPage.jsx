import { useEffect, useState } from "react"
import { API_URL, API_KEY, IMAGE_URL } from "../../components/API/Config.js"
import MainImage from "../LandingPage/Sections/MainImage.js"
import { Descriptions } from "antd"
import { useParams } from "react-router-dom"


export default function MovieDetailPage() {

    const [Movie, setMovie] = useState([])

    const {movieId} = useParams()
    

    useEffect(() => {


        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)

                    fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
                    .then(response => response.json()) 
            })
    }, [])


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

          </div>
    )
}


