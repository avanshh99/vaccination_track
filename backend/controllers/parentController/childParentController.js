import Child from "../../models/parentModels/childModel.js";


const createChildProfile = async(req,res) =>{
    try {
        const newChild = new Child(req.body);
        await newChild.save();
        res.status(201).json({message:"child profile created successfully", child:newChild})
    } catch (error) {
        res.status(400).json({message:"error creating child profile", error})
    }
}

const getAllChildProfiles = async(req,res) =>{
    try {
        const children = await Child.find();
        res.status(200).json(children);
    } catch (error) {
        res.status(500).json({message:'error fetching child profiles', error});
    }
}


export {createChildProfile};