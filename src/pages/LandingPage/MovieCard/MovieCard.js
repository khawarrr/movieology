import { Col } from "antd"
import { Link } from "react-router-dom"


export default  function MovieCard(props) {

    if(props.actor) {
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                   <img style={{ width: '100%', height: '320px' }} alt='movie.name' src={props.image} />
                    
                </div>
                
            </Col>

        )
    } else {

        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <Link to={`/movies/${props.movieId}`} >
                        <img style={{ width: '100%', height: '320px' }} alt='pic' src={props.image} />
                    </Link>
                </div>
                
            </Col>
        )
    }
    }

 