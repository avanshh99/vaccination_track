import VaccinationCenter from "../../models/vaccinationCenterModels/vaccinationCenterModel.js";


const vaccinationCenterInfo = async(req,res) => {
    try {
        const {email,name,phone,location,operatingHours,capacity,availableVaccines} = req.body;

        const existingCenter = await VaccinationCenter.findOne({email});
        if(existingCenter){
            return res.status(400).json({message : "A vaccination center is already exists "});
        }
        const newVaccinationCenter = new VaccinationCenter({
            email,
            name,
            phone,
            location : {
                address : location.address,
                city : location.city,
                state : location.state,
                postalCode : location.postalCode,
                coordinates : {
                    lat : location.coordinates.lat,
                    lng : location.coordinates.lng
                }
            },
            operatingHours:{
                weekdays : operatingHours.weekdays,
                weekends : operatingHours.weekends
            },
            capacity,
            availableVaccines
        })

        const savedCenter = await newVaccinationCenter.save();
        res.status(201).json({success:true, message:"new center registered successfully",data : savedCenter });
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message : "internal server error "});
    }
}



const getVaccinationCenterInfo = async(req,res) =>{
    const {userId} = req.user;
    try{
        const vaccineCenterInfo = await VaccinationCenter.find({userId})
        return res.json({success:true, message:"successfully fetch vaccine center info", data : vaccineCenterInfo})
    }catch(error){
        console.log(error)
        return res.json({success:false, message :"failed to get the info"});
    }
}
export {vaccinationCenterInfo, getVaccinationCenterInfo}