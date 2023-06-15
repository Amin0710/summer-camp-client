import { useContext, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import google from "../../assets/google.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProviders";
import logo from "../../../public/assets/shapeshed-logo.png";

const SignUp = () => {
	const {
		watch,
		register,
		handleSubmit,
		// reset,
		formState: { errors },
	} = useForm();
	const [error, setError] = useState("");
	const [accepted, setAccepted] = useState(false);
	const {
		createUser,
		// updateUserProfile,
		loading,
		handleGoogleLogin,
		googleError,
	} = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	const handleGoogleLoginLocation = () =>
		handleGoogleLogin().then(() => {
			navigate(from, { replace: true });
		});

	const onSubmit = (data) => {
		setError("");
		createUser(data.email, data.password)
			.then(() => {
				navigate("/login", { replace: true });

				// updateUserProfile(data.name, data.photoURL)
				// 	.then(() => {
				// 		const saveUser = { name: data.name, email: data.email };
				// 		fetch("https://bistro-boss-server-fawn.vercel.app/users", {
				// 			method: "POST",
				// 			headers: {
				// 				"content-type": "application/json",
				// 			},
				// 			body: JSON.stringify(saveUser),
				// 		})
				// 			.then((res) => res.json())
				// 			.then((data) => {
				// 				if (data.insertedId) {
				// 					reset();
				// 					Swal.fire({
				// 						position: "top-end",
				// 						icon: "success",
				// 						title: "User created successfully.",
				// 						showConfirmButton: false,
				// 						timer: 1500,
				// 					});
				// 					navigate("/");
				// 				}
				// 			});
				// 	})
				// 	.catch((error) => console.log(error));
			})
			.catch((error) => {
				console.log(error);
				if (error.code === "auth/email-already-in-use") {
					setError("User already exists. Please login.");
					return;
				}
				setError(
					error.message || "Something went wrong. Please try again later."
				);
			});
	};

	const handleAccepted = (event) => {
		setAccepted(event.target.checked);
	};

	const password = useRef({});
	password.current = watch("password", "");

	return (
		<>
			<Helmet>
				<title>ShapeShed | Sign Up</title>
			</Helmet>
			<div className="hero min-h-screen bg-[#00AEEF] rounded">
				<div className="hero-content flex-col lg:flex-row-reverse my-1 bg-[#FFFFFF] rounded">
					<div className="text-center  md:w-1/2 lg:text-center">
						<h1 className="text-5xl font-bold mb-4 text-[#00AEEF]">
							Sign up now!
						</h1>
						{loading ? (
							<div className="flex flex-col items-center">
								<progress className="progress w-56 bg-red-500 mb-4"></progress>
								<progress className="progress w-56 bg-blue-500 mb-4"></progress>
								<progress className="progress w-56 bg-white mb-4"></progress>
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
					<div className="card md:w-1/2 max-w-sm shadow-2xl  text-[#FF6600]">
						<form onSubmit={handleSubmit(onSubmit)} className="card-body">
							<div className="form-control">
								<label className="label">
									<span className="label-text  text-[#FF6600]">Name</span>
								</label>
								<input
									type="text"
									{...register("name", { required: true })}
									name="name"
									placeholder="Name"
									className="input input-bordered text-[#FF6600] bg-[#FFFFFF]"
								/>
								{errors.name && (
									<span className="text-red-600">Name is required</span>
								)}
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text  text-[#FF6600]">Email</span>
								</label>
								<input
									type="email"
									{...register("email", { required: true })}
									name="email"
									placeholder="email"
									className="input input-bordered text-[#FF6600] bg-[#FFFFFF]"
								/>
								{errors.email && (
									<span className="text-red-600">Email is required</span>
								)}
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text  text-[#FF6600]">Password</span>
								</label>
								<input
									type="password"
									{...register("password", {
										required: true,
										minLength: 6,
										maxLength: 20,
										pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
									})}
									id="password"
									name="password"
									placeholder="password"
									className="input input-bordered text-[#FF6600] bg-[#FFFFFF]"
								/>
								{errors.password?.type === "required" && (
									<p className="text-red-600">Password is required</p>
								)}
								{errors.password?.type === "minLength" && (
									<p className="text-red-600">Password must be 6 characters</p>
								)}
								{errors.password?.type === "maxLength" && (
									<p className="text-red-600">
										Password must be less than 20 characters
									</p>
								)}
								{errors.password?.type === "pattern" && (
									<p className="text-red-600">
										Password must have one Uppercase one lower case, one number
										and one special character.
									</p>
								)}
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text  text-[#FF6600]">
										Confirm Password
									</span>
								</label>
								<input
									type="password"
									{...register("confirmPassword", {
										required: true,
										validate: (value) =>
											value === watch("password") || "Passwords do not match.",
									})}
									placeholder="Confirm Password"
									className="input input-bordered text-[#FF6600] bg-[#FFFFFF]"
								/>
								{errors.confirmPassword && (
									<p className="text-red-600">
										{errors.confirmPassword.message}
									</p>
								)}
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text  text-[#FF6600]">Photo URL</span>
								</label>
								<input
									type="text"
									{...register("photoURL", { required: true })}
									placeholder="Photo URL"
									className="input input-bordered text-[#FF6600] bg-[#FFFFFF]"
								/>
								{errors.photoURL && (
									<span className="text-red-600">Photo URL is required</span>
								)}
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text  text-[#FF6600]">Gender</span>
								</label>
								<select
									name="gender"
									className="input input-bordered text-[#FF6600] bg-[#FFFFFF]">
									<option value="">Select Gender</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
									<option value="other">Other</option>
								</select>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text  text-[#FF6600]">
										Phone Number
									</span>
								</label>
								<input
									type="number"
									name="phoneNumber"
									placeholder="Phone Number"
									className="input input-bordered text-[#FF6600] bg-[#FFFFFF]"
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text  text-[#FF6600]">Address</span>
								</label>
								<input
									type="text"
									name="address"
									placeholder="Address"
									className="input input-bordered text-[#FF6600] bg-[#FFFFFF]"
								/>
							</div>
							<div className="flex items-center">
								<input
									type="checkbox"
									name="accept"
									id="acceptCheckbox"
									className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
									onClick={handleAccepted}
								/>
								<label htmlFor="acceptCheckbox" className="ml-2 text-sm">
									Accept Terms and Conditions
								</label>
							</div>
							<div className="form-control mt-6">
								<input
									disabled={!accepted}
									className="btn bg-[#00AEEF] text-[#FFFFFF]"
									type="submit"
									value="Sign Up"
								/>
							</div>
							<button
								className="btn flex items-center bg-[#00AEEF] text-[#FFFFFF]"
								onClick={handleGoogleLoginLocation}>
								Login with
								<img src={google} alt="" className="ml-1 btn-icon w-5 h-5" />
							</button>
						</form>
						<p className="text-red-700 text-center">{error || googleError}</p>

						<p className="my-4 text-center">
							Already have an account
							<Link className="text-[#00AEEF] font-bold" to="/login">
								{" "}
								Login
							</Link>{" "}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignUp;
