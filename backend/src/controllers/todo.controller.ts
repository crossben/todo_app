import { Request, Response } from "express";
import * as TodoServices from "../services/todo.service";

export const createTodo = async (req: Request & { user?: { id: string } }, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(400).json({ message: 'Utilisateur non authentifié' });
    }
    const { title } = req.body;

    try {
        const newTodo = await TodoServices.createTodo(title, userId)
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la tâche' });
    }
};

export const getTodoByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const todo = await TodoServices.findTodoByUserId(userId);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found." });
        }
        res.status(200).json(todo);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getTodoByTodoName = async (req: Request, res: Response) => {
    try {
        const { todoName } = req.params;
        const todo = await TodoServices.findTodoByTitle(todoName);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found." });
        }
        res.status(200).json(todo);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllTodos = async (req: Request, res: Response) => {
    try {
        const todos = await TodoServices.findAllTodos();
        res.status(200).json(todos);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { stateG } = req.body;
        const updatedTodo = await TodoServices.updateTodoById(id, stateG);
        res.status(200).json(updatedTodo);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await TodoServices.deleteTodoById(id);
        res.status(204).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};