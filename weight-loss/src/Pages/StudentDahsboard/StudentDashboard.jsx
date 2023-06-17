import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
const StudentDashboard = () => {
	const { user } = useContext(AuthContext);
	const [studentUser, setStudentUser] = useState();
	useEffect(() => {
		fetch("http://localhost:5001/users")
			.then((res) => res.json())
			.then((data) => {
				const currentUser = data.filter((data) => data.email === user?.email);
				const studentUser = currentUser[0];
				setStudentUser(studentUser);
			})
			.catch((error) => console.error(error));
	}, [user?.email]);

	return (
		<>
			<Helmet>
				<title>ShapeShed | Dashboard</title>
			</Helmet>
			<div className="bg-[#FFFAFA]">
				<div className="container mx-auto py-8 text-center">
					<div className=" text-[#FF6600] bg-[#00AEEF] bg-opacity-30 rounded">
						<h1
							className="text-5xl font-bold mb-4 p-4 mt-5"
							style={{ fontFamily: "BungeeShade" }}>
							{`${studentUser?.name}`}
						</h1>
						<div className="flex flex-row-reverse justify-around items-center p-2">
							<div>
								<img
									src={studentUser?.photoURL}
									alt={studentUser?.name}
									className="h-[350px] rounded"
								/>
							</div>
							<div className="text-2xl text-[#00AEEF]">
								<div className="flex flex-col space-y-2">
									<div className="flex">
										<p className="text-left w-48">Email</p>
										<p className="uppercase text-[#FF6600]">
											: {studentUser?.email}
										</p>
									</div>
									<div className="flex">
										<p className="text-left w-48">Phone Number</p>
										<p className="uppercase text-[#FF6600]">
											: {studentUser?.phoneNumber}
										</p>
									</div>
									<div className="flex">
										<p className="text-left w-48">Gender</p>
										<p className="uppercase text-[#FF6600]">
											: {studentUser?.gender}
										</p>
									</div>
									<div className="flex">
										<p className="text-left w-48">Role</p>
										<p className="uppercase text-[#FF6600]">
											: {studentUser?.userRole}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<h1
						className="text-5xl font-bold mb-4 p-4 mt-5 text-[#00AEEF]"
						style={{ fontFamily: "BungeeShade" }}>
						My Classes
					</h1>
					<div className="flex flex-wrap mt-4 gap-1 justify-around">
						<div className="card w-96 bg-base-100 shadow-xl image-full">
							<div className="card-body bg-[#00AEEF] rounded">
								<h2 className="text-4xl text-[#FF6600] bg-[#FFFAFA] rounded justify-center">
									My Selected Classes
								</h2>
								<p className="text-[#FFFAFA]">
									The student will see all the Classes they booked after
									clicking the Select button.
								</p>
								<div className="card-actions justify-center">
									<button className="btn bg-[#FFFAFA] text-[#FF6600]">
										<Link to={`/${studentUser?._id}/MySelectedClasses`}>
											See Wishlist
										</Link>
									</button>
								</div>
							</div>
						</div>
						<div className="card w-96 bg-base-100 shadow-xl image-full">
							<div className="card-body bg-[#00AEEF] rounded">
								<h2 className="text-4xl text-[#FF6600] bg-[#FFFAFA] rounded justify-center">
									My Enrolled Classes
								</h2>
								<p className="text-[#FFFAFA]">
									All the Classes a student selected after successful payment.
								</p>
								<div className="card-actions justify-center">
									<button className="btn bg-[#FFFAFA] text-[#FF6600]">
										<Link to={`/${studentUser?._id}/MyEnrolledClasses`}>
											See Enrolled classes
										</Link>
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

export default StudentDashboard;
