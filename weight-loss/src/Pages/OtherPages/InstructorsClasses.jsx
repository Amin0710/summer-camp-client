import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import ClassCard from "../Home/TopClasses/ClassCard";

const InstructorsClasses = () => {
	const instructor = useLoaderData();

	return (
		<>
			<Helmet>
				<title>{`ShapeShed | ${instructor.name}`}</title>
			</Helmet>
			<div className="bg-[#FFFAFA]">
				<div className="container mx-auto py-8 text-center">
					<h1
						className="text-5xl font-bold mb-4 text-[#FF6600] bg-[#00AEEF] bg-opacity-30 rounded-lg p-4 mt-5"
						style={{ fontFamily: "BungeeShade" }}>
						{`${instructor.name}`}
					</h1>
					<div className="flex flex-wrap mt-4 gap-1 justify-around">
						{instructor.classes.map((classes, index) => (
							<ClassCard key={index} classes={classes}></ClassCard>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default InstructorsClasses;
