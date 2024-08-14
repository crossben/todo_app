import React, { useEffect, useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import api from "../environments/api";

function Draggable({ id, children }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        cursor: 'grab',
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    );
}

function Droppable({ id, children, onDrop }) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    const style = {
        border: isOver ? '2px solid #9E78CF' : '2px solid transparent',
        padding: '15px',
        borderRadius: '4px',
        background: isOver ? '#1E1237' : '#15101C',
    };

    return (
        <div ref={setNodeRef} style={style}>
            {children}
        </div>
    );
}

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
            const stageG = "completed";
            const response = await api.put("/todo/" + id, { title, stageG, userId });
            if (response.status === 200) {
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo._id === id ? { ...todo, stageG } : todo
                    )
                );
            }
        } catch (error) {
            console.error("Failed to update todo:", error);
            setError("Failed to update todo. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DndContext onDragEnd={({ over }) => over && console.log(`Dropped over ${over.id}`)}>
            <Droppable id="droppable" onDrop={() => console.log('Dropped')}>
                {todos.map((todo) => (
                    <Draggable key={todo._id} id={todo._id}>
                        <div className="d-flex align-items-center justify-content-between mb-2" style={{ color: "#9E78CF" }}>
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
                                    />
                                    <FaTrash
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleDeleteTodo(todo._id)}
                                    />
                                </div>
                            </div>
                        </div>
                    </Draggable>
                ))}
            </Droppable>
        </DndContext>
    );
}

export default TodoList;
