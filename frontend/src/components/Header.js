import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'

const Header = () => {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const subtotal = Number(
    cartItems.reduce((acc, item) => acc + Number(item.qty), 0)
  )

  return (
    <header>
      <Navbar bg='dark' expand='lg' variant='dark' collapseOnSelect fixed='top'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>YhemCart</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link className='cart position-relative d-inline-flex'>
                  <i className='fas fa-shopping-cart'></i>
                  {subtotal > 0 && (
                    <span className='cart-basket'>{subtotal}</span>
                  )}
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                <Nav.Link>
                  <i className='fas fa-user'></i>Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
