import mongoose from 'mongoose';
import MONGO_URL from 'dotenv';

MONGO_URL.config();


const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Mongoose connected!!!');
  } catch (error) {
    console.log('connection failed', error);
    process.exit(1);
  }
};

export default connectdb;
