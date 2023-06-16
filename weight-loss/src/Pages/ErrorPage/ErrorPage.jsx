import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ErrorPage = () => {
	return (
		<>
			<Helmet>
				<title>SS | 404</title>
			</Helmet>
			<div className="flex items-center justify-center h-screen bg-[#00AEEF]">
				<section className="bg-[#FFFAFA] p-10 rounded">
					<div className="container">
						<div className="text-center">
							<div
								className="bg-cover bg-center bg-no-repeat h-80"
								style={{
									backgroundImage:
										"url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
								}}>
								<h1 className="text-6xl text-[#FF6600]">404</h1>
							</div>

							<div className="mt-8 text-[#FF6600]">
								<h3 className="text-4xl font-bold">
									Looks like you&apos;re lost
								</h3>
								<p>The page you are looking for is not available!</p>
								<Link to="/" className="text-[#00AEEF] font-bold mt-4 block">
									Go to Home
								</Link>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default ErrorPage;
