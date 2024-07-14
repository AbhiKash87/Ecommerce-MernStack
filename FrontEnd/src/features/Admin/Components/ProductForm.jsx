/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import {useForm} from "react-hook-form"
import { clearSelectedProduct, createProductAsync, fetchProductByIDAsync, updateProductAsync } from "../../Product/productSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


function ProductForm() {

    const brands = useSelector((state) => state.product.brands);
    const categories = useSelector((state) => state.product.categories);
    const {register,handleSubmit,setValue,reset,formState:{errors},} = useForm();
    const dispatch = useDispatch();
    const params = useParams();
    const selectedProduct = useSelector((state)=> state.product.product);
    

    
  useEffect(()=>{
    const id = params.id;
    if(id){
    dispatch(fetchProductByIDAsync(id));
    }else{
      dispatch(clearSelectedProduct())
    }
  },[params.id,dispatch]);
   
  useEffect(()=>{
   
    if(selectedProduct && params.id){
    
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("stock", selectedProduct.stock);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("Image1", selectedProduct.images[0]);
      setValue("Image2", selectedProduct.images[1]);
      setValue("Image3", selectedProduct.images[2]);
     
    }


  },[selectedProduct,params.id]);

  const deleteHandler = (e)=>{
      e.preventDefault();
      const product = {...selectedProduct};
      product.deleted = true;
      dispatch(updateProductAsync(product));
      dispatch(clearSelectedProduct());
    }
    const addAgainHandler = (e)=>{
      e.preventDefault();
      const product = {...selectedProduct};
      product.deleted = false;
      dispatch(updateProductAsync(product));
      dispatch(clearSelectedProduct());
  }
 



  return (
    <div className="mx-20">
      <form noValidate onSubmit= {handleSubmit((data)=>{
        const product = {...data};
        product.images = [product.Image1,product.Image2,product.Image3];
        product.rating =  product.rating || 0;
        product.price = +product.price;
        product.discountPercentage = +product.discountPercentage;
        product.deleted = product.deleted || false
        product.stock = +product.stock;
        delete product['Image1'];
        delete product['Image2'];
        delete product['Image3'];
      
        
        if(params.id){
          product.id = params.id
          dispatch(updateProductAsync(product));
          reset();
        }else{

          dispatch(createProductAsync(product));
        }



      })}>
        <div className="space-y-12 bg-white p-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add New Product
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                    <input
                      type="text"
                      // name="title"
                      {...register('title',{required:"name is required"})}
                      id="title"
                      autoComplete="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Enter Product Title"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                    <label
                    htmlFor="Description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                    >
                    description
                    </label>
                    <div className="mt-2">
                    <textarea
                        id="description"
                        // name="description"
                        {...register('description',{required:"description is required"})}
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={""}
                    />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about Product.
                    </p>
              </div>

             
              <div className="col-span-full">
                    <label
                    htmlFor="brand"
                    className="block text-sm font-medium leading-6 text-gray-900"
                    >
                    Brands
                    </label>
                    <div className="mt-2">
                        <select 
                         {...register('brand',{required:"brand is required"})}
                        id="brand">
                        <option  value={"Choose None"}>Choose None</option>
                            {brands.map((brand)=>(
                              
                                <option key={brand.id} value={brand.value}>{brand.label}</option>
                                ))}
                        </select>
                    </div>
                   
              </div>

              <div className="col-span-full">
                    <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-gray-900"
                    >
                    Category
                    </label>
                    <div className="mt-2">
                        <select 
                        {...register('category',{required:"category is required"})}
                        id="category">
                              <option  value={"Choose None"}>Choose None</option>
                            {categories.map((category)=>(
                                
                                <option key={category.id} value={category.value}>{category.label}</option>
                            ))}
                        </select>
                    </div>
                   
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                    <input
                      type="Number"
                      {...register('price',{required:"price is required",min:0,max:10000})}
                      id="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Enter Product Price"
                    />
                  </div>
                </div>
              </div>


              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                 Discount Percentage
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                    <input
                      type="Number"
                      {...register('discountPercentage',{required:"discountPercentage is required",min:0,max:100})}
                      id="discountPercentage"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Discount Percentage"
                    />
                  </div>
                </div>
              </div>


              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                Stock
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                    <input
                      type="Number"
                      {...register('stock',{required:"stock is required",min:0})}
                      id="stock"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Enter Product Stock"
                    />
                  </div>
                </div>
              </div>


              <div className="sm:col-span-4">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail Url
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                    <input
                      type="text"
                      {...register('thumbnail')}
                      id="thumbnail"
                      autoComplete="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Enter thumbnail url"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image1
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                    <input
                      type="text"
                      {...register('Image1')}
                      id="Image1"
                      autoComplete="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Enter Image1 url"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image2
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                    <input
                      type="text"
                      {...register('Image2')}
                      id="Image2"
                      autoComplete="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Enter Image2 url"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image3
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                    <input
                      type="text"
                      {...register('Image3')}
                      id="Image3"
                      autoComplete="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Enter Image3 url"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>

           <div>


              {selectedProduct && (selectedProduct.deleted?

                                                      (<button
                                                      onClick={(e)=>{addAgainHandler(e);
                                                        reset();
                                                      }}
                                                      className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-200 hover:text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                      > Add This Product Again</button>):(
                                                        (<button
                                                          onClick={(e)=>{
                                                            deleteHandler(e);
                                                            reset();
                                                          }}
                                                          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-200 hover:text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                          > Delete</button>)
                                                      )
                                                                                  
                                    )
              
              }

          </div>


            <div>

            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
              Save
            </button>
              </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
