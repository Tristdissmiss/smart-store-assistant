const express = require("express"); 
const router = express.Router(); 
const items = require("../data/items");

//getting items
router.get("/", (req, res) => {
    res.json(items);
}); 

//getting items by the id 
router.get("/:id", (req,res) =>{
    const itemId = parseInt(req.params.id);
    const item = items.find(i => i.id === itemId);

    if(!item){
        return res.status(404).json({message:"Item not found"})
    } 

    res.join(item);
});

//searching items by name 
router.get("/search/:name", (req, res) => {
  const searchName = req.params.name.toLowerCase();

  const results = items.filter(item =>
    item.name.toLowerCase().includes(searchName)
  );

  res.json(results);
}); 

//Add new Items 
router.post("/", (req,res)=>{
    const{name, category, aisle, stock } = req.body; 

    if(!name || !category || aisle == null || stock == null){
        return res.status(400).json({message: "All fields are required"});
    }

    const newItem ={
        id:items.length + 1,
        name,
        catrgory, 
        aisle, 
        stock
    }; 
    items.push(newItem);
    res.status(201).json(newItem);
}) 

//Updating an item 
router.put("/:id", (req,res) =>{
    const itemId = parseInt(req.params.id); 
    const item = items.find(i => i.id == itemId);

    if(!item){
        return res.status(404).json({message: "Item not found"});
    }

    const{ name, category, aisle,stock} = req.body; 

    if(name !== undefined) item.name = name;
    if(category !== undefined) item.category = category;
    if(aisle !== undefined) item.aisle == aisle;
    if(stock !== undefined) item.stock = stock; 

    res.json(item);
});

//Deleting an item 
router.delete("/:id", (req,res)=>{
    const itemId = parseInt(req.params.id);
    const index = items.findIndex(i => i.id === itemId);

    if(index === -1){
        return res.status(404).json({message:"Item not found"})
    }
    const deletedItem = items.splice(index,1);
    res.json({message:"Item deleted", deletedItem});
}); 

module.exports = router; 

