import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import logo from "../../../public/assets/shapeshed-logo.png";
import google from "../../assets/google.png";
import { Helmet } from "react-helmet-async";
import {
	loadCaptchaEnginge,
	LoadCanvasTemplate,
	validateCaptcha,
} from "react-simple-captcha";

const Login = () => {
	const [disabled, setDisabled] = useState(false);
	const { signIn, handleGoogleLogin, setLoading, googleError, loading } =
		useContext(AuthContext);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || "/";

	useEffect(() => {
		loadCaptchaEnginge(8, "#FFFAFA", "#00AEEF");
	}, []);

	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		if (from !== "/") {
			if (mounted) {
				toast(
					<div className="alert alert-error">
						<div>
							<span>You have to log in first to view details.</span>
						</div>
					</div>
				);
			}
		}
	}, [from, mounted]);
	useEffect(() => {
		setMounted(true);
	}, []);

	const handleGoogleLoginLocation = () =>
		handleGoogleLogin().then(() => {
			navigate(from, { replace: true });
		});

	const handleLogin = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;
		signIn(email, password)
			.then(() => {
				navigate(from, { replace: true });
			})
			.catch((error) => {
				if (error) {
					setLoading(false);
				}

				if (error.code === "auth/user-not-found") {
					setError("User not found. Please Sign up first.");
					return;
				}
				if (error.code === "auth/invalid-email") {
					setError("Please type a valid E-mail");
					return;
				}
				if (error.code === "auth/wrong-password") {
					setError("Wrong password. Please try again.");
					return;
				}

				setError(
					error.message || "Something went wrong. Please try again later."
				);
			});
	};

	const handleValidateCaptcha = (e) => {
		const user_captcha_value = e.target.value;
		if (validateCaptcha(user_captcha_value)) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	};

	return (
		<>
			<Helmet>
				<title>ShapeShed | Login</title>
			</Helmet>
			<div className="hero min-h-screen bg-[#00AEEF] rounded">
				<div className="hero-content flex-col md:flex-row-reverse bg-[#FFFAFA] rounded">
					<div className="text-center md:w-1/2 lg:text-center">
						<h1 className="text-5xl font-bold mb-4 text-[#00AEEF]">
							Login now!
						</h1>
						{loading ? (
							<div className="flex flex-col items-center">
								<progress className="progress w-56 bg-red-500 mb-4"></progress>
								<progress className="progress w-56 bg-blue-500 mb-4"></progress>
								<progress className="progress w-56 bg-[#FFFAFA] mb-4"></progress>
								<progress className="progress w-56 bg-black mb-4"></progress>
								<progress className="progress w-56 bg-green-500 mb-4"></progress>
								<progress className="progress w-56 bg-yellow-500 mb-4"></progress>
							</div>
						) : (
							<img
								src={logo}
								height="400px"
								width="400px"
								alt=""
								className="rounded hidden sm:block"
							/>
						)}
					</div>
					<div className="card md:w-1/2 max-w-sm shadow-2xl text-[#FF6600]">
						<form onSubmit={handleLogin} className="card-body">
							<div className="form-control ">
								<label className="label">
									<span className="label-text text-[#FF6600]">Email</span>
								</label>
								<input
									type="email"
									name="email"
									placeholder="email"
									className="input input-bordered text-[#FF6600] bg-[#FFFAFA]"
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text text-[#FF6600]">Password</span>
								</label>
								<input
									type="password"
									name="password"
									placeholder="password"
									className="input input-bordered text-[#FF6600] bg-[#FFFAFA]"
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<LoadCanvasTemplate reloadColor="#FF6600" />
								</label>
								<input
									onBlur={handleValidateCaptcha}
									type="text"
									name="captcha"
									placeholder="type the captcha above"
									className="input input-bordered text-[#FF6600] bg-[#FFFAFA]"
								/>
							</div>
							<div className="form-control mt-6">
								<input
									disabled={disabled}
									className="btn bg-[#00AEEF] text-[#FFFAFA]"
									type="submit"
									value="Login"
								/>
							</div>
						</form>
						<button
							className="btn flex items-center mx-8 bg-[#00AEEF] text-[#FFFAFA]"
							onClick={handleGoogleLoginLocation}>
							Login with
							<img src={google} alt="" className="ml-1 btn-icon w-5 h-5" />
						</button>
						<p className="text-red-700 text-center">{error || googleError}</p>
						<p className="my-4 text-center">
							New to Shape Shed
							<Link className="text-[#00AEEF] font-bold" to="/signup">
								{" "}
								Sign Up
							</Link>{" "}
						</p>
					</div>
				</div>
				<ToastContainer
					position="top-right"
					autoClose={1000}
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
			</div>
		</>
	);
};

export default Login;
