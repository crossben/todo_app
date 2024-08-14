import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

dotenv.config();

interface JwtPayload {
    id: string;
}

interface CustomRequest extends Request {
    user?: JwtPayload;
}

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers['auth'];
    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }
    jwt.verify(token as string, '66073799fe448ad5eda7c7a3c0d132427e8f340fa12fd9afdfe2105f53b530b4' as string, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalide' });
        }
        req.user = decoded as JwtPayload;
        next();
    });
};

export default auth;
