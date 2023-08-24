
import { Container, Row, Col } from 'react-bootstrap'

import './About.css'

const About = () => {
  return (
    <Container className='mt-5'>
      <Row id='about-intro-row' className='justify-content-center'>
        <Col id='about-intro-col' md={10}>
          <h4 id='about-intro'>Welcome to Bold Beanery, where the love for coffee meets craftsmanship. Our journey began with a simple passion for sourcing and brewing the finest coffee beans, and it has led us on an exciting adventure of flavor exploration and community building.</h4>
        </Col>
      </Row>
      <Row className='justify-content-center mt-5'>
        <Col md={10} id='our-story-col'>
          <h1>Our Story</h1>
          <img id='our-story-img' src='https://img.freepik.com/premium-photo/young-couple-hugging-park-garden-nature-love-care-romantic-date-together-outdoors-colombia-portrait-smile-laughing-relax-couple-happy-marriage-joyful-relationship_590464-99764.jpg?w=2000'/>
          <p>In a village surrounded by lush coffee plantations, a journey of passion and discovery began. Meet Sofia and Luca, a couple whose love for coffee ignited a remarkable adventure.</p>
          <p>Their story unfolded with travels to coffee lands across the world. From the bustling markets of Ethiopia to the misty plantations of Colombia, each cup revealed a new tale. Inspired, they returned home with a dream—to share the enchantment of these flavors with their community.</p>
          <p>With dedication, they curated the finest beans, forming partnerships with local farmers who shared their commitment to quality. The art of roasting transformed these beans into a symphony of flavors. Bold Beanery soon became a haven where connections were formed over every cup.</p>
          <p>Today, the legacy of Sofia and Luca lives on in each sip of Bold Beanery coffee. Their journey, from discovery to community, invites you to be a part of the story—a story that celebrates the warmth of tradition and the thrill of every new flavor. Welcome to Bold Beanery, where every cup carries a tale.</p>
        </Col>
      </Row>
    </Container>
  )
}

export default About