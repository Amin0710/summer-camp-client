import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import UserRow from "./UserRow";

const User = () => {
	const users = useLoaderData();

	return (
		<>
			<Helmet>
				<title>ShapeShed | Users</title>
			</Helmet>
			<div className="bg-[#FFFAFA]">
				<div className="container mx-auto py-8 text-center">
					<h1
						className="text-5xl font-bold mb-4 text-[#FF6600] bg-[#00AEEF] bg-opacity-30 rounded-lg p-4 mt-5"
						style={{ fontFamily: "BungeeShade" }}>
						All Users
					</h1>
					<div>
						<div className="overflow-x-auto w-full">
							<table className="table w-full">
								{/* head */}
								<thead>
									<tr>
										<th>Game Name</th>
										<th className="text-center px-0">Email</th>
										<th className="text-center px-0">Gender</th>
										<th className="text-center px-0">Phonenumber</th>
										<th className="text-center px-0">Current role</th>
										<th className="text-center px-0">Delete</th>
									</tr>
								</thead>
								<tbody>
									{/* rows */}
									{users.map((user) => (
										<UserRow key={user._id} user={user}></UserRow>
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

export default User;
