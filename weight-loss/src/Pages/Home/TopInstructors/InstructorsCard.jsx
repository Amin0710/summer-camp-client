import { Link } from "react-router-dom";

const InstructorsCard = ({ instructor }) => {
	return (
		<div
			className="card card-compact bg-[#00AEEF] shadow-xl p-4"
			style={{ width: "calc(33.33% - 8px)" }}>
			<figure>
				<img src={instructor.image} alt="Shoes" className="h-[350px]" />
			</figure>
			<div className="card-body text-[#FFFAFA]">
				<h2 className="card-title">{instructor.name}</h2>
				<div className="flex flex-col items-start">
					<div className="text">Email: {instructor.email}</div>
					<div className="text">Classes: {instructor.classes}</div>
				</div>
				<div>
					<Link to={`/games/${instructor._id}`}>
						<button className="btn bg-[#FFFAFA] text-[#00AEEF] w-full">
							View Details
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default InstructorsCard;
