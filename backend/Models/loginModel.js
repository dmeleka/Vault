import mongoose from "mongoose";
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    title: {
        type: {},
        required: true,
    },
    username: {
        type: {},
        required: true,
    },
    password: {
        type: {},
        required: true,
    },
    websiteLink: {
        type: {},
        required: false,
        default: ""
    },
    favourite: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const loginModel = mongoose.model('loginModel', loginSchema);
export { loginModel, loginSchema };
