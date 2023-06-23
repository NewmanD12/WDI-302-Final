import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel'

import "./Welcome.css"

const Home = () => {


    return (
        <>
            <div id='main-welcome-img'>
                <Container id="welcome-statement-wrapper" >
                    <Row id='welcome-statement-row'>
                        <Col lg={8}>
                            <h1>Freshly Roasted Every Day!</h1>
                            <br />
                            <h4>Brew it hot or cold. You brew you.</h4>
                            <br />
                            <button id='get-started-button'>Get Started</button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Home