import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/assets/shapeshed-logo.png";
import { AuthContext } from "../../Providers/AuthProviders";

const Navbar = () => {
	const { user, loading, logOut } = useContext(AuthContext);

	const handleMouseOver = () => {
		const userName = document.getElementById("userName");
		userName.classList.remove("invisible");
	};

	const handleMouseOut = () => {
		const userName = document.getElementById("userName");
		userName.classList.add("invisible");
	};

	return (
		<div className="navbar flex items-center justify-center bg-[#FFFFFF] text-[#00AEEF]">
			<div className="container">
				<div className="flex-1">
					<div className="flex items-center">
						<Link to="/" className="btn btn-ghost">
							<img
								src={logo}
								alt=""
								className="rounded sm:w-32 sm:h-12  hidden sm:block"
							/>
						</Link>
					</div>
				</div>
				<div className="flex align-middle justify-center">
					<ul className="menu menu-horizontal px-1">
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
								className="bg-warning text-white px-4 py-2 rounded-md flex items-center"
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
						<div className="dropdown dropdown-end">
							<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
								<div
									className="w-10 rounded-full"
									onMouseOver={handleMouseOver}
									onMouseOut={handleMouseOut}>
									<img src={user?.photoURL || user?.displayName} />
								</div>
								<p className="mt-5 invisible" id="userName">
									{user?.displayName}
								</p>
							</label>
							<ul
								tabIndex={0}
								className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
								<li>
									<Link to="/dashboard">Dashboard</Link>
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
