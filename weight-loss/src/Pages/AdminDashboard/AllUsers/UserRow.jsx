import { useState } from "react";
import { FaUserSecret, FaUserTie, FaUser } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const UserRow = ({ user }) => {
	const [activeButton, setActiveButton] = useState(user?.userRole || "student");

	const handleButtonClick = (id, role) => {
		fetch(`http://localhost:5001/users/${role}/${id}`, {
			method: "PATCH",
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.modifiedCount) {
					Swal.fire({
						position: "top-end",
						icon: "success",
						title: `${user.name} is an ${role} Now!`,
						showConfirmButton: false,
						timer: 1500,
					});
					setActiveButton(role);
				}
			});
	};

	return (
		<tr>
			<td className="text-center">
				<div className="flex items-center space-x-3">
					<div className="avatar">
						<div className="mask mask-squircle w-12 h-12">
							<img src={user.photoURL} alt="Avatar Tailwind CSS Component" />
						</div>
					</div>
					<div>
						<div className="font-bold">{user.name}</div>
						<div className="text-sm opacity-50">{user.userRole}</div>
					</div>
				</div>
			</td>
			<td className="text-center px-0">{user.email}</td>
			<td className="text-center px-0">{user.gender}</td>
			<td className="text-center px-0">{user.phoneNumber}</td>
			<th className="text-center">
				<div>
					<button
						className="btn bg-[#FFFAFA] text-[#FF6600] text-3xl px-2 me-2 disabled:bg-[#00AEEF] disabled:text-[#FFFAFA]"
						disabled={activeButton === "admin"}
						onClick={() => handleButtonClick(user._id, "admin")}>
						<FaUserSecret /> <p className="text-sm">Admin</p>
					</button>
					<button
						className="btn bg-[#FFFAFA] text-[#FF6600] text-3xl px-2 me-2 disabled:bg-[#00AEEF] disabled:text-[#FFFAFA]"
						disabled={activeButton === "instructor"}
						onClick={() => handleButtonClick(user._id, "instructor")}>
						<FaUserTie /> <p className="text-sm">Instructor</p>
					</button>
					<button
						className="btn bg-[#FFFAFA] text-[#FF6600] text-3xl px-2 me-2 disabled:bg-[#00AEEF] disabled:text-[#FFFAFA]"
						disabled={activeButton === "student"}
						onClick={() => handleButtonClick(user._id, "student")}>
						<FaUser /> <p className="text-sm">Student</p>
					</button>
				</div>
			</th>
			<th className="text-center">
				<button className="btn bg-[#FF6600] text-[#FFFAFA] text-3xl px-2">
					<MdDeleteForever />
				</button>
			</th>
		</tr>
	);
};

export default UserRow;
