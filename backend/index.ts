import express, { Request, Response} from 'express';
import Dbconnect from './src/config/mongo.config';
import cors from 'cors';
import Todorouter from './src/routes/todo.route';
import UserRouter from './src/routes/user.route';

Dbconnect();

const app = express();

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/user', UserRouter);
app.use('/api/todo', Todorouter);

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});