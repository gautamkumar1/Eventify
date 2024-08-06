const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/jwt');

exports.register = async (req, res) => {
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
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
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
      token:token
    });
  } catch (error) {
    res.status(400).json({ message: 'Login failed' });
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
