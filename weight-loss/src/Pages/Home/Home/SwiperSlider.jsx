import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "./SwiperSlider.css";
import "swiper/css";
import "swiper/css/navigation";

// const imgHostingToken = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const slides = [
	{
		imgSrc: "https://i.ibb.co/XZrNV7v/pexels-victor-freitas-841130.jpg",
		text: "Lose weight, gain confidence!",
	},
	{
		imgSrc: "https://i.ibb.co/FqtdtMC/pexels-anush-gorak-1229356.jpg",
		text: "Transform your body, transform your life!",
	},
	{
		imgSrc: "https://i.ibb.co/Kxv5NQ8/pexels-leon-ardho-1552242.jpg",
		text: "Your journey to a healthier you starts here!",
	},
];

const SwiperSlider = () => {
	return (
		<div>
			<Swiper navigation={true} modules={[Navigation]} className="mySwiper">
				{slides.map((slide, index) => (
					<SwiperSlide
						key={index}
						className="text-center text-lg h-screen relative">
						<div className="absolute inset-0 flex flex-col items-center justify-center">
							<div className="w-full h-full bg-black opacity-70 absolute z-10"></div>
							<div className="relative">
								<img
									src={slide.imgSrc}
									className="w-full h-full object-cover"
									alt="Background Image"
								/>
								<p
									className="text-[#FF6600] text-5xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
									style={{ fontFamily: "Cassandra", lineHeight: "2" }}>
									{slide.text}
								</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default SwiperSlider;
