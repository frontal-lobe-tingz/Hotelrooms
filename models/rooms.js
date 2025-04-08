const { timeStamp } = require('console')
const mongoose = require('mongoose')
const { type } = require('os')

const roomSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
      //  unique: true
    },
    phonenumber:{
        type: Number,
        required: true,
        //unique: true
    },
    maxcount:{
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
       // required: true
    },

    imageurls:[ 
],

currentbookings :[],

type:{
    type: String,
    required:true
}
    //available: {
      //  type: Boolean,
  //      required: true
   // }
},{timeStamp:true,})

const roomModel = mongoose.model('Room', roomSchema)

module.exports = roomModel