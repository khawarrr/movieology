import { API_URL, API_KEY, IMAGE_URL, IMAGE_SIZE } from "../../components/API/Config.js"
import { useEffect, useState } from "react"
import MainImage from "./Sections/MainImage.js"
import { Typography, Row } from 'antd';

const { Title } = Typography;


export default function LandingPage() {

  // the data we acquire from Api, we will pass it to the state
  const [Movies, setMovies] = useState([])
  
  useEffect(() => {
    fetch(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        setMovies(response.results)  // results come from respnse the we recieved from api
        })
}, [])

    return  (
      <>
        <div style={{ width: '100%', margin: 0}} >

          {/* Movie Main Image  */}
          <MainImage image={`${IMAGE_URL}w1280${Movies[0].backdrop_path}`} 
          title={Movies[0].original_title} text={Movies[0].overview} />

            {/* Body of Landing Page   */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <Title level={2} > Latest Movies </Title>
                <hr /> 


                {/* show many movies in grid layout  */}

                <Row gutter={[16, 16]} >

                </Row>

                <br/>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button >Load More</button>
                </div>
                
                </div>



        </div>

      </>
    )
  }