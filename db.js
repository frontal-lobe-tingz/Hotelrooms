const mongoose = require('mongoose');

// Connect to MongoDB   
var mongoURL ='mongodb+srv://ndumisotheodore:admin@bookingcluster.zlz7f4n.mongodb.net/Conference_rooms'

mongoose.connect(mongoURL,{useUnifiedTopology:true,useNewUrlParser:true})

var connection = mongoose.connection

connection.on('error', () =>{
     console.log('Connection error')}
)

connection.on('connected', () => {
    console.log('Connected to MongoDB')
})

module.exports =mongoose