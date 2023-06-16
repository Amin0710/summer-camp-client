import { useEffect, useState } from "react";
import InstructorsCard from "./InstructorsCard";

const TopInstructors = () => {
	const [instructors, setInstructors] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5001/instructors")
			.then((res) => res.json())
			.then((data) => setInstructors(data))
			.catch((error) => console.error(error));
	}, []);

	const firstSixInstructors = instructors.slice(0, 6);

	return (
		<div className="container mx-auto py-8 text-center">
			<h1
				className="text-5xl font-bold mb-4 text-[#FF6600] bg-[#00AEEF] bg-opacity-30 rounded-lg p-4 mt-5"
				style={{ fontFamily: "BungeeShade" }}>
				Popular Instructors
			</h1>
			<div className="flex flex-wrap mt-4 gap-1 justify-around">
				{firstSixInstructors.map((instructor) => (
					<InstructorsCard
						key={instructor._id}
						instructor={instructor}></InstructorsCard>
				))}
			</div>
		</div>
	);
};

export default TopInstructors;
