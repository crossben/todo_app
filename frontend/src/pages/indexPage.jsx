import TodoList from "../components/todoList";
import api from '../environments/api';
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function IndexPage() {
    const [newTodo, setNewTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAddTodo = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await api.post("/todo/create", { title: newTodo, userId: localStorage.getItem("userId") });
            if (response.status === 201) {
                const todo = response.data;
                setTodos((prevTodos) => [...prevTodos, todo]);
                setNewTodo("");
                window.location.reload();
            }
        } catch (error) {
            console.error("Failed to add todo:", error);
            setError("Failed to add todo. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: "24rem", background: "#38265A" }}>
                <div className="card-body">
                    {/* <h5 className="card-title text-center mb-4">{error && <span style={{ color: "red" }}>{error}</span>}</h5> */}
                    <form onSubmit={handleAddTodo} className="d-flex">
                        <input
                            type="text"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            disabled={loading}
                            aria-label="New Todo"
                            className="form-control me-2"
                            placeholder="Add New Todo"
                            style={{ borderColor: "#D1C4E9", background : "transparent", borderWidth: 2, color: "#777777" }}
                        />
                        <button type="submit" className="btn btn-primary" disabled={loading} style={{ backgroundColor: "#7E57C2" }}>
                            <FaPlus />
                        </button>
                    </form>
                    <div className="mt-5">
                        <TodoList todos={todos} setTodos={setTodos} />
                    </div>
                </div>
            </div>
        </div>
    );
}
