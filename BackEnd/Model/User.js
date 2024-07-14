const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: { type: String, required:true, unique: true},
    password: {type: String, required:true } ,
    role: { type: String, required:true ,default:'role'} ,  
    addresses: { type: [mongoose.Schema.Types.Mixed] } ,
    // TODO: We can make a separate Schema for this
    name: { type: String },
    orders: { type: [mongoose.Schema.Types.Mixed]}
});


const virtual = userSchema.virtual('id');
virtual.get(function(){
    return this._id;
})  


userSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function (doc,ret){ delete ret._id}
})

userSchema.pre('save', async function (next) {
    try{
        const salt = await bcrypt.genSalt(10); // Customize salt rounds as needed
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch(err){
            return next(err);
    }     
})

userSchema.methods.validatePassword = async function(candidatePassword){
    try{   
        return await bcrypt.compare(candidatePassword,this.password);
    }catch(err){
        throw err
    }
}


exports.User = mongoose.model('User',userSchema);