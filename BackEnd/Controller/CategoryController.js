const { Category } = require("../Model/Category");


exports.createCategory  = async (req,res)=>{
    try{
        const category = new Category(req.body);
        const savedcategory = await category.save(); // Use await for promise
        res.status(201).json(savedcategory);

    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating category" });
    }
}

exports.fetchAllCategory = async (req,res)=>{
    try{
        const response = await Category.find({})
        res.status(200).json(response);
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching all category" });
    }
}