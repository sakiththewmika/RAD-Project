import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        categoryID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        package_title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Service", serviceSchema);
