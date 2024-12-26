const mongoose = require("mongoose");
//const error = require("mongoose/lib/error");
const mongoURI =
  "mongodb+srv://yellayiaruna:OCqLlyh08dUNRzrY@cluster0.dgi6z.mongodb.net/Search-N-Dine?retryWrites=true&w=majority&appName=Cluster0"; 
// mongodb+srv://yellayiaruna:OCqLlyh08dUNRzrY@cluster0.dgi6z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const mongoDB = async () => {
  try {
    // Connect to the database using async/await
    await mongoose.connect(mongoURI, { useNewUrlParser: true });//OCqLlyh08dUNRzrY
    console.log("Connected successfully");

    // Fetch data from the collection using async/await
    const fetchedData = mongoose.connection.db.collection("food_items");
    const data = await fetchedData.find({}).toArray();

    const foodCategory = mongoose.connection.db.collection("food_Category");
    const catData = await foodCategory.find({}).toArray();
    
    // Log the fetched data
    global.food_items = data;
    global.foodCategory = catData;
    //console.log(global.food_items);
    
  } catch (err) {
    // Handle connection or data fetching errors
    console.log("---", err);
    
  }
};


module.exports = mongoDB;
