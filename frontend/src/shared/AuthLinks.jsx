function AuthLinks() {
    const authenticated = isAuthenticated => {
        return localStorage.getItem('tokens') !== null;
    };
    return (
        <div>
            {!authenticated ? (
                <>
                    <li className="nav-item">
                        <a className="nav-link" href="/login">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/register">Register</a>
                    </li>F
                </>
            ) : (
                <button className="btn btn-outline-danger" onClick={() => {
                    localStorage.removeItem('token');
                    window.location.reload(); // Optionally reload the page to reflect the logout
                }}>Logout</button>
            )}
        </div>
    );
}

export default AuthLinks;
