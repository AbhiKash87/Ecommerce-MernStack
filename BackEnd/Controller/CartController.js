const { Cart } = require("../Model/Cart");



    

exports.addToCart = async (req, res) => {

    try {
        const {id} = req.user
        const cart = new Cart({...req.body,user:id});
        let savedCart = await cart.save(); // Use await for promise
        savedCart = await Cart.findById(savedCart.id).populate('product'); // Use await for promise
        res.status(201).json(savedCart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error Creating Cart" });
    }

};
exports.updateCartById = async (req, res) => {

    try {
        const {id} = req.params;
        const updatedCart = await Cart.findByIdAndUpdate(id,req.body,{new:true}).populate('user').populate('product'); // Use await for promise
        res.status(201).json(updatedCart);
    } catch (err) {
        console.error("update cart:",err);
        res.status(500).json({ message: "Error updating cart" });
    }
};
exports.deleteCartById = async (req, res) => {

    try {
        const {id} = req.params;
        const savedProduct = await Cart.findByIdAndDelete(id); // Use await for promise
        res.status(201).json("Cart deleted");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating product" });
    }


};





exports.fetchCartByUser = async (req,res)=>{
  try{
    const {id} = req.user;
    const cartItems = await Cart.find({user:id}).populate('product');
    res.status(200).json(cartItems);
  }catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error Fetching Cart By userId" });
  }
}
   
