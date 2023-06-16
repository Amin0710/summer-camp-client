import exer1 from "../../assets/1.mp4";
import exer2 from "../../assets/2.mp4";
import exer3 from "../../assets/3.mp4";

const ExtraSection = () => {
	const videos = [
		{
			src: exer1,
		},
		{
			src: exer2,
		},
		{
			src: exer3,
		},
	];

	return (
		<div className="container mx-auto py-8 text-center">
			<h1
				className="text-5xl font-bold mb-4 text-[#FF6600] bg-[#00AEEF] bg-opacity-30 rounded-lg p-4 mt-5"
				style={{ fontFamily: "BungeeShade" }}>
				Demo Exercises
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 mb-10">
				{videos.map((video, index) => (
					<div
						key={index}
						className="relative aspect-w-1 aspect-h-1 flex justify-center">
						<video
							src={video.src}
							className="object-cover rounded"
							autoPlay
							loop={true}
							muted={true}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default ExtraSection;
