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
				<div className="flex flex-col items-start flex-grow">
					<div className="text">Email: {instructor.email}</div>
					<div className="text text-left">
						Number of Classes: {instructor.classes.length}
					</div>
					<div className="text text-left pt-2">
						Classes Names:
						{instructor.classes.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</div>
				</div>
				<div>
					<Link to={`/instructors/${instructor._id}`}>
						<button className="btn bg-[#FFFAFA] text-[#00AEEF] w-full ">
							See Classes
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default InstructorsCard;
