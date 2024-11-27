const BASEURL = "http://localhost:3000"
// const BASEURL = "https://modern-mobiles-server.vercel.app"

// images
export const avatarAPI = "https://api.multiavatar.com/zoe.svg"
export const logoutIcon = "https://res.cloudinary.com/dooxbo8sg/image/upload/v1730870045/ModernMobiles/Others/logout.gif"
export const deliveryMan = "https://res.cloudinary.com/dooxbo8sg/image/upload/v1730985280/ModernMobiles/Others/delivery-man.jpg"
export const emptyCart = "https://res.cloudinary.com/dooxbo8sg/image/upload/v1729578148/ModernMobiles/Others/empty-cart.gif"
export const brandLogo = "https://res.cloudinary.com/dooxbo8sg/image/upload/v1720036696/MP-1-NeoG/MP-Logo_lwscnz.png"
export const No_Internet_and_Wifi = "https://res.cloudinary.com/dooxbo8sg/image/upload/v1732523671/ModernMobiles/Others/No_Internet_and_Wifi.png"
export const signup_image = "https://res.cloudinary.com/dooxbo8sg/image/upload/v1729620475/ModernMobiles/Login/sign-up.jpg"

// Auth API's
export const SENDOTP_API = BASEURL + "/auth/sendOTP/"
export const SIGNUP_API = BASEURL + "/auth/signup"
export const LOGIN_API = BASEURL + "/auth/login"

// product
export const FETCH_DATA_BY_BRAND = BASEURL + "/product/get/"
export const ADD_WHISHLIST = BASEURL + "/product/addWishlist"
export const REMOVE_WHISHLIST = BASEURL + "/product/removeFromWishlist"
export const GET_PRODUCT_BY_ID_API = BASEURL + "/product/productDetails/"
export const ADD_PRODUCT_TO_CART = BASEURL + "/product/add-to-cart/"
export const REMOVE_PRODUCT_FROM_CART = BASEURL + "/product/remove-from-cart/"
export const PRODUCT_QUANTITY = BASEURL + "/product/product-quantity/"
export const CART_TO_WISHLIST = BASEURL + "/product/cart-to-wishlist/"
export const WISHLIST_TO_CART = BASEURL + "/product/wishlist-to-cart/"


// PROFILE
export const UPDATE_USER_PROFILE_DATA = BASEURL + "/profile/update-user/"
export const UPDATE_USER_ADDRESS = BASEURL + "/profile/update-address/"
export const ADD_USER_ADDRESS = BASEURL + "/profile/add-address"
export const DELETE_USER_ADDRESS = BASEURL + "/profile/delete-address"


// Payment
export const CAPTURE_PAYMENT_API = BASEURL + "/payment/capturePayment"
export const VERIFY_PAYMENT_API = BASEURL + "/payment/verifyPayment"

// Order
export const FETCH_ORDERS_API = BASEURL + "/product/orderDetails"
