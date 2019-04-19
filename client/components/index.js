/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as NavCategoryBar} from './navcategorybar'
export {default as AllProducts} from './AllProducts'
export {default as CategoryProducts} from './CategoryProducts'
export {LoginPopup, SignupPopup} from './LoginSignupPopups'
export {SearchBar} from './searchbar'
export {default as SingleProduct} from './SingleProduct'
export {default as OrderHistory} from './OrderHistory'
export {default as CartButton} from './CartButton'
