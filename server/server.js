require('dotenv').config();

const express = require('express');
const sequelize = require('./database/Db');
const userRoutes = require('./routes/userRoutes');

const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
    res.send('Hello from server');
})
app.use('/api/user', userRoutes);


const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
