import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First name must contain at least 3 characters"],
        maxLength: [30, "First name must contain less than 30 characters"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last name must contain at least 3 characters"],
        maxLength: [30, "Last name must contain less than 30 characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Please enter a valid phone number"],
        maxLength: [10, "Please enter a valid phone number"],
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
});

export const Reservation = mongoose.model('Reservation', reservationSchema);
