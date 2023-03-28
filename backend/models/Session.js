const mongoose=require('mongoose');
const {Schema}=mongoose;

const SessionSchema=new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date:{
        type: Date,
        required: true,
        unique: true,
        default: Date.now
    },
    tos:{
        type: Number,
        required: true,
    },
    scramble: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('session' , SessionSchema);