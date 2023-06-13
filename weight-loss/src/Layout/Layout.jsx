import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer";
import Navbar from "../Pages/Shared/Navbar";

const Layout = () => {
	const location = useLocation();

	const noHeaderFooter = location.pathname.includes("four-oh-four");
	return (
		<div className="flex flex-col min-h-screen">
			{noHeaderFooter || <Navbar></Navbar>}
			<div className="flex-grow">
				<Outlet></Outlet>
			</div>
			{noHeaderFooter || (
				<div className="mt-auto">
					<Footer></Footer>
				</div>
			)}
		</div>
	);
};

export default Layout;
