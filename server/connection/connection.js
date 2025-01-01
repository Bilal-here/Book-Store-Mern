const mongoose = require('mongoose')
const uri = process.env.URI
const connect = async()=>{
try{
    await mongoose.connect(uri)
    console.log('MongoDB Connected')
}
catch(error){
  console.log('Something error occured')
}
}

connect()