
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'; 
import { User } from "../../models/users_models";


// Signup route
async function signup_user (req: Request, res: Response){
    try {
        const { username, email, password } = req.body;
        console.log(username);
        console.log("Data went inside");
    
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user document
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
        });
    
        await newUser.save();
    
        console.log("data saved");
        return res.status(201).json({ message: 'User registered successfully' });
      } 
      catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: error });
      }
}

export {signup_user};
