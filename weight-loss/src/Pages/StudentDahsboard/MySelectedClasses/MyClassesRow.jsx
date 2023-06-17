import { useContext, useEffect, useState } from "react";
import { MdDeleteForever, MdPayment } from "react-icons/md";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyClassesRow = ({ myClass }) => {
	const { user } = useContext(AuthContext);
	const [instructorEmail, setInstructorEmail] = useState("");
	const [userId, setUserId] = useState();
	const [userName, setUserName] = useState("");

	useEffect(() => {
		fetch("https://b7a12-summer-camp-server-side-amin0710.vercel.app/users")
			.then((res) => res.json())
			.then((data) => {
				const currentUser = data.filter((data) => data.email === user?.email);
				setUserId(currentUser[0]?._id);
				setUserName(currentUser[0]?.name);
			})
			.catch((error) => console.error(error));
	}, [user?.email]);

	useEffect(() => {
		fetch(
			"https://b7a12-summer-camp-server-side-amin0710.vercel.app/instructors"
		)
			.then((res) => res.json())
			.then((data) => {
				const instructor = data.find(
					(data) => data.name === myClass?.instructorName
				);
				const instructorEmail = instructor?.email;
				setInstructorEmail(instructorEmail);
			})
			.catch((error) => console.error(error));
	}, [myClass?.instructorName]);

	const handleRemoveButtonClick = (id) => {
		fetch(
			`https://b7a12-summer-camp-server-side-amin0710.vercel.app/users/${myClass._id}/${id}/remove`,
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
						title: `${myClass.name} Successfully removed form ${userName}'s selected classes!`,
						showConfirmButton: false,
						timer: 1500,
					});
				}
			});
	};

	return (
		<tr>
			<td className="text-center">
				<div className="flex items-center space-x-3">
					<div className="avatar">
						<div className="mask mask-squircle w-12 h-12">
							<img src={myClass.image} alt="Avatar Tailwind CSS Component" />
						</div>
					</div>
					<div className="font-bold">{myClass.name}</div>
				</div>
			</td>
			<td className="text-center px-0">{myClass.instructorName}</td>
			<td className="text-center px-0">{instructorEmail}</td>
			<td className="text-center px-0">{myClass.availableSeats}</td>
			<td className="text-center px-0">${myClass.price}</td>
			<th className="text-center">
				<div>
					<Link to={`/payment?classId=${myClass._id}&userId=${userId}`}>
						<button className="btn bg-[#FFFAFA] text-[#00AEEF] text-3xl px-2 me-2">
							<MdPayment /> <p className="text-sm">Pay Now</p>
						</button>
					</Link>
				</div>
			</th>
			<th className="text-center">
				<button
					className="btn bg-[#FF6600] text-[#FFFAFA] text-3xl px-2"
					onClick={() => handleRemoveButtonClick(userId)}>
					<MdDeleteForever />
				</button>
			</th>
		</tr>
	);
};

export default MyClassesRow;
