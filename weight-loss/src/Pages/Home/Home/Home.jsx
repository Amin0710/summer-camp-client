import { Helmet } from "react-helmet-async";

const Home = () => {
	return (
		<div>
			<Helmet>
				<title>ShapeShed | Home</title>
			</Helmet>
			<button className="btn btn-info">Info</button>
			<button className="btn btn-success">Success</button>
			<button className="btn btn-warning">Warning</button>
			<button className="btn btn-error">Error</button>
		</div>
	);
};

export default Home;
