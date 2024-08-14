import { Request, Response } from 'express';
import * as userServices from '../services/user.service';
import Jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const newUser = await userServices.register(username, email, password);
        const token = Jwt.sign({ id: newUser._id }, '66073799fe448ad5eda7c7a3c0d132427e8f340fa12fd9afdfe2105f53b530b4', { expiresIn: '1h' });
        res.status(201).json(newUser);
    } catch (error : any) {
        res.status(400).json({ message: error.message });
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await userServices.login(email, password);
        res.status(200).json(user);
    } catch (error : any) {
        res.status(400).json({ message: error.message });
    }
}