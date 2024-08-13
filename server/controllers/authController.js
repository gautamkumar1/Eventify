const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/jwt');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
exports.register = async (req, res,next) => {
  try {
    const { username, email, password,isAdmin} = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ username, email, password: hashedPassword,isAdmin});

    const token = generateToken(user);
    
    // Store token in cookies
    res.cookie('token', token, { httpOnly: true });

    res.status(200).json({message: 'User registered successfully',
      data:user,
      token: token
    });
  } catch (error) {
    console.log(error);
    
    res.status(400).json({ message: "User registered failed" });
    next(error)
  }
};

exports.login = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    } 
    const user = await User.findOne({ where: { email } });
    if(!user){
        return res.status(401).json({ message: 'User not found' });  
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if(!isValidPassword){
        return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken(user);
    
    // Store token in cookies
    res.cookie('token', token, { httpOnly: true });

    res.json({ message: 'Login successful' ,
      token:token,
      user: user
    });
  } catch (error) {
    console.log(error);
    
    res.status(400).json({ message: 'Login failed' });
    next(error)
  }
};

exports.logout = async (req, res) => {
  res
      .status(200)
      .cookie("token", "", {
          expires: new Date(Date.now()),
          httpOnly: true,
      })
      .json({
          success: true,
          message: "User logged out!",
      });
}

exports.getAllUsersData = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({message:"Successfully fetched all users",
      data:users
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching users data' });
  }
}

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, isAdmin } = req.body;

  try {
      const user = await User.findByPk(id);

      if (!user) {
          return res.status(404).send({ error: 'User not found' });
      }

      user.username = username || user.username;
      user.email = email || user.email;
      user.isAdmin = typeof isAdmin === 'boolean' ? isAdmin : user.isAdmin;

      await user.save();

      res.status(200).send({ message: 'User updated successfully', user });
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send({ error: 'Failed to update user' });
  }
};


exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
      const user = await User.findByPk(id);

      if (!user) {
          return res.status(404).send({ error: 'User not found' });
      }

      await user.destroy();

      res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send({ error: 'Failed to delete user' });
  }
};

exports.verifyGoogleToken = async (req, res) => {
  const { token } = req.body;
  console.log('Received ID Token:', token);
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    // Check if the user exists, otherwise create a new user
    let user = await User.findOne({ googleId });
    if (!user) {
      user = new User({ googleId, email, name });
      await user.save();
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, googleId, email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Invalid Google ID token' });
  }
}


