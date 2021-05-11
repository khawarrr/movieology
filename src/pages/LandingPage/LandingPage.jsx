import { API_URL, API_KEY, IMAGE_URL } from "../../components/API/Config.js"
import { useEffect, useState } from "react"
import MainImage from "./Sections/MainImage.js"
import { Typography, Row, Col } from 'antd';
import MovieCard from "./MovieCard/MovieCard.js";

const { Title } = Typography;


export default function LandingPage() {

  // the data we acquire from Api, we will pass it to the state
  const [Movies, setMovies] = useState([])

  // when click the loadmore button i need to load more movies to the landing page

  const [CurrentPage, setCurrentPage] = useState(1)
  
  useEffect(() => {
    // right now the api will only load the first page with the information bacause page=1, but we need to change
    //that everytime we hit the load more button
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    fetchMovies(endpoint)
  }, [])

  const fetchMovies = (path) => {

    fetch(path)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovies([...Movies, ...response.results])
            setCurrentPage(response.page)
        })
  }

  const handleClick = () => {
    let endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`

    fetchMovies(endpoint);

  }

    return  (
      <>
        <div style={{ width: '100%', margin: 0}} >

          {/* Movie Main Image  */}
          {
            Movies[0] && 
              <MainImage image={`${IMAGE_URL}w1280${Movies[0].backdrop_path}`} 
                title={Movies[0].original_title} text={Movies[0].overview} />
          }

            {/* Body of Landing Page   */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <Title level={2} > Latest Movies </Title>
                <hr /> 


                {/* show many movies in grid layout  */}

                <Row gutter={[16, 16]} >
                  
                  {Movies && Movies.map((movie, idx) => (
                    

                      
                      <MovieCard 
                        image={movie.poster_path &&
                          `${IMAGE_URL}w500${movie.poster_path}`}
                      movieId={movie.id}
                      key={idx}
                       
                        
                        />
                      
    
                  ))}

                </Row>

                <br/>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={handleClick}>Load More</button>
                </div>
                
                </div>



        </div>

      </>
    )
  }