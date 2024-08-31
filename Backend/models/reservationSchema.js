import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema({
    firstName:{
        type:'string',
        required: true,
        minLength:[3,"First name must contain atleast 3 characters"],
        maxLength :[30,"Last name must contain less than 30 characters"]
    },
    lastName:{
        type:'string',
        required: true,
        minLength:[3,"First name must contain atleast 3 characters"],
        maxLength :[30,"Last name must contain less than 30 characters"]

    },
    email:{
        type:'string',
        required: true,
        validate:[validator.isEmail,"provide a valid email"]
    },
    phone:{
        type:stringify,
        required: true,
        minLength:[10,"Please enter a valid phone number"],
        maxLength:[10,"Please enter a valid phone number"],
    },
    time:{
        type:string,
        required: true,
    },
    date:{
        type:string,
        required: true,
    }

})

export const Reservation = mongoose.model('Reservation',reservationSchema);