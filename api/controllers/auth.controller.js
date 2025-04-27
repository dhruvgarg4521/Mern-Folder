import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { createError } from '../utils/error.js'; // << Import this
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password || username.trim() === '' || email.trim() === '' || password.trim() === '') {
    return next(createError(400, 'All fields are required'));
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(409, 'User already exists with this email'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ message: 'Signup successful' });
  } catch (error) {
    next(error); // no need to create another error here
  }
};

export const signin = async (req, res, next) => {
  const {email, password} = req.body;
  if(!email || !password || password.trim() == '' || email.trim() == ''){
    next(createError(400, 'All fields are required'));
  }
  try {
    const validUser = await User.findOne({email});
    if(!validUser){
      return next(createError(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if(!validPassword){
      return next(createError(400, 'Invalid credentials'));
    }
    const token = jwt.sign(
      {id: validUser._id}, process.env.JWT_SECRET);
     
      const {password:pass, ...rest} = validUser._doc;

      res.status(200).cookie('access_token',token, {httpOnly: true}).json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const {email, name , googlePhotoUrl} = req.body;
  try{
    const user = await User.findOne({email});
    if(user){
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
      const {password:pass, ...rest} = user._doc;
      res.status(200).cookie('access_token', token, {
        httpOnly: true,
      }).json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture:googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
      const {password:pass, ...rest} = newUser._doc;
      res.status(200).cookie('access_token', token, {
        httpOnly: true,
      }).json(rest); 
    }
  } catch (error){ 
    next(error);
  }
}