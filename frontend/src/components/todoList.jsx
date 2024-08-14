import React, { useEffect, useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import api from "../environments/api";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const userId = localStorage.getItem("userId");
    const [loading, setLoading] = useState(false);
    const [stageG, setStageG] = useState("completed");
    const [error, setError] = useState(null);

    const getTodos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get("/todo/" + userId);
            setTodos(response.data);
            //console.log(response.data);
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
            if (response.status === 200) {
                setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
            }
            window.location.reload();
        } catch (error) {
            console.error("Failed to delete todo:", error);
            setError("Failed to delete todo. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCheckTodo = async (id, title) => {
        setLoading(true);
        setError(null);

        try {
            stageG === "completed" ? setStageG("pending") : setStageG("completed");
            const response = await api.put("/todo/" + id, { title, stageG: setStageG(), userId });
            if (response.status === 200) {
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo._id === id ? { ...todo, stageG: setStageG() } : todo
                    )
                );
                console.log(response.data);
            }
        } catch (error) {
            console.error("Failed to update todo:", error);
            setError("Failed to update todo. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {todos.length === 0 && !loading && <p>Aucun todo a voir</p>}
            {todos.map((todo) => (
                <div key={todo._id} className="d-flex align-items-center justify-content-between mb-2" style={{ color: "#9E78CF" }}>
                    <div style={{
                        border: "1px solid #15101C",
                        padding: "15px",
                        borderRadius: "4px",
                        background: "#1E1237",
                        display: "flex",
                        width: "100%",
                        maxWidth: "600px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}>
                        <h5 className="mb-0" style={{ marginRight: "auto", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {todo.title}
                        </h5>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <FaCheck
                                style={{ cursor: "pointer" }}
                                onClick={() => handleCheckTodo(todo._id, todo.title)}
                                values="completed"
                            />
                            <FaTrash
                                style={{ cursor: "pointer" }}
                                onClick={() => handleDeleteTodo(todo._id)}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
}

export default TodoList;
