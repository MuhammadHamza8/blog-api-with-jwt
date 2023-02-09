const userModel= require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.signup= async (req,res)=>{
    
    try {
        // Get user input
        const {email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await userModel.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await userModel.create({
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,

          
        });

        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

       user.token = token;




        if(user){
            res.json({status:200, message:"user has been created ",user});
        }

         

    }catch (err){

        console.log(err);
    }
}


exports.signin = async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await userModel.findOne({ email });

    
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
          {
         expiresIn: "2h",
        }
         );
  
        //save user token
         user.token = token;
  
        // user
        res.status(200).json(user);
      }
      else{
        res.status(400).send("Invalid Credentials");
      }
      
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  }



  exports.getAllUser = async (req, res) => {

    try{

      const User = await userModel.find();
      res.json({ststus:"200", message:"success",User});
    }catch (err){

      res.json({status:404,message:"not found "})

    }
    
  }

  exports.getOneUser =async (req, res) => {
    try{
        const user= await userModel.findById(req.params.id);
        res.json({ststus:"200", message:"success",user});
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}