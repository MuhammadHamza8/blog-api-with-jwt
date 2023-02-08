require("dotenv").config();
require("./config/database");
const express = require('express');

const blogRoute = require('./routes/postRoute');
const userRoute= require('./routes/user');


const app = express();
app.use(express.json());

// Here will be the main route of the projects
app.use('/api', blogRoute);
app.use('/api', userRoute);



const { PORT } = process.env;
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});