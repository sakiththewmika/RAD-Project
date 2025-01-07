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
            match: [/.+\@.+\..+/, "Please enter a valid email"],
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["admin", "planner", "provider"],
        },
        profilePhoto: {
            type: String,
            required: false,
        },
        lists: [{
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                default: () => new mongoose.Types.ObjectId(),
            },
            name: {
                type: String,
                required: true,
            },
            items: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Service",
            }],
        }],
    },
    {
        timestamps: true,
    }
);


// Compound index for email and role to be unique together
userSchema.index({ email: 1, role: 1 }, { unique: true });

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