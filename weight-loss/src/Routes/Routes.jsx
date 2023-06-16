import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Classes from "../Pages/OtherPages/Classes";
import Instructors from "../Pages/OtherPages/Instructors";
import InstructorsClasses from "../Pages/OtherPages/InstructorsClasses";
import Signup from "../Pages/Singup/Signup";
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
	{
		path: "games",
		element: <Layout></Layout>,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/games/:id",
				element: (
					<PrivateRoute>
						<InstructorsClasses></InstructorsClasses>
					</PrivateRoute>
				),
				errorElement: <ErrorPage />,
				loader: ({ params }) => {
					return fetch(
						`https://b7a11-toy-marketplace-server-side-amin0710.vercel.app/games/${params.id}`
					);
				},
			},
		],
	},
]);
