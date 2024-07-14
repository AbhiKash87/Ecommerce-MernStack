const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema =  new mongoose.Schema({


    items:{type:[Schema.Types.Mixed],required:true},
    subTotal:{type:Number,required:true},
    ItemCount:{type:Number,required:true},
    user:{type:Schema.Types.ObjectId,ref:'User',required:true},
    paymentMethod:{type:String,required:true},
    status:{type:String,default:"Pending"},
    selectedAddress:{type:Schema.Types.Mixed,required:true},
  

});

const virtual = orderSchema.virtual('id');
virtual.get(function(){
    return this._id;
})  


orderSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function (doc,ret){ delete ret._id}
})


exports.Order = mongoose.model('Order',orderSchema);
