const { Product } = require("../Model/Product")


    

exports.createProduct = async (req, res) => {

    try {
        const product = new Product(req.body);
        const savedProduct = await product.save(); // Use await for promise
        res.status(201).json(savedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating product" });
    }


};
exports.updateProductByID = async (req, res) => {

    try {
        const {id} = req.params;
        const savedProduct = await Product.findByIdAndUpdate(id,req.body,{new:true}); // Use await for promise
        console.log("update request")
        res.status(201).json(savedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating product" });
    }


};

exports.fetchAllProducts = async (req, res) => {
    
  try {

      const filter = {};


      if(req.user.role!=='admin'){
        filter.deleted={$ne:true}; 
      }
      
      if (req.query.category) filter.category = req.query.category;
      if (req.query.brand) filter.brand = req.query.brand;
      

      const totalProducts = await Product.countDocuments(filter);

      let query = Product.find(filter);
      let sortQuery = {};

      if (req.query._sort && req.query._order) {
          if (req.query._sort === 'DiscountedPrice') {
              sortQuery = {
                  discountedPrice: req.query._order === 'asc' ? 1 : -1
              };
          } else {
              sortQuery = {
                  [req.query._sort]: req.query._order === 'asc' ? 1 : -1
              };
          }
      }

      const pageSize = parseInt(req.query._per_page) || 10;
      const page = parseInt(req.query._page) || 1;

      if (req.query._sort === 'DiscountedPrice') {
          const aggregatedProducts = await Product.aggregate([
              { $match: filter },
              {
                  $project: {
                      title: 1,
                      price: 1,
                      discountPercentage: 1,
                      discountedPrice: {
                          $subtract: ["$price", {
                              $multiply: ["$price", { $divide: ["$discountPercentage", 100] }]
                          }]
                      }
                  }
              },
              { $sort: sortQuery },
              { $skip: pageSize * (page - 1) },
              { $limit: pageSize }
          ]);

          res.set('X-Total-Count', totalProducts);
          res.status(200).json({ items: totalProducts, data: aggregatedProducts });
      } else {
          const products = await query.sort(sortQuery).skip(pageSize * (page - 1)).limit(pageSize).exec();
          res.set('X-Total-Count', totalProducts);
          res.status(200).json({ items: totalProducts, data: products });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching products" });
  }
};

// exports.fetchAllProducts = async (req, res) => {
//     try {
//       // Build the filter object based on query parameters
//       const filter = {};
//       if (req.query.category) {
//         filter.category = req.query.category;
//       }
//       if (req.query.brand) {
//         filter.brand = req.query.brand;
//       }
  
//       // Get the total count of products matching the filter
//       const totalProducts = await Product.countDocuments(filter);
  
//       // Build the query for fetching products with sorting and pagination
//       let query = Product.find(filter);

//       if (req.query._sort && req.query._order) {
         
//             query = query.sort({ [req.query._sort]: req.query._order });
//           
//       }
  
//       // Handle pagination if both _page and _limit are provided
//       if (req.query._page && req.query._per_page) {
//         const pageSize = parseInt(req.query._per_page);
//         const page = parseInt(req.query._page);
//         query = query.skip(pageSize * (page - 1)).limit(pageSize);
//       }
  
//       // Fetch the products based on the built query
//       const products = await query.exec();
//       res.set('X-Total-Count',totalProducts)
//       res.status(200).json({ items:totalProducts, data:products });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Error fetching products" });
//     }
// };

exports.fetchProductById = async (req,res)=>{
  try{
    const {id} = req.params;
    const product = await Product.findById(id)
    res.status(200).json(product)
  }catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching product by id" });
  }
}
   
