import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../environments/api";
import { FaSignInAlt, FaQuestionCircle, FaEnvelope, FaUser, FaLock } from "react-icons/fa";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/user/login", { email, password });
            console.log(response.data);
            localStorage.setItem('tokens', response.data.token);
            localStorage.setItem('userId', response.data.user.id);
            console.log(response.data);
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert("An error occurred");
        }
    };
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card" style={{ width: "24rem" }}>
                <div className="card-body">
                    <h5 className="card-title text-center mb-4">Connexion</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 input-group">
                            <span className="input-group-text"><FaEnvelope /></span>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 input-group">
                            <span className="input-group-text"><FaLock /></span>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-check mb-3">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="exampleCheck1"
                            />
                            <label className="form-check-label" htmlFor="exampleCheck1">
                                se souvenir de moi
                            </label>
                        </div>
                        <div className="d-grid mb-3">
                            <a href="/register" className="btn btn-outline-primary">
                                <FaQuestionCircle className="me-2" /> Vous n&apos;avez pas de compte ?
                            </a>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                <FaSignInAlt className="me-2" /> Connexion
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
