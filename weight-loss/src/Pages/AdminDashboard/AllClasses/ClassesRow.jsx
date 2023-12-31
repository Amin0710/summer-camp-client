import { useEffect, useState } from "react";
import { FaSkullCrossbones } from "react-icons/fa";
import { FcFeedback } from "react-icons/fc";
import { MdGppGood } from "react-icons/md";
import Swal from "sweetalert2";

const ClassesRow = ({ eachClass, editID }) => {
	const [activeButton, setActiveButton] = useState(
		eachClass?.status === "pending"
	);
	const [instructorEmail, setInstructorEmail] = useState("");

	useEffect(() => {
		fetch(
			"https://b7a12-summer-camp-server-side-amin0710.vercel.app/instructors"
		)
			.then((res) => res.json())
			.then((data) => {
				const instructor = data.find(
					(data) => data.name === eachClass?.instructorName
				);
				const instructorEmail = instructor?.email;
				setInstructorEmail(instructorEmail);
			})
			.catch((error) => console.error(error));
	}, [eachClass?.instructorName]);

	const handleButtonClick = (id, status) => {
		if (status === "denied") {
			Swal.fire({
				title:
					"Please make sure you wrote a feedback why you denied the class.",
				showDenyButton: true,
				confirmButtonText: "Already sent feedback.",
				denyButtonText: `Will sent feedback later.`,
			}).then((result) => {
				if (result.isConfirmed) {
					fetch(
						`https://b7a12-summer-camp-server-side-amin0710.vercel.app/classes/${status}/${id}`,
						{
							method: "PATCH",
						}
					)
						.then((res) => res.json())
						.then((data) => {
							if (data.modifiedCount) {
								Swal.fire({
									position: "top-end",
									icon: "success",
									title: `${eachClass.name} has been ${status}`,
									showConfirmButton: false,
									timer: 1500,
								});
								setActiveButton(false);
							}
						});
				} else if (result.isDenied) {
					Swal.fire(
						"Changes are not saved. Please send feedback first",
						"",
						"error"
					);
				}
			});
		} else {
			fetch(
				`https://b7a12-summer-camp-server-side-amin0710.vercel.app/classes/${status}/${id}`,
				{
					method: "PATCH",
				}
			)
				.then((res) => res.json())
				.then((data) => {
					if (data.modifiedCount) {
						Swal.fire({
							position: "top-end",
							icon: "success",
							title: `${eachClass.name} has been ${status}!`,
							showConfirmButton: false,
							timer: 1500,
						});
						setActiveButton(false);
					}
				});
		}
	};

	return (
		<tr>
			<td className="text-center">
				<div className="flex items-center space-x-3">
					<div className="avatar">
						<div className="mask mask-squircle w-12 h-12">
							<img src={eachClass.image} alt="Avatar Tailwind CSS Component" />
						</div>
					</div>
					<div className="font-bold">{eachClass.name}</div>
				</div>
			</td>
			<td className="text-center px-0">{eachClass.instructorName}</td>
			<td className="text-center px-0">{instructorEmail}</td>
			<td className="text-center px-0">{eachClass.availableSeats}</td>
			<td className="text-center px-0">${eachClass.price}</td>
			<td className="text-center px-0">{eachClass.status}</td>
			<th className="text-center">
				<div>
					<button
						className="btn bg-[#FFFAFA] text-[#00AEEF] text-3xl px-2 me-2 disabled:bg-gray-500 disabled:text-[#FFFAFA]"
						disabled={!activeButton}
						onClick={() => handleButtonClick(eachClass._id, "approved")}>
						<MdGppGood /> <p className="text-sm">Approve</p>
					</button>
					<button
						className="btn bg-[#FFFAFA] text-[#FF6600] text-3xl px-2 me-2 disabled:bg-gray-500 disabled:text-[#FFFAFA]"
						disabled={!activeButton}
						onClick={() => handleButtonClick(eachClass._id, "denied")}>
						<FaSkullCrossbones /> <p className="text-sm">Deny</p>
					</button>
					{/* The button to open modal */}
					<button>
						<label
							htmlFor="my_modal_6"
							disabled={!activeButton}
							className="btn text-3xl px-2 bg-[#00AEEF] text-[#FFFAFA] disabled:bg-gray-500 disabled:text-[#FFFAFA]"
							onClick={() => editID(eachClass._id)}>
							<FcFeedback />
							<p className="text-sm">Send Feedback</p>
						</label>
					</button>
				</div>
			</th>
		</tr>
	);
};

export default ClassesRow;
