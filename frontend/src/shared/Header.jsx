import React from 'react';

function Header() {

  // Définir isAuthenticated comme une fonction normale
  const isAuthenticated = () => {
    return localStorage.getItem('tokens') !== null;
  };

  // Appeler isAuthenticated pour obtenir la valeur boolean
  const authenticated = isAuthenticated();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
              {!authenticated ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/register">Register</a>
                  </li>
                </>
              ) : (
                <button className="btn btn-outline-danger" onClick={() => {
                  localStorage.removeItem('tokens');
                  window.location.reload(); // Optionally reload the page to reflect the logout
                }}>Logout</button>
              )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
