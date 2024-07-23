import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        email: {
            type: String,
            match: [
                /.+\@.+\..+/,
                "Please enter a valid email"
            ],
        },
        mobile: {
            type: String,
            match: [
                /^(?:\+94|0)[1-9][0-9]{8}$/,
                "Please enter a valid mobile number",
            ],
        },
        phone: {
            type: String,
            match: [
                /^(?:\+94|0)[1-9][0-9]{8}$/,
                "Please enter a valid mobile number",
            ],
        },
        price: {
            type: Number,
            required: true,
        },
        images: [{
            type: String,
        }],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Service", serviceSchema);
