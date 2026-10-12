import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email: {type:String, required: true, unique: true},
    password: {type: String, required: true},
    VerifyOtp: {type: String, default: ''},
    VerifyOtpExpireAt: {type: Number, default: 0},
    VerifyOtpSentAt: {type: Number, default: 0},
    isAccountVerified: {type: Boolean, default: false},
    resetOtp: {type: String, default: ''},
    resetOtpExpiresAt: {type: Number, default: 0},
    resetOtpSentAt: {type: Number, default: 0},
    role: {type: [String], enum: ['admin','freeUser','paidUser']},
    isMember: {type: Boolean, default: false},
    
    

});
const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);
export default UserModel;