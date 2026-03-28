const express = require("express");
const itemRoutes = require("./routes/items");

const app = express();
const Port = 3000;

app.use(express.json());

app.get("/", (req,res) =>{
    res.send("Smart Store Assistanct API is running");
}); 

app.use("/api/items", itemRoutes);

app.listen(Port, () =>{
    console.log('Server running on http://localhost:${PORT}');
});