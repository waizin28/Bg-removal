import mongoose from 'mongoose';

const connectDb = async () => {
  mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected');
  });

  const conn = await mongoose.connect(`${process.env.MONGODB_URI}/bg-removal`);
};

export default connectDb;
