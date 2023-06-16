import { Link } from "react-router-dom";

const ClassCard = ({ c }) => {
	return (
		<div
			className="card card-compact bg-[#00AEEF] shadow-xl p-4"
			style={{ width: "calc(33.33% - 8px)" }}>
			<figure>
				<img src={c.image} alt="Shoes" className="h-[350px]" />
			</figure>
			<div className="card-body text-[#FFFAFA]">
				<h2 className="card-title">{c.name}</h2>
				<div className="flex flex-col items-start">
					<div className="text">
						{c.instructorName ? `Instructor Name: ${c.instructorName}` : ""}
					</div>
					<div className="text">Price: ${c.price}</div>
					<div className="text">Available Seats: {c.availableSeats}</div>
					<div className="text">
						{/* total 50 seats */}
						Number of students: {50 - c.availableSeats}
					</div>
				</div>
				<div>
					<Link to={`/games/${c._id}`}>
						<button className="btn bg-[#FFFAFA] text-[#00AEEF] w-full">
							View Details
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ClassCard;
