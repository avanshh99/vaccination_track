// import vaccinationUserInfo from "../../models/vaccinationCenterModels/vaccinationUserModel.js"
// import jwt from "jsonwebtoken";
// import validator from "validator";


// const vaccinationLoginUser = async (req,res) =>{
//     const {email, password} = req.body;
//     try {
//         const user = await vaccinationUserInfo.findOne({email});
//         if(!user){
//             return res.status(404).json({success:false, message : "User does not exist"});
//         }

//         const token = jwt.sign({userId : user._id}, process.env.SECRET, {
//             expiresIn:'12h'
//         })

//         res.cookie('token', token, {httpOnly : true, secure:true,sameSite:'none'});

//         return res.status(200).json({
//             success : true,
//             message : 'user login successfully ',
//             token : token
//         })
//     } catch (error) {
//         console.log("login error", error);
//         res.status(500).json({success:false,message:"Internal Server Error"});
//     }
// }



// const vaccinationRegisterUser = async(req,res) =>{
//     const {name, password,email} = req.body;
//     console.log(req.body)
//     try {
//         const exists = await vaccinationUserInfo.findOne({email});
//         if(exists){
//             return res.status(400).json({success:false,message:"user already exists"})
//         }

//         if (!validator.isEmail(email)) {
//             return res.status(400).json({ success: false, message: "Please enter a valid email" });
//         }

//         const newUser = new vaccinationUserInfo({
//             name,
//             email,
//             password
//         });

//         const user = await newUser.save();
//         const token = jwt.sign({userId : user._id}, process.env.SECRET, {
//             expiresIn:'12h'
//         })

//         res.cookie('token', token, {httpOnly : true, secure:true,sameSite:'none'});

//         return res.status(200).json({success:true,message:"register successfully", token:token});
//     } catch (error) {
//         console.log("registration error");
//         res.status(500).json({success:false,message:'internal server error'});
//     }
// }


// export {vaccinationLoginUser, vaccinationRegisterUser};



import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import vaccinationUserInfo from "../../models/vaccinationCenterModels/vaccinationUserModel.js";

const vaccinationLoginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await vaccinationUserInfo.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
            expiresIn: '12h'
        });

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'none' });

        return res.status(200).json({
            success: true,
            message: 'User login successfully',
            token: token
        });
    } catch (error) {
        console.log("Login error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const vaccinationRegisterUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await vaccinationUserInfo.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new vaccinationUserInfo({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
            expiresIn: '12h'
        });

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'none' });

        return res.status(200).json({ success: true, message: "Registered successfully", token: token });
    } catch (error) {
        console.log("Registration error:", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export { vaccinationLoginUser, vaccinationRegisterUser };
