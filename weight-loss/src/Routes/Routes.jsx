import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import AdminDashboard from "../Pages/AdminDashboard/AllUsers/AdminDashboard";
import User from "../Pages/AdminDashboard/Allusers/User";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import InstructorDashboard from "../Pages/InstructorDashboard/InstructorDashboard";
import Login from "../Pages/Login/Login";
import Classes from "../Pages/OtherPages/Classes";
import Instructors from "../Pages/OtherPages/Instructors";
import InstructorsClasses from "../Pages/OtherPages/InstructorsClasses";
import Signup from "../Pages/Singup/Signup";
import StudentDashboard from "../Pages/StudentDahsboard/StudentDashboard";
import PrivateRoute from "./PrivateRoute";
import PublicOnlyRoutes from "./PublicOnlyRoutes";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout></Layout>,
		errorElement: <ErrorPage></ErrorPage>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
			{
				path: "/login",
				element: (
					<PublicOnlyRoutes>
						<Login></Login>,
					</PublicOnlyRoutes>
				),
			},
			{
				path: "/signup",
				element: (
					<PublicOnlyRoutes>
						<Signup></Signup>
					</PublicOnlyRoutes>
				),
			},
			{
				path: "/instructors",
				element: <Instructors></Instructors>,
				loader: () => fetch(`http://localhost:5001/instructors`),
			},
			{
				path: "/classes",
				element: <Classes></Classes>,
				loader: () => fetch(`http://localhost:5001/classes`),
			},
			{
				path: "/adminDashboard",
				element: <AdminDashboard></AdminDashboard>,
			},
			{
				path: "/instructorDashboard",
				element: <InstructorDashboard></InstructorDashboard>,
			},
			{
				path: "/dashboard",
				element: <StudentDashboard></StudentDashboard>,
			},
			{
				path: "/users",
				element: (
					<PrivateRoute>
						<User></User>
					</PrivateRoute>
				),
				loader: () => fetch(`http://localhost:5001/users`),
			},
		],
	},
	{
		path: "/instructors",
		element: <Layout></Layout>,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/instructors/:id",
				element: <InstructorsClasses></InstructorsClasses>,
				errorElement: <ErrorPage />,
				loader: ({ params }) => {
					return fetch(`http://localhost:5001/instructors/${params.id}`);
				},
			},
		],
	},
]);
