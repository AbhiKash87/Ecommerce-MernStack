const { User } = require("../Model/User");
const jwt = require("jsonwebtoken");
const SanitizedUser = require("../Middlewares/SanitizedUser");
const dotenv = require("dotenv");
dotenv.config();

exports.Signup = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(200).json(SanitizedUser(user));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error registering user" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email,password)
  try {
    const user = await User.findOne({ email });

    // console.log(user);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Incorrect username.",
      });
    }

    const isValid = await user.validatePassword(password);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    const payload = {
      username: user.email,
      id: user.id,
    };

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token: "bearer " + token,
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
};

exports.checkUser = async (req, res) => {
  // console.log(req.user);
  try {
    res.status(200).json({ success: true, user: SanitizedUser(req.user) });
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
};

// passportSessionbased
// exports.loginUser = async (req,res)=>{

//     try{
//         const user = req.user;
//         res.status(201).json({id:user.id,email:user.email,name:user.name,role:user.role,addresses:user.addresses,orders:user.orders});
//     }catch (err) {
//         res.status(500).json({ message: 'Error logging in' });
//     }
// }


