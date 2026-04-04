const mongoose =  require("mongoose");

const recordSchema = new mongoose.Schema(
    {
        amount:{
            type:Number,
            required: true,
            min:0
        },
        type:{
            type:String,
            enum: ["income","expense"],
            required: true
        },
        category:{
            type: String,
            required: true
        },
        date:{
            type: Date,
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {timestamps: true}
);
module.exports = mongoose.model("Record", recordSchema);


