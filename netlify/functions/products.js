import mongoose from 'mongoose';
const Product = require('../../backend/models/Product').Product;

const MONGODB_URI = process.env.MONGODB_URI;
const API_KEY = process.env.MY_SECRET_KEY; 

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export async function handler(event, context) {
  try {
    const requestApiKey = event.headers['x-api-key'];
    if (requestApiKey && requestApiKey !== API_KEY) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: false, error: 'Unauthorized' }),
      };
    }

    await connectDB();

    const products = await Product.find({});

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, products }),
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
}
