import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../../../hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
	const [cart] = useCart();
	const total = cart.reduce((sum, item) => sum + item.price, 0);
	const price = parseFloat(total.toFixed(2));
	return (
		<div>
			<h1
				className="text-5xl font-bold mb-4 text-[#FF6600] bg-[#00AEEF] bg-opacity-30 rounded-lg p-4 mt-5"
				style={{ fontFamily: "BungeeShade" }}>
				Payment
			</h1>
			<h2 className="text-3xl"> Please pay below</h2>
			<Elements stripe={stripePromise}>
				<CheckoutForm cart={cart} price={price}></CheckoutForm>
			</Elements>
		</div>
	);
};

export default Payment;
