import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SwiperSlider from "../Swiper/SwiperSlider";
import Navbar from "../../Shared/Navbar";
import TopClasses from "../TopClasses/TopClasses";
import TopInstructors from "../TopInstructors/TopInstructors";
import ExtraSection from "../ExtraSection";

const Home = () => {
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
		<>
			<Helmet>
				<title>ShapeShed | Home</title>
			</Helmet>
			<div className="h-screen overflow-y-auto bg-[#FFFAFA]">
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
				</div>
				<TopClasses></TopClasses>
				<TopInstructors></TopInstructors>
				<ExtraSection></ExtraSection>
			</div>
		</>
	);
};

export default Home;
