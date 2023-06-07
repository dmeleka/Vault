import mongoose from "mongoose";
const Schema = mongoose.Schema;

import { cardSchema } from "./cardModel.js";
import { loginSchema } from "./loginModel.js";
import { secNoteSchema } from "./secNoteModel.js";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    masterPassword: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    logins: [loginSchema],
    cards: [cardSchema],
    secNotes: [secNoteSchema],
    refreshToken: {
        type: String,
        required: false,
        default: null
    }
}, { timestamps: false });

const userModel = mongoose.model('userModel', userSchema);
export default userModel;