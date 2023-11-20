import { useContext } from "react";
import axios from "axios";

function Header(props) {
    const {context} = props;
    const userFromContext = useContext(context);
    const {user, setUser} = userFromContext;

    async function handleLogout() {
        try {
            await axios.get("http://localhost:3001/auth/logout/", {
                withCredentials: true,
                credentials: "include",
            });
            
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            setUser({});
            document.cookie = "JWT= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        } catch(error) {
            console.error(error.response.data);
        }
    }

    return (
        <header className="header">
            <div className="header_logo">
                <a href="/" style={{textDecoration: "none"}}>My <span className="red">Redemption</span> Arc</a>
            </div>

            {
                Object.keys(user).length ?
                    <>
                        <div className="header_greetings">Salamaleikum, {user?.username} &#128511;</div>

                        <div className="header_link" onClick={handleLogout}>Logout</div>
                    </>
                : 
                    <div className="header_auth">
                        <a href="/signin" className="header_link">
                            Authenticate
                        </a>
                    </div>
            }
        </header>
    )
}

export default Header;