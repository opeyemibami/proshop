import React from 'react'
import { Container, Row, Col} from 'react-bootstrap'

const Footer = () => {
    return (
      <footer style={{ marginTop: '4rem', padding: '2rem 0'}}>
        <Container>
          <Row>
            <Col className='text-center py3 footer-class'>
              Copyright &copy; Proshop
            </Col>
          </Row>
        </Container>
      </footer>
    )
}

export default Footer

