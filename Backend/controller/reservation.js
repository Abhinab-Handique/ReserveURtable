import ErrorHandler from "../error/error";
import {Reservation} from'../models/reservationSchema.js';


export const sendReservation = async (req, res,next) => {
    const [firstName, lastName, email,phone,date,time] = req.body;
    
    if(!firstName || !lastName || !email || !phone || !date || !time){
        return next(new ErrorHandler('please fill the form ',400));
    }
    try {
        await Reservation.create(firstName, lastName, email, phone, date, time);
        res.status(200).jason({
            success: true,
            message:'Reservation created successfully'
        })
        
    }
    catch(err){
        if(err.name === "ValidationError"){
            const ValidationErrors = Object.values(error.errors).map(err => err.message);
            return next(new ErrorHandler(ValidationErrors.join(","),400))

            
    }
}
}