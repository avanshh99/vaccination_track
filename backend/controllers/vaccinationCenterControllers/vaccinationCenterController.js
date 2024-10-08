import VaccinationCenter from "../../models/vaccinationCenterModels/vaccinationCenterModel.js";
export const vaccinationCenterInfo = async (req, res) => {
    try {
      const {
        email,
        name,
        phone,
        address,
        city,
        state,
        postalCode,
        lat,
        lng,
        weekdays,
        weekends,
        capacity,
      } = req.body;
  
      // Validate required fields
      if (!name || !phone || !address || !city || !state || !postalCode || !capacity) {
        return res.status(400).json({
          success: false,
          message: "Please provide all required fields",
        });
      }
  
      // Create a new vaccination center object
      const newVaccinationCenter = new VaccinationCenter({
        email,
        name,
        phone,
        location: {
          address,
          city,
          state,
          postalCode,
          coordinates: {
            lat,
            lng,
          },
        },
        operatingHours: {
          weekdays,
          weekends,
        },
        capacity,
      });
  
      // Save the new vaccination center to the database
      const savedVaccinationCenter = await newVaccinationCenter.save();
  
      return res.status(201).json({
        success: true,
        message: 'Vaccination center created successfully',
        data: savedVaccinationCenter,
      });
    } catch (error) {
      console.error("Error creating vaccination center:", error);
      
      // Check if the error is related to validation issues in Mongoose
      if (error.name === "ValidationError") {
        return res.status(400).json({
          success: false,
          message: "Validation error: " + error.message,
        });
      }
  
      return res.status(500).json({
        success: false,
        message: 'Failed to create vaccination center',
        error: error.message,
      });
    }
  };

const getVaccinationCenterInfo = async(req,res) =>{
    // const {userId} = req.user;
    try{
        const vaccineCenterInfo = await VaccinationCenter.find()
        return res.json({success:true, message:"successfully fetch vaccine center info", data : vaccineCenterInfo})
    }catch(error){
        console.log(error)
        return res.json({success:false, message :"failed to get the info"});
    }
}
export {getVaccinationCenterInfo}