import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import InstructorsCard from "../Home/TopInstructors/InstructorsCard";

const Instructors = () => {
	const instructors = useLoaderData();

	return (
		<>
			<Helmet>
				<title>ShapeShed | Instructors</title>
			</Helmet>
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
		</>
	);
};

export default Instructors;
