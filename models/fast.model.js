import mongoose from 'mongoose';

const FastSchema = new mongoose.Schema({
    startTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Fast = mongoose.model('Fast', FastSchema);
export default Fast;