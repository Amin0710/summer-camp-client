import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ClassCard from "../Home/TopClasses/ClassCard";

const Classes = () => {
	const [classes, setClasses] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5001/classes")
			.then((res) => res.json())
			.then((data) => setClasses(data))
			.catch((error) => console.error(error));
	}, []);

	return (
		<>
			<Helmet>
				<title>ShapeShed | Classes</title>
			</Helmet>
			<div className="bg-[#FFFAFA]">
				<div className="container mx-auto py-8 text-center">
					<h1
						className="text-5xl font-bold mb-4 text-[#FF6600] bg-[#00AEEF] bg-opacity-30 rounded-lg p-4 mt-5"
						style={{ fontFamily: "BungeeShade" }}>
						All Classes
					</h1>
					<div className="flex flex-wrap mt-4 gap-1 justify-around">
						{classes.map((c) => (
							<ClassCard key={c._id} c={c}></ClassCard>
						))}
						{classes.map((c) => (
							<ClassCard key={c._id} c={c}></ClassCard>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Classes;
