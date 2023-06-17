import { MdPayment } from "react-icons/md";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Payment = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const classId = queryParams.get("classId");
	const userId = queryParams.get("userId");

	const handlePayButtonClick = () => {
		fetch(`http://localhost:5001/users/${classId}/${userId}/remove`, {
			method: "PATCH",
		})
			.then((res) => res.json())
			.then(() => {
				fetch(`http://localhost:5001/users/${classId}/${userId}/enrolled`, {
					method: "PATCH",
				})
					.then((res) => res.json())
					.then(() => {
						fetch(`http://localhost:5001/classes/${classId}`, {
							method: "PATCH",
							headers: {
								"Content-Type": "application/json",
							},
						})
							.then((res) => res.json())
							.then((data) => {
								if (data.modifiedCount) {
									Swal.fire({
										position: "top-end",
										icon: "success",
										title: `Successfully added to your enrolled classes!`,
										showConfirmButton: false,
										timer: 1500,
									});
								}
							});
					});
			});
	};

	return (
		<div className="bg-[#FFFAFA]">
			<div className="container mx-auto py-8 text-center">
				<h1
					className="text-5xl font-bold mb-4 text-[#FF6600] bg-[#00AEEF] bg-opacity-30 rounded-lg p-4 mt-5"
					style={{ fontFamily: "BungeeShade" }}>
					Payment
				</h1>
				<h2 className="text-3xl"> Please pay here</h2>
				<button
					className="btn bg-[#FFFAFA] text-[#00AEEF] text-3xl px-2 mt-2 me-2"
					onClick={() => handlePayButtonClick()}>
					<MdPayment /> <p className="text-sm">Pay Now</p>
				</button>
			</div>
		</div>
	);
};

export default Payment;
