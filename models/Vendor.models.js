import mongoose, { model } from "mongoose";

const vendorSchema = new  mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unquie:true
    },
    password:{
        type:String,
        require:true
    },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Firm'
        }
    ],
    product:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]

});

export const Vendor = mongoose.model("Vendor",vendorSchema)