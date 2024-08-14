import mongoose from 'mongoose';

const Dbconnect = async () => {
  const MONGODB_URI = 'mongodb+srv://charo164:charo2002@cluster0.zcti7.mongodb.net/todo_test';

  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('MongoDB connected successfully.');
    } catch (error) {
      console.error('MongoDB connection failed:', error);
      process.exit(1);
    }
  } else {
    console.error('MONGODB_URI is undefined.');
    process.exit(1);
  }
};

export default Dbconnect;
