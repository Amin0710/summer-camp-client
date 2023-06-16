import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import ClassCard from "../Home/TopClasses/ClassCard";

const InstructorsClasses = () => {
	const instructor = useLoaderData();

	const number_of_classes = instructor.classes?.length || 0;
	const number_of_active_student = instructor.classes?.reduce(
		(total, c) => total + (50 - (c?.availableSeats || 50)),
		0
	);
	return (
		<>
			<Helmet>
				<title>{`ShapeShed | ${instructor.name}`}</title>
			</Helmet>
			<div className="bg-[#FFFAFA]">
				<div className="container mx-auto py-8 text-center">
					<div className=" text-[#FF6600] bg-[#00AEEF] bg-opacity-30 rounded">
						<h1
							className="text-5xl font-bold mb-4 p-4 mt-5"
							style={{ fontFamily: "BungeeShade" }}>
							{`${instructor.name}`}
						</h1>
						<div className="flex flex-row-reverse justify-around items-center p-2">
							<div>
								<img
									src={instructor.image}
									alt="Shoes"
									className="h-[350px] rounded"
								/>
							</div>
							<div className="text-2xl text-left text-[#00AEEF]">
								<p>Email: {instructor?.email}</p>
								<p>Number of Active Students: {number_of_active_student}</p>
								<p>Number of Classes: {number_of_classes}</p>
							</div>
						</div>
					</div>
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
