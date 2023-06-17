import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../Providers/AuthProviders";
import MyClassesRow from "../MySelectedClasses/MyClassesRow";

const MyEnrolledClasses = () => {
	const { user } = useContext(AuthContext);
	const [myClassesID, setMyClassesID] = useState([]);
	const [myClasses, setMyClasses] = useState([]);
	useEffect(() => {
		fetch("http://localhost:5001/users")
			.then((res) => res.json())
			.then((data) => {
				const currentUser = data.filter((data) => data.email === user?.email);
				const studentUser = currentUser[0];
				const myClassesID = studentUser.myEnrolledClasses;
				setMyClassesID(myClassesID);
			})
			.then(() => {
				fetch("http://localhost:5001/classes")
					.then((res) => res.json())
					.then((data) => {
						const myClasses = data.filter((data) =>
							myClassesID.includes(data._id)
						);
						setMyClasses(myClasses);
					});
			})
			.catch((error) => console.error(error));
	}, [myClassesID, user?.email]);

	return (
		<>
			<Helmet>
				<title>ShapeShed | My Classes</title>
			</Helmet>
			<div className="bg-[#FFFAFA]">
				<div className="container mx-auto py-8 text-center">
					<h1
						className="text-5xl font-bold mb-4 text-[#FF6600] bg-[#00AEEF] bg-opacity-30 rounded-lg p-4 mt-5"
						style={{ fontFamily: "BungeeShade" }}>
						My Classes
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
										<th className="text-center px-0">Actions</th>
										<th className="text-center px-0">Delete</th>
									</tr>
								</thead>
								<tbody>
									{/* rows */}
									{myClasses.map((myClass) => (
										<MyClassesRow
											key={myClass._id}
											myClass={myClass}></MyClassesRow>
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

export default MyEnrolledClasses;
