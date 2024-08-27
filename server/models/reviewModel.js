import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
        },
        serviceID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            required: true,
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true, 
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model("Review", reviewSchema);