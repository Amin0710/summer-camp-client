import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";

const ClassCard = ({ classes }) => {
	const { user } = useContext(AuthContext);
	const [isAdminInstructor, setIsAdminInstructor] = useState(false);
	const [selected, setSelected] = useState(false);
	const [userId, setUserId] = useState();
	const [userName, setUserName] = useState();
	const location = useLocation();
	const isHomePage = location.pathname === "/";

	useEffect(() => {
		fetch("https://b7a12-summer-camp-server-side-amin0710.vercel.app/users")
			.then((res) => res.json())
			.then((data) => {
				const currentUser = data.filter((data) => data.email === user?.email);
				const isAdminInstructor =
					currentUser[0]?.userRole === "admin" ||
					currentUser[0]?.userRole === "instructor";
				const id = currentUser[0]?._id;
				const isSelected = currentUser[0]?.mySelectedClasses
					? currentUser[0]?.mySelectedClasses.includes(classes._id)
					: false;
				setIsAdminInstructor(isAdminInstructor);
				setUserId(id);
				setSelected(isSelected);
				setUserName(currentUser[0]?.name);
			})
			.catch((error) => console.error(error));
	}, [classes._id, user?.email]);

	const handleSelectButtonClick = (id) => {
		if (!user) {
			Swal.fire({
				position: "top-end",
				icon: "error",
				title: `Log in before selecting the course`,
				showConfirmButton: false,
				timer: 3000,
			});
		} else {
			fetch(
				`https://b7a12-summer-camp-server-side-amin0710.vercel.app/users/${classes._id}/${id}`,
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
							title: `${classes.name} Successfully added to ${userName}'s selected classes!`,
							showConfirmButton: false,
							timer: 1500,
						});
						setSelected(true);
					}
				});
		}
	};

	const isSeatZero = !classes?.availableSeats;
	const bgColor = isSeatZero && !isHomePage ? "bg-red-600" : "bg-[#00AEEF]";
	return (
		<div
			className={`card card-compact ${bgColor} shadow-xl p-4`}
			style={{ width: "calc(33.33% - 8px)" }}>
			<figure>
				<img src={classes?.image} alt="Shoes" className="h-[350px]" />
			</figure>
			<div className="card-body text-[#FFFAFA]">
				<h2 className="card-title">{classes?.name}</h2>
				<div className="flex flex-col items-start">
					<div className="text">
						{`Instructor Name: ${classes?.instructorName}`}
					</div>
					<div className="text">Price: ${classes?.price}</div>
					<div className="text">Available Seats: {classes?.availableSeats}</div>
					<div className="text">
						{/* total 50 seats */}
						Number of students: {50 - classes?.availableSeats}
					</div>
				</div>
				<div className={`${isHomePage ? "hidden" : ""}`}>
					<Link>
						<button
							className="btn bg-[#FFFAFA] text-[#00AEEF] w-full disabled:text-gray-400"
							disabled={isAdminInstructor || isSeatZero || selected}
							onClick={() => handleSelectButtonClick(userId)}>
							{isAdminInstructor
								? "You are Admin/Instructor"
								: isSeatZero
								? "Full"
								: selected
								? "Already Selected"
								: "Select"}
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ClassCard;
