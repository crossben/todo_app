import mongoose from 'mongoose';

const Dbconnect = async () => {
    const MONGODB_URI = 'mongodb+srv://gueco167:lfHjpZb3TDu9VCHV@cluster0.xwdcc.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0';

    if (MONGODB_URI) {
        try {
            await mongoose.connect(MONGODB_URI);
            console.log("MongoDB connected successfully.");
        } catch (error) {
            console.error("MongoDB connection failed:", error);
            process.exit(1);
        }
    } else {
        console.error("MONGODB_URI is undefined.");
        process.exit(1);
    }
};

export default Dbconnect;
