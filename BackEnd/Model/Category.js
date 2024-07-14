const mongoose = require('mongoose')


const categorySchema = mongoose.Schema({
    value:{type:String,required:true,unique:true},
    label:{type:String,required:true,unique:true},
    checked:{type:Boolean,default:false},
});

const virtual = categorySchema.virtual('id');
virtual.get(function(){
    return this._id;
})   

categorySchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function (doc,ret){ delete ret._id}
})

exports.Category = mongoose.model('Category',categorySchema);


