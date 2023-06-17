import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
const AdminDashboard = () => {
	const { user } = useContext(AuthContext);
	const [adminUser, setAdminUser] = useState();
	useEffect(() => {
		fetch("http://localhost:5001/users")
			.then((res) => res.json())
			.then((data) => {
				const currentUser = data.filter((data) => data.email === user?.email);
				const adminUser = currentUser[0];
				setAdminUser(adminUser);
			})
			.catch((error) => console.error(error));
	}, [user?.email]);

	return (
		<>
			<Helmet>
				<title>ShapeShed | Admin Dashboard</title>
			</Helmet>
			<div className="bg-[#FFFAFA]">
				<div className="container mx-auto py-8 text-center">
					<div className=" text-[#FF6600] bg-[#00AEEF] bg-opacity-30 rounded">
						<h1
							className="text-5xl font-bold mb-4 p-4 mt-5"
							style={{ fontFamily: "BungeeShade" }}>
							{`${adminUser?.name}`}
						</h1>
						<div className="flex flex-row-reverse justify-around items-center p-2">
							<div>
								<img
									src={adminUser?.photoURL}
									alt={adminUser?.name}
									className="h-[350px] rounded"
								/>
							</div>
							<div className="text-2xl text-[#00AEEF]">
								<div className="flex flex-col space-y-2">
									<div className="flex">
										<p className="text-left w-48">Email</p>
										<p className="uppercase text-[#FF6600]">
											: {adminUser?.email}
										</p>
									</div>
									<div className="flex">
										<p className="text-left w-48">Phone Number</p>
										<p className="uppercase text-[#FF6600]">
											: {adminUser?.phoneNumber}
										</p>
									</div>
									<div className="flex">
										<p className="text-left w-48">Gender</p>
										<p className="uppercase text-[#FF6600]">
											: {adminUser?.gender}
										</p>
									</div>
									<div className="flex">
										<p className="text-left w-48">Role</p>
										<p className="uppercase text-[#FF6600]">
											: {adminUser?.userRole}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<h1
						className="text-5xl font-bold mb-4 p-4 mt-5 text-[#00AEEF]"
						style={{ fontFamily: "BungeeShade" }}>
						Action to do
					</h1>
					<div className="flex flex-wrap mt-4 gap-1 justify-around">
						<div className="card w-96 bg-base-100 shadow-xl image-full">
							<div className="card-body bg-[#00AEEF] rounded">
								<h2 className="text-4xl text-[#FF6600] bg-[#FFFAFA] rounded justify-center">
									Manage Classes
								</h2>
								<p className="text-[#FFFAFA]">
									This page will show all the Classes. All the classes added by
									the Instructor from the Add Class page will be displayed here.
								</p>
								<div className="card-actions justify-center">
									<button className="btn bg-[#FFFAFA] text-[#FF6600]">
										<Link to="/allClasses">Take action</Link>
									</button>
								</div>
							</div>
						</div>
						<div className="card w-96 bg-base-100 shadow-xl image-full">
							<div className="card-body bg-[#00AEEF] rounded">
								<h2 className="text-4xl text-[#FF6600] bg-[#FFFAFA] rounded justify-center">
									Manage Users
								</h2>
								<p className="text-[#FFFAFA]">
									The admin can see the relevant information of all registered
									users. By default, everyone will be a student.
								</p>
								<div className="card-actions justify-center">
									<button className="btn bg-[#FFFAFA] text-[#FF6600]">
										<Link to="/users">Take action</Link>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminDashboard;
