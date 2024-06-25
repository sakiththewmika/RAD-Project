import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/, "Please enter a valid email"],
        },
        password: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            required: true,
            match: [
                /^(?:\+94|0)[1-9][0-9]{8}$/,
                "Please enter a valid mobile number",
            ],
        },
        role: {
            type: String,
            required: true,
            enum: ["admin", "planner", "provider"],
        },
    },
    {
        timestamps: true,
    }
);

//hash the password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

//method to compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};



export default mongoose.model("User", userSchema);
