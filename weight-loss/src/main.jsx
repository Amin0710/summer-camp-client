import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import "./index.css";
import AuthProvider from "./Providers/AuthProviders";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<HelmetProvider>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</HelmetProvider>
	</React.StrictMode>
);
