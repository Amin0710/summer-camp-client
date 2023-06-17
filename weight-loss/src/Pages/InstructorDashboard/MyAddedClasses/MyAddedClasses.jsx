import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProviders";
import AddedClassesRow from "./AddedClassesRow";

const MyAddedClasses = () => {
	const { user } = useContext(AuthContext);

	const classes = useLoaderData();
	const myClasses = classes.filter((cachClass) => {
		return cachClass.instructorName === (user?.name || user?.displayName);
	});

	return (
		<>
			<Helmet>
				<title>ShapeShed | Added Classes</title>
			</Helmet>
			<div className="bg-[#FFFAFA]">
				<div className="container mx-auto py-8 text-center">
					<h1
						className="text-5xl font-bold mb-4 text-[#FF6600] bg-[#00AEEF] bg-opacity-30 rounded-lg p-4 mt-5"
						style={{ fontFamily: "BungeeShade" }}>
						My Added Classes
					</h1>
					<div>
						<div className="overflow-x-auto w-full">
							<table className="table w-full">
								{/* head */}
								<thead>
									<tr>
										<th>Class Name</th>
										<th className="text-center px-0">Instructor Name</th>
										<th className="text-center px-0">Instructor Email</th>
										<th className="text-center px-0">Available seats</th>
										<th className="text-center px-0">Price</th>
										<th className="text-center px-0">Status</th>
										<th className="text-center px-0">Actions</th>
									</tr>
								</thead>
								<tbody>
									{/* rows */}
									{myClasses.map((eachClass) => (
										<AddedClassesRow
											key={eachClass._id}
											eachClass={eachClass}></AddedClassesRow>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MyAddedClasses;
