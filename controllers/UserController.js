import generateToken from "../midleware/GenrateToken.js";
import User from "../models/UserModel.js"
import { sendEmail } from "../utils/SendEmail.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, mobile } = req.body;
        if (!email || !mobile) {
            return res.status(400).json({ message: "email and mobile are required ", success: false })
        }
        const otp = Math.floor(1000 + Math.random() * 9999);

        const user = await User.findOne({ email })
        if (user) {
            user.otp = otp
            await user.save();
            const token = generateToken(user._id)
              sendEmail({
            email:email,
            subject:"OTP for login",
            message:`<p>Your otp for login is : <b>${otp}</b></p>`,
        });

            return res.status(200).json({ message: "user Allready registered ", success: true  })
        }
        const newUser = await User.create({ name, email, mobile, otp });
        if (!newUser) {
            return res.status(400).json({ message: "user not created ", success: false })
        }
        const token = generateToken(newUser._id)
        sendEmail({
            email:email,
            subject:"OTP for login",
            message:`<p>Your otp for login is : <b>${otp}</b></p>`,
        });

        return res.status(200).json({ message: "user created success", success: true })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server is error", success: false, error });
    }
};

// deleteUser

 export const deleteUser = async (req ,res) =>{
  try{
    const  {id} = req.params
    if(!id){
      return res.status(400).json({message:"id is required", success:false})
    }
    
    
    const deletedUser = await User.findByIdAndDelete(id)
    if(!deletedUser){
      return res.status(404).json({message:"user not found", success:false})
    }
    return res.status(200).json({message:"user deleted successfully", success:true})
}catch(error){
consol.log(error)
  return res.status(500).json({message:"Internal server error", success:false, error})
}
};

// UpdateUser

// export const updateUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, email, mobile } = req.body;
//         if (!id) {
//             return res.status(400).json({ message: "id is required", success: false })
//         }
//         const user = await User.findById(id)
//         if (!user) {
//             return res.status(404).json({ message: "user not found", success: false })
//         }
//         user.name = name || user.name;
//         user.email = email || user.email;
//         user.mobile = mobile || user.mobile;
//         await user.save();
//         return res.status(200).json({ message: "user updated successfully", success: true })    
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: "internal server is error", success: false, error });
//     }
// };

// verifyOtp

 export const verifyOtp = async (req, res) => {
    try{
        const {email, otp}=req.body
        if(!email || !otp){
             return res.status(400).json({ message: "Email or otp is required", success:false, token });
        }
        const user = await User.findOne({email})
        if(!user){
             return res.status(400).json({ message: "user not found", success:false });
        }
        if(user.otp != otp){
            return res.status(400).json({ message: "invalid user", success:false });
        }
        user.otp=null
        await user.save()
        const token=generateToken(user._id)
        return res.status(200).json({ message: "otp verified successfull", success:true.token });

    }catch(error){
      console.log(error);
       return res.status(500).json({ message: "internal server error", success:false });
      
    }
 }

 