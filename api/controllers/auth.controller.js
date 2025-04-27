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