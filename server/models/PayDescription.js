const { Schema, model } = require('mongoose');

const payDetailsSchema = new Schema(
    {
        cardNumber: {
            type: Number,
            required: 'You need to provide a valid Credit Card Number',
            minlength: 16,
            maxlength: 16
        },
        expirationDate: {
            type: Date
        //     validate: [
        //         validator({
        //           validator: 'isDate',
        //           message: 'Oops..please enter valid expiration Date'
        //         })
        // }
       //     required: true (Only if cardnumber = true)
        },
        cvv: {
            type: String,
            minlength: 3,
            maxlength: 3
          //  required: true (Only If cardnumber = true)
        },
        firstName: {
            type: String,
            minlength: 1,
            maxlength: 35
        },
        lastName: {
            type: String,
            minlength: 1,
            maxlength: 35
        },
        streetFirst: {
            type: String,
            minlength: 1,
            maxlength: 80
        },
        streetSecond: {
            type: String,
            minlength: 1,
            maxlength: 80
        },
        city: {
            type: String,
            minlength: 1,
            maxlength: 80
        },
        state: {
            type: String,
            minlength: 1,
            maxlength: 80
        },
        postal: {
            type: String,
            minlength: 1,
            maxlength: 12
        }
    });


    module.exports = PayDescription;