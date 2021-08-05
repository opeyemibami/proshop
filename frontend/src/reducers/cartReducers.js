import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find((x) => x.product === item.product)
      if (existItem) {
        return {
          ...state,
          // map through the items to update the existing items
          cartItems: state.cartItems.map((x) =>
            x.product === item.product ? item : x
          ),
        }
      } else {
        // return an updated version of the state with addition new item
        return { ...state, cartItems: [...state.cartItems, item] }
      }
    case CART_REMOVE_ITEM:
      const itemsInCart = state.cartItems.filter(
        (x) => x.product !== action.payload
      )
      return {
        ...state,
        cartItems: itemsInCart,
      }
    case CART_SAVE_SHIPPING_ADDRESS:

      return {
        ...state,
        shippingAddress: action.payload,
      }

    default:
      return state
  }
}
