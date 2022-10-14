import PaypalCheckoutButton from "./PaypalCheckoutButton"
import './Checkout.css';
const Checkout = ({ jwtToken, recipe, loggedinuser }) => {

    return (
        <div className="paypal-button-container">
            <PaypalCheckoutButton product={recipe.id} jwtToken={jwtToken} loggedinuser={loggedinuser} />
        </div>

    )
}

export default Checkout;