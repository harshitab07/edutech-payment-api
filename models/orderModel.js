import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    payment: {},
    email: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("orders", orderSchema);