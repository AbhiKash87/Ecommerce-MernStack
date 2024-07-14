const { Brand } = require("../Model/Brand");



exports.createBrand  = async (req,res)=>{

    try{
        const brand = new Brand(req.body);
        const savedBrand = await brand.save(); // Use await for promise
        res.status(201).json(savedBrand);

    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating brand" });
    }
}

exports.fetchAllBrand = async (req,res)=>{
    try{
        const response = await Brand.find({})
        res.status(200).json(response);
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching all brand" });
    }
}