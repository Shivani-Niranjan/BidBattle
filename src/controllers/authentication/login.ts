
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'; 
import { User } from "../../models/users_models";


// login route
async function login_user (req: Request, res: Response){
    try {
        const { username,password } = req.body;
        
    // Find the user in the database by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the passwords don't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
    }
    console.log("user succesfully logged in");
            return res.status(201).json({ message: 'User login success' });
      } 
      catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: error });
      }
}

export {login_user};


// If the passwords match, create a JWT token for authentication
// try{
// const token = jwt.sign(
//     { userId: user._id, username: user.username },
//     'your-secret-key', // Replace with your own secret key
//     { expiresIn: '1h' } // Set the token expiration time (e.g., 1 hour)
//   );

//   // Return the token in the response
//   res.status(200).json({ token, userId: user._id, username: user.username });
// } catch (error) {
//   console.error('Error during login:', error);
//   res.status(500).json({ message: 'Internal server error' });
// }
