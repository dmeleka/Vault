import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    title: {
        type: {},
        required: true,
    },
    cardNumber: {
        type: {},
        required: true,
    },
    csv: {
        type: {},
        required: true,
    },
    expiryDate: {
        type: {},
        required: true,
    },
    favourite: {
        type: Boolean,
        default: false,
    },
    brand: {
        type: String,
        enum: ['visa', 'mastercard'],
        required: false,
    },
}, { timestamps: true });

const cardModel = mongoose.model('cardModel', cardSchema);
export { cardModel, cardSchema };

