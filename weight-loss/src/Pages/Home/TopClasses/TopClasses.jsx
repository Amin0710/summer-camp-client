import { useEffect, useState } from "react";
import ClassCard from "./ClassCard";

const TopClasses = () => {
	const [classes, setClasses] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5001/classes")
			.then((res) => res.json())
			.then((data) => setClasses(data))
			.catch((error) => console.error(error));
	}, []);

	// Lesser available seats more populer class
	const sortedArray = classes.sort(
		(a, b) => a.availableSeats - b.availableSeats
	);
	const topSixClasses = sortedArray.slice(0, 6);

	return (
		<div className="container mx-auto py-8 text-center">
			<h1
				className="text-5xl font-bold mb-4 text-[#FF6600] bg-[#00AEEF] bg-opacity-30 rounded-lg p-4 mt-5"
				style={{ fontFamily: "BungeeShade" }}>
				Popular Classes
			</h1>
			<div className="flex flex-wrap mt-4 gap-1 justify-around">
				{topSixClasses.map((c) => (
					<ClassCard key={c._id} c={c}></ClassCard>
				))}
			</div>
		</div>
	);
};

export default TopClasses;
