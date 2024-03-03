import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
}, { timestamps: true })

const ContentPost = mongoose.models.contents || mongoose.model("contents", contentSchema);

export default ContentPost;