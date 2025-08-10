

const footerStyle = {
    textAlign: "center",
    padding: "16px",
    backgroundColor: "#222224",
    color: "white",
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%"
};

export function Footer() {
    return (
        <footer style={footerStyle}>
            <p>&copy; Jessica Sobreira 2025.</p>
        </footer>
    );
}