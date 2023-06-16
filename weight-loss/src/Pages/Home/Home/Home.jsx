import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SwiperSlider from "../Swiper/SwiperSlider";
import Navbar from "../../Shared/Navbar";
import TopClasses from "../TopClasses/TopClasses";

const Home = () => {
	<Helmet>
		<title>ShapeShed | Home</title>
	</Helmet>;
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		if (from === "/login" || from === "/signup") {
			if (mounted) {
				toast(
					<div className="alert alert-success">
						<div>You have successfully logged in!</div>
						<div className="alert alert-warning">
							Let&apos;s Shed and get into Shape
						</div>
					</div>
				);
			}
		}
	}, [from, mounted]);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div className="h-screen overflow-y-auto bg-white">
			<ToastContainer
				position="top-right"
				autoClose={10000}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				toastStyle={{
					backgroundColor: "transparent",
				}}
			/>
			<div className="relative z-20">
				<Navbar></Navbar>
			</div>
			<div className="relative top-[-68px]">
				<SwiperSlider></SwiperSlider>
				<p
					className="text-[#00AEEF]  text-2xl  flex items-center justify-center"
					style={{ fontFamily: "BungeeShade" }}>
					Join Our Program Today
				</p>
			</div>
			<TopClasses></TopClasses>
		</div>
	);
};

export default Home;
