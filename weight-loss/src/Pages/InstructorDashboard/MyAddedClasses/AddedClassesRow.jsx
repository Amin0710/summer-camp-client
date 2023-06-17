import { useContext } from "react";
import { FcFeedback } from "react-icons/fc";
import { AuthContext } from "../../../Providers/AuthProviders";

const AddedClassesRow = ({ eachClass }) => {
	const { user } = useContext(AuthContext);

	return (
		<tr>
			<td className="text-center">
				<div className="flex items-center space-x-3">
					<div className="avatar">
						<div className="mask mask-squircle w-12 h-12">
							<img src={eachClass.image} alt="Avatar Tailwind CSS Component" />
						</div>
					</div>
					<div className="font-bold">{eachClass.name}</div>
				</div>
			</td>
			<td className="text-center px-0">{eachClass.instructorName}</td>
			<td className="text-center px-0">
				{eachClass.instructorEmail || user?.email}
			</td>
			<td className="text-center px-0">{eachClass.availableSeats}</td>
			<td className="text-center px-0">${eachClass.price}</td>
			<td className="text-center px-0">{eachClass.status}</td>
			<th className="text-center">
				<div>
					{/* The button to open modal */}
					<button>
						<label
							htmlFor="my_modal_6"
							className="btn text-3xl px-2 bg-[#00AEEF] text-[#FFFAFA]">
							<FcFeedback />
							<p className="text-sm">Read Feedback</p>
						</label>
					</button>
					{/* Put this part before </body> tag */}
					<input type="checkbox" id="my_modal_6" className="modal-toggle" />
					<div className="modal">
						<div className="modal-box bg-[#FFFAFA] text-[#FF6600]">
							<h3 className="font-bold text-lg">
								{eachClass?.status === "Pending"
									? "No Feedback yet, please wait for admin's approval."
									: eachClass?.status === "approved"
									? "No Feedback Needed. <br/>Your class has need approved successfully."
									: "Admin denied your class request"}
							</h3>
							<p className="py-4">
								{eachClass?.status === "denied" && eachClass?.adminFeedback}
							</p>
							<div className="modal-action">
								<label
									htmlFor="my_modal_6"
									className="btn bg-[#FFFAFA] text-[#00AEEF] border-0">
									Close!
								</label>
							</div>
						</div>
					</div>
				</div>
			</th>
		</tr>
	);
};

export default AddedClassesRow;
