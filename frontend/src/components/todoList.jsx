import React, { useEffect, useState } from "react";
import api from "../environments/api";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const userId = localStorage.getItem("userId");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getTodos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get("/todo/" + userId);
            setTodos(response.data);
        } catch (error) {
            console.error("Failed to fetch todos:", error);
            setError("Failed to fetch todos. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    const handleDeleteTodo = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.delete("/todo/" + id);
            console.log(response);
            if (response.status === 200) {
                setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete todo:", error);
            setError("Failed to delete todo. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {todos.length === 0 && !loading && <p>No tasks available.</p>}
            {todos.map((todo) => (
                <div key={todo.title}>
                    <h3>{todo.title}</h3>
                    <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default TodoList;
