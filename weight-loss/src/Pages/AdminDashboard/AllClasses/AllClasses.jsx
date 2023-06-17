import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import ClassesRow from "./ClassesRow";
import Swal from "sweetalert2";

const AllClasses = () => {
	const classes = useLoaderData();
	const [accepted, setAccepted] = useState(false);
	const [feedbackedClassID, setFeedbackedClassID] = useState();

	const handleAccepted = (event) => {
		setAccepted(event.target.checked);
	};

	const sendFeedback = (event) => {
		event.preventDefault();
		const form = event.target;
		const detailFeedback = form.price.detailFeedback;

		fetch(`http://localhost:5001/classes/feedback/${feedbackedClassID}`, {
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
				if (data.modifiedCount > 0) {
					if (data.modifiedCount) {
						Swal.fire({
							position: "top-end",
							icon: "success",
							title: `Feedback sent, You can resend it to override.`,
							showConfirmButton: false,
							timer: 1500,
						});
					}
				}
			});
	};

	const editID = (id) => {
		setFeedbackedClassID(id);
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
						{/* modal */}
						<input type="checkbox" id="my-modal-5" className="modal-toggle" />
						<div className="modal">
							<div className="modal-box w-11/12 max-w-5xl">
								<h1 className="text-4xl text-gray-200">
									Give a reason why you denied the class:
								</h1>
								<form>
									<div className="grid grid-cols-2 gap-4">
										<div className="form-control col-span-2">
											<label className="label">
												<span className="label-text">Detail Feedback</span>
											</label>
											<textarea
												placeholder="Type here"
												name="detailFeedback"
												id="detailFeedback"
												className="textarea textarea-bordered bg-gray-200 text-base-100"
												required></textarea>
										</div>
										<div className="flex items-center">
											<input
												type="checkbox"
												name="accept"
												id="acceptCheckbox"
												className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
												onClick={handleAccepted}
											/>
											<label
												htmlFor="acceptCheckbox"
												className="ml-2 text-sm mt-2">
												Confirm all the information is correct
											</label>
										</div>
									</div>
									<div className="flex">
										<div className="form-control w-3/4 ">
											<input
												disabled={!accepted}
												className="btn btn-primary"
												type="button"
												value="Update Game"
												onClick={sendFeedback}
											/>
										</div>
										<div className="w-1/4">
											<label htmlFor="my-modal-5" className="btn w-full">
												Cancel Feedback
											</label>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AllClasses;
