import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProviders";
import AddedClassesRow from "./AddedClassesRow";

const MyAddedClasses = () => {
	const { user } = useContext(AuthContext);
	const [clickedClass, setClickedClass] = useState({});
	const classes = useLoaderData();
	const myClasses = classes.filter((cachClass) => {
		return cachClass.instructorName === (user?.name || user?.displayName);
	});

	const editID = (id) => {
		const clickedClass = classes.find((c) => c._id === id);
		setClickedClass(clickedClass);
	};

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
											eachClass={eachClass}
											editID={editID}></AddedClassesRow>
									))}
								</tbody>
							</table>
						</div>
						{/* Put this part before </body> tag */}
						<input type="checkbox" id="my_modal_6" className="modal-toggle" />
						<div className="modal">
							<div className="modal-box bg-[#FFFAFA] text-[#FF6600]">
								<h3 className="font-bold text-lg">
									{clickedClass?.status === "pending"
										? "Please wait for admin's approval. No Feedback yet."
										: clickedClass?.status === "approved"
										? "No Feedback Needed. Your class has need approved successfully."
										: "Admin denied your class request"}
								</h3>
								<p className="py-4">
									{clickedClass?.status === "denied" &&
										clickedClass?.adminFeedback}
								</p>
								<div className="modal-action">
									<label
										htmlFor="my_modal_6"
										className="btn bg-[#FFFAFA] text-[#00AEEF] border-0">
										Close!
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MyAddedClasses;
