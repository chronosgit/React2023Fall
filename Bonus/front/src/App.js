import { createContext, useEffect, useState } from "react";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

import Header from "./Components/Header/Header";
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";

const UserContext = createContext({});

const router = createBrowserRouter([
	{
	  	path: "/",
	  	element: <Home context={UserContext} />,
	},
	{
		path: "/signin",
	  	element: <SignIn context={UserContext} />,
	},
	{
		path: "/signup",
	  	element: <SignUp context={UserContext} />,
	},
	{
		path: "/error",
		element: <p>some error happened</p>
	},
]);

function App() {
	const [user, setUser] = useState({});
	
	useEffect(() => { // to prevent logout after F5
		try {
			if(localStorage.getItem("user")) {
				setUser(JSON.parse(localStorage.getItem("user")));
			}
		} catch(error) {
			console.error(error);
			setUser(localStorage.getItem("user")); // error when not a json, but an object is in storage (bad error handling, i know)
		}
	}, [setUser]);

	return (
		<UserContext.Provider value={{user, setUser}}>
			<div className="App">
				<Header context={UserContext} />

				<Footer />

				<RouterProvider router={router} />
			</div>
		</UserContext.Provider>	
	)
}

export default App;