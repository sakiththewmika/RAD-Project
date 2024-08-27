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
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
                required: true,
            },
            name: {
                type: String,
                required: true,
            }
            
        },
        type: {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Type",
                required: true,
            },
            name: {
                type: String,
                required: true,
            }
            
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        city: {
            type: String,
        },
        email: {
            type: String,
            match: [
                /.+\@.+\..+/,
                "Please enter a valid email address",
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
        }]
    },
    {
        timestamps: true,
    }
);

//middleware to handle cascading deletion of reviews when a service is deleted
serviceSchema.pre("remove", async function (next) {
    try {
        await this.model("Review").deleteMany({ service: this._id });
        next();
    } catch (error) {
        console.log(error.message);
        next(error);
    }
});

//middleware to handle cascading deletion of services from lists when a service is deleted
serviceSchema.pre("remove", async function (next) {
    try {
        await this.model("User").updateMany(
            { lists: { $elemMatch: { items: this._id } } },
            { $pull: { "lists.$.items": this._id } }
        );
        next();
    } catch (error) {
        console.log(error.message);
        next(error);
    }
});

export default mongoose.model("Service", serviceSchema);
