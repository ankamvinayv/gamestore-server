const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://vardhan:2350512@clusterone.irfet.mongodb.net/Online-Game-store?retryWrites=true&w=majority&appName=ClusterOne`, {
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
   
  }
}

module.exports = connectDB;