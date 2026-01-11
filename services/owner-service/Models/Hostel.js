const mongoose = require("mongoose");

const HostelSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        location: { type: String, required: true },
        rooms: Number,
        rent: Number,
        facilities: { type: mongoose.Schema.Types.Mixed, default: {} },
        images: [String],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Owner",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Hostel", HostelSchema);