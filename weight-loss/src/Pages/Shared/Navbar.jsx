import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../public/assets/shapeshed-logo.png";
import { AuthContext } from "../../Providers/AuthProviders";

const Navbar = () => {
	const { user, loading, logOut } = useContext(AuthContext);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isInstructor, setIsInstructor] = useState(false);

	useEffect(() => {
		fetch("http://localhost:5001/users")
			.then((res) => res.json())
			.then((data) => {
				const currentUser = data.filter((data) => data.email === user?.email);
				const isAdmin = currentUser[0].userRole === "admin";
				const isInstructor = currentUser[0].userRole === "instructor";
				setIsAdmin(isAdmin);
				setIsInstructor(isInstructor);
			})
			.catch((error) => console.error(error));
	}, [user?.email]);

	const handleMouseOver = () => {
		const userName = document.getElementById("userName");
		userName.classList.remove("invisible");
	};

	const handleMouseOut = () => {
		const userName = document.getElementById("userName");
		userName.classList.add("invisible");
	};

	const location = useLocation();
	const customOpacity = location.pathname === "/" ? "bg-opacity-30" : "";

	return (
		<div
			className={`navbar flex items-center justify-center bg-[#333333] text-[#FF6600] ${customOpacity}`}>
			<div className="container">
				<div className="flex-1">
					<div className="flex items-center ">
						<Link to="/" className="btn btn-ghost bg-[#333333] h-full ">
							<img
								src={logo}
								alt=""
								className="rounded sm:w-32 sm:h-12  hidden sm:block"
							/>
						</Link>
					</div>
				</div>
				<div className="flex align-middle justify-center bg-[#F5F5F5] rounded">
					<ul className="menu menu-horizontal">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/instructors">Instructors</Link>
						</li>
						<li>
							<Link to="/classes">Classes</Link>
						</li>
					</ul>
					{loading ? (
						<div className="flex justify-center">
							<button
								className="bg-warning text-[#F5F5F5] px-4 py-2 rounded-md flex items-center"
								disabled>
								<span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
								<span className="hidden sm:inline">Loading...</span>
							</button>
						</div>
					) : (
						!!user || (
							<ul className="menu menu-horizontal px-1">
								<li>
									<Link to="/login">Login</Link>
								</li>
							</ul>
						)
					)}
					{!!user && (
						<div className="dropdown dropdown-end  items-center justify-center">
							<label tabIndex={0} className="btn btn-ghost btn-circle avatar ">
								<div
									className="w-10 rounded-full"
									onMouseOver={handleMouseOver}
									onMouseOut={handleMouseOut}>
									<img src={user?.photoURL || user?.displayName} />
								</div>
								<p className="mt-5 me-3 invisible relative z-10" id="userName">
									{user?.displayName}
								</p>
							</label>
							<ul
								tabIndex={0}
								className="menu menu-compact dropdown-content mt-3 shadow bg-[#F5F5F5] rounded-box relative z-10">
								<li>
									<Link
										to={
											isAdmin
												? "/adminDashboard"
												: isInstructor
												? "/instructorDashboard"
												: "/dashboard"
										}>
										Dashboard
									</Link>
								</li>
								<li>
									<button onClick={logOut}>Log Out</button>
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
