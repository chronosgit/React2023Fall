function Footer() {
    let currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            Copyright © {currentYear} | nurkenkidir
        </footer>
    );
}

export default Footer;