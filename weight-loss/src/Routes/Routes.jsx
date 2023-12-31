import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import AllClasses from "../Pages/AdminDashboard/AllClasses/AllClasses";
import User from "../Pages/AdminDashboard/Allusers/User";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import AddAClass from "../Pages/InstructorDashboard/AddAClass";
import InstructorDashboard from "../Pages/InstructorDashboard/InstructorDashboard";
import MyAddedClasses from "../Pages/InstructorDashboard/MyAddedClasses/MyAddedClasses";
import Login from "../Pages/Login/Login";
import Classes from "../Pages/OtherPages/Classes";
import Instructors from "../Pages/OtherPages/Instructors";
import InstructorsClasses from "../Pages/OtherPages/InstructorsClasses";
import Payment from "../Pages/Shared/Payment/Payment";
import Signup from "../Pages/Singup/Signup";
import MyEnrolledClasses from "../Pages/StudentDahsboard/MyEnrolledClasses/MyEnrolledClasses";
import MySelectedClasses from "../Pages/StudentDahsboard/MySelectedClasses/MySelectedClasses";
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
				loader: () =>
					fetch(
						`https://b7a12-summer-camp-server-side-amin0710.vercel.app/instructors`
					),
			},
			{
				path: "/classes",
				element: <Classes></Classes>,
				loader: () =>
					fetch(
						`https://b7a12-summer-camp-server-side-amin0710.vercel.app/classes`
					),
			},
			{
				path: "/dashboard",
				element: (
					<PrivateRoute>
						<StudentDashboard></StudentDashboard>,
					</PrivateRoute>
				),
			},
			{
				path: "/:id/MySelectedClasses",
				element: (
					<PrivateRoute>
						<MySelectedClasses></MySelectedClasses>
					</PrivateRoute>
				),
			},
			{
				path: "/:id/MyEnrolledClasses",
				element: (
					<PrivateRoute>
						<MyEnrolledClasses></MyEnrolledClasses>
					</PrivateRoute>
				),
			},
			{
				path: "/instructorDashboard",
				element: (
					<PrivateRoute>
						<InstructorDashboard></InstructorDashboard>,
					</PrivateRoute>
				),
			},
			{
				path: "/addAClass",
				element: (
					<PrivateRoute>
						<AddAClass></AddAClass>
					</PrivateRoute>
				),
			},
			{
				path: "/MyAddedClasses/:id",
				element: (
					<PrivateRoute>
						<MyAddedClasses></MyAddedClasses>
					</PrivateRoute>
				),
				loader: () =>
					fetch(
						`https://b7a12-summer-camp-server-side-amin0710.vercel.app/classes`
					),
			},
			{
				path: "/adminDashboard",
				element: (
					<PrivateRoute>
						<AdminDashboard></AdminDashboard>
					</PrivateRoute>
				),
			},
			{
				path: "/users",
				element: (
					<PrivateRoute>
						<User></User>
					</PrivateRoute>
				),
				loader: () =>
					fetch(
						`https://b7a12-summer-camp-server-side-amin0710.vercel.app/users`
					),
			},
			{
				path: "/allClasses",
				element: (
					<PrivateRoute>
						<AllClasses></AllClasses>
					</PrivateRoute>
				),
				loader: () =>
					fetch(
						`https://b7a12-summer-camp-server-side-amin0710.vercel.app/classes`
					),
			},
			{
				path: "/payment",
				element: (
					<PrivateRoute>
						<Payment></Payment>
					</PrivateRoute>
				),
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
				element: (
					<PrivateRoute>
						<InstructorsClasses></InstructorsClasses>
					</PrivateRoute>
				),
				errorElement: <ErrorPage />,
				loader: ({ params }) => {
					return fetch(
						`https://b7a12-summer-camp-server-side-amin0710.vercel.app/instructors/${params.id}`
					);
				},
			},
		],
	},
]);
