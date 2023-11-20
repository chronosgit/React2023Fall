function Footer() {
    const currentDate = new Date().getFullYear();

    return (
        <footer className="footer">
            Copyright tipo © {currentDate}
        </footer>
    )
}

export default Footer;