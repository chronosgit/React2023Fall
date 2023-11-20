import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");

    const {context} = props;
    const userFromContext = useContext(context);
    const {user, setUser} = userFromContext;

    const navigate = useNavigate();

    async function handleButtonClick() {
        if(password !== repeatedPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/auth/register/", 
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
            setRepeatedPassword("");

            navigate("/");
        } catch(error) {
            console.error(error.response.data);
        }
    }

    return (
        <div className="signup">
            <input 
                type="text" placeholder="Username"
                name="username" value={username}  
                className="signup_input" 
                onChange={(e) => setUsername(e.target.value)}    
            />
            <input 
                type="password" placeholder="Password"
                name="password" value={password}  
                className="signup_input" 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <input 
                type="password" placeholder="Confirm password"
                name="repeatedPassword" value={repeatedPassword} 
                className="signup_input" 
                onChange={(e) => setRepeatedPassword(e.target.value)}
            />
            <button className="signup_button" onClick={handleButtonClick}>Sign up</button>
        </div>
    )
}

export default SignUp;