// scripts/seed-products.js

import mongoose from 'mongoose';

import Product from '../src/models/product-model.js';
import logger from '../src/utils/logger/color-logger.js';

// Load environment variables


// Sample products data
const products = [
  {
    title: "Smartphone X",
    desc: "Latest smartphone with advanced features",
    price: 799.99,
    rating: 4.5,
    qty: 50,
    discount: 10,
    outofstock: false,
    image:"https://image01-in.oneplus.net/media/202412/17/0c0b713df5d1f8f99b52956a17182bfc.png"
  },
  {
    title: "Smart Watch Pro",
    desc: "Fitness and health tracking smartwatch",
    price: 299.99,
    rating: 4.7,
    qty: 30,
    discount: 5,
    outofstock: false,
    image:"https://s3n.cashify.in/cashify/product/img/xxhdpi/130bab8c-4513.jpg"
  },
  {
    title: "Wireless Earbuds",
    desc: "Premium sound quality wireless earbuds",
    price: 149.99,
    rating: 4.3,
    qty: 100,
    discount: 0,
    outofstock: false,
    image:"https://cdn.bajajelectronics.com/product/BEProduction-20964.png"
    
  },
  {
    title: "Laptop Pro",
    desc: "High-performance laptop for professionals",
    price: 1299.99,
    rating: 4.8,
    qty: 15,
    discount: 12,
    outofstock: false,
     image:"https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111883_macbookair.png"
   
  },
  {
    title: "Gaming Console",
    desc: "Next-gen gaming console with 4K capabilities",
    price: 499.99,
    rating: 4.9,
    qty: 0,
    discount: 0,
    outofstock: true,
     image:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Black_and_white_Playstation_5_base_edition_with_controller.png/1200px-Black_and_white_Playstation_5_base_edition_with_controller.png"
  },
  // Add more sample products...
];


// Connect to MongoDB
mongoose.connect('mongodb+srv://amit:test123@shopcluster.z516dfx.mongodb.net/shopdb?retryWrites=true&w=majority&appName=shopcluster')
  .then(() => {
    logger.info('MongoDB connected for seeding');
    seedData();
  })
  .catch(err => {
    logger.error('MongoDB connection error', err);
    process.exit(1);
  });

// Seed data function
const seedData = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    logger.info('Existing products deleted');
    
    // Insert sample products
    await Product.insertMany(products);
    logger.success(`${products.length} products inserted successfully`);
    
    // Disconnect from database
    mongoose.disconnect();
    logger.info('MongoDB disconnected');
  } catch (error) {
    logger.error('Error seeding data', error);
    process.exit(1);
  }
};