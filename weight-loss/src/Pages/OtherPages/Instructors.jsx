import { useEffect, useState } from "react";
import InstructorsCard from "../Home/TopInstructors/InstructorsCard";

const Instructors = () => {
	const [instructors, setInstructors] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5001/instructors")
			.then((res) => res.json())
			.then((data) => setInstructors(data))
			.catch((error) => console.error(error));
	}, []);

	return (
		<div className="bg-[#FFFAFA]">
			<div className="container mx-auto py-8 text-center">
				<h1
					className="text-5xl font-bold mb-4 text-[#FF6600] bg-[#00AEEF] bg-opacity-30 rounded-lg p-4 mt-5"
					style={{ fontFamily: "BungeeShade" }}>
					All Instructors
				</h1>
				<div className="flex flex-wrap mt-4 gap-1 justify-around">
					{instructors.map((instructor) => (
						<InstructorsCard
							key={instructor._id}
							instructor={instructor}></InstructorsCard>
					))}
					{instructors.map((instructor) => (
						<InstructorsCard
							key={instructor._id}
							instructor={instructor}></InstructorsCard>
					))}
				</div>
			</div>
		</div>
	);
};

export default Instructors;
