import { Schema } from "mongoose";

export const userSchema = new Schema({
    firstName:      { type: String, required: true },
    lastName:       { type: String, required: true },
    email:          { type: String, unique: true, required: [true, 'mail already exists'] },
    password:       { type: String, require: true },
    balance:        { type: Number, default: 0},
    created_at:     { type: Date, default: Date.now},
}, { versionKey: false})