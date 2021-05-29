import { Schema } from "mongoose";

export const recordSchema = new Schema({
    accreditedUser: { type: String, require: true },
    userReceived:   { type: String, require: true },
    amount:         { type: Number, require: true },
    created_at:     { type: Date, default: Date.now },
}, {versionKey: false})
