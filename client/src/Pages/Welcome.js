import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./Welcome.css"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/Auth';


const Home = () => {

    const navigate = useNavigate()
    const auth = useAuth()
    // console.log(auth)


    return (
        <>
            <div id='main-welcome-img'>
                <Container id="welcome-statement-wrapper" >
                    <Row id='welcome-statement-row'>
                        <Col lg={8} id='welcome-statement-container'>
                            <h1>Freshly Roasted Every Day!</h1>
                            <br />
                            <h4>Brew it hot or cold. You brew you.</h4>
                            <br />
                            <button id='get-started-button' onClick={() => navigate('/shop')}>Get Started</button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Home