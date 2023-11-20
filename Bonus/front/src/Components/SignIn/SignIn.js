import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const {context} = props;
    const userFromContext = useContext(context);
    const {setUser} = userFromContext;

    const navigate = useNavigate();

    function handleInputChange(event) {
        if(event.target.name === "username") {
            setUsername(event.target.value);
        } else if(event.target.name === "password") {
            setPassword(event.target.value);
        }
    }

    async function handleButtonClick() {
        try {
            const response = await axios.post("http://localhost:3001/auth/login/", 
                {
                    username: username,
                    password: password,
                }, 
                {
                    headers: {"Content-Type": "application/json; charset=UTF-8"},
                    withCredentials: true,
                }
            );

            localStorage.removeItem("accessToken");
            localStorage.setItem("accessToken", response?.data?.accessToken);

            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(response?.data?.userToReturn));
            setUser(response?.data?.userToReturn);

            setUsername("");
            setPassword("");
            setErrorMessage("");

            navigate("/");
        } catch(error) {
            setErrorMessage(error.response.data.error);
            console.error(error.response.data);
        }
    }

    return (
        <div className="signin">
            <input 
                type="text" name="username" 
                value={username} placeholder="Username" 
                className="signin_input" 
                onChange={handleInputChange}
            />
            <input 
                type="password" name="password" 
                value={password} placeholder="Password" 
                className="signin_input" 
                onChange={handleInputChange}  
            />
            <button className="signin_button" onClick={handleButtonClick}>Sign in</button>

            {
                errorMessage !== "" &&
                <div className="signin_error">
                    {errorMessage}
                </div>
            }

            <div className="signin_note">
                Don't have an account?
                <a href="/signup" className="signup_link"> Sign up!</a>
            </div>
        </div>
    )
}

export default SignIn;