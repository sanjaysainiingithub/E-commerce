import mongoose from "mongoose";
export const createConnection = async () => {
    try{
    // Get MongoDB URI from environment variables
    const MONGODB_URI = process.env.MONGODB_URI;
    console.log('MONGO DB URI is ', MONGODB_URI);
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    
    // Set mongoose options - “These options make MongoDB faster, smarter, and avoid performance issues in production.”
    const options = {
        connectTimeoutMS: 10000, // 10 seconds - Fails fast if DB server is unreachable (default is 30s, too long)


        maxPoolSize:10, // Limits number of DB connections (default is 5; you can tune for performance)

      useNewUrlParser: true, //Uses the new way to parse MongoDB connection strings
      //  (more reliable and future-proof)

      useUnifiedTopology: true, // Uses the new connection engine for better performance, 
      // fewer bugs, and better monitoring

      autoIndex: process.env.NODE_ENV !== 'production', // Don't build indexes in production
      // Creates indexes automatically in development, 
      // but skips in production to avoid slowing down the server

    };
    
    // Connect to MongoDB
   return  await mongoose.connect(MONGODB_URI, options);
  }
  catch(err){
    throw err;
  }
    
    
   
}


