import { EditOutlined } from "@ant-design/icons";

function Header() {
    return (
        <header className="header">
            <h1>yetAnotherToDo</h1>
            <EditOutlined style={{fontSize: "1.5rem"}} />
        </header>
    )
}

export default Header;