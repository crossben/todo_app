import Todo from "../schemas/todo.schema";

export const createTodo = async (title: string, userId: string) => {
    try {
        const newTodo = new Todo({
            title,
            userId
        });
        await newTodo.save();
        return newTodo;
    } catch (error: any) {
        throw error;
    }
};

export const findAllTodos = async () => {
    try {
        const todos = await Todo.find();
        if (todos.length === 0) {
            throw new Error("No todos found.");
        }
        return todos;
    } catch (error: any) {
        throw error;
    }
};

export const findTodoByUserId = async (userId: string) => {
    try {
        const todos = await Todo.find({ userId });
        if (todos.length === 0) {
            throw new Error("No todos found.");
        }
        return todos;
    } catch (error: any) {
        throw error;
    }
};

export const findTodoByTitle = async (title: string) => {
    try {
        const todos = await Todo.find({ title }).lean();
        if (todos.length === 0) {
            throw new Error("No todos found.");
        }
        return todos;
    } catch (error: any) {
        throw error;
    }
};

export const findTodoById = async (id: string) => {
    try {
        const todo = await Todo.findById(id).lean();
        if (!todo) {
            throw new Error("Todo not found.");
        }
        return todo;
    } catch (error: any) {
        throw error;
    }
};

export const updateTodoById = async (id: string, stateG: string) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, {stateG : stateG}, { new: true });
        if (!updatedTodo) {
            throw new Error("Todo not found.");
        }
        return updatedTodo;
    } catch (error: any) {
        throw error;
    }
}

export const deleteTodoById = async (id: string) => {
    try {
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            throw new Error("Todo not found.");
        }
        return todo;
    } catch (error: any) {
        throw error;
    }
};