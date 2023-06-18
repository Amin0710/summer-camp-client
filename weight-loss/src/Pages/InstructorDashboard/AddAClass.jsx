import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const AddAClass = () => {
	<Helmet>
		<title>ShapeShed | Add a Class</title>
	</Helmet>;

	const [photoURL, setPhotoURL] = useState("");
	const { user } = useContext(AuthContext);
	const [accepted, setAccepted] = useState(false);
	const [error, setError] = useState("");
	const handleAddClass = (event) => {
		event.preventDefault();
		const form = event.target;
		const price = form.price.value;

		const newClass = {
			name: form.className.value,
			image: form.photo.value,
			instructorName: form.instructorName.value,
			instructorEmail: form.email.value,
			price: parseFloat(price),
			availableSeats: parseFloat(form.availableSeats.value),
			status: "pending",
		};

		setError("");

		if (price < 10 || price > 200) {
			setError("Price must be between $10 and $200");
			return;
		}

		fetch(`http://localhost:5001/classes`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(newClass),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.insertedId) {
					Swal.fire({
						position: "top-end",
						icon: "success",
						title: `New Class sent to admin for approval!`,
						showConfirmButton: false,
						timer: 2500,
					});
				}
			});

		setPhotoURL("");
		// Reset the form
		for (const input of form.querySelectorAll("input")) {
			input.value = "";
		}
		for (const textarea of form.querySelectorAll("textarea")) {
			textarea.value = "";
		}
	};

	const handleAccepted = (event) => {
		setAccepted(event.target.checked);
	};

	return (
		<div className="hero min-h-screen bg-[#FFFAFA] m-0 ">
			<div className="hero-content flex-col lg:flex-row gap-20">
				<div className="card flex-shrink-0 w-full max-w-xl shadow-2xl bg-[#00AEEF]">
					<div className="card-body">
						<h1 className="text-5xl font-bold  text-[#FF6600] bg-[#FFFAFA] rounded text-center">
							Add A Class
						</h1>
						<form onSubmit={handleAddClass}>
							<div className="grid grid-cols-2 gap-4">
								<div className="form-control col-span-2">
									<label className="label">
										<span className="text-[#FFFAFA]">Class Name</span>
									</label>
									<input
										type="text"
										placeholder="Class Name"
										name="className"
										className="input input-bordered bg-[#FFFAFA] text-[#00AEEF]"
										required
									/>
								</div>
								<div className="form-control">
									<label className="label">
										<span className="text-[#FFFAFA]">Instructor Name</span>
									</label>
									<input
										type="text"
										placeholder={user.displayName || "Instructor Name"}
										defaultValue={user.displayName || ""}
										name="instructorName"
										className="input input-bordered bg-[#FFFAFA] text-[#FF6600]"
										required
										readOnly
									/>
								</div>
								<div className="form-control">
									<label className="label">
										<span className="text-[#FFFAFA]">Instructor Email</span>
									</label>
									<input
										type="text"
										placeholder={user.email || "Email"}
										defaultValue={user.email}
										name="email"
										className="input input-bordered bg-[#FFFAFA] text-[#FF6600]"
										required
										readOnly
									/>
								</div>
								<div className="form-control">
									<label className="label">
										<span className="text-[#FFFAFA]">Available Seats</span>
									</label>
									<input
										type="text"
										placeholder={50}
										defaultValue={50} // every class has 50 students
										name="availableSeats"
										className="input input-bordered bg-[#FFFAFA] text-[#FF6600]"
										required
										readOnly
									/>
								</div>
								<div className="form-control">
									<label className="label">
										<span className="text-[#FFFAFA]">Price</span>
									</label>
									<input
										type="number"
										placeholder="Price"
										step="0.1"
										name="price"
										className="input input-bordered bg-[#FFFAFA] text-[#00AEEF]"
										required
									/>
								</div>
								<div className="form-control col-span-2">
									<label className="label">
										<span className="text-[#FFFAFA]">Photo URL</span>
									</label>
									<input
										type="url"
										placeholder="http://www.example.com/"
										name="photo"
										value={photoURL}
										onChange={(e) => setPhotoURL(e.target.value)}
										className="input input-bordered bg-[#FFFAFA] text-[#00AEEF]"
										required
									/>
								</div>
							</div>
							<div className="flex items-center">
								<input
									type="checkbox"
									name="accept"
									id="acceptCheckbox"
									className="form-checkbox h-4 w-4 text-[#00AEEF] transition duration-150 ease-in-out"
									onClick={handleAccepted}
								/>
								<label
									htmlFor="acceptCheckbox"
									className="ml-2 text-sm mt-2 text-[#FFFAFA]">
									Confirm all the information are correct
								</label>
							</div>
							<div className="form-control mt-6">
								<input
									disabled={!accepted}
									className="btn bg-[#FF6600] text-[#FFFAFA]"
									type="submit"
									value="Add"
								/>
							</div>
						</form>
					</div>
					<p className="text-red-700 text-center">{error}</p>
				</div>
			</div>
		</div>
	);
};

export default AddAClass;
