import ApiResponse from "../utils/apiresponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { Problem } from "../models/problem.model.js";
import { ApiError } from "../utils/apiError.js";
const Problemnotes=asyncHandler(async (req,res) => {
    
    console.log(req.body)
    
    const {problem,context,symptoms,why,rootCause,solutions}=req.body
    const {title,description}=problem
    const {when,where,whoAffected}=context
    if(!title||!description){
        return ApiError(400,"field is empty")
    }
    console.log(problem.title)
    let Peoblemwritten
    try{
     Peoblemwritten=await Problem.create({
        owner:req.user?._id,
        problem:{
            title:problem.title,
            description:problem.description
        },
        context:{
            when:context.when,
            where:context.where,
            whoAffected:context.whoAffected
        },
        symptoms:symptoms,
        why:why,
        rootCause:rootCause,
        solutions:solutions
    })
    }catch(error){
        console.log(error)
    }


    return res
    .status(200)
    .json(new ApiResponse(200,
        {Peoblemwritten},
        "jhsfdahadsf"
    ))
})

const FindAllproblem=asyncHandler(async (req,res) => {
    console.log(req.user?._id)
    const Allproblem=await Problem.find({owner:req.user?._id})
    console.log("allproblem",Allproblem)
    if(Allproblem.length===0){
        throw new ApiError(404,'problem not found')
    }
    return res
    .status(200)
    .json( new ApiResponse(200,
        {Allproblem},
        "All problem get Successfully"
    ))
    
})
export {
    Problemnotes,
    FindAllproblem
}