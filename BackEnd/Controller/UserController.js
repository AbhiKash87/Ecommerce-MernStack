const { User } = require("../Model/User")



exports.updateUserByID = async (req, res) => {

    try {
        const {id} = req.user;
        const updatedUser = await User.findByIdAndUpdate(id,req.body,{new:true});
        console.log(updatedUser) // Use await for promise
        res.status(201).json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating User" });
    }


};


exports.fetchUserByID = async (req,res)=>{

    try{
        const {id} = req.user;
        const user =  await User.findById(id,'orders name addresses role email').exec();
        res.status(200).json(user);
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error Fetching user" });
    }
}