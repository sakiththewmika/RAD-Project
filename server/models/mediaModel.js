import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        serviceID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: true,
        },
        path: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Media', mediaSchema);