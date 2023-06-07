import mongoose from "mongoose";
const Schema = mongoose.Schema;

const secNoteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: true,
    },
    favourite: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const secNoteModel = mongoose.model('secNoteModel', secNoteSchema);
export { secNoteModel, secNoteSchema };

