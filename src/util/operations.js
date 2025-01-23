
import { addProductToWhistlist, addToCart, removeFromCart, removeProductFromWishlist } from "../features/userSlice";
import toast from "react-hot-toast";



export const handlerWishlist = (e, productId, wishlist, dispatch) => {

  e.stopPropagation()
  const token = localStorage.getItem("token") && JSON.parse(localStorage.getItem("token"))
  if (!token) {
    toast.error("Login To Wishlist")
    return
  }

  //product already wishlisted then remove from wishlist 
  if (wishlist.some(product => product._id === productId)) {
    dispatch(removeProductFromWishlist({ productId, token }))
  } else {
    //add product wishlist 
    dispatch(addProductToWhistlist({ productId, token }))

  }

}

export const handlerCart = (e, productId, cart, dispatch) => {
  const token = localStorage.getItem("token") && JSON.parse(localStorage.getItem("token"))
  if (!token) {
    toast.error("Login To Add In Cart")
    return
  }

  const cartModelObject = cart?.filter(product => (product.product?._id === productId))

  //product already in cart then remove from cart 
  if (cartModelObject.length) {

    const cartModelId = cartModelObject[0]?._id
    dispatch(removeFromCart(cartModelId))
  } else {
    //   //add product cart 
    dispatch(addToCart({ productId }))

  }

}

