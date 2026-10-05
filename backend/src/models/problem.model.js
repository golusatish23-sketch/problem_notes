import mongoose, { Schema}  from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const ProblemSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    problem:{
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        }
    },
    context: {
        when: [String],
        where: [String],
        whoAffected: [String]
    },
    symptoms: [String],
    why: [String],
    rootCause: [String],
    solutions: [{
        title: {
            type: String,
            required: true,
            trim: true
        },
        explanation: {
            type: String,
            trim: true
        }
    }]
}, { timestamps: true });
ProblemSchema.plugin(mongooseAggregatePaginate)
export const Problem=mongoose.model("Problem",ProblemSchema)