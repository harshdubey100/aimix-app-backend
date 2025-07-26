import express from 'express';
import connectdb from './connectdb.js';
import cors from "cors";
import myrouting from './routes/routes.js'; // ✅ Import your routes

const myapp = express();
const PORT = process.env.PORT || 3001;

myapp.use(express.json());
myapp.use(cors());
myapp.use(myrouting); // ✅ Use imported routing

myapp.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectdb();
});
