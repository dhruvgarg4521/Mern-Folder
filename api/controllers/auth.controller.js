import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { createError } from '../utils/error.js'; // << Import this

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
