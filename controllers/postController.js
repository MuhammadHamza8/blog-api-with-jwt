
const postModel= require('../models/postModel');

exports.postData= async(req,res)=>{
    
    const data = new postModel({
        title: req.body.title,
        desc: req.body.desc
    
    })

    try {
        const dataToSave = await data.save();
        res.json({ststus:"200", message:"success",dataToSave});
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.getAll= async(req, res) => {

    try{
        const data = await postModel.find();
        res.json({ststus:"200", message:"success",data});
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

exports.getOne =async (req, res) => {
    try{
        const data = await postModel.findById(req.params.id);
        res.json({ststus:"200", message:"success",data});
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

exports.update = async(req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await postModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.json({ststus:"200", message:"success",result});
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.delete =async(req, res) => {
    try {
        const id = req.params.id;
        const data = await postModel.findByIdAndDelete(id)
            res.send({status:200, message:"success",title:`product with ${data.title} has been deleted..`})
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}