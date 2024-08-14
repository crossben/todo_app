import User from "../schemas/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (username: string, email: string, password: string) => {
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists.");
        }
        const newUser = new User({ username, email, password });
        await newUser.save();
        return newUser;

    } catch (error: any) {
        throw error;
    }
}

export const login = async (email: string, password: string) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found.");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid credentials.");
        }
        const token = jwt.sign({ id: user._id }, '66073799fe448ad5eda7c7a3c0d132427e8f340fa12fd9afdfe2105f53b530b4', { expiresIn: '1h' });
        return { token, user: { id: user._id, username: user.username, email: user.email } };
    } catch (error: any) {
        throw error;
    }
}


export const findAllUsers = async () => {
    try {
        const users = await User.find().select('-password');
        if (users.length === 0) {
            throw new Error('No users found');
        }
        return users;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to find all users');
    }
};

export const findUserById = async (id: string) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to find user by ID');
    }
};


// Update user by ID service
export const updateUserById = async (id: string, userData: Partial<typeof User>) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return updatedUser;
    } catch (error) {
        // Handle the error
        console.error(error);
        throw new Error('Failed to update user by ID');
    }
};

// Delete user by ID service
export const deleteUserById = async (id: string) => {
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        // Handle the error
        console.error(error);
        throw new Error('Failed to delete user by ID');
    }
};
