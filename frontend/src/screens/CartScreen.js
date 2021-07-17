import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../actions/cartActions'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/message'
import queryString from 'query-string'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id
  const qty = location.search
    ? queryString.parse(location.search)['qty']
    : 1
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  useEffect(() => {
    if (productId) {
      
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])


  return <div>Cart Screen</div>
}

export default CartScreen
