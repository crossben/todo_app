import TodoList from "../components/todoList";
import api from '../environments/api';
import { useState } from "react";

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
            }
        } catch (error) {
            console.error("Failed to add todo:", error);
            setError("Failed to add todo. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Todo List</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleAddTodo}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    disabled={loading}
                    aria-label="New Todo"
                />
                <button type="submit" disabled={loading}>
                    Add Todo
                </button>
            </form>
            <TodoList todos={todos} setTodos={setTodos} />
        </div>
    );
}
