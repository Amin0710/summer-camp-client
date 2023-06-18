import { useContext } from "react";
import { FcFeedback } from "react-icons/fc";
import { AuthContext } from "../../../Providers/AuthProviders";

const AddedClassesRow = ({ eachClass, editID }) => {
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
							className="btn text-3xl px-2 bg-[#00AEEF] text-[#FFFAFA] disabled:bg-gray-500 disabled:text-[#FFFAFA]"
							onClick={() => editID(eachClass._id)}>
							<FcFeedback />
							<p className="text-sm">Send Feedback</p>
						</label>
					</button>
				</div>
			</th>
		</tr>
	);
};

export default AddedClassesRow;
