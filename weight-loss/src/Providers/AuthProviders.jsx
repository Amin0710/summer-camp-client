import {
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from "firebase/auth";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { app } from "../firebase/firebase.config";
import Swal from "sweetalert2";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [googleError, setGoogleError] = useState("");

	const [userEmails, setUserEmails] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5001/users")
			.then((res) => res.json())
			.then((data) => {
				const userEmails = data.flatMap((data) => data.email);
				setUserEmails(userEmails);
			})
			.catch((error) => console.error(error));
	}, []);

	const createUser = (
		email,
		password,
		{ displayName: name, photoURL: photo } = {}
	) => {
		setLoading(true);
		const user = { displayName: name };
		if (photo) {
			user.photoURL = photo;
		}
		return createUserWithEmailAndPassword(auth, email, password)
			.then((result) => {
				updateProfile(result.user, user);
				logOut();
				return;
			})
			.finally(() => {
				setLoading(false);
				setGoogleError("");
			});
	};

	const signIn = (email, password) => {
		setLoading(true);
		setGoogleError("");
		return signInWithEmailAndPassword(auth, email, password);
	};

	const providerGoogle = new GoogleAuthProvider();
	const handleGoogleLogin = () => {
		setLoading(true);
		return signInWithPopup(auth, providerGoogle)
			.then((result) => {
				const loggedInUser = result.user;
				if (!userEmails.includes(loggedInUser.email)) {
					const saveUser = {
						name: loggedInUser.displayName,
						email: loggedInUser.email,
						gender: loggedInUser.gender,
						password: loggedInUser.password,
						phoneNumber: loggedInUser.phoneNumber,
						photoURL: loggedInUser.photoURL,
						userRole: "student",
					};
					fetch("http://localhost:5001/users", {
						method: "POST",
						headers: {
							"content-type": "application/json",
						},
						body: JSON.stringify(saveUser),
					})
						.then((res) => res.json())
						.then((data) => {
							if (data.insertedId) {
								Swal.fire({
									position: "top-end",
									icon: "success",
									title: "User created successfully.",
									showConfirmButton: false,
									timer: 1500,
								});
							}
						});
				}

				setUser(loggedInUser);
				setGoogleError("");
				setLoading(false);
			})
			.catch((error) => {
				if (error.code === "auth/popup-closed-by-user") {
					setGoogleError("User closed the pop-up without signing in");
				}
				setLoading(false);
				throw error; // re-throw the error to be caught by the caller
			});
	};

	const logOut = () => {
		return signOut(auth);
	};

	const updateUserProfile = (name, photo) => {
		return updateProfile(auth.currentUser, {
			displayName: name,
			photoURL: photo,
		});
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});
		return () => {
			return unsubscribe();
		};
	}, []);

	const authInfo = {
		user,
		loading,
		googleError,
		setLoading,
		createUser,
		signIn,
		logOut,
		handleGoogleLogin,
		updateUserProfile,
	};
	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
