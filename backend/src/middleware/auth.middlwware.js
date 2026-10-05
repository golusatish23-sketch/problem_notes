import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken"
import ApiResponse from "../utils/apiresponse.js";
import { User } from "../models/user.model.js";
export const verifyjwt =asyncHandler(async(req,res,next)=>{

try {
    const token=req.cookies?.accessToken||req.header("Authorization")?.replace("bearer","")
    if(!token){
        throw new ApiError(401,"Unauthorized Request")
    }
     const decodeToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
     const user=await User.findById(decodeToken?._id)

     .select("-password -refreshToken")

    if(!user){
        throw new ApiError(401,"Invalid Acesss Token")
    }
    if(user.status==="BLOCKED"){
        return res
        .status(403)
        .json(new ApiResponse(
            403,
            {user},
            "you are blocked"
        ))
    }

    req.user=user;
    next()
}
catch (error) {
    throw new ApiError(401,error?.message||"invalid Acess token")
}
})