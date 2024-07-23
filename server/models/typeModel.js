import mongoose from 'mongoose';

const typeSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },

    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Type', typeSchema);