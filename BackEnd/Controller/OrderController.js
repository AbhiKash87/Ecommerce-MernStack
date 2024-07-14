const { Order } = require("../Model/Order");

exports.createOrder = async (req, res) => {

    try {
      
        const {id} = req.user;
        const order = new Order({...req.body,user:id});
        let savedOrder = await order.save() // Use await for promise
            // savedOrder = await Order.findById(savedOrder.id).populate('user'); // Use await for promise
        res.status(201).json(savedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error Creating Order" });
    }

};

exports.updateOrderByid = async (req, res) => {

    try {
        const {id} = req.params;
        const updatedOrder = await Order.findByIdAndUpdate(id,req.body,{new:true}); // Use await for promise
        res.status(201).json(updatedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating order" });
    }
};

exports.deleteOrderById = async (req, res) => {

    try {
        const {id} = req.params;
        const savedProduct = await Order.findByIdAndDelete(id); // Use await for promise
        res.status(201).json("Order deleted");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error Deleting Order" });
    }


};

exports.fetchOrdersByUser = async (req,res)=>{
    try{
      const {id} = req.user;
      const Orders = await Order.find({user:id});
      console.log(Orders)
      res.status(200).json(Orders);
    }catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error Fetching order By userId" });
    }
  }


  exports.fetchAllOrders = async (req, res) => {
    try {
      // Build the filter object based on query parameters
      const filter = {};
     
      // Get the total count of products matching the filter
      const totalOrders = await Order.countDocuments(filter);
  
      // Build the query for fetching products with sorting and pagination
      let query = Order.find(filter);

      if (req.query._sort && req.query._order) {
         
            query = query.sort({ [req.query._sort]: req.query._order });
          
      }
  
      // Handle pagination if both _page and _limit are provided
      if (req.query._page && req.query._per_page) {
        const pageSize = parseInt(req.query._per_page);
        const page = parseInt(req.query._page);
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
      }
  
      // Fetch the products based on the built query
      const Orders = await query.exec();
      res.set('X-Total-Count',totalOrders)
      res.status(200).json({ items:totalOrders, data:Orders });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching products" });
    }
};
