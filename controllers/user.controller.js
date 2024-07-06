import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        return res.status(500).json({ message: "Error hashing password" });
      }

      const createUser = await User.create({
        username,
        email,
        password: hash,
      });

      res.status(201).json({ message: "User created successfully", user: {
        _id:createUser._id,
        username:createUser.username,
        email:createUser.email,
      } });
    });
  } catch (error) {
    res.status(404).json(`Error creating user: ${error.message}`);
  }
};

///////////////////////// Login controller function //////////////////////////////////////

export const Login = async (req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
          return res.status(400).json({message: "User not found"});
        }
        else{
            bcrypt.compare(password, user.password, function(err, result) {
                if(err) {
                return res.status(500).json({message: `error during compare: ${err}`})
                }
                else if(!result) {
                   return  res.status(500).json({message:"Password dont matched"})
                }
                res.status(201).json({message: "Login successful", user: {
                  _id:user._id,
                  username:user.username,
                  email:user.email,
                } })    
            });
        }
         

    } catch (error) {
        res.status(404).json(`Error during Login ${error.message}`)
    }
}
