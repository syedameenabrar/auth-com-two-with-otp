const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        fullName: { type: String },
        email: { type: String, unique: true },
        emailOtp: { type: Number },
        phoneNumber: { type: Number, required: true, unique: true },
        phoneOTP: { type: Number },
        password: { type: String },
        phoneisVerified: { type: Boolean, default: false },
        accountType: {
            type: String,
            default: 'user',
            enum: ['user', 'admin', 'dealer'],
        },
        isBlocked: { type: Boolean, default: false },
        profilePicture: { type: String },
    },
    {
        timestamps: true,
    }
);

userSchema.plugin(paginate);
userSchema.plugin(aggregatePaginate);
module.exports = mongoose.model('user', userSchema);
