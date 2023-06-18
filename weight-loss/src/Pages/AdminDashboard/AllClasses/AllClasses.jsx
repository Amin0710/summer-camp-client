import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import ClassesRow from "./ClassesRow";
import Swal from "sweetalert2";

const AllClasses = () => {
	const classes = useLoaderData();
	const [clickedClass, setClickedClass] = useState({});

	const sendFeedback = (event) => {
		event.preventDefault();
		const form = event.target;
		const detailFeedback = form.querySelector("#detailFeedback").value;
		console.log(detailFeedback);

		fetch(`http://localhost:5001/feedbackClasses/${clickedClass._id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify({
				adminFeedback: detailFeedback,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.modifiedCount) {
					Swal.fire({
						position: "top-end",
						icon: "success",
						title: `Feedback sent, You can resend it to override.`,
						showConfirmButton: false,
						timer: 1500,
					});
					form.reset();
				}
			});
	};

	const editID = (id) => {
		const clickedClass = classes.find((c) => c._id === id);
		setClickedClass(clickedClass);
	};

	return (
		<>
			<Helmet>
				<title>ShapeShed | All Classes</title>
			</Helmet>
			<div className="bg-[#FFFAFA]">
				<div className="container mx-auto py-8 text-center">
					<h1
						className="text-5xl font-bold mb-4 text-[#FF6600] bg-[#00AEEF] bg-opacity-30 rounded-lg p-4 mt-5"
						style={{ fontFamily: "BungeeShade" }}>
						All Classes
					</h1>
					<div>
						<div className="overflow-x-auto w-full">
							<table className="table w-full">
								{/* head */}
								<thead>
									<tr>
										<th>Class Name</th>
										<th className="text-center px-0">Instructor Name</th>
										<th className="text-center px-0">Instructor Email</th>
										<th className="text-center px-0">Available seats</th>
										<th className="text-center px-0">Price</th>
										<th className="text-center px-0">Status</th>
										<th className="text-center px-0">Actions</th>
									</tr>
								</thead>
								<tbody>
									{/* rows */}
									{classes.map((eachClass) => (
										<ClassesRow
											key={eachClass._id}
											eachClass={eachClass}
											editID={editID}></ClassesRow>
									))}
								</tbody>
							</table>
						</div>
						{/* Put this part before </body> tag */}
						<input type="checkbox" id="my_modal_6" className="modal-toggle" />
						<div className="modal">
							<div className="modal-box bg-[#FFFAFA] text-[#FF6600]">
								<h3 className="font-bold text-lg">
									Please write the reason why you have denied the request:
								</h3>
								<form onSubmit={sendFeedback}>
									<div className="grid grid-cols-2 gap-4">
										<div className="form-control col-span-2">
											<textarea
												placeholder="Detail Feedback"
												name="detailFeedback"
												id="detailFeedback"
												className="textarea textarea-bordered bg-gray-200 text-[#FF6600] min-h-[200px]"
												required></textarea>
										</div>
									</div>
									<div className="flex">
										<div className="form-control w-full mt-5">
											<input
												className="btn bg-[#00AEEF] text-[#FFFAFA]"
												type="submit"
												value="Update Game"
											/>
										</div>
									</div>
								</form>
								<div className="modal-action">
									<label
										htmlFor="my_modal_6"
										className="btn bg-[#FFFAFA] text-[#00AEEF] border-0">
										Close!
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AllClasses;
