import { Link, useLocation } from "react-router-dom";

const ClassCard = ({ classes }) => {
	const location = useLocation();
	const isHomePage = location.pathname === "/";

	const adminUser = false;
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
						{classes?.instructorName
							? `Instructor Name: ${classes?.instructorName}`
							: ""}
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
							className="btn bg-[#FFFAFA] text-[#00AEEF] w-full"
							disabled={adminUser || isSeatZero}>
							{isSeatZero ? "Full" : "Select"}
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ClassCard;
